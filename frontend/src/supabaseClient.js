// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Supabase config
const supabaseUrl = 'https://iovcpjksvqxpuxhjtvbf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvdmNwamtzdnF4cHV4aGp0dmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjAwNTgsImV4cCI6MjA3MTQ5NjA1OH0.axEZ-Len3kxhlTaCh9_06J4nr1HcESXFghxu-jesaEQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
