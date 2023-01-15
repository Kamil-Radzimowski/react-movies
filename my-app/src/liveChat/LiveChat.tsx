import React, {useEffect, useState} from 'react'
import mqtt, {MqttClient} from 'precompiled-mqtt'
import NavBar from "../navBar/NavBar";
import Cookies from 'js-cookie'
import {message} from "../Util/types";
import {IncomingMessage, MyMessage} from "./Message";
import './LiveChat.scss'
import ChatInput from "./ChatInput";
import {Box, Container, Paper} from "@mui/material";
import uuid from 'react-uuid';

const Messages = () => {
    const [messages, setMessages] = useState<message[]>([{id: 'aeasf', user: "Anonim", message: "Czesc"}, {id: 'asfava', user: "DzikiOwoc15", message: "witam"}])
    const [user, setUser] = useState(Cookies.get('username'))
    const [mqttClient, setClient] = useState<MqttClient>()

    useEffect(() => {
        const client = mqtt.connect('wss://9696373cb8f042bd8d8bd372f2fb5373.s2.eu.hivemq.cloud:8884/mqtt',{
            protocol: 'wss',
            username: 'Testing',
            password: 'Testing1'
        })
        client.on('connect', function(){
            console.log('ok')
            client.subscribe('chat')
        })
        client.on('error', (err) => {
            console.log('Connection error: ', err)
            client.end()
        })

        client.on('message', function (topic, message) {
            console.log(topic)
            if(topic == 'chat'){
                const obj = JSON.parse(message.toString())
                setMessages(oldArray => [...oldArray, obj].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i));
            }
        })
        setClient(client)
    }, [])

    const sendMessage = (text: string) => {
        const obj = {
            id: uuid(),
            user: user,
            message: text
        }
        if(mqttClient){
            console.log('sent')
            mqttClient.publish('chat', JSON.stringify(obj))
        }
    }

    return <>
        <div className='messages'>
        {messages?.map((message) => {
            if(user === message.user){
                return <MyMessage key={message.id} user={message.user} message={message.message}/>
            } else {
                return <IncomingMessage key={message.id} user={message.user} message={message.message}/>
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