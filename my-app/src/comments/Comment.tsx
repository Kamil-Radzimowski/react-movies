import React, {useState} from "react";
import {Avatar, Card, CardContent, CardHeader, Grid, IconButton, TextField} from "@mui/material";
import './styleComment.scss';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {useUpdateMovieMutation} from "../apiEndpoints/MovieEndpoints";
import {useUpdateCommentMutation} from "../apiEndpoints/CommentEndpoints";

type commentProps = {
    movieId: string | undefined
    id: string | undefined
    name: string
    text: string,
    user: string
}

const Comment = (props: commentProps) => {
    const [isEditorOpen, setIsEditorOpen] = useState(false)
    const [text, setText] = useState(props.text)
    const [add] = useUpdateCommentMutation()

    const handleClick = () => {
        if(isEditorOpen){
            save()
        } else {
            openEditor()
        }
    }

    const openEditor = () => {
        setIsEditorOpen(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

     const save = () => {
         add({id: props.movieId || "", commentId: props.id || "", text: text})
         setIsEditorOpen(false)
     }

    return <>
        <Card className="comment">
            <CardHeader
                title={
                    props.name
                }
                avatar={
                <Avatar aria-label="recipe">
                    {props.name.charAt(0)}
                </Avatar>
            }>
            </CardHeader>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {isEditorOpen ? <TextField value={text} onChange={handleChange} label="Komentarz"/> : text}
                    {props.name === props.user ?  <IconButton onClick={handleClick}>
                        {isEditorOpen ? <CheckIcon /> : <EditIcon />}
                    </IconButton> : null}
                </Grid>
            </CardContent>
        </Card>
    </>
}

export default Comment
