import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jrhyvtlnepkczymolgns.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyaHl2dGxuZXBrY3p5bW9sZ25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NzAyOTcsImV4cCI6MjA3NDQ0NjI5N30.ivEd-MUNbIfPJmAcT3B8hys7HHGZribhLhgKE2lR494";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);