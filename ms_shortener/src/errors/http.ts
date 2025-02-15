class HttpError extends Error {
    statusCode?:number = undefined;
    httpMessage?:string = undefined;
    userMessage?:string = undefined;
    constructor(statusCode?:number, httpMessage?:string, userMessage?:string) {
        super();
        if (statusCode) this.statusCode = statusCode;
        if (httpMessage) this.httpMessage = httpMessage;
        if (userMessage) this.userMessage = userMessage;
    }
}

class NotFoundError extends HttpError {
    statusCode = 404;
    httpMessage = "Not Found";
}

class BadRequestError extends HttpError {
    statusCode = 400;
    httpMessage = "Bad Request";
}

class UnauthorizedError extends HttpError {
    statusCode = 401;
    httpMessage = "You are not authorized for this action.";
}

class InternalServerError extends HttpError {
    statusCode = 500;
    httpMessage = "Internal Server Error";
}

class ForbiddenError extends HttpError {
    statusCode = 403;
    httpMessage = "Forbidden";
}

class ConflictError extends HttpError {
    statusCode = 409;
    httpMessage = "Conflict";
}

export {
    HttpError,
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
    InternalServerError,
    ForbiddenError,
    ConflictError,
};