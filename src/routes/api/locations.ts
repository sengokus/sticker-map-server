// src/routes/api/locations.ts
import { Router, Request, Response } from "express";
import { supabase } from "../../lib/supabase";

const router = Router();



// POST /api/locations
router.post("/", async (req: Request, res: Response) => {
  const { lat, lng } = req.body;

  if (typeof lat !== "number" || typeof lng !== "number") {
    return res.status(400).json({ error: "lat and lng must be numbers" });
  }

  const { data, error } = await supabase
    .from("locations")
    .insert([{ lat, lng }])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.json(data);
});

export default router;
