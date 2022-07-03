// This client is a super-powered client, that has access to everything and bypasses RLS.
// https://egghead.io/lessons/supabase-use-the-supabase-service-key-to-bypass-row-level-security

import { createClient } from "@supabase/supabase-js";

let supabase;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabase || typeof window === "undefined")
	supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
