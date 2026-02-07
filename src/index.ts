import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

// Utils
import { errorHandler } from "./middlewares/exceptions/app-error";
// Routes
import adminRouter from "./routes/admin";
import apiRouter from "./routes/api";
import webRouter from "./routes/protected";
import publicRouter from "./routes/public";
import { logRequestMiddleware } from "./utils/request-utils";
import { responseLogger } from "./utils/response-utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Express's configurations
app.use(express.json());

app.use(cors());
app.use(logRequestMiddleware());
app.use(responseLogger);

app.use("/admin", adminRouter);
app.use("/api", apiRouter);
app.use("/public", publicRouter);
app.use("/web", webRouter);

app.use(errorHandler)

app.get("/", (req: Request, res: Response) => {
    res.send(`Sticker Map Server\n\nBuild time: ${process.env.BUILD_TIME}`);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    const databaseUrl = process.env.DATABASE_URL || "not set";

    const url = new URL(databaseUrl);
    console.log(`Connected to database at '${url.host}'`);
});
