import React from 'react'
import {Icon, Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

type property = {

}

function LoggedInNavBarItem(props: unknown){

    const user = localStorage.getItem("user")

    return <Stack direction='row'>
        <Typography>{`Witaj, ${user}!`}</Typography>
        <AccountCircle></AccountCircle>
    </Stack>
}

export default LoggedInNavBarItem