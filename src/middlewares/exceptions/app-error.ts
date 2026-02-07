import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export enum HttpCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_TOO_BUSY = 429,
    INTERNAL_SERVER_ERROR = 500,
}

export const httpCodeToCategory: Record<HttpCode, string> = {
    [HttpCode.OK]: "OK", // 200
    [HttpCode.NO_CONTENT]: "NO_CONTENT", // 204
    [HttpCode.BAD_REQUEST]: "BAD_REQUEST", // 400
    [HttpCode.UNAUTHORIZED]: "NOT AUTHORIZED", // 401
    [HttpCode.FORBIDDEN]: "FORBIDDEN", // 403
    [HttpCode.NOT_FOUND]: "NOT_FOUND", // 404
    [HttpCode.SERVER_TOO_BUSY]: "SERVER_TOO_BUSY", // 429
    [HttpCode.INTERNAL_SERVER_ERROR]: "INTERNAL_SERVER_ERROR", // 500
};

export interface AppErrorArgs {
    name?: string;
    httpCode: HttpCode;
    message?: string;
    description?: string;
    isOperational?: boolean;
    category?: string;
}

export class AppError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpCode;
    public readonly message: string;
    public readonly isOperational: boolean = true;
    public readonly category: string;
    public readonly description: string;

    constructor(args: AppErrorArgs) {
        super(args.description);

        Object.setPrototypeOf(this, new.target.prototype);

        this.name = args.name || "Error";
        this.httpCode = args.httpCode;
        this.message = args.message || "An unexpected error occurred. Please try again later.";
        this.category = args.category || "INTERNAL_SERVER_ERROR";
        this.description = args.description || "Internal Server Error";

        if (args.isOperational !== undefined) {
            this.isOperational = args.isOperational;
        }

        Error.captureStackTrace(this);
    }
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
        const statusCode = err.httpCode || 500;

        res.status(statusCode).json({
            message: err.message,
            description: err.description,
            code: statusCode,
            category: err.category,
        });
    } else if (err instanceof ZodError) {
        // Fallback ZodError handler (normally caught by validateRequestContent middleware)
        res.status(HttpCode.BAD_REQUEST).json({
            message: "Validation failed",
            errors: err.flatten(),
            code: HttpCode.BAD_REQUEST,
            category: httpCodeToCategory[HttpCode.BAD_REQUEST],
        });
    } else {
        console.error(`Unexpected error: ${JSON.stringify(err)}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
