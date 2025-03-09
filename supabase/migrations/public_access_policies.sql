-- Allow public read access to clients
CREATE POLICY "Allow public to view clients" 
ON public.clients
FOR SELECT 
TO public
USING (true);

-- Allow public read access to projects
CREATE POLICY "Enable read access for all users" 
ON public.projects
FOR SELECT 
TO public
USING (true);

-- Policy to ensure blog_posts are visible to everyone (if not already exists)
CREATE POLICY IF NOT EXISTS "Published posts are viewable by everyone" 
ON public.blog_posts
FOR SELECT 
TO public
USING (is_published = true);

-- Instructions for executing these policies:
-- 1. Log in to your Supabase dashboard
-- 2. Go to SQL Editor
-- 3. Copy and paste this file content
-- 4. Execute the queries 