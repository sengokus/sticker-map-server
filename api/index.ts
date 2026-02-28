import type { Express } from "express";

// use compiled app — at runtime only dist/ is available in the serverless env
import app from "../dist/app.js";

export default app as Express;
