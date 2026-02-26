import express, { Request, Response, Router } from "express";

import { db } from "../../lib/db";

const app: Router = express.Router();


app.get("/", async (req: Request, res: Response) => {
    const { data: responses, error } = await db
        .from("response")
        .select(
            `
          id,
          username,
          created_at,
          sticker (
              id,
              sticker_type,
              latitude,
              longitude,
              created_at
          )
      `
        )
        .order("created_at", { ascending: false });

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    if (!responses?.length) {
        return res.json({ responses: [], stickers: [] });
    }

    const formatted = (responses ?? []).map((r: any) => {
        const stickerList = r.sticker ?? [];
        return {
            id: r.id,
            username: r.username,
            created_at: r.created_at,
            stickers: stickerList.map((s: any) => ({
                id: s.id,
                sticker_type: s.sticker_type,
                latitude: s.latitude,
                longitude: s.longitude,
                lat: s.latitude,
                lng: s.longitude,
                created_at: s.created_at,
            })),
        };
    });

    const stickersFlat = formatted.flatMap((r) =>
        r.stickers.map((s: any) => ({ ...s, username: r.username, response_id: r.id }))
    );

    return res.json({
        responses: formatted,
        stickers: stickersFlat,
    });
});

export default app;
