import React, {useEffect, useLayoutEffect, useState} from "react";
import {useGetCommentsForMovieQuery} from "../apiEndpoints/CommentEndpoints";
import AddComment from "./AddComment";
import Comment from './Comment'
import {comment} from "../Util/types";
import {getClient} from "../Util/WebSocket";
import Cookies from 'js-cookie'

type commentSection = {
    id: string | undefined
}

const CommentSection = (props: commentSection) => {
    const [user, setUser] = useState<string>(Cookies.get("username"))
    const [comments, setComments] = useState<comment[] | undefined>(undefined)
    const { data, isLoading} = useGetCommentsForMovieQuery(props.id || "")

    useEffect(() => {
        setComments(data)

        const client = getClient()

        client.onmessage = (message) => {
            const obj = JSON.parse(message.data)
            if(obj.type === "COMMENT"){
                const comment: comment = obj.comment
                if(comment.user != user){
                    onAdd(comment)
                }
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