const express = require('express');
const PORT = process.env.SERVER_PORT || 8000;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(cors());

const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.ezwt6uh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


app.get('/', (req, res) => {
    return res.send('Its Working!');
});

mongoose.connect(dbUrl).then((res) => {
    app.listen(PORT);
    console.log(`Listening on port ${PORT}`)
}).catch((err) => {

    const error = new HttpError(err, 404);
    throw error;
})