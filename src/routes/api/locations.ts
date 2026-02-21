// src/routes/api/locations.ts
import express, { Request, Response, Router } from "express";

import { db } from "../../lib/db";
import { requireAuth } from "../../middlewares/auth";

const app: Router = express.Router();

// GET /api/locations/status
app.get("/status", requireAuth, async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { data: existing } = await db.from("atlas_responses").select("id").eq("user_id", userId).single();

    return res.json({ hasResponded: !!existing });
});

// POST /api/locations
app.post("/", requireAuth, async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { stickers, username } = req.body;

    if (!stickers || !Array.isArray(stickers) || stickers.length === 0) {
        return res.status(400).json({ error: "At least one sticker is required." });
    }

    // check if user has already responded
    const { data: existing } = await db.from("atlas_responses").select("id").eq("user_id", userId).single();

    if (existing) {
        return res
            .status(409)
            .json({ success: false, message: "You have already submitted a response to this survey." });
    }

    // create a new response to the survey
    const { data: atlasResponse, error: atlasError } = await db
        .from("atlas_responses")
        .insert({ user_id: userId })
        .select("id")
        .single();

    if (atlasError || !atlasResponse) {
        console.error(atlasError);
        return res
            .status(500)
            .json({ success: false, error: atlasError?.message ?? "Failed to create response to the survey." });
    }

    // create the respondent's response
    const displayName = username ?? stickers[0]?.name ?? null;
    const { data: response, error: responseError } = await db
        .from("response")
        .insert({
            atlas_responses_id: atlasResponse.id,
            username: displayName,
        })
        .select("id")
        .single();

    if (responseError || !response) {
        console.error(responseError);
        return res
            .status(500)
            .json({ success: false, error: responseError?.message ?? "Failed to create response to the survey." });
    }

    // create the stickers for the respondent's response
    const stickerRows = stickers.map((s: { lat?: number; lng?: number; sticker_type?: string }) => ({
        response_id: response.id,
        sticker_type: String(s.sticker_type ?? ""),
        latitude: s.lat != null ? Number(s.lat) : null,
        longitude: s.lng != null ? Number(s.lng) : null,
    }));

    const { data: insertedStickers, error: stickerError } = await db.from("sticker").insert(stickerRows).select();

    if (stickerError) {
        console.error(stickerError);
        return res
            .status(500)
            .json({ success: false, error: stickerError.message ?? "Failed to create stickers for the response." });
    }

    return res.json({
        success: true,
        atlas_response_id: atlasResponse.id,
        response_id: response.id,
        stickers: insertedStickers,
        message: "Your response has been submitted successfully!",
    });
});

export default app;
