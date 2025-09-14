import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use environment variables with fallbacks for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://okgegpnaiwdyppxhhyec.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rZ2VncG5haXdkeXBweGhoeWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MjQ4MjgsImV4cCI6MjA3MzQwMDgyOH0.MyUcH2K5GhSlW16k992ZUy7pvvxKfEYS_MAgDtMFD3Y";

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});