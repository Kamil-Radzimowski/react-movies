import express from "express";
import {database} from "../../server.js";
import {uuid} from "uuidv4";

const router = express.Router();

export default router
    .get("/comments", (req, res) => {
        const id = req.query.id

        const comments = database.data.reduce((acc, current) => {
            if(current.id === parseInt(id)){
                return current.comments
            } else return acc
        }, [])
        res.send(comments)
    })
    .post("/comments/:id", (req, res) => {
        const movieId = req.params.id
        const comment = req.query.text
        let user = req.query.user

        if(user === undefined || user === "undefined"){
            user = "Anonim"
        }

        const update = database.data.map((current) => {
            if(current.id === parseInt(movieId)){
                current.comments.push({id: uuid(), user: user, comment: comment})
            }
            return current
        })
        database.data = update
        res.send("Comment added")
    })