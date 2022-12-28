import React from 'react'
import {Stack, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import Cookies from 'js-cookie'
import './styleLoggedInNavBarItem.scss'
import {useNavigate} from "react-router-dom";

function LoggedInNavBarItem(){
    const navigate = useNavigate()

    const user = Cookies.get("username")

    const handleUserNameClick = () => {
       navigate("/profile")
    }

    return <Stack onClick={handleUserNameClick} className="nav-user" direction='row' spacing={2}>
        <Typography>{`Witaj, ${user}!`}</Typography>
        <AccountCircle></AccountCircle>
    </Stack>
}

export default LoggedInNavBarItem