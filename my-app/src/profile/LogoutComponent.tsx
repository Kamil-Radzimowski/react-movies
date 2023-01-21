import React from 'react'
import {Button, Grid} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";


const LogoutComponent = () => {
    const navigate = useNavigate()

    const Logout = () => {
        Cookies.remove("username")
        Cookies.remove("isAdmin")
        navigate('/')
    }

    return <Grid sx={{justifyContent: "end"}}>
        <Button onClick={Logout} variant="outlined" endIcon={<LogoutIcon />}>
            Wyloguj
        </Button>
    </Grid>
}

export default LogoutComponent