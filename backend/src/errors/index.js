const AppError = require('./App.error');
const BadRequestError = require('./BadRequest.error');
const UnauthorizedError = require('./Unauthorized.error');
const ForbiddenError = require('./Forbidden.error');
const NotFoundError = require('./NotFound.error');
const MinecraftError = require('./Minecraft.error');

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MinecraftError,
};
