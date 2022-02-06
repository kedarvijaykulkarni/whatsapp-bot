require('dotenv').config();
const cors = require('cors');
const express = require('express');
// const router = express.Router();
const bodyParser = require('body-parser');
const app = express();

// app.use(express.static(__dirname));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded());

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Cache-Control,Pragma, Origin, Authorization, Content-Type, X-Requested-With,X-XSRF-TOKEN, query,x-access-token'
  );
  next();
});

const routes = require('./routes/routes.js')(app);

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('listening on port %s...', server.address().port);
});
