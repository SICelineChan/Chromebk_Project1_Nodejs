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
   

    countryDB.insertCountry(newCountry, function(results){
        const id = results.insertId;
        //console.log(Object.values(results))
        //res.send(`You have added a new id: ${id}`);
        res.send(`Give me some results ${id} and ${newCountry[0]}`);
    })
}
module.exports= {
    addCountry,
    countryById,
    
};
