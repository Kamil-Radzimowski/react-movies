import React, {useState} from "react";
import {Card, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import '../movie/styleAdminMovieList.scss';
import AddNews from "./AddNews";

const AdminNewsList = () => {
    const [isNewsListOpen, setIsNewsListOpen] = useState(false)

    const handleNewsListClick = () => {
        setIsNewsListOpen(!isNewsListOpen)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleNewsListClick}>
                <ListItemText primary="Newsy" />
                {isNewsListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isNewsListOpen}>
                <List>
                    <AddNews/>
                </List>
            </Collapse>
        </List>
    </>
}

export default AdminNewsList