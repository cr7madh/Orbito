import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hipvfbswtunklgfuttbx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpcHZmYnN3dHVua2xnZnV0dGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNjIzNzUsImV4cCI6MjA3MzkzODM3NX0.EkMNyBJ0LxHOWGc-iDnVA8-Cj6xloo_9-7LTWKrPEGI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);