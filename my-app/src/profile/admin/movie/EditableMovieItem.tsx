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

type EditableMovieItemProps = {
    movie: detailedMovie
}

const EditableMovieItem = (props: EditableMovieItemProps) => {
    const [title, setTitle] = useState(props.movie.title)
    const [desc, setDesc] = useState(props.movie.overview)
    const [genres, setGenre] = useState(props.movie.genres)

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(event.target.value)
    }

    const handleGenresChange = (genres: string[]) => {
        setGenre(genres)
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
                <Button>Zmień</Button>
                <IconButton>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    </>
}


export default EditableMovieItem