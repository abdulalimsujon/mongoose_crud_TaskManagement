const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { default: helmet } = require('helmet');

const app = express();

//middlewares

app.use(helmet());
app.use(express.json());
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

app.listen(5000, () => {
    console.log("server is running");
})
