const { name } = require("ejs");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deb_bull$eye2CC",
    database: "travel",
});

function getCountryById (id, callback) {
    const queryString = "SELECT * FROM country WHERE id = ?";
    const params = [id];

    connection.query(queryString, params, function (err, results) {
        callback(results[0]);
        console.log(results[0]);
        });
};
//works when menually input to here to make POST request
function insertCountry(data, callback) {
    const queryString = `INSERT INTO country VALUES (NULL, 'US', '2019-10-21','2019-11-12')`;
    
connection.query(queryString, function (err, result){
    callback(result);
    console.log(queryString)
    if (err) throw err;
    console.log(`Show us the ${result[0]}`);
    
});
};

module.exports={
    insertCountry,
    getCountryById,
};