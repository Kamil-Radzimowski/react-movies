import {wss} from "../../server.js";
import WebSocket from 'ws';


export const notifyCommentAdded = (comment) => {
    const wrapper = {
        type: "COMMENT",
        comment: comment
    }

    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(wrapper))
        }
    })
}