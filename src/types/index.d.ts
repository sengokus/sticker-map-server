import express from "express";

// // to make the file a module and avoid the TypeScript error
export {};

declare global {
    namespace Express {
        export interface Request {
            reqBody?: any | null | undefined;
            isUserNewlyActivated?: boolean | null | undefined;
            fileHash?: string | null | undefined;
        }
    }
}
