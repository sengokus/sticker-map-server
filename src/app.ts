import cors from "cors";
import express, { Express, Request, Response } from "express";

// Utils
import { errorHandler } from "./middlewares/exceptions/app-error";
// Routes
import adminRouter from "./routes/admin";
import apiRouter from "./routes/api";
import locationsRouter from "./routes/api/locations";
import resultsRouter from "./routes/api/results";
import webRouter from "./routes/protected";
import publicRouter from "./routes/public";
import { logRequestMiddleware } from "./utils/request-utils";
import { responseLogger } from "./utils/response-utils";

const app: Express = express();

// Express's configurations
app.use(express.json());

app.use(cors());
app.use(logRequestMiddleware());
app.use(responseLogger);

app.use("/admin", adminRouter);
app.use("/api", apiRouter);
app.use("/public", publicRouter);
app.use("/web", webRouter);

app.use("/api/locations", locationsRouter);
app.use("/api/results", resultsRouter);

app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send(`Sticker Map Server\n\nBuild time: ${process.env.BUILD_TIME}`);
});

export default app;
