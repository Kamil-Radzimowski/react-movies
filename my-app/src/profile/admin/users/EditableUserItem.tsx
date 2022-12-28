import React from "react";
import {user} from "../../../Util/types";
import {Button, Divider, FormControlLabel, FormGroup, Stack, Switch, TextField} from "@mui/material";
import {useDeleteUserMutation, useUpdateUserIsAdminMutation} from "../../../Util/MovieService";

type EditableUserItemProps = {
    user: user
}

const EditableUserItem = (props: EditableUserItemProps) => {
    const [checked, setChecked] = React.useState(props.user.isAdmin);

    const [update] = useUpdateUserIsAdminMutation()
    const [ban] = useDeleteUserMutation()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        update({id: props.user.id, isAdmin: event.target.checked})
    };

    const banUser = () => {
        ban(props.user.id)
    }

    return <>
        <Stack sx={{margin: 2, mb: 4, mt: 4}} spacing={2}>
            <TextField disabled fullWidth label='Nazwa użytkownika' value={props.user.username}/>
            <FormGroup>
                <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>} label="Prawa Administratora" />
            </FormGroup>
            <Button variant='outlined' onClick={banUser}>Zbanuj</Button>
            <Divider/>
        </Stack>
    </>
}

export default EditableUserItem