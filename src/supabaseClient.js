import { createClient } from '@supabase/supabase-js'

let supabase = 'https://ummrcakwdaeufujhnvrv.supabase.co'
let supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtbXJjYWt3ZGFldWZ1amhudnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg0MzEyMjIsImV4cCI6MjAwNDAwNzIyMn0.XON0aKDBeWpk40kBuzH3Kagqg1FU-hJFQbkMWxhd1xQ'

export default supabase = createClient(supabase, supabaseAnonKey)
