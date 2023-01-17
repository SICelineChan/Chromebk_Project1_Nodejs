require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
//const testMongoDb = require("./testMongoDb");
const router = require("./routes/router");

const travelled = require("./json /travelData.json");

app.use(cors());
const port = 3000;

app.use(express.json());
app.use(router);

app.use(express.static("public"));
app.set("view engine", "ejs");

//app.get("/", function(req, res){

    //const templateData = {places : travelled,};
    //res.render("main", templateData);
//})

app.get("/data", function(req,res){

  const templateData = {
    places : travelled,
  }
    res.render("databases", templateData);
})

app.get("/info", function (req, res) {
  const index = req.query.index || 1
  console.log(index);

  const templateData = {
    places: travelled[index],
    
  };
  
console.log(index);
    res.render("info", templateData);
  });

app.listen(port, function (){
    console.log(`now listening on port ${port}`);
});
//just do npm run dev