import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useGetAllUsersQuery} from "../../Util/MovieService";
import EditableUserItem from "./EditableUserItem";

const AdminUsersList = () => {
    const [isUsersListOpen, setIsUsersListOpen] = useState(false)

    const {data, isLoading} = useGetAllUsersQuery()

    const handleUsersListClick = () => {
        setIsUsersListOpen(!isUsersListOpen)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleUsersListClick}>
                <ListItemText primary="Użytkownicy" />
                {isUsersListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isUsersListOpen}>
                {!isLoading && data != undefined ? data.map((user) => {
                    return <EditableUserItem key={user.id} user={user}/>
                }) : null}
            </Collapse>
        </List>
    </>
}

export default AdminUsersList