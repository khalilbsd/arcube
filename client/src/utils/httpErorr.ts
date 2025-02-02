

import { IServerError } from "types/IApp";


export function isTServerError(error: unknown): error is IServerError {
    return (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as IServerError).data.message === "string" &&
        typeof (error as IServerError).status === "number"
    );
}

