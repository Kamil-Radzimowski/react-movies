import express from "express";
import {getDb} from "../../mongo.js";
import {ObjectId} from "mongodb";
import {notifyNewsAdded} from "../../websocket/news/wsNews.js";

const router = express.Router();

const newsCollection = "news"

export default router
    .get("/all", (req, res) => {
        getDb().collection(newsCollection).find({}).toArray().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
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
        getDb().collection(newsCollection).insertOne(doc).then((result) => {
            notifyNewsAdded(doc)
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .delete("/:id", (req, res) => {
        const newsId = req.params.id
        console.log(newsId)
        getDb().collection(newsCollection).deleteOne({_id: new ObjectId(newsId)}).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })
    .patch("/:id/:title/:desc", (req, res) => {
        const newsId = req.params.id
        const title = req.params.title
        const desc = req.params.desc

        getDb().collection(newsCollection).updateOne({_id: new ObjectId(newsId)}, {$set: {title: title, desc: desc}}).then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send(err)
        })
    })