require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const testMongoDb = require("./testMongoDb");
const db = require("./dbs/sqlDb");
const router = require("./routes/router");
const countryController = require("./controller/countryController");
const travelled = require("./json /travelData.json");
const bodyParser = require("body-parser");

//const jsonParser = bodyParser.json()
//const urlencodedParser = bodyParser.urlencoded({extended:true})

app.use(cors());
const port = process.env.DB_PORT || 3000;

app.use(express.json());
app.use(router);

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/data", function(req,res){

  const templateData = {
    places : travelled,
  }
    res.render("databases", templateData);
})
app.get("/about", function(req,res){
  res.render("about");
})

app.get("/info", function (req, res) {
  const index = req.query.index || 1
  console.log(index);

  const templateData = {
    places: travelled[index],
    
  };
//console.log(index);
    res.render("info", templateData);
  });

app.get("/mongo", async function (req,res) {
  testMongoDb.findAll(function (result){
    res.json(result);
  })
})

app.get("/sql", function (req, res){
  db.getAllUsers(function (results){
    res.json(results);
  })
})

app.post("/sql",countryController.addCountry);

app.get("/sql/:id", countryController.countryById);



app.listen(port, function (){
    console.log(`now listening on port ${port}`);
});
//just do npm run dev
