import React, {useEffect, useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import './styleAdminMovieList.scss';
import {useGetAllMoviesQuery} from "../../../apiEndpoints/MovieEndpoints";
import EditableMovieItem from "./EditableMovieItem";
import {detailedMovie} from "../../../Util/types";

const AdminMovieList = () => {
    const [isMovieListOpen, setIsMovieListOpen] = useState(false)
    const [stateData, setStateData] = useState<detailedMovie[]>()
    const {data, isLoading} = useGetAllMoviesQuery()

    useEffect(() => {
        setStateData(data)
    }, [data])

    const handleMovieListClick = () => {
        setIsMovieListOpen(!isMovieListOpen)
    }

    const deleteCallback = (id: number) => {
        const newDataSet = stateData?.filter((movie) => {return movie.id != id})
        setStateData(newDataSet)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleMovieListClick}>
                <ListItemText primary="Filmy" />
                {isMovieListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isMovieListOpen}>
                    {!isLoading && stateData != undefined ? stateData.map((movie) => {
                        return <EditableMovieItem deleteCallback={deleteCallback} key={movie.id} movie={movie}></EditableMovieItem>
                    }) : null}
            </Collapse>
        </List>
    </>
}

export default AdminMovieList