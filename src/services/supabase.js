import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lerdduilzhyfbejezkik.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcmRkdWlsemh5ZmJlamV6a2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxMjIwOTQsImV4cCI6MjAxNzY5ODA5NH0.VmwHka7zZSEDv-xold487H4XMWLMpMGD0T23aSUbhpI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
