import React from "react";
import {Avatar, Card, CardContent, CardHeader} from "@mui/material";
import '../assets/styleComment.scss';

type commentProps = {
    id: string | undefined
    name: string
    text: string
}

const Comment = (props: commentProps) => {
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
                {props.text}
            </CardContent>
        </Card>
    </>
}

export default Comment
