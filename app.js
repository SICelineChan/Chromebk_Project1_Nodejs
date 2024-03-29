require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const testMongoDb = require("./testMongoDb");


//----Router----
const router = require("./routes/router");
const articleRouter = require("./routes/articles")

//const db = require("./dbs/sqlDb");
//const countryController = require("./controller/countryController");
const travelled = require("./json /travelData.json");
const fetch = require("node-fetch");
const { json } = require("express");


app.use(cors());
const port = 3001;

app.use(router);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}))

app.use("/articles", articleRouter)


app.get("/data", function(req,res){

  const templateData = {
    places : travelled,
  }
    res.render("databases", templateData);
})

//----------info.ejs-------------
app.get("/info", function (req, res) {
  const index = req.query.index || 1
  //console.log(index);
  const templateData = {
    places: travelled[index],
  };  
  res.render("info", templateData);
  });


//----------mongoDB----------
app.get("/mongo", async function (req,res) {
  testMongoDb.findAll(function (result){
    res.json(result);
  })
})

//-------mySql---------------
/*app.get("/sql", function (req, res){
  db.getAllUsers(function (results){
    res.json(results);
  })
})

app.post("/sql",countryController.addCountry);

app.get("/sql/:id", countryController.countryById);*/



app.listen(port, function (){
    console.log(`now listening on port ${port}`);
});
//just do npm run dev
