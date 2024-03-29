import React, {useState} from 'react'
import {Autocomplete, Button, Card, CardActions, CardContent, CardHeader, Chip, Stack, TextField} from "@mui/material";
import {sendMovieToBackend} from "../../../apiEndpoints/SendMovieToBackend";
import theme from "../../../Util/theme";

const AddNewMovie = () => {

    const [selectedFile, setSelectedFile] = useState<File>();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [genres, setGenres] = useState<string[]>([])

    const [titleError, setTitleError] = useState("")
    const [descError, setDescError] = useState("")
    const [genresError, setGenresError] = useState("")

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const handleGenresChange = (genres: string[]) => {
        setGenres(genres)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files != null){
            setSelectedFile(event.target.files[0])
        }
    }

    const validate = () => {
        let wasErrorFound = false

        if(title != ''){
            setTitleError('')
        } else {
            wasErrorFound = true
            setTitleError('Tytuł nie może być pusty!')
        }

        if(desc != ''){
            setDescError('')
        } else {
            wasErrorFound = true
            setDescError('Opis nie może być pusty!')
        }

        if (genres.length != 0){
            setGenresError('')
        } else {
            wasErrorFound = true
            setGenresError('Gatunek nie może być pusty!')
        }

        return wasErrorFound
    }

    const submitNewMovie = () => {
        if(validate() && selectedFile != undefined){
            const formData = new FormData()
            formData.append("image", selectedFile)
            sendMovieToBackend(title, desc, genres, formData)
        }
    }

    return <Card>
        <CardHeader title="Dodaj nowy film">
        </CardHeader>
        <CardContent>
            <Stack spacing={2}>
                <TextField
                    error={titleError.length !== 0}
                    margin="dense"
                    id="Tytuł"
                    label="Tytuł"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    helperText={titleError}
                />
                <TextField
                    error={descError.length !== 0}
                    margin="dense"
                    id="desc"
                    label="Opis"
                    type="text"
                    value={desc}
                    onChange={handleDesc}
                    helperText={
                        descError
                    }
                />
                <Autocomplete
                    sx={{mb: 2}}
                    multiple
                    fullWidth
                    value={genres}
                    id="tags-filled"
                    options={["Horror", "Akcja", "Fabularny"]}
                    defaultValue={["Horror"]}
                    freeSolo
                    onChange={(event, newValue) => {
                        handleGenresChange(newValue)
                    }
                    }
                    renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                            // eslint-disable-next-line react/jsx-key
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Gatunki"
                            placeholder="Gatunek"
                        />
                    )}
                />
                <input type='file' name="image" onChange={handleFileChange}/>
            </Stack>
        </CardContent>
        <CardActions>
            <Button variant='contained' onClick={submitNewMovie}>Dodaj</Button>
        </CardActions>
    </Card>
}

export default AddNewMovie