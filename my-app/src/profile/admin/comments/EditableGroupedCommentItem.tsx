import React, {useState} from 'react'
import {groupedComments} from "../../../Util/types";
import {Collapse,
    List,
    ListItemButton, ListItemText,
} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import EditableCommentItem from "./EditableCommentItem";

const EditableGroupedCommentItem = (props: groupedComments) => {
    const [commentList, setCommentList] = useState(props.comments)
    const [isCommentListOpen, setIsCommentListOpen] = useState(false)

    const handleCommentListClick = () => {
        setIsCommentListOpen(!isCommentListOpen)
    }

    const updateCommentList = (id: string) => {
        console.log(id)
        const newList = commentList.filter((comm) => {return comm.id != id})
        console.log(newList)
        setCommentList(newList)
    }

    return <>
        <List  sx={{ m: 2, bgcolor: 'background.paper' }}>
            <ListItemButton onClick={handleCommentListClick}>
                <ListItemText primary={props.title} />
                {isCommentListOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={isCommentListOpen}>
                {commentList.map((comment) => {
                    return <EditableCommentItem key={comment.id} comment={comment} movieId={props.id} removeCallback={updateCommentList}/>
                })}
            </Collapse>
        </List>
    </>
}

export default EditableGroupedCommentItem