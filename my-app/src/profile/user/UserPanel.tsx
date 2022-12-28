import React, {useState} from "react";
import NavBar from "../../navBar/NavBar";
import Cookies from 'js-cookie'


const UserPanel = () => {
    const [user, setUser] = useState(Cookies.get("username"))

    const handleNavBarChange = () => {
        //pass
    }

    return <>
        <NavBar text={"Panel"} user={user} callback={handleNavBarChange}></NavBar>
    </>
}

export default UserPanel