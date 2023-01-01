import React, {useEffect, useLayoutEffect, useState} from "react";
import {useGetCommentsForMovieQuery} from "../apiEndpoints/CommentEndpoints";
import AddComment from "./AddComment";
import Comment from './Comment'
import {comment} from "../Util/types";
import {getClient} from "../Util/WebSocket";

type commentSection = {
    id: string | undefined
}

const CommentSection = (props: commentSection) => {
    const [comments, setComments] = useState<comment[] | undefined>(undefined)
    const { data, isLoading} = useGetCommentsForMovieQuery(props.id || "")

    useEffect(() => {
        setComments(data)

        const client = getClient()

        client.onmessage = (message) => {
            const obj = JSON.parse(message.data)
            if(obj.type === "COMMENT"){
                const comment: comment = obj.comment
                onAdd(comment)
            }
        };
    }, [data])
    
    const onAdd = (comment: comment) => {
            setComments(oldArray => {
                if(oldArray != undefined){
                    return [...oldArray, comment]
                } else {
                    return oldArray
                }
            });

    }

    return <>
        {!isLoading && comments != undefined ? comments?.map((comment) => {
            return <Comment key={comment.id} id={comment.id} name={comment.user} text={comment.comment} ></Comment>
        }) : null}
        <AddComment id={props.id || ""} onAdd={onAdd}></AddComment>
    </>
}

export default CommentSection