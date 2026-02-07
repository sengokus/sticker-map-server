import { AppError } from "../middlewares/exceptions/app-error";

export const createAppError = (statusCode: number, description: string = "Unknown error") => {
    return new AppError({
        httpCode: statusCode,
        description: description,
    });
};

export const createError400 = (message: string) => {
    let error = createAppError(400, message);
    delete error.stack;
    return error;
};

export const createError401 = (message: string) => {
    let error = createAppError(401, message);
    delete error.stack;
    return error;
};

export const createError403 = (message: string) => {
    let error = createAppError(403, message);
    delete error.stack;
    return error;
};

export const createError404 = (message: string) => {
    let error = createAppError(404, message);
    delete error.stack;
    return error;
};

export const createError500 = (message: string = "Internal server error") => {
    let error = createAppError(500, message);
    delete error.stack;
    return error;
};

export default {
    createAppError,
    createError400,
    createError401,
    createError403,
    createError404,
    createError500,
};
