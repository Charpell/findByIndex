const serverError = (error, req, res, next) => {
  if (!error.status) error.status = 500;
  res.status(error.status).send("Internal Server Error");
};

const validationError = (error, req, res, next) => {
  res.status(error.status).send(error);
  next();
};

// const validationError = (error, req, res, next) => {
//   console.log("Error", error.errors.category.message)
//   // res.status(error.status).send("error");
//   res.send(error.errors.category.message)
//   next();
// };

module.exports = {
  serverError,
  validationError
};
