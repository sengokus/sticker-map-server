import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL;
const supabaseApiKey = process.env.API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
    throw new Error("Missing DATABASE_URL or API_KEY, set them in the environment variables.");
}

export const db: SupabaseClient = createClient(supabaseUrl, supabaseApiKey);
