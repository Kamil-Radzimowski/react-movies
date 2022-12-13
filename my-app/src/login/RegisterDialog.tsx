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
import {useLoginMutation, useRegisterMutation} from "../Util/MovieService";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

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
    const [register, {isLoading, error, isError}] = useRegisterMutation()


    const validate = () => {
        return true
    }

    const attemptRegister = () => {
        if(validate()){
            register({password: password, email: email, name: name})
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

    const handleError = (error: SerializedError | undefined | FetchBaseQueryError): String => {
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

    return <Dialog open={props.open} onClose={handleClose} fullWidth={true}
                   maxWidth={'md'}>
        <DialogTitle>Zarejestruj się</DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <Collapse in={isError}>
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {handleError(error)}
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