const User = require('../models/user');

module.exports = app => {
  app.get('/users', (req, res) => {
    User.getUsers((err, result) => {
      if (result) {
        res.status(200).json(result);
      }
    });
  });

  // En este metodo el id se pasa en la ruta debido
  // al principio de rest "Un recurso debe ser legible"
  app.get('/users/:id', (req, res) => {
    User.getUser(req.params.id, (err, result) => {
      if (result) {
        res.status(200).json(result);
      }
    });
  });

  app.post('/users', (req, res) => {
    const userData = {
      id: null,
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

  // En este metodo el id se pasa en la ruta debido
  // al principio de rest "Un recurso debe ser legible"
  app.put('/users/:id', (req, res) => {
    const userData = {
      id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    User.updateUser(userData, (err, result) => {
      if (result && result.msg) {
        res.status(200).json({
          success: true,
          msg: result.msg
        });
      }
    });
  });

  // En este metodo el id se pasa en la ruta debido
  // al principio de rest "Un recurso debe ser legible"
  app.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id, (err, result) => {
      if (result && result.msg) {
        res.status(200).json({
          success: true,
          msg: result.msg
        });
      }
    });
  });
};
