import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";

import locationsRouter from "./locations";

dotenv.config();

const app: Router = express.Router();

app.use("/locations", locationsRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("API router");
});

export default app;
