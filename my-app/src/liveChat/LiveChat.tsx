import React, {useEffect, useState} from 'react'
import mqtt, {MqttClient} from 'precompiled-mqtt'
import NavBar from "../navBar/NavBar";
import Cookies from 'js-cookie'
import {message} from "../Util/types";
import {IncomingMessage, MyMessage} from "./Message";
import './LiveChat.scss'
import ChatInput from "./ChatInput";
import {Box, Container, Paper} from "@mui/material";

const Messages = () => {
    const [messages, setMessages] = useState<message[]>([{user: "Anonim", message: "Czesc"}, {user: "DzikiOwoc15", message: "witam"}])
    const [user, setUser] = useState(Cookies.get('username'))
    const [mqttClient, setClient] = useState<MqttClient>()

    useEffect(() => {
        const client = mqtt.connect('ws://127.0.0.1:8080')
        client.on('message', function (topic, message) {
            if(topic == 'chat'){
                console.log(message.toString())
            }
        })
        setClient(client)
    }, [])

    const sendMessage = (text: string) => {
        const obj = {
            user: user,
            message: text
        }
        mqttClient?.publish('chat', JSON.stringify(obj))
    }

    return <>
        <div className='messages'>
        {messages?.map((message) => {
            if(user === message.user){
                return <MyMessage user={message.user} message={message.message}/>
            } else {
                return <IncomingMessage user={message.user} message={message.message}/>
            }
        })}
        </div>
        <Paper sx={{position: 'fixed', bottom: 0, width: 1}} >
            <ChatInput callback={sendMessage} />
        </Paper>
    </>
}

const LiveChat = () => {
    const [user, setUser] = useState(Cookies.get('username'))

    const loginCallback = () => {
        setUser(Cookies.get('username'))
    }

    return <>
        <NavBar text='Czat na żywo!' user={user} callback={loginCallback}></NavBar>
        <Messages/>
    </>
}

export default LiveChat