import express from "express";
import {database} from "../../server.js";
import {LogToFile} from "../../logs/FileLogger.js";
import bcrypt from "bcrypt";
import {uuid} from "uuidv4";

const router = express.Router();

const saltRounds = 10

const getUserByEmail = (email) => {
    return database.users.reduce((acc, current) => {
        if(current.email === email){
            return current;
        } else {
            return acc;
        }
    }, null)
}

export default router
    .post('/register', (req, res) => {
        const login = req.query.name
        const pword = req.query.password
        const email = req.query.email

        const isLoginOrEmailTaken = database.users.some((user) => {
            return user.login === login || user.email === email
        })
        if(isLoginOrEmailTaken){
            return res.status(409).render("User already exists")
        } else {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(pword, salt, function(err, hash) {
                    const newUserInstance = {
                        id: uuid(),
                        login: login,
                        email: email,
                        password: hash,
                        isAdmin: true
                    }
                    database.users.push(newUserInstance)
                    LogToFile(newUserInstance)
                    res.send("User created successfully")
                });
            });
        }
    })
    .get('/login', async (req, res) => {
        const email = req.query.email
        const pword = req.query.password

        const user = getUserByEmail(email)
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
    .get('/all', (req, res) => {
        const users = database.users.map((user) => {
            return {id: user.id, username: user.login, isAdmin: user.isAdmin}
        })
        res.send(users)
    })
    .patch('/:id/update', (req, res) => {
        const userId = req.params.id
        const isAdmin = req.query.isAdmin

        const update = database.users.map((user) => {
            if(user.id === userId){
                user.isAdmin = isAdmin
            }
            return user
        })
        database.users = update
        res.send("Updated")
    })
