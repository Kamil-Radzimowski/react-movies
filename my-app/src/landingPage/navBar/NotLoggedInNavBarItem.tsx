import React, {useState} from 'react'
import LoginDialog from "../../login/LoginDialog";
import RegisterDialog from "../../login/RegisterDialog";
import {Button, Stack} from "@mui/material";

type NotLoggedInNavBarItemProps = {
    callback: () => void,
}


function NotLoggedInNavBarItem(props: NotLoggedInNavBarItemProps){
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
    const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

    function openLoginDialog(){
        closeRegisterDialog()
        setIsLoginDialogOpen(true)
    }

    function closeLoginDialog(){
        setIsLoginDialogOpen(false)
        console.log("callback bar")
        props.callback
    }

    function closeRegisterDialog(){
        setIsRegisterDialogOpen(false)
        props.callback
    }

    function openRegisterDialog(){
        closeLoginDialog()
        setIsRegisterDialogOpen(true)
    }

    return <>
        <Stack direction='row' spacing={1}>
            <Button variant="outlined" onClick={openRegisterDialog}>Zarejestruj się</Button>
            <Button variant='contained' onClick={openLoginDialog}>Zaloguj się</Button>
        </Stack>
        <LoginDialog open={isLoginDialogOpen} onClose={closeLoginDialog} onRegisterClick={openRegisterDialog}></LoginDialog>
        <RegisterDialog open={isRegisterDialogOpen} onClose={closeRegisterDialog} onLoginClick={openLoginDialog}></RegisterDialog>
    </>
}

export default NotLoggedInNavBarItem