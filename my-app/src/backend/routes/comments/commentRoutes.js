import express from "express";
import {uuid} from "uuidv4";
import {getDb} from "../../mongo.js";
import {notifyCommentAdded} from "../../websocket/comments/wsComment.js";

const router = express.Router();

const moviesCollection = "movies"


export default router
    .get("/comments", async(req, res) => {
        const id = req.query.id

        const options = {
            projection: {_id: 0, comments: 1}
        }

        getDb().collection(moviesCollection).find({id: parseInt(id)}, options).toArray().then((result) => {
            res.send(result[0].comments)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .post("/comments/:id", async (req, res) => {
        const movieId = req.params.id
        const text = req.query.text
        let user = req.query.user

        if(user === undefined || user === "undefined"){
            user = "Anonim"
        }

        const comment = {id: uuid(), user: user, comment: text}

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$push: { comments: comment}}).then((result) => {
            res.send(result)
            notifyCommentAdded(comment)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .delete('/comments/delete/:movieid/:commentid', async(req, res) => {
        const movieId = req.params.movieid
        const commentId = req.params.commentid

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$pull: {comments: {id: commentId}}}).then((result) => {
            res.send("Komentarz usunięty")
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .patch('/comments/:id/:commentid/:comment', async (req, res) => {
        const movieId = req.params.id
        const commentId = req.params.commentid
        const comment = req.params.comment

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId), "comments.id": commentId}, {$set: {"comments.$.comment": comment}}).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .get('/comments/grouped', (req, res) => {
        getDb().collection(moviesCollection).find({}).project({_id: 0, title: 1, id:1, comments: 1}).toArray().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })