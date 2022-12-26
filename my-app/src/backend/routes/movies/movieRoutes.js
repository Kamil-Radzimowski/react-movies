import express from "express";
import {database} from "../../server.js";
import {LogToFile} from "../../logs/FileLogger.js";

const router = express.Router();

const simplifyMovie = (movie) => {
    return {
        id: movie.id, title: movie.title, popularity: movie.popularity, poster_path: movie.poster_path, vote_count: movie.vote_count, overview: movie.overview
    }
}

export default router
    .get('/all', (req, res) => {
        res.send(database.data)
    })
    .get('/recommendation', (req, res) => {
        const result = database.data.slice(0, 5).map((entry) => {return simplifyMovie(entry)})
        LogToFile(result)
        res.send({results: result})
    })
    .get('/search', (req, res) => {
        const query = req.query.query
        const page = req.query.page
        const chunk = 10;
        const matchingMovies = database.data.reduce((acc, current) => {
            if(current.title.toLowerCase().includes(query.toLowerCase())){
                acc.push(simplifyMovie(current))
            }
            return acc;
        }, [])
        const result = matchingMovies.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index/chunk)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])
        LogToFile(result)
        res.send({results: result[page - 1], total_results: matchingMovies.length})
    })
    .get('/:id' , (req, res) => {
        const id = req.params.id
        const movie = database.data.reduce((acc, current) => {
            if(current.id === parseInt(id)){
                return current
            } else {
                return acc
            }
        }, {})
        LogToFile(movie)
        res.send({movie: movie})
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