import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahwybcfrmjraayzvsjtk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFod3liY2ZybWpyYWF5enZzanRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTcwNTcsImV4cCI6MjA2MjYzMzA1N30.7pfboi2cIBhptW5Wa_RLcDDKpOHf-4nBw0G_A3Z6zQQ';
export const supabase = createClient(supabaseUrl, supabaseKey);
