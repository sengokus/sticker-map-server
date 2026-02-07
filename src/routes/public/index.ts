import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";

// Routers

dotenv.config();

const app: Router = express.Router();

app.get("/", (req: Request, res: Response) => {
    res.send("Public router");
});

export default app;
