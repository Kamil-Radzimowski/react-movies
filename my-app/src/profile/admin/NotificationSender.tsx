import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {getClient} from "../../Util/WebSocket";

function NotificationSender() {
    const [text, setText] = useState('')
    const [textError, setTextError] = useState('')
    let client = getClient()

    useEffect(() => {
        client  = getClient()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const sendNotification = () => {
        if(text === ''){
            setTextError("Wiadomość nie może być pusta!")
        } else {
            setTextError("")
            if(client != undefined){
                console.log("sent")
                client.send(text)
            } else {
                console.log(client)
            }
        }
    }

    return <>
        <Card>
            <CardHeader title={"Wyślij Powiadomienie"}>
            </CardHeader>
            <CardContent>
                <TextField
                    error={textError !== ''}
                    helperText={textError}
                    fullWidth
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