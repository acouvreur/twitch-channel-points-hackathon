const AppError = require('./App.error');

class BadRequestError extends AppError {}

module.exports = BadRequestError;
