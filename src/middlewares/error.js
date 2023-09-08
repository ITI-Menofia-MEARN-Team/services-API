const globalError = (err, req, res, next) => {
  //   console.log('err: ', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default globalError;
