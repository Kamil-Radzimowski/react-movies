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
import {useRegisterMutation} from "../Util/MovieService";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import Cookies from 'js-cookie'

type property = {
    open: boolean
    onClose: () => void
    onLoginClick: () => void
}

function RegisterDialog(props: property){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [register, {data, isLoading, error, isError, isSuccess}] = useRegisterMutation()


    const validate = () => {
        return true
    }

    const attemptRegister = async () => {
        if(validate()){
            const result = await register({password: password, email: email, name: name})
            if("data" in result){
                Cookies.set("username", result.data.username)
                Cookies.set("isAdmin", result.data.isAdmin)
                handleClose()
            }
        }
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleOnLoginClick = () => {
        props.onLoginClick
    }

    const handleClose = () => {
        props.onClose()
        setPassword('')
        setEmail('')
        setPasswordError('')
        setEmailError('')
        setName('')
        setNameError('')
    }

    const handleError = (error: SerializedError | undefined | FetchBaseQueryError): string => {
        if(error){
            if('status' in error){
                if(error.status == 409) {
                    return "User already exists"
                } else {
                    return 'error' in error ? error.error : JSON.stringify(error.data)
                }
            } else {
                if(error.code == "409"){
                    return "User already exists"
                }
                else {
                    return error.message || ""
                }
            }
        } else {
            return ""
        }
    }

    const handleSuccess = (): string => {
        return "Zarejestrowano pomyślnie"
    }

    return <Dialog open={props.open} onClose={handleClose} fullWidth={true}
                   maxWidth={'md'}>
        <DialogTitle>Zarejestruj się</DialogTitle>
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
                    error={nameError.length !== 0}
                    margin="dense"
                    id="name"
                    label="Nazwa użytkownika"
                    type="text"
                    value={name}
                    onChange={handleName}
                    helperText={nameError}
                />
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
            <Button variant="outlined" onClick={handleOnLoginClick}>Zaloguj się</Button>
            <Button variant="contained" onClick={attemptRegister}>Zarejestruj się</Button>
        </DialogActions>
    </Dialog>
}

export default RegisterDialog