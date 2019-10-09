const express = require('express');
const mongoose = require('./config/config');

const bodyParser = require('body-parser');
var router = require('./heroes/heroesView.js');

var cors = require('cors');

const app = express();

var port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connection.on('error', err =>{
  logError(err);
});

app.use('/api', router.rout);

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
