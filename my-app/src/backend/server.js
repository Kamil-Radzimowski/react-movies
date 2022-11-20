import express from 'express'
import data from "./backendAssets/data.json" assert { type: "json" }
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

// get five recommended movies
app.get('/recommendation', (req, res) => {
    const result = database.data.slice(0, 5).map((entry) => {return simplifyMovie(entry)})
    res.send({results: result})
})

// search for movie by title
app.get('/search', (req, res) => {
    const query = req.query.query
    const page = req.query.page
    const chunk = 10;
    const matchingMovies = database.data.reduce((acc, current) => {
        if(current.title.toLowerCase().includes(query)){
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
    res.send({results: result[page - 1]})
})

// get movie details
app.get('/movie/:id' , (req, res) => {
    const id = req.params.id
    const movie = database.data.reduce((acc, current) => {
        if(current.id === parseInt(id)){
            return current
        } else {
            return acc
        }
    }, {})
    res.send({movie: movie})
})

app.listen(port)
