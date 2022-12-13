import React from "react";
import movie_logo from "../assets/the-movie-db-logo.svg";
import {useNavigate} from "react-router-dom";
import NotificationSender from "./NotificationSender";

function AdminPanel() {
    const navigate = useNavigate()

    function navigateToMainPage() {
        navigate('/')
    }

    return <>
        <div className="Page">
            <div className="page-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                <div className="page-nav-title">{`Witaj ${'Admin'}`}</div>
            </div>
            <div className="page-content">
                <NotificationSender></NotificationSender>
            </div>
        </div>
    </>
}

export default AdminPanel