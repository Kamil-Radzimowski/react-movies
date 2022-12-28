import React from "react";
import movie_logo from "../assets/the-movie-db-logo.svg";
import {useNavigate} from "react-router-dom";
import NotificationSender from "./NotificationSender";
import AdminMovieList from "./movie/AdminMovieList";
import './styleAdmin.scss';
import AdminUsersList from "./users/AdminUserList";
import AdminNewsList from "./news/AdminNewsList";
import Cookies from 'js-cookie'

function AdminPanel() {
    const user = Cookies.get("username")
    const navigate = useNavigate()

    function navigateToMainPage() {
        navigate('/')
    }

    return <>
        <div className="Page">
            <div className="page-nav">
                <img src={movie_logo} onClick={() => {navigateToMainPage()}} alt='movie database logo'/>
                <div className="page-nav-title">{`Witaj ${user}`}</div>
            </div>
            <div className="page-content">
                <NotificationSender></NotificationSender>
                <AdminMovieList></AdminMovieList>
                <AdminUsersList></AdminUsersList>
                <AdminNewsList></AdminNewsList>
            </div>
        </div>
    </>
}

export default AdminPanel