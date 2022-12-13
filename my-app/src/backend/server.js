import express from 'express'
import data from "./backendAssets/data.json" assert { type: "json" }
import bcrypt from "bcrypt";
import cors from 'cors'
import * as fs from "fs";
import * as https from "https";

/*
const options = {
    key: fs.readFileSync('./ssl/privatekey'),
    cert: fs.readFileSync('./ssl/certificate'),
    passphrase: 'kamil'
};
 */

const options = {}

const app = express()
const port = 3000

app.use(cors())

/*
const server = https.createServer(options, app).listen(port, function () {
    console.log("Express server listening on port " + port);
});
 */

const saltRounds = 10

const database = {
    users: [],
    data: data
}

const simplifyMovie = (movie) => {
    return {
        id: movie.id, title: movie.title, popularity: movie.popularity, poster_path: movie.poster_path, vote_count: movie.vote_count, overview: movie.overview
    }
}

const getUserByEmail = (email) => {
    return database.users.reduce((acc, current) => {
        if(current.email === email){
            return current;
        } else {
            return acc;
        }
    }, null)
}

// get five recommended movies
app.get('/recommendation', (req, res) => {
    const result = database.data.slice(0, 5).map((entry) => {return simplifyMovie(entry)})
    console.log(res)
    res.send({results: result})
})

// search for movie by title
app.get('/search', (req, res) => {
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
    res.send({results: result[page - 1], total_results: matchingMovies.length})
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

// get movie poster
app.get("/movie/poster/:name", (req, res) => {
    const fileName = req.params.name
    console.log(fileName)
    if(fileName === undefined){
        res.sendFile(`/Users/uczelnia/WebstormProjects/react-movies/my-app/src/backend/backendAssets/img/bialy_kruk.jpg`)
    } else {
        res.sendFile(`/Users/uczelnia/WebstormProjects/react-movies/my-app/src/backend/backendAssets/img/${fileName}`)
    }
})

// register
app.post('/register', (req, res) => {
    const login = req.query.name
    const pword = req.query.password
    const email = req.query.email

    const isLoginOrEmailTaken = database.users.some((user) => {
        return user.login === login || user.email === email
    })
    if(isLoginOrEmailTaken){
        return res.status(409).render("User already exists")
    } else {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(pword, salt, function(err, hash) {
                const newUserInstance = {
                    login: login,
                    email: email,
                    password: hash,
                    isAdmin: true
                }
                database.users.push(newUserInstance)
                res.send("User created successfully")
            });
        });
    }
})

// login
app.get('/login', async (req, res) => {
    const email = req.query.email
    const pword = req.query.password

    const user = getUserByEmail(email)
    if (user !== null) {
        const areEqual = await bcrypt.compare(pword, user.password)
        if(areEqual){
            res.send({username: user.username, isAdmin: user.isAdmin})
            // res.status(200).json({username: user.username, api_key: user.api_key});
        } else {
            res.status(400).json({ error: "Invalid Password" });
        }
    } else {
        res.status(401).json({ error: "User does not exist" });
    }
})

app.listen(port)
