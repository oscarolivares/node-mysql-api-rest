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

userModel.getUser = (id, callback) => {
  if (connection) {
    connection.query(
      `SELECT * FROM users WHERE id = ${connection.escape(id)}`,
      (err, result) => {
        if (err) {
          throw err;
        } else {
          callback(null, result);
        }
      }
    );
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

userModel.updateUser = (userData, callback) => {
  if (connection) {
    const sql = `
      UPDATE users SET
      username = ${connection.escape(userData.username)},
      email = ${connection.escape(userData.email)},
      password = ${connection.escape(userData.password)}
      WHERE id = ${connection.escape(userData.id)}
    `;
    connection.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        callback(null, {
          msg: 'User updated'
        });
      }
    });
  }
};

userModel.deleteUser = (id, callback) => {
  if (connection) {
    connection.query(
      `DELETE FROM users WHERE id = ${connection.escape(id)}`,
      (err, result) => {
        if (err) {
          throw err;
        } else if (result.affectedRows != 0) {
          callback(null, {
            msg: 'User deleted'
          });
        } else {
          callback(null, {
            msg: 'User not exist'
          });
        }
      }
    );
  }
};

module.exports = userModel;
