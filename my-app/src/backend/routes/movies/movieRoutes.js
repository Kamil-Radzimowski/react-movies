import express from "express";
import {LogToFile} from "../../logs/FileLogger.js";
import {getDb} from "../../mongo.js";

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
        const chunk = 10;

        getDb().collection(moviesCollection).find({'title' : { '$regex' : query, '$options' : 'i' } }).toArray(function (err, result){
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
                res.send({results: data[page - 1], total_results: result.length})
            }
        })
    })
    .get('/:id' , async (req, res) => {
        const id = req.params.id

        getDb().collection(moviesCollection).findOne({id: parseInt(id)}, function (err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.json({movie: result})
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
    .delete('/delete/:id', (req, res) => {
        const id = req.params.id

    })