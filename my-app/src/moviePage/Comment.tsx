import React from "react";
import {Avatar, Card, CardContent, CardHeader} from "@mui/material";

type commentProps = {
    id: string | undefined
    name: string
    text: string
}

const Comment = (props: commentProps) => {
    return <>
        <Card>
            <CardHeader>
                avatar={
                <Avatar aria-label="recipe">
                    {props.name}
                </Avatar>
            }
            </CardHeader>
            <CardContent>
                {props.text}
            </CardContent>
        </Card>
    </>
}

export default Comment
