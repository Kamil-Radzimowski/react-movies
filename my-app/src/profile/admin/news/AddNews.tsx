import React, {useState} from 'react'
import {Button, Card, CardActions, CardContent, TextField} from "@mui/material";
import {useAddNewsMutation} from "../../../Util/MovieService";

const AddNews = () => {
    const [add] = useAddNewsMutation()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const addNews = () => {
        add({title: title, desc: desc})
        setDesc("")
        setTitle("")
    }

    return <>
        <Card>
            <CardContent>
                <TextField sx={{mb: 2}} label="Tytuł" fullWidth value={title} onChange={handleTitleChange}/>
                <TextField label="Treść" fullWidth value={desc} onChange={handleDescChange}/>
            </CardContent>
            <CardActions>
                <Button variant='contained' onClick={addNews}>Dodaj newsa</Button>
            </CardActions>
        </Card>

    </>
}

export default AddNews