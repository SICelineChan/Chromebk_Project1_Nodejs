const usersDB = require("../dbs/sqlDb");

function addUser (req, res) {
    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
    };
    console.log(newUser);
    console.log(res);

  usersDB.insertNewUser(newUser, function (result){
    console.log(`anything new ${newUser}`)
    res.send(`Added a new user ${result}`)
  })  
};
module. exports = {
    addUser
};