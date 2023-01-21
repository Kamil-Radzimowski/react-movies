import React from 'react'
import {comment, groupedComments} from "../../../Util/types";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    TextField
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDeleteCommentMutation} from "../../../apiEndpoints/CommentEndpoints";

type EditableCommentItemProps = {
    comment: comment,
    movieId: string,
    removeCallback: (id: string) => void
}

const EditableCommentItem = (props: EditableCommentItemProps) => {
    const [deleteCommentAction] = useDeleteCommentMutation()

    const deleteComment = () => {
        deleteCommentAction({id: props.movieId, commentId: props.comment.id})
        props.removeCallback(props.comment.id)
    }

    return <>
        <Card sx={{ml: 5, mr: 5, mt: 2, mb: 2}}>
            <CardHeader title={props.comment.user} avatar={<Avatar aria-label="recipe">
                {props.comment.user.charAt(0)}
            </Avatar>}/>
            <CardContent>
                <TextField sx={{mb: 2}} disabled fullWidth label='Komentarz' value={props.comment.comment}/>
            </CardContent>
            <CardActions>
                <IconButton onClick={deleteComment}>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    </>
}

export default EditableCommentItem