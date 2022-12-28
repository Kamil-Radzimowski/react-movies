import React from 'react'
import {Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Cookies from 'js-cookie'

function LoggedInNavBarItem(){

    const user = Cookies.get("username")

    return <Stack direction='row' spacing={2}>
        <Typography>{`Witaj, ${user}!`}</Typography>
        <AccountCircle></AccountCircle>
    </Stack>
}

export default LoggedInNavBarItem