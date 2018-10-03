module.exports.catchErrors = controllerFunction => {
  return function(req, res, next) {
    return controllerFunction(req, res, next).catch(next);
  };
};
