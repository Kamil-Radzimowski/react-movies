import express from "express";
import {uuid} from "uuidv4";
import {getDb} from "../../mongo.js";

const router = express.Router();

const moviesCollection = "movies"


export default router
    .get("/comments", async(req, res) => {
        const id = req.query.id

        const options = {
            projection: {_id: 0, comments: 1}
        }

        const comments = await getDb().collection(moviesCollection).find({id: parseInt(id)}, options).toArray()
        res.send(comments[0].comments)
    })
    .post("/comments/:id", async (req, res) => {
        const movieId = req.params.id
        const text = req.query.text
        let user = req.query.user

        if(user === undefined || user === "undefined"){
            user = "Anonim"
        }

        const comment = {id: uuid(), user: user, comment: text}

        const result = await getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$push: { comments: comment}})
        res.send(result)
    })