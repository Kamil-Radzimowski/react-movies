import React, {useEffect, useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useGetAllUsersQuery} from "../../../apiEndpoints/UserEndpoints";
import EditableUserItem from "./EditableUserItem";
import {user} from "../../../Util/types";
import Cookies from 'js-cookie'

const AdminUsersList = () => {
    const [users, setUsers] = useState<user[] | undefined>(undefined)
    const [isUsersListOpen, setIsUsersListOpen] = useState(false)

    const currentUser = Cookies.get("username")

    const {data, isLoading} = useGetAllUsersQuery()

    useEffect(() => {
        setUsers(data?.filter((user) => {return user.username != currentUser}))
    }, [data])

    const handleUsersListClick = () => {
        setIsUsersListOpen(!isUsersListOpen)
    }

    const filterUserListAfterRemoval = (id: string) => {
        const updatedUserList = users?.filter((user) => {return user.id != id})
        setUsers(updatedUserList)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleUsersListClick}>
                <ListItemText primary="Użytkownicy" />
                {isUsersListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isUsersListOpen}>
                {!isLoading && users != undefined ? users.map((user) => {
                    return <EditableUserItem key={user.id} removalCallback={filterUserListAfterRemoval} user={user}/>
                }) : null}
            </Collapse>
        </List>
    </>
}

export default AdminUsersList