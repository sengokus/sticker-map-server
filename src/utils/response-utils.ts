import { NextFunction, Request, Response } from "express";

export const responseLogger = async (req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = (...body: any): Response => {
        console.log(`Sending response: ${req.originalUrl}`);
        return originalSend.apply(res, body);
    };

    console.log();
    next();
};
