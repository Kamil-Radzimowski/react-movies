import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import './styleAdminMovieList.scss';
import {useGetAllMoviesQuery} from "../../../apiEndpoints/MovieEndpoints";
import EditableMovieItem from "./EditableMovieItem";

const AdminMovieList = () => {
    const [isMovieListOpen, setIsMovieListOpen] = useState(false)

    const {data, isLoading} = useGetAllMoviesQuery()

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
                    {!isLoading && data != undefined ? data.map((movie) => {
                        return <EditableMovieItem key={movie.id} movie={movie}></EditableMovieItem>
                    }) : null}
            </Collapse>
        </List>
    </>
}

export default AdminMovieList