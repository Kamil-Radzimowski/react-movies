import {wss} from "../../server.js";
import WebSocket from "ws";

export const notifyNewsAdded = (news) => {
    const wrapper = {
        type: "NEWS",
        news: news
    }

    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(wrapper))
        }
    })
}