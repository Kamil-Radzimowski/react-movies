import express from 'express'
import data from "./backendAssets/data.json" assert { type: "json" }
import cors from 'cors'
import movieRoutes from "./routes/movies/movieRoutes.js";
import usersRoutes from "./routes/user/usersRoutes.js";
import commentRoutes from "./routes/comments/commentRoutes.js";
import newsRoutes from "./routes/news/newsRoutes.js";
import {connectToServer} from "./mongo.js";
import multer from "multer";
import bodyParser from "body-parser";
/*
const options = {
    key: fs.readFileSync('./ssl/privatekey'),
    cert: fs.readFileSync('./ssl/certificate'),
    passphrase: 'kamil'
};
 */

import http from "http";
import WebSocket, {WebSocketServer} from "ws";

const options = {}

const app = express()
const port = 3000
const wsport = 8080

const contactSchema = {
    email: String,
    query: String,
};

const upload = multer()

// const Contact = mongoose.model("Contact", contactSchema);

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array())
app.use(express.static('public'));


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

app.use('/news', newsRoutes)

connectToServer(() => {
    console.log("ok")
})

app.listen(port)

const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocketServer({ port:  wsport});

wss.on('connection', (ws) => {

    console.log("connection")
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});