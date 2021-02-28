const {
  AppError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

/**
 * @param {Error} err
 */
const getErrorBody = (err) => {
  const errorBody = {
    name: err.name,
    message: err.message,
  };
  if (err.stack) {
    errorBody.stack = err.stack;
  }
  return errorBody;
};

/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
const handleHttpErrorResponse = (err, req, res, next) => {
  console.error(err);
  if (err && err instanceof AppError) {
    if (err instanceof BadRequestError) {
      res.status(400);
    } else if (err instanceof ForbiddenError) {
      res.status(403);
    } else if (err instanceof NotFoundError) {
      res.status(404);
    }
    res.json(getErrorBody(err));
  } else if (err) {
    res.status(500);
    res.json(getErrorBody({
      name: err.name,
      message: `Oooops! An unexpected server error occured! Have you already tried rebooting the app?\n${err.message}`,
      stack: err.stack,
    }));
  }
};

module.exports = {
  handleHttpErrorResponse,
};
