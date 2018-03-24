const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Album = require('./models').Album;

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL);

require('./routes')(app);

app.listen(port, () => {
  console.log('Server is running on Port: ' + port);
});


