import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.DATABASE_URL!
const supabaseApiKey = process.env.API_KEY!

export const db = createClient(supabaseUrl, supabaseApiKey)
