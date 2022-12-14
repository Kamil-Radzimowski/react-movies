import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import mqtt from 'mqtt/dist/mqtt'

const options = {
    // Clean session
    clean: true,
    // Auth
    clientId: 'NuWw7',
}


function NotificationSender() {
    const [text, setText] = useState('')
    let client;

    useEffect(() => {
        client  = mqtt.connect('mqtt://localhost:1883', options)
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const sendNotification = () => {
        client.publish("notification", text)
    }

    return <>
        <Card>
            <CardHeader title={"Wyślij Powiadomienie"}>
            </CardHeader>
            <CardContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="text"
                    label="Tekst"
                    type="text"
                    value={text}
                    onChange={handleChange}
                    ></TextField>
            </CardContent>
            <CardActions>
                <Button onClick={sendNotification}>Wyślij</Button>
            </CardActions>
        </Card>
    </>
}

export default NotificationSender