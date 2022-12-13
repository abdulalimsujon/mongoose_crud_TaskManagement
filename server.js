const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const { default: helmet } = require('helmet');

const app = express();

//middlewares

app.use(helmet());
app.use(express.json());
dotenv.config();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
const { readdirSync } = require("fs")

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/task')
    .then(console.log('db connected'))
    .catch((error) => console.log(error))


readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)))

const errorHandler = (error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    } else {

        res.status(500).json({ error: error });

    }

}

app.use(errorHandler);

app.listen(5000, () => {
    console.log("server is running");
})
