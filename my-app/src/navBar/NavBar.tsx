import React, {useEffect, useState} from 'react'
import movie_logo from "../assets/the-movie-db-logo.svg";
import NotLoggedInNavBarItem from "./navBar/NotLoggedInNavBarItem";
import LoggedInNavBarItem from "./navBar/LoggedInNavBarItem";
import {useNavigate} from "react-router-dom";
import './styleNavBar.scss'
import {getClient} from "../Util/WebSocket";
import {Snackbar} from "@mui/material";

type NavBarProps = {
    text: string
    user: string | undefined
    callback: () => void
}

const NavBar = (props: NavBarProps) => {
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const client = getClient()

        client.onmessage = (message) => {
            const obj = JSON.parse(message.data)
            if(obj.type === "NOTIFICATION"){
                console.log(obj)
                const message: string = obj.message
                console.log(message)
                setMessage(message)
                setNotificationOpen(true)
            }
        };
    }, [])

    function navigateToMainPage() {
        navigate('/')
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotificationOpen(false);
        setMessage("")
    };

    return <header className="App-header">
        <div className="Header-left">
            <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
            <div>{props.text}</div>
        </div>
        {props.user === undefined ? <NotLoggedInNavBarItem callback={props.callback}></NotLoggedInNavBarItem> : <LoggedInNavBarItem></LoggedInNavBarItem>}
        <Snackbar
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
        />
    </header>
}

export default NavBar