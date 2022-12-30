import React from "react";
import {useNavigate} from "react-router-dom";
import NotificationSender from "./NotificationSender";
import AdminMovieList from "./movie/AdminMovieList";
import './styleAdmin.scss';
import AdminUsersList from "./users/AdminUserList";
import AdminNewsList from "./news/AdminNewsList";
import Cookies from 'js-cookie'
import NavBar from "../../navBar/NavBar";
import AdminCommentList from "./comments/AdminCommentList";
import AddNewMovie from "./movie/AddNewMovie";

function AdminPanel() {
    const user = Cookies.get("username")
    useNavigate();

    const handleNavBarChange = () => {
        // pass
    }

    return <>
        <div className="Page">
            <NavBar text={"Panel"} user={user} callback={handleNavBarChange}></NavBar>
            <div className="page-content">
                <NotificationSender></NotificationSender>
                <AdminMovieList></AdminMovieList>
                <AdminUsersList></AdminUsersList>
                <AdminNewsList></AdminNewsList>
                <AdminCommentList></AdminCommentList>
                <AddNewMovie></AddNewMovie>
            </div>
        </div>
    </>
}

export default AdminPanel