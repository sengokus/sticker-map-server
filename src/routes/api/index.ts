import dotenv from "dotenv";
import express, { Request, Response, Router } from "express";

import locationsRouter from "./locations";
import resultsTouter from "./results";

dotenv.config();

const app: Router = express.Router();

app.use("/locations", locationsRouter);
app.use("/results", resultsTouter);

app.get("/", (req: Request, res: Response) => {
    res.send("API router");
});

export default app;
