import React, {useState} from "react";
import {Autocomplete, Button, Chip, Divider, IconButton, ListItem, Stack, TextField} from "@mui/material";
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
        <Stack sx={{margin: 2, mb: 4, mt: 4}} spacing={2}>
            <TextField fullWidth label='Tytuł' value={title} onChange={handleTitleChange}></TextField>
            <TextField fullWidth label='Opis' value={desc} onChange={handleDescChange}></TextField>
            <Autocomplete
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
            <Button>Zmień</Button>
            <IconButton>
                <Delete/>
            </IconButton>
            <Divider/>
        </Stack>
    </>
}


export default EditableMovieItem