import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

type property = {
    open: boolean
    onClose: () => void
    onRegisterClick: () => void
}

function LoginDialog(props: property){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    function attemptLogin(){
        if(validateInput()){
            // test
        }
    }

    function validateInput(){
        if(email.length === 0){
            setEmailError("Email is required!")
        }
        else if(!validateEmail(email)){
            setEmailError("Invalid Email!")
        } else {
            setEmailError("")
        }

        if(password.length === 0){
            setPasswordError('Password is required!')
        }
        return passwordError.length === 0 && emailError.length === 0
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleClose = () => {
        props.onClose()
        setPassword('')
        setEmail('')
        setPasswordError('')
        setEmailError('')
    }

    const handleOnRegisterClick = () => {
        props.onRegisterClick()
    }
    return <Dialog open={props.open} onClose={handleClose} fullWidth={true}
                   maxWidth={'md'}>
        <DialogTitle>Zaloguj się</DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <TextField
                    autoFocus
                    error={emailError.length !== 0}
                    margin="dense"
                    id="email"
                    label="Adres email"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    helperText={emailError}
                />
                <TextField
                    autoFocus
                    error={passwordError.length !== 0}
                    margin="dense"
                    id="password"
                    label="Hasło"
                    type="password"
                    value={password}
                    onChange={handlePassword}
                    helperText={passwordError}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleOnRegisterClick}>Zarejestruj się</Button>
            <Button variant="contained" onClick={attemptLogin}>Zaloguj się</Button>
        </DialogActions>
    </Dialog>
}

export default LoginDialog;