import React from 'react'
import {Avatar, Card, CardContent, CardHeader, Grid, TextField} from "@mui/material";
import './Message.scss'

type messageProps = {
    user: string,
    message: string
}

export const IncomingMessage = (props: messageProps) => {
    return <>
        <Card sx={{m: 2}} className="incoming">
            <CardHeader
                title={
                    props.user
                }
                avatar={
                    <Avatar aria-label="recipe">
                        {props.user.charAt(0)}
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
                    <TextField value={props.message} disabled={true}/>
                </Grid>
            </CardContent>
        </Card>
    </>
}

export const MyMessage = (props: messageProps) => {
    return <>
        <Card sx={{m: 2}} className="sent">
            <CardHeader
                title={
                    props.user
                }
                avatar={
                    <Avatar aria-label="recipe">
                        {props.user.charAt(0)}
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
                    <TextField value={props.message} disabled={true}/>
                </Grid>
            </CardContent>
        </Card>
    </>
}

