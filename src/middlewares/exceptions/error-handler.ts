import { Response } from "express";
import { ZodError } from "zod";

import { AppError, HttpCode } from "./app-error";

class ErrorHandler {
    public handleError(error: Error | AppError, response?: Response): void {
        console.log(`Error thrown!`);
        console.log(error);
        console.log(`response:`);
        console.log(response);
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else if (this.isZodError(error) && response) {
            this.handleZodError(error as ZodError, response);
        } else {
            this.handleCriticalError(error, response);
        }
    }

    private isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private isZodError(error: Error): boolean {
        return error.name === "ZodError";
    }

    private handleTrustedError(error: AppError, response: Response): void {
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleZodError(error: ZodError, response: Response): void {
        response.status(HttpCode.BAD_REQUEST).json(error.flatten());
    }

    private handleOtherError(error: Error | AppError, response?: Response): void {
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }

        console.log("Application encountered a critical error:");
        console.log(error);
        // process.exit(1);
    }

    private handleCriticalError(error: Error | AppError, response?: Response): void {
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
        }

        console.log("Application encountered a critical error:");
        console.log(error);
        // process.exit(1);
    }
}

export const errorHandler = new ErrorHandler();
