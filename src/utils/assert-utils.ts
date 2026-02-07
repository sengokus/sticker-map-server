import * as ErrorUtils from "./error-utils";

export const assertNotNull = <T>(
    obj: T | null | undefined,
    errorCode = 500,
    errorMessage = "Internal server error"
) => {
    if (obj === null || obj === undefined) {
        console.log(`Object (type: (${typeof obj}) is null or undefined`);
        throw ErrorUtils.createAppError(errorCode, errorMessage);
    }
};

export const assertNull = <T>(obj: T | null | undefined, errorCode = 500, errorMessage = "Internal server error") => {
    if (obj !== null && obj !== undefined) {
        console.log(`Object (type: (${typeof obj}) is not null or undefined`);
        throw ErrorUtils.createAppError(errorCode, errorMessage);
    }
};
