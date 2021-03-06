const AppError = require('./App.error');

class ForbiddenError extends AppError {}

module.exports = ForbiddenError;
