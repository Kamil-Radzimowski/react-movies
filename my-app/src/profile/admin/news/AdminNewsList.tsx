import React, {useEffect, useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import '../movie/styleAdminMovieList.scss';
import AddNews from "./AddNews";
import EditableNewsItem from "./EditableNewsItem";
import {news} from "../../../Util/types";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from '../../../Redux/actions/NewsActions';
import {StoreDispatch, StoreType} from "../../../Redux/Store";

const AdminNewsList = () => {
    const news = useSelector<StoreType, news[]>((state) => state.news)
    const [isNewsListOpen, setIsNewsListOpen] = useState(false)
    const dispatch = useDispatch<StoreDispatch>()

    console.log(news)
    useEffect(() => {
        dispatch(getNews())
    }, [])

    const handleNewsListClick = () => {
        setIsNewsListOpen(!isNewsListOpen)
    }

    const filterDataAfterRemoval = (id: string) => {
        dispatch(getNews())
    }

    const callback = () => {
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
                    <AddNews callback={callback}/>
                </List>
            </Collapse>
        </List>
    </>
}

export default AdminNewsList