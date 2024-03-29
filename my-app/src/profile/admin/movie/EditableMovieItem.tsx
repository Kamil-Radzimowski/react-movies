import React, {useState} from "react";
import {
    Autocomplete,
    Button,
    Card, CardActions,
    CardContent,
    Chip,
    Divider,
    IconButton,
    ListItem,
    Stack,
    TextField
} from "@mui/material";
import {detailedMovie} from "../../../Util/types";
import {Delete} from "@mui/icons-material";
import {useDeleteMovieMutation, useUpdateMovieMutation} from "../../../apiEndpoints/MovieEndpoints";

type EditableMovieItemProps = {
    movie: detailedMovie,
    deleteCallback: (id: number) => void
}

const EditableMovieItem = (props: EditableMovieItemProps) => {
    const [title, setTitle] = useState(props.movie.title)
    const [desc, setDesc] = useState(props.movie.overview)
    const [genres, setGenre] = useState(props.movie.genres)

    const [apply] = useUpdateMovieMutation()
    const [deleteMovie] = useDeleteMovieMutation()

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const handleGenresChange = (genres: string[]) => {
        setGenre(genres)
    }

    const applyChanges = () => {
        const update = {id: props.movie.id, title: title, desc:desc, genres: genres}
        console.log(update)
        apply(update)
    }

    const handleDelete = () => {
        deleteMovie({id: props.movie.id})
        props.deleteCallback(props.movie.id)
    }

    return <>
        <Card sx={{margin: 2, mb: 4, mt: 4}} >
            <CardContent>
                <TextField sx={{mb: 2}} fullWidth label='Tytuł' value={title} onChange={handleTitleChange}></TextField>
                <TextField sx={{mb: 2}} fullWidth label='Opis' value={desc} onChange={handleDescChange}></TextField>
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
            </CardContent>
            <CardActions>
                <Button onClick={applyChanges}>Zmień</Button>
                <IconButton onClick={handleDelete}>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    </>
}


export default EditableMovieItem