require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "deb_bull$eye2CC",
    database: "testuser",
});

function getAllUsers(callback){
    const queryString = "SELECT * FROM users";
    connection.query(queryString, function (err, results){
        callback({
            count: results.length,
            results: results,
        });
    console.log("Mysql database is running");    
    });
    
}


module.exports = {
    getAllUsers,
    
};