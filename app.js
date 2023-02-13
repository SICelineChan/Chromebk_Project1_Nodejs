require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const testMongoDb = require("./testMongoDb");
//const db = require("./dbs/sqlDb");
const router = require("./routes/router");
//const countryController = require("./controller/countryController");
const travelled = require("./json /travelData.json");
const fetch = require("node-fetch");
const { json } = require("express");


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

//----------info.ejs-------------
app.get("/info", function (req, res) {
  const index = req.query.index || 1
  //console.log(index);
  const flag = req.body.flag;

  const templateData = {
    places: travelled[index],
  };

  const url = 'https://restcountries.com/v3.1/name/mexico';
  const options = {
    method: 'GET',
    
  };
  
  fetch(url, options)
    .then(function (response) { 
      response 
      .json()
      .then(function(result) {
        let mexFlag = result;
        console.log(mexFlag[0].flag);
        
        

    })
    
    });
  
  
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
