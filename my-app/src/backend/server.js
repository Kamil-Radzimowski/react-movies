import express from 'express'
import data from "./backendAssets/data.json" assert { type: "json" }
import cors from 'cors'
import movieRoutes from "./routes/movies/movieRoutes.js";
// import mongoose from 'mongoose'
import usersRoutes from "./routes/user/usersRoutes.js";
import commentRoutes from "./routes/comments/commentRoutes.js";
import {connectToServer} from "./mongo.js";



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

const contactSchema = {
    email: String,
    query: String,
};

// const Contact = mongoose.model("Contact", contactSchema);

app.use(cors())

/*
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 */

/*
const server = https.createServer(options, app).listen(port, function () {
    console.log("Express server listening on port " + port);
});
 */

export const database = {
    users: [],
    data: data
}


app.use('/movie', movieRoutes)

app.use('/user', usersRoutes)

app.use('/comment', commentRoutes)

connectToServer(() => {
    console.log("ok")
})

app.listen(port)
