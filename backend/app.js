require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const line = require('@line/bot-sdk');
const cors = require('cors');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.get('/api/v1/unlink-richmenu', (req, res) => {    
    client.unlinkRichMenuFromUser("U9dd31ae6c8871478b99450dbf535aec3");
    res.json({
        data: req.body
    });
});

app.post('/api/v1/change-richmenu', (req, res) => {
    // save data in db
    const { firstname, lastname, email, userId } = req.body;
    client.linkRichMenuToUser(userId, "richmenu/richmenu-dcc08617f04de0a9d50411a296040dfb");
    res.json({
        data: req.body
    });
})

app.listen(3000, () => {
    console.log("Ready on port 3000");
});
