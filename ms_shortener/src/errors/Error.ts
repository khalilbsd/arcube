class ErrorARCube implements Error {
  name: string = "ArCubeAppError";
  code?: number;
  status: string = "fail";
  message: string;
  stack?: string;
  param?: any
  constructor(
    message: string,
    stack?: string
  ) {
    this.message = message;
    this.stack = stack;


  }
}


export default ErrorARCube