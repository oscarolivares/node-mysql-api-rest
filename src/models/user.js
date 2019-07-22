const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2660882',
  database: 'mysqlapi_test'
});

let userModel = {};

userModel.getUsers = callback => {
  if (connection) {
    connection.query('SELECT * FROM users ORDER BY id', (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, result);
      }
    });
  }
};

userModel.createUser = (userData, callback) => {
  if (connection) {
    connection.query('INSERT INTO users SET ?', userData, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          insertId: result.insertId
        });
      }
    });
  }
};

module.exports = userModel;
