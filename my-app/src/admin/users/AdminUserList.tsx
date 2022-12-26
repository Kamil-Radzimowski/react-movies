import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const AdminUsersList = () => {
    const [isUsersListOpen, setIsUsersListOpen] = useState(false)

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
                <List>
                </List>
            </Collapse>
        </List>
    </>
}

export default AdminUsersList