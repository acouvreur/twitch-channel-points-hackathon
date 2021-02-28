const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const { handleHttpErrorResponse } = require('../middlewares/handleHttpErrorResponse.middleware');

const app = express();

app.use(bodyParser.json({ limit: '5mb', extended: true }));

app.use('/', routes);

app.use(handleHttpErrorResponse);

module.exports = app;
