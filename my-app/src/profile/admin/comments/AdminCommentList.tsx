import React, {useState} from 'react'
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useGetCommentsGroupedByMovieQuery} from "../../../Util/MovieService";
import EditableGroupedCommentItem from "./EditableGroupedCommentItem";

const AdminCommentList = () => {
    const [isCommentListOpen, setIsCommentListOpen] = useState(false)
    const {data, isLoading} = useGetCommentsGroupedByMovieQuery()

    const handleCommentListClick = () => {
        setIsCommentListOpen(!isCommentListOpen)
    }

    return <>
        <List  sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleCommentListClick}>
                <ListItemText primary="Komentarze" />
                {isCommentListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isCommentListOpen}>
                {!isLoading && data != undefined ? data.map((comment) => {
                    return <EditableGroupedCommentItem title={comment.title} comments={comment.comments} id={comment.id} key={comment.id}/>
                }) : null}
            </Collapse>
        </List>
    </>
}

export default AdminCommentList