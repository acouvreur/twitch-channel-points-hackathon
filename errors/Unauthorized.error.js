const AppError = require('./App.error');

class UnauthorizedError extends AppError {}

module.exports = UnauthorizedError;
