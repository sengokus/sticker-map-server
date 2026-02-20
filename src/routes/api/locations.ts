// src/routes/api/locations.ts
import { Router, Request, Response } from "express";
import { db } from "../../lib/db";

const router = Router();



// POST /api/locations
router.post("/", async (req: Request, res: Response) => {
  const { stickers } = req.body;

  //take lat, lng, and sticker_type
  const sticker_rows = stickers.map((s: any) => ({
    latitude: Number(s.lat),
    longitude: Number(s.lng),
    sticker_type: String(s.sticker_type),
    username: String(s.name),
  }));

  const { data, error } = await db
    .from("food_space_atlas")
    .insert( sticker_rows )
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

export default router;
