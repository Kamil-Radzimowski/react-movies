import React, {useEffect, useState} from "react";
import {Card, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import '../movie/styleAdminMovieList.scss';
import AddNews from "./AddNews";
import {useGetAllNewsQuery} from "../../../apiEndpoints/NewsEndpoints";
import EditableNewsItem from "./EditableNewsItem";
import {news} from "../../../Util/types";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../../redux/actions/NewsActions";
import {StoreDispatch, StoreType} from "../../../redux/Store";

const AdminNewsList = () => {
    const news = useSelector<StoreType, news[]>((state) => state.news)
    const {data, isLoading} = useGetAllNewsQuery()
    const [isNewsListOpen, setIsNewsListOpen] = useState(false)
    const dispatch = useDispatch<StoreDispatch>()

    console.log(news)
    useEffect(() => {
        dispatch(getNews())
    }, [data])

    const handleNewsListClick = () => {
        setIsNewsListOpen(!isNewsListOpen)
    }

    const filterDataAfterRemoval = (id: string) => {
        dispatch(getNews())
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleNewsListClick}>
                <ListItemText primary="Newsy" />
                {isNewsListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isNewsListOpen}>
                <List>
                    {news && news.map((item) => {
                        return <EditableNewsItem key={item._id} news={item} removeCallback={filterDataAfterRemoval}/>
                    })}
                    <AddNews/>
                </List>
            </Collapse>
        </List>
    </>
}

export default AdminNewsList