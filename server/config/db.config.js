const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.SERVER_PORT || 8000;
const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.ezwt6uh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(dbUrl).then((res) => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`)
}).catch((err) => {
    throw err;
})