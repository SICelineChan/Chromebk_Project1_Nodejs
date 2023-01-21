const sqlDb = require("./sqlDb");
const connection = sqlDb.connection;

function getAllUsers(callback){
    const queryString = "SELECT * FROM users";
    connection.query(queryString, function (err, results){
        callback({
            count: results.length,
            results: results,
        });
    });
    
}
module.exports = {
    getAllUsers
};