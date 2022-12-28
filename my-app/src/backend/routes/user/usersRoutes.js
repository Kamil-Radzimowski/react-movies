import express from "express";
import {database} from "../../server.js";
import {LogToFile} from "../../logs/FileLogger.js";
import bcrypt from "bcrypt";
import {uuid} from "uuidv4";
import {getDb} from "../../mongo.js";

const router = express.Router();

const usersCollection = "users"

const saltRounds = 10
export default router
    .post('/register', async (req, res) => {
        const login = req.query.name
        const pword = req.query.password
        const email = req.query.email

        const isLoginOrEmailTaken = await getDb().collection(usersCollection).find({$or: [{login: login}, {email: email}]}).toArray()

        if(isLoginOrEmailTaken.length !== 0){
            return res.status(409).send({message: "User already exists"})
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(pword, salt, function(err, hash) {
                    const newUserInstance = {
                        id: uuid(),
                        username: login,
                        email: email,
                        password: hash,
                        isAdmin: true
                    }
                    getDb().collection(usersCollection).insertOne(newUserInstance, function(err, result){
                        if(err){
                            res.status(400).send(err)
                        } else{
                            res.json({username: login, isAdmin: newUserInstance.isAdmin})
                        }
                    })
                });
            });
        }
    })
    .get('/login', async (req, res) => {
        const email = req.query.email
        const pword = req.query.password

        const userBase = await getDb().collection(usersCollection).find({email: email}).toArray()
        const user = userBase[0]
        if (user !== null) {
            const areEqual = await bcrypt.compare(pword, user.password)
            if(areEqual){
                LogToFile(user.username)
                res.send({username: user.username, isAdmin: user.isAdmin})
                // res.status(200).json({username: user.username, api_key: user.api_key});
            } else {
                LogToFile()
                res.status(400).json({ error: "Invalid Password" });
            }
        } else {
            res.status(401).json({ error: "User does not exist" });
        }
    })
    .get('/all', async (req, res) => {
        const options = {
            projection: {_id: 0, id: 1, username: 1, isAdmin: 1}
        }

        const result = await getDb().collection(usersCollection).find({}, options).toArray()
        console.log(result)
        res.send(result)
    })
    .patch('/:id/update', (req, res) => {
        const userId = req.params.id
        let isAdmin = req.query.isAdmin

        isAdmin = isAdmin === 'true';

        getDb().collection(usersCollection).updateOne({id: userId}, {$set: {isAdmin: isAdmin}},  function(err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send("Updated")
            }
        })
    })
    .delete('/:id/ban', (req, res) => {
        const userId = req.params.id

        getDb().collection(usersCollection).deleteOne({id: userId}, function(err, result){
            if(err){
                res.status(400).send(err)
            } else {
                res.send("Deleted")
            }
        })
    })
