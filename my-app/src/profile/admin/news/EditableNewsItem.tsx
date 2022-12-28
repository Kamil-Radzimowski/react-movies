import React, {useState} from 'react'
import {news} from "../../../Util/types";
import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {useDeleteNewsMutation, useDeleteUserMutation, useUpdateNewsMutation} from "../../../Util/MovieService";
import {Delete} from "@mui/icons-material";

const EditableNewsItem = (props: news) => {
    const [change] = useUpdateNewsMutation()
    const [newsDeletion] = useDeleteNewsMutation()
    const [title, setTitle] = useState(props.title)
    const [desc, setDesc] = useState(props.desc)

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const changeNews = () => {
        change({id: props.id, title: title, desc: desc})
    }

    const deleteNews = () => {
        newsDeletion({id: props.id})
    }

    return <>
        <Card sx={{ml: 5, mr: 5, mt: 2, mb: 2}}>
            <CardContent>
                <TextField sx={{mb: 2}} fullWidth label="Tytuł" value={title} onChange={handleTitleChange}></TextField>
                <TextField fullWidth label="Treść" value={desc} onChange={handleDescChange}></TextField>
            </CardContent>
            <CardActions>
                <Button onClick={changeNews}>Zmień</Button>
                <IconButton onClick={deleteNews}>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    </>
}

export default EditableNewsItem