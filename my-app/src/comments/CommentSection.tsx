import React, {useEffect, useState} from "react";
import {useGetCommentsForMovieQuery} from "../apiEndpoints/CommentEndpoints";
import AddComment from "./AddComment";
import Comment from './Comment'
import {comment} from "../Util/types";


type commentSection = {
    id: string | undefined
}

const CommentSection = (props: commentSection) => {
    const [comments, setComments] = useState<comment[] | undefined>(undefined)
    const { data, isLoading} = useGetCommentsForMovieQuery(props.id || "")

    useEffect(() => {
        setComments(data)
    }, [data])
    
    const onAdd = (comment: comment) => {
        const newComments = comments?.concat(comment)
        setComments(newComments);
    }

    return <>
        {!isLoading && comments != undefined ? comments?.map((comment) => {
            return <Comment key={comment.id} id={comment.id} name={comment.user} text={comment.comment} ></Comment>
        }) : null}
        <AddComment id={props.id || ""} onAdd={onAdd}></AddComment>
    </>
}

export default CommentSection