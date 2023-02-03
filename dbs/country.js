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

function insertCountry(data, callback) {
    const queryString = `INSERT INTO courtry (NULL, ?, ?, ?) VALUES ?`;
    const params = [
        data.name,
        data.dateoftravel,
        data.datefinish,
        
    ];


connection.query(queryString, params , function (err, result){
    callback(result)
    console.log(params);
    
});
};

module.exports={
    insertCountry,
    getCountryById,
};