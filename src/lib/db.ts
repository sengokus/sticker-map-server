import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.DATABASE_URL!
const supabaseAnonKey = process.env.ANON_KEY!

export const db = createClient(supabaseUrl, supabaseAnonKey)
