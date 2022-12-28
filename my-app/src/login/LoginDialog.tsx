import React, {useState} from "react";
import {
    Alert,
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {useLoginMutation} from "../Util/MovieService";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Cookies from 'js-cookie'


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
    const [login, {isLoading, error, isError, isSuccess}] = useLoginMutation()

    async function attemptLogin(){
        if(validateInput()){
            const result = await login({email: email, password: password})
            if("data" in result){
                Cookies.set("username", result.data.username)
                Cookies.set("isAdmin", result.data.isAdmin)
                handleClose()
            }
        }
    }

    function validateInput(){
        let tmpEmailError: string
        if(email.length === 0){
            tmpEmailError = "Email is required!"
        }
        else if(!validateEmail(email)){
            tmpEmailError = "Invalid Email!"
        } else {
            tmpEmailError = ''
        }
        setEmailError(tmpEmailError)

        let tmpPasswordError = ''
        if(password.length === 0){
            tmpPasswordError = 'Password is required!'
        }
        setPasswordError(tmpPasswordError)
        return tmpPasswordError.length === 0 && tmpEmailError.length === 0
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

    const handleError = (error: SerializedError | undefined | FetchBaseQueryError): string => {
        if(error){
            if('status' in error){
                return 'error' in error ? error.error : JSON.stringify(error.data)
            } else {
                return error.message || ""
            }
        } else {
            return ""
        }
    }

    const handleSuccess = () => {
        return "Zalogowano pomyślnie"
    }

    return <><Dialog open={props.open} onClose={handleClose} fullWidth={true}
                   maxWidth={'md'}>
        <DialogTitle>Zaloguj się
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <Collapse in={isError || isSuccess}>
                    <Alert
                        severity={isSuccess ? 'success' : 'error'}
                        sx={{ mb: 2 }}
                    >
                        {isSuccess ? handleSuccess() : handleError(error)}
                    </Alert>
                </Collapse>
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
    </>
}

export default LoginDialog;