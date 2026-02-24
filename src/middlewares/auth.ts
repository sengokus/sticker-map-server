import { NextFunction, Request, Response } from "express";

import { db } from "../lib/db";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    // use Supabase anonymous auth to verify the user
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: "Authorization required. Include a Bearer token from Supabase auth." });
    }

    const {
        data: { user },
        error,
    } = await db.auth.getUser(token);

    if (error || !user) {
        return res.status(401).json({ error: error?.message ?? "The token is invalid or expired." });
    }

    req.user = user;
    next();
}
