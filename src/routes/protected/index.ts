import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";

dotenv.config();

const app: Router = express.Router();

app.get("/", (req: Request, res: Response) => {
    res.send("Protected router");
});

export default app;
