import React, {useState} from 'react'
import {news} from "../../../Util/types";
import {Button, Card, CardActions, CardContent, IconButton, TextField} from "@mui/material";
import {useDeleteNewsMutation, useUpdateNewsMutation} from "../../../apiEndpoints/NewsEndpoints";
import {Delete} from "@mui/icons-material";

type EditableNewsItemProps = {
    news: news,
    removeCallback: (id: string) => void
}

const EditableNewsItem = (props: EditableNewsItemProps) => {
    const [change] = useUpdateNewsMutation()
    const [newsDeletion] = useDeleteNewsMutation()
    const [title, setTitle] = useState(props.news.title)
    const [desc, setDesc] = useState(props.news.desc)

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const changeNews = () => {
        change({id: props.news._id, title: title, desc: desc})
    }

    const deleteNews = () => {
        console.log(props.news._id)
        newsDeletion({id: props.news._id})
        props.removeCallback(props.news._id)
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