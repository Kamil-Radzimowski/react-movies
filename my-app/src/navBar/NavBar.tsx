import React from 'react'
import movie_logo from "../assets/the-movie-db-logo.svg";
import NotLoggedInNavBarItem from "./navBar/NotLoggedInNavBarItem";
import LoggedInNavBarItem from "./navBar/LoggedInNavBarItem";
import {useNavigate} from "react-router-dom";
import './styleNavBar.scss'

type NavBarProps = {
    text: string
    user: string | undefined
    callback: () => void
}

const NavBar = (props: NavBarProps) => {
    const navigate = useNavigate()

    function navigateToMainPage() {
        navigate('/')
    }

    return <header className="App-header">
        <div className="Header-left">
            <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
            <div>{props.text}</div>
        </div>
        {props.user === undefined ? <NotLoggedInNavBarItem callback={props.callback}></NotLoggedInNavBarItem> : <LoggedInNavBarItem></LoggedInNavBarItem>}
    </header>
}

export default NavBar