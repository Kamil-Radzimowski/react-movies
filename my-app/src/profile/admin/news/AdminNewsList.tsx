import React, {useEffect, useState} from "react";
import {Card, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import '../movie/styleAdminMovieList.scss';
import AddNews from "./AddNews";
import {useGetAllNewsQuery} from "../../../apiEndpoints/NewsEndpoints";
import EditableNewsItem from "./EditableNewsItem";
import {news} from "../../../Util/types";

const AdminNewsList = () => {
    const [news, setNews] = useState<news[] | undefined>(undefined)
    const {data, isLoading} = useGetAllNewsQuery()
    const [isNewsListOpen, setIsNewsListOpen] = useState(false)

    useEffect(() => {
        setNews(data)
    }, [data])

    const handleNewsListClick = () => {
        setIsNewsListOpen(!isNewsListOpen)
    }

    const filterDataAfterRemoval = (id: string) => {
        const updatedNewsArray = news?.filter((news) => {return news._id != id})
        setNews(updatedNewsArray)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleNewsListClick}>
                <ListItemText primary="Newsy" />
                {isNewsListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isNewsListOpen}>
                <List>
                    {!isLoading && news !== undefined ? news.map((item) => {
                        return <EditableNewsItem key={item._id} news={item} removeCallback={filterDataAfterRemoval}/>
                    }) : null}
                    <AddNews/>
                </List>
            </Collapse>
        </List>
    </>
}

export default AdminNewsList