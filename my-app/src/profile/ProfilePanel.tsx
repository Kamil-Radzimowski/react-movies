import React from "react";
import Cookies from 'js-cookie'
import AdminPanel from "./admin/AdminPanel";
import UserPanel from "./user/UserPanel";

const ProfilePanel = () => {
    const isAdmin = Cookies.get("isAdmin") || false

    return <>{isAdmin ? <AdminPanel/> : <UserPanel/>}</>
}

export default ProfilePanel