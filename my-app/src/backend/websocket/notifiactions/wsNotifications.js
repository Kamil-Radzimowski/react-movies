import {wss} from "../../server.js";
import WebSocket from "ws";

export const sendNotification = (message) => {
    const wrapper = {
        type: "NOTIFICATION",
        message: message
    }

    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(wrapper))
        }
    })
}