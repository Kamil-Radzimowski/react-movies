import React, {useState} from "react";
import NavBar from "../../navBar/NavBar";
import Cookies from 'js-cookie'
import LogoutComponent from "../LogoutComponent";


const UserPanel = () => {
    const [user, setUser] = useState(Cookies.get("username"))

    const handleNavBarChange = () => {
        //pass
    }

    return <>
        <NavBar text={"Panel"} user={user} callback={handleNavBarChange}></NavBar>
        <LogoutComponent></LogoutComponent>
    </>
}

export default UserPanel