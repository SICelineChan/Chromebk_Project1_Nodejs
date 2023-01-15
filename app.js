require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//const router = require("./routes/router");

const travelled = require("./json /travelData.json");

app.use(cors());
const port = 3000;

app.use(express.json());
//app.use(router);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){

    const templateData = {countries : travelled,};
    //console.log(travelled);
    res.render("main.ejs", templateData);
})

app.get("/info", function(req,res){
    res.render("info");
})

app.listen(port, function (){
    console.log(`now listening on port ${port}`);
});
//just do npm run dev