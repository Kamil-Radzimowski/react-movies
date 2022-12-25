import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {useAddCommentMutation} from "../Util/MovieService";

type addCommentProps = {
    id: string
}

const AddComment = (props: addCommentProps) => {

    const [comment, setComment] = useState('')
    const [addHook] = useAddCommentMutation()

    const add = () => {
        addHook({id: props.id, text: comment, user: undefined})
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    return <>
        <Card>
            <CardHeader title={"Dodaj komentarz"}>
            </CardHeader>
            <CardContent>
                <TextField fullWidth label="Treść" variant="outlined" value={comment} onChange={handleChange}/>
            </CardContent>
            <CardActions>
                <Button onClick={add}>{'Dodaj'}</Button>
            </CardActions>
        </Card>
    </>
}

export default AddComment