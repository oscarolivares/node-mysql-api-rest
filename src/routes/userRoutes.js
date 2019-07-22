const User = require('../models/user');

module.exports = app => {
  app.get('/users', (req, res) => {
    User.getUsers((err, result) => {
      res.status(200).json(result);
    });
  });

  app.post('/users', (req, res) => {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    User.createUser(userData, (err, result) => {
      if (result && result.insertId) {
        res.status(200).json({
          success: true,
          msg: 'User added',
          data: result
        });
      }
    });
  });
};
