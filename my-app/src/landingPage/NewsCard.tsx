import React from "react";
import {Card, CardContent, CardHeader, Typography} from "@mui/material";

type newsCardProps = {
    title: string,
    desc: string,
    date: string
}

const NewsCard = (props: newsCardProps) => {
    return <>
        <Card sx={{ml: 5, mr: 5, mt: 2, mb: 2}}>
            <CardHeader title={props.title} subheader={props.date}>
            </CardHeader>
            <CardContent>
                <Typography>{props.desc}</Typography>
            </CardContent>
        </Card>
    </>
}

export default NewsCard