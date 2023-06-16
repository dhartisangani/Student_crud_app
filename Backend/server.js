const express = require("express");
const connectToMongo = require("./config/db");
const cors = require("cors");
var bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv")
dotenv.config()
const connect_port = process.env.PORT
connectToMongo();
const app = express();
const port = connect_port;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.raw({ type: 'multipart/form-data' }));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());
app.get("/8080/api/v1/school", (req, res) => {
    res.json({ message: "hello world" });
});

app.use("/api/v1/school/user", require("./routes/user"));
app.use("/api/v1/school/student", require("./routes/students"));

app.listen(port, () => {
    console.log(`listining on http://localhost:${port}`);
}); 
