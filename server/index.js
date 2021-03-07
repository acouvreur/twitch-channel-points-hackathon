const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const { handleHttpErrorResponse } = require('../middleware/handleHttpErrorResponse.middleware');

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '5mb', extended: true }));

app.use('/', routes);

app.use(handleHttpErrorResponse);

module.exports = app;
