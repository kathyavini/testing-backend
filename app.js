const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const { connectDb } = require('./config/mongoDb');
connectDb();

app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('running');
});
