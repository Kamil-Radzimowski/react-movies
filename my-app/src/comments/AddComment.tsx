import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {useAddCommentMutation} from "../apiEndpoints/CommentEndpoints";
import Cookies from 'js-cookie'
import {comment} from "../Util/types";
import uuid from 'react-uuid';


type addCommentProps = {
    id: string,
    onAdd: (comment: comment) => void
}


const AddComment = (props: addCommentProps) => {
    const user = Cookies.get("username")
    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [addHook] = useAddCommentMutation()

    const validate = () => {
        if(comment == ''){
            setError("Komentarz nie może być pusty")
            return false
        } else {
            setError('')
            return true
        }
    }

    const add = async () => {
        if(validate()){
            const query = await addHook({id: props.id, text: comment, user: user || undefined})
            if('error' in query){
                // pass
            } else {
                props.onAdd({id: uuid(), comment: comment, user: user})
                setComment("")
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    return <>
        <Card>
            <CardHeader title={"Dodaj komentarz"}>
            </CardHeader>
            <CardContent>
                <TextField helperText={error} error={error.length != 0} fullWidth label="Treść" variant="outlined" value={comment} onChange={handleChange}/>
            </CardContent>
            <CardActions>
                <Button onClick={add}>{'Dodaj'}</Button>
            </CardActions>
        </Card>
    </>
}

export default AddComment