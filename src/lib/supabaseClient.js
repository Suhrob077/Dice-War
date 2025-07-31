// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lrxkakilyythtkpzmmqo.supabase.co'; // <-- o'z URL'ingizni yozing
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeGtha2lseXl0aHRrcHptbXFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4Njg5NTIsImV4cCI6MjA2OTQ0NDk1Mn0.3xan0pOurVnB-cuLgwT4lyOKL14w-d_OiUQvpQ3sfnY'; // <-- o'z anon key'ingizni yozing

export const supabase = createClient(supabaseUrl, supabaseKey);
