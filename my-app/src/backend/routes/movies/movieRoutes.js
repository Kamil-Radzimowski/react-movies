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
        getDb().collection(moviesCollection).find({}).toArray().then((result) => {
            res.json(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/recommendation', (req, res) => {
        getDb().collection(moviesCollection).find({}).limit(5).toArray().then((result) => {
            const data = result.map((entry) => {return simplifyMovie(entry)})
            res.send({results: data})
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/search', (req, res) => {
        const query = req.query.query
        const page = req.query.page
        const sortOption = req.query.sort
        const chunk = 10;

        if(!query || !page){
            res.status(400).send("Missing params!")
        }

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
        ]).toArray().then((result) => {
            const data = result.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index/chunk)

                if(!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = [] // start a new chunk
                }

                resultArray[chunkIndex].push(item)

                return resultArray
            }, [])
            res.send({results: data[page - 1], total_results: result.length, number_of_pages: data.length})
        }).catch((err) => {
            res.status(500).error(err)
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
        ]).toArray().then((result) => {
            res.send({movie: result[0]})
        }).catch((err) => {
            res.status(500).send(err)
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

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$push: {votes: vote}}).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .patch('/update/:id', async (req, res) => {
        const movieId = req.params.id
        const title = req.query.title
        const desc = req.query.desc
        let genres = req.query.genres

        if(!title || !desc || !genres){
            res.status(400).send("Missing params")
        }

        genres = genres.split(",")

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$set: {title: title, overview: desc, genres: genres}}).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .delete('/delete/:id', (req, res) => {
        const id = req.params.id
        getDb().collection(moviesCollection).deleteOne({id: parseInt(id)}).then((result) => {
            res.send("Deleted")
        }).catch((err) => {
            res.status(500).send(err)
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

        getDb().collection(moviesCollection).find({}).sort({id:-1}).limit(1).toArray().then((result) => {
            obj.id = result[0].id + 1
            getDb().collection(moviesCollection).insertOne(obj).then(insertRes => {
                res.send(insertRes)
            }).catch(err => {
                res.status(400).send(err)
            })
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/stats/mostCommented', (req, res) => {
        getDb().collection(moviesCollection).aggregate([
            {
                $project: {
                    _id: 0, title: 1,
                    vote_count: {$size: "$votes"},
                }
            },
            {
                $sort: {vote_count: -1}
            },
            {
                $limit: 5
            }
        ]).toArray().then((result) => {
            res.send({movies: result})
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/stats/highestVoteScore', (req, res) => {
        getDb().collection(moviesCollection).aggregate([
            {
                $unwind: {path: "$votes", "preserveNullAndEmptyArrays": true}
            },
            {
                $group: {
                    _id: "$id",
                    id: {$first: "$id"},
                    title: {$first: "$title"},
                    vote_average: {$avg: "$votes.rate"},
                }
            },
            {
                $project: {
                    id: 1,
                    title: 1,
                    vote_average: {$ifNull: ["$vote_average", 0]}
                }
            },
            {
                $sort: {vote_average: -1}
            },
            {
                $limit: 5
            }
        ]).toArray().then((result) => {
            res.send({movies: result})
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/stats/mostPopularGenres', (req, res) => {
        getDb().collection(moviesCollection).aggregate([
            {
                $unwind: {path: "$genres", "preserveNullAndEmptyArrays": true}
            },
            {
                $group: {
                    _id: "$genres",
                    count: { $count: {} }
                }
            },
            {
                $sort: {count: -1}
            },
            {
                $limit: 5
            }
        ]).toArray().then((result) => {
            console.log("RES", result)
            res.send({genres: result})
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    })
    .get('/liveChat/shortcuts', (req, res) => {
        getDb().collection(moviesCollection).find({}).project({title: 1}).toArray().then((result) => {
            res.send({result: result})
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err)
        })
    })