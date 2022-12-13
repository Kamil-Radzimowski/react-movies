import {Button, Card, CardActions, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import React, {useState} from "react";


function NotificationSender() {
    const [text, setText] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const sendNotification = () => {

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