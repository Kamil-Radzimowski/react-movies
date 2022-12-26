import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import './styleAdminMovieList.scss';

const AdminMovieList = () => {
    const [isMovieListOpen, setIsMovieListOpen] = useState(false)

    const handleMovieListClick = () => {
        setIsMovieListOpen(!isMovieListOpen)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleMovieListClick}>
                <ListItemText primary="Filmy" />
                {isMovieListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isMovieListOpen}>
                <List>

                </List>
            </Collapse>
        </List>
    </>
}

export default AdminMovieList