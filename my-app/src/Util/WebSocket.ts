import { w3cwebsocket as W3CWebSocket } from "websocket";

let client = undefined;

export const getClient = (): W3CWebSocket => {
    if(client === undefined){
        client = new W3CWebSocket('ws://127.0.0.1:8080');
    }
    return client
}