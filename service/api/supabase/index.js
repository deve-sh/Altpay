import { createClient } from "@supabase/supabase-js";

let supabase;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabase) supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
