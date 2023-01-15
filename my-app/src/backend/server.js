import express from 'express'
import data from "./backendAssets/data.json" assert { type: "json" }
import cors from 'cors'
import movieRoutes from "./routes/movies/movieRoutes.js";
import usersRoutes from "./routes/user/usersRoutes.js";
import commentRoutes from "./routes/comments/commentRoutes.js";
import newsRoutes from "./routes/news/newsRoutes.js";
import {connectToServer} from "./mongo.js";
import {WebSocketServer} from "ws";
import {sendNotification} from "./websocket/notifiactions/wsNotifications.js";

const options = {}

const app = express()
const port = 3000
const wsport = 8080

app.use(cors())

/*
const options = {
    key: fs.readFileSync('./ssl/privatekey'),
    cert: fs.readFileSync('./ssl/certificate'),
    passphrase: 'kamil'
};
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

//initialize the WebSocket server instance
export const wss = new WebSocketServer({ port:  wsport});
export let socket

wss.on('connection', (ws) => {
    socket = ws
    console.log("connection")

    ws.on('message', (message) => {

        console.log('received: %s', message.toString());

        try{
            const obj = JSON.parse(message.toString())

            if(obj.type === 'NOTIFICATION'){
                sendNotification(obj.message)
            }
        } catch (e) {
            // pass
        }
    });
});