module.exports.catchErrors = controllerFunction => {
  return (req, res, next) => {
    return controllerFunction(req, res, next).catch(next);
  };
};
