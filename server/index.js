const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json({ limit: '5mb', extended: true }));

app.use('/', routes);

module.exports = app;
