import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

type property = {
    open: boolean
    onClose: () => void
}

function LoginDialog(props: property){
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    function validateInput(){
        // test
    }

    return <Dialog open={props.open} onClose={props.onClose} fullWidth={true}
                   maxWidth={'md'}>
        <DialogTitle>Zaloguj się</DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nazwa użytkownika"
                    helperText={nameError}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Adres email"
                    type="email"
                    helperText={emailError}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Hasło"
                    type="password"
                    helperText={passwordError}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="outlined">Zarejestruj się</Button>
            <Button variant="contained">Zaloguj się</Button>
        </DialogActions>
    </Dialog>
}

export default LoginDialog;