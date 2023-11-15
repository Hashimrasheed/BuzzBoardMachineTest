var express = require('express');
const dotenv = require('dotenv'); 
const connectDB = require("./config/db")
var ordersRouter = require('./routes/orders');

var app = express();

dotenv.config()

// Connect database
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/orders', ordersRouter);

module.exports = app;
