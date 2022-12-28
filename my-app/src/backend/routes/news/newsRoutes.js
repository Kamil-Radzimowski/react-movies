import express from "express";
import {getDb} from "../../mongo.js";

const router = express.Router();

const newsCollection = "news"

export default router
    .get("/all", (req, res) => {
        getDb().collection(newsCollection).find({}).toArray(function (err, result){
            if(err){
                res.status(400).send(err)
            } else {
                console.log(result)
                res.send(result)
            }
        })
    })
    .post("/:title/:desc", async (req, res) => {
        const title = req.params.title
        const desc = req.params.desc
        const date = new Date()

        const doc = {
            title: title,
            desc: desc,
            date: date
        }
        const result = await getDb().collection(newsCollection).insertOne(doc)
        res.send(result)

    })
    .delete("/:id", (req, res) => {
        const newsId = req.params.id
        getDb().collection(newsCollection).deleteOne({_id: newsId}, function(err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send(result)
            }
        })
    })
    .patch("/:id/:title/:desc", (req, res) => {
        const newsId = req.params.id
        const title = req.params.title
        const desc = req.params.desc

        getDb().collection(newsCollection).updateOne({_id: newsId}, {$set: {title: title, desc: desc}}, function (err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send(result)
            }
        })
    })