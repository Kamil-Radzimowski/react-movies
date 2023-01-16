import React, {useState} from 'react'
import Cookies from 'js-cookie'
import NavBar from "../navBar/NavBar";
import {useGetLiveChatShortcutsQuery} from "../apiEndpoints/MovieEndpoints";
import {Box, Chip, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

const LiveChatSelector = () => {
    const [user, setUser] = useState(Cookies.get('username'))
    const {data} = useGetLiveChatShortcutsQuery()
    const navigate = useNavigate()

    const loginCallback = () => {
        setUser(Cookies.get('username'))
    }

    const chipClick = (name: string) => {
        navigate(`${name}`)
    }

    return <>
        <NavBar text={`Czat na żywo!`} user={user} callback={loginCallback}></NavBar>
        <Stack sx={{m: 2}} direction='row' spacing={2}>
            {data != undefined ? data.map((str) => {
                return <Chip key={str._id} label={str.title} onClick={() => {return chipClick(str._id)}}></Chip>
            }) : null}
        </Stack>
    </>
}

export default LiveChatSelector