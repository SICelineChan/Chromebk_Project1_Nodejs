require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//const router = require("./routes/router");

app.use(cors());

const port = 3000;

app.use(express.json());
//app.use(router);

app.listen(port, function (){
    console.log(`now listening on port ${port}`);
});