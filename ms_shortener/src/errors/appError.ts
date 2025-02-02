import ErrorUdene from "./Error.js";

class AppError extends ErrorUdene {
  constructor(message, statusCode?:number) {
    super(message,);
    this.code = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : "error";
  }

}

class MissingParameter extends ErrorUdene {
  constructor(message: string, param?: any) {
    super(message);
    this.name = 'MissingParameter';
    this.code = 422;
    this.param = param;
  }
}
class ElementNotFound extends ErrorUdene {
  constructor(message: string, param?: any) {
    super(message);
    this.name = 'ElementNotFound';
    this.code = 404;
    this.param = param;
  }
}
class MalformedObjectId extends ErrorUdene {
  constructor(message: string, param?: any) {
    super(message);
    this.name = 'MalformedObjectId';
    this.code = 400;
    this.param = param;
  }
}
class UnknownError extends ErrorUdene {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownError';
    this.code = 500;
  }
}
class UnAuthorized extends ErrorUdene {
  constructor(message: string) {
    super(message);
    this.name = 'UnAuthorized';
    this.code = 500;
  }
}
class NothingChanged extends ErrorUdene {
  constructor(message: string) {
    super(message);
    this.name = 'No changes has been made';
    this.code = 304;
  }
}


export {
  UnAuthorized,
  UnknownError,
  MalformedObjectId,
  ElementNotFound,
  MissingParameter,
  AppError,
  NothingChanged

};