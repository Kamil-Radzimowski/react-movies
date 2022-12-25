import React from "react";
import {useGetCommentsForMovieQuery} from "../Util/MovieService";
import Comment from './Comment';
import AddComment from "./AddComment";

type commentSection = {
    id: string | undefined
}

const CommentSection = (props: commentSection) => {

    const { data, isLoading} = useGetCommentsForMovieQuery(props.id || "")

    return <>
        {!isLoading && data != undefined ? data?.map((comment) => {
            return <Comment key={comment.id} id={comment.id} name={comment.name} text={comment.comment} ></Comment>
        }) : null}
        <AddComment></AddComment>
    </>
}

export default CommentSection