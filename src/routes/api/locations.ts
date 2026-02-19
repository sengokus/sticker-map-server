// src/routes/api/locations.ts
import { Router, Request, Response } from "express";
import { db } from "../../lib/db";

const router = Router();



// POST /api/locations
router.post("/", async (req: Request, res: Response) => {
  const { stickers } = req.body;

  // if (typeof lat !== "number" || typeof lng !== "number") {
  //   return res.status(400).json({ error: "lat and lng must be numbers" });
  // }

  //take lat, lng, and sticker_type
  const sticker_rows = stickers.map((s: any) => ({
    lat: Number(s.lat),
    lng: Number(s.lng),
    sticker_type: String(s.sticker_type),
  }));

  const { data, error } = await db
    .from("locations")
    .insert( sticker_rows )
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

export default router;
