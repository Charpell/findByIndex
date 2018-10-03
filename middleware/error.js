const serverError = (error, req, res, next) => {
  if (!error.status) error.status = 500;
  res.status(error.status).send("Internal Server Error");
};

const validationError = (error, req, res, next) => {
  res.status(error.status).send(error);
  next();
};

module.exports = {
  serverError,
  validationError
};
