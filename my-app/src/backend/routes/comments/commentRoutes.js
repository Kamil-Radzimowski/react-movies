import express from "express";
import {uuid} from "uuidv4";
import {getDb} from "../../mongo.js";
import {notifyCommentAdded} from "../../websocket/wsComment.js";

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

        notifyCommentAdded(comment)
        res.send(result)
    })
    .delete('/comments/delete/:movieid/:commentid', async(req, res) => {
        const movieId = req.params.movieid
        const commentId = req.params.commentid

        getDb().collection(moviesCollection).updateOne({id: parseInt(movieId)}, {$pull: {comments: {id: commentId}}}, function(err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send("Komentarz usuniety")
            }
        })
    })
    .patch('/comments/:id/:commentid/:comment', async (req, res) => {
        const movieId = req.params.id
        const commentId = req.params.commentid
        const comment = req.params.comment

        const result = await getDb().collection(moviesCollection).updateOne({id: parseInt(movieId), "comments.id": commentId}, {$set: {"comments.$.comment": comment}})
        res.send(result)
    })
    .get('/comments/grouped', (req, res) => {

        getDb().collection(moviesCollection).find({}).project({_id: 0, title: 1, id:1, comments: 1}).toArray(function (err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send(result)
            }
        })
    })