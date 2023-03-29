const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const PORT = process.env.SERVER_PORT || 8000;
const authRoute = require('./modules/auth/auth.route');

const app = express();
const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.ezwt6uh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next()
})


app.get('/', (req, res) => {
    res.json({
        message: 'Server is running',
    });
});

app.use('/api', authRoute);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

mongoose.connect(dbUrl).then((res) => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`)
}).catch((err) => {
    throw err;
})