const express = require("express");
const connectToMongo = require("./config/db");
const cors = require("cors");
const path = require('path');
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config()

const userRouter = require("./routes/user")
const studentRouter = require("./routes/students")
const connect_port = process.env.PORT
const user = process.env.BASE_URI_USER
const student = process.env.BASE_URI_STUDENT
connectToMongo();

const app = express();
const port = connect_port;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/uploads', express.static('uploads'))

app.use(user, userRouter);
app.use(student, studentRouter);

app.listen(port, () => {
    console.log(`listining on http://localhost:${port}`);
});


