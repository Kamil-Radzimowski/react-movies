import express from 'express'
import data from "my-app/src/backend/backendAssets/data.json"
const app = express()
const port = 3000

const database = {
    users: [],
    data: data
}

const simplifyMovie = (movie) => {
    return {
        id: movie.id, title: movie.title, popularity: movie.popularity, poster_path: movie.poster_path, vote_count: movie.vote_count, overview: movie.overview
    }
}

app.get('/recommendation', (req, res) => {
    const result = database.data.slice(0, 5).map((entry) => {return simplifyMovie(entry)})
    res.send({results: result})
})

app.get('/search', (req, res) => {
    const query = req.query.query
    const page = req.query.page
    const matchingMovies = database.data.reduce((acc, current) => {
        if(current.title.includes(query)){
            acc.push(simplifyMovie(current))
        }
        return acc;
    }, [])
    res.send({results: matchingMovies})
})

app.listen(port)
