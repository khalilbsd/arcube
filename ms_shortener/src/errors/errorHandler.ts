import { config } from "../config/environment.config.js";

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};
const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    // stack: err.stack
  });
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.code || 500;
  err.status = err.status || "error";
//   logger.error(err);

  if (!config.env_dev){
    sendErrorDev(err, res);
  }else{
    sendErrorProd(err,res)
  }
};
