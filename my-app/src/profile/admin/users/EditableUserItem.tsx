import React from "react";
import {user} from "../../../Util/types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControlLabel,
    FormGroup,
    Switch,
    TextField
} from "@mui/material";
import {useDeleteUserMutation, useUpdateUserIsAdminMutation} from "../../../apiEndpoints/UserEndpoints";

type EditableUserItemProps = {
    user: user,
    removalCallback: (id: string) => void
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
        props.removalCallback(props.user.id)
    }

    return <>
        <Card sx={{ml: 5, mr: 5, mt: 2, mb: 2}}>
            <CardContent>
                <TextField sx={{mb: 2}} disabled fullWidth label='Nazwa użytkownika' value={props.user.username}/>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>} label="Prawa Administratora" />
                </FormGroup>
            </CardContent>
            <CardActions>
                <Button variant='outlined' onClick={banUser}>Zbanuj</Button>
            </CardActions>
        </Card>
    </>
}

export default EditableUserItem