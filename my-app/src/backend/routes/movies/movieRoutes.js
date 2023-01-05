import express from "express";
import {LogToFile} from "../../logs/FileLogger.js";
import {getDb} from "../../mongo.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './backendAssets/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
})

const router = express.Router();

const moviesCollection = "movies"

const simplifyMovie = (movie) => {
    return {
        id: movie.id, title: movie.title, popularity: movie.popularity, poster_path: movie.poster_path, vote_count: movie.vote_count, overview: movie.overview
    }
}

export default router
    .get('/all', (req, res) => {
        getDb().collection(moviesCollection).find({}).toArray(function (err, result){
            if(err){
                res.status(400).send("error")
            }
            else{
                res.json(result)
            }
        })
    })
    .get('/recommendation', (req, res) => {
        getDb().collection(moviesCollection).find({}).limit(5).toArray(function (err, result){
            if(err){
                res.status(400).send("error")
            } else {
                const data = result.map((entry) => {return simplifyMovie(entry)})
                res.send({results: data})
            }
        })
    })
    .get('/search', (req, res) => {
        const query = req.query.query
        const page = req.query.page
        const sortOption = req.query.sort
        const chunk = 10;

        const sortObj = {}

        if(sortOption === "default"){
            sortObj._id = 1
        } else if (sortOption === "popularity"){
            sortObj.popularity = -1
        } else if (sortOption === "votes"){
            sortObj.vote_count = -1
        }

        getDb().collection(moviesCollection).aggregate([
            {
                $match: {'title' : { '$regex' : query, '$options' : 'i' } }
            },
            {
                $project: {
                    _id: 0, id:1, title: 1, popularity: 1,
                    poster_path: 1,
                    vote_count: {$size: "$votes"},
                    overview: 1,
                }
            },
            {
                $sort: sortObj
            },
        ]).toArray(function (err, result){
            if(err){
                res.status(400).error("error")
            } else {
                const data = result.reduce((resultArray, item, index) => {
                    const chunkIndex = Math.floor(index/chunk)

                    if(!resultArray[chunkIndex]) {
                        resultArray[chunkIndex] = [] // start a new chunk
                    }

                    resultArray[chunkIndex].push(item)

                    return resultArray
                }, [])
                res.send({results: data[page - 1], total_results: result.length, number_of_pages: data.length})
            }
        })
    })
    .get('/:id' , async (req, res) => {
        const id = req.params.id

        getDb().collection(moviesCollection).aggregate([
            {
                $unwind: {path: "$votes", "preserveNullAndEmptyArrays": true}
            },
            {
                $match: {id: parseInt(id)}
            },

            {
                $group: {
                    _id: "$id",
                    id: {$first: "$id"},
                    title: {$first: "$title"},
                    poster_path: {$first: "$poster_path"},
                    overview: {$first: "$overview"},
                    popularity: {$first: "$popularity"},
                    vote_average: {$avg: "$votes.rate"},
                    vote_count: {$count: {}},
                    genres: {$first: "$genres"}
                }
            }
        ]).toArray(function(err, result){
            if(err){
                console.log(err)
                res.status(400).send(err)
            } else {
                console.log(result[0])
                res.send({movie: result[0]})
            }
        })
    })
    .get("/poster/:name", (req, res) => {
        const fileName = req.params.name
        LogToFile(fileName)
        if(fileName === undefined){
            res.sendFile(`/Users/uczelnia/WebstormProjects/react-movies/my-app/src/backend/backendAssets/img/bialy_kruk.jpg`)
        } else {
            res.sendFile(`/Users/uczelnia/WebstormProjects/react-movies/my-app/src/backend/backendAssets/img/${fileName}`)
        }
    })
    .post('/vote/:id/:rating', async (req, res) => {
        const movieId = req.params.id
        const rating = req.params.rating
        let user = req.query.user

        if(user === undefined || user === "undefined"){
            user = "Anonim"
        }

        const vote = {user: user, rate: parseInt(rating)}

        const result = await getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$push: {votes: vote}})
        res.send(result)
    })
    .patch('/update/:id', async (req, res) => {
        const movieId = req.params.id
        const title = req.query.title
        const desc = req.query.desc
        let genres = req.query.genres

        genres = genres.split(",")

        const result = await getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$set: {title: title, overview: desc, genres: genres}})
        res.send(result)
    })
    .delete('/delete/:id', (req, res) => {
        const id = req.params.id
        getDb().collection(moviesCollection).deleteOne({id: parseInt(id)}, function (err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send("Deleted")
            }
        })
    })
    .post('/add/:title/:desc/:genres', upload.single("image"), (req, res) => {
        const title = req.params.title
        const desc = req.params.desc
        const genres = req.params.genres.split(',')

        const file = req.file;

        const obj = {
            title: title,
            overview: desc,
            genres: genres,
            poster_path: file.originalname,
            comments: [],
            origin_country: "USA",
            popularity: Math.floor(Math.random() * 300) + 1,
            votes: []
        }

        getDb().collection(moviesCollection).find({}).sort({id:-1}).limit(1).toArray(function (err, result) {
            if (err) {
                res.status(400).send(err)
            } else {
                obj.id = result[0].id + 1
                getDb().collection(moviesCollection).insertOne(obj).then(insertRes => {
                    res.send(insertRes)
                }).catch(err => {
                    res.status(400).send(err)
                })
            }
        })
    })