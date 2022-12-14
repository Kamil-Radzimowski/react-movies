
import fs from 'fs'

export const LogToFile = (action) => {

    fs.appendFile('logs.txt', formatAction(action), err => {
        if (err) {
            console.error(err);
        }
    });
}

const formatAction = (action) => {
    const currentTime = new Date();
    return `${currentTime} ${JSON.stringify(action)} \n`
}

export const ACTION_USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS"

