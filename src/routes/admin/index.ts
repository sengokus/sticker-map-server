import dotenv from "dotenv";
import express, { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import * as ErrorUtils from "../../utils/error-utils";
import adminRouter from "./admin";

dotenv.config();

const app: Router = express.Router();

app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        // middleware to verify the admin key
        const apiKey = z.string().parse(req.header("x-api-key"));
        if (apiKey !== process.env.ADMIN_KEY) {
            throw ErrorUtils.createError401("Unauthorized");
        }
        next();
    } catch (err) {
        next(err);
    }
});

app.use("/", adminRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Admin router");
});

export default app;
