-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Set up RLS (Row Level Security)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow authenticated users to select clients
CREATE POLICY "Allow authenticated users to select clients"
  ON public.clients
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert clients
CREATE POLICY "Allow authenticated users to insert clients"
  ON public.clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own clients
CREATE POLICY "Allow authenticated users to update clients"
  ON public.clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete clients
CREATE POLICY "Allow authenticated users to delete clients"
  ON public.clients
  FOR DELETE
  TO authenticated
  USING (true);

-- Add clients to the database types
COMMENT ON TABLE public.clients IS 'Stores client information for the Outsmart section';

-- To run this migration:
-- 1. Navigate to the Supabase dashboard
-- 2. Go to SQL Editor
-- 3. Paste this script and execute it 