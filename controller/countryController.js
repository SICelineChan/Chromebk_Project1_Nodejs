const countryDB = require("../dbs/country");

function countryById(req, res) {
    const paramID = req.params.id;
    if(!paramID) {
        res.status(404).json ({
            status: "You have an error!",
            description: "Invalid URL",
        });
        return;
    }
    countryDB.getCountryById(paramID, function (result) {
        console.log(`Check the ${result}`);
        if(result){
            res.json(result);
        } else {
            res.status(404).json({
                status: "Error",
                description: "No such data!",
            });
        }
    });
}


function addCountry(req, res) {
    const newCountry = {
        name: req.body.name,
        dateoftravel: req.body.dateoftravel,
        datefinish: req.body.datefinish,
    };
   console.log(newCountry);

    countryDB.insertCountry(newCountry, function(result){
        console.log(newCountry);
        res.send(`You have added ${result}`);
        
    })
}
module.exports= {
    addCountry,
    countryById,
    
};
