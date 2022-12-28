import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import {useAddCommentMutation} from "../Util/MovieService";
import Cookies from 'js-cookie'


type addCommentProps = {
    id: string,
    onAdd: (comment: string) => void
}


const AddComment = (props: addCommentProps) => {
    const user = Cookies.get("username")
    const [comment, setComment] = useState('')
    const [addHook] = useAddCommentMutation()

    const add = async () => {
        const query = await addHook({id: props.id, text: comment, user: user || undefined})
        if('error' in query){
            console.log("error")
            // pass
        } else {
            props.onAdd(comment)
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
                <TextField fullWidth label="Treść" variant="outlined" value={comment} onChange={handleChange}/>
            </CardContent>
            <CardActions>
                <Button onClick={add}>{'Dodaj'}</Button>
            </CardActions>
        </Card>
    </>
}

export default AddComment