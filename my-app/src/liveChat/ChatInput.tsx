import React, {useState} from 'react'
import {IconButton, Stack, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";

type ChatInputProps = {
    callback: (string) => void
}

const ChatInput = (props: ChatInputProps) => {
    const [text, setText] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    const sendMessage = () => {
        props.callback(text)
    }

    return <>
        <Stack sx={{m: 4}} direction='row' spacing={2}>
            <TextField value={text} onChange={handleChange} sx={{width: 1}}></TextField>
            <IconButton onClick={sendMessage}>
                <Send/>
            </IconButton>
        </Stack>
    </>
}

export default ChatInput