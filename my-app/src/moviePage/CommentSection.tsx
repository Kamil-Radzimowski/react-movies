import React from "react";
import {useGetCommentsForMovieQuery} from "../Util/MovieService";
import Comment from './Comment';
import AddComment from "./AddComment";

type commentSection = {
    id: string | undefined
}

const CommentSection = (props: commentSection) => {

    const { data, isLoading} = useGetCommentsForMovieQuery(props.id || "")
    
    const onAdd = (text: string) => {
        console.log("onAdd")
        // pass
    }

    return <>
        {!isLoading && data != undefined ? data?.map((comment) => {
            return <Comment key={comment.id} id={comment.id} name={comment.user} text={comment.comment} ></Comment>
        }) : null}
        <AddComment id={props.id || ""} onAdd={onAdd}></AddComment>
    </>
}

export default CommentSection