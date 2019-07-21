const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routers
require('./routes/userRoutes')(app);

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
