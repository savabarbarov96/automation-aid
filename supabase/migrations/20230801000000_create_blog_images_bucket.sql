
-- Create a storage bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog-images', 'blog-images', true, 10485760, '{image/png,image/jpeg,image/gif,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow authenticated users to upload images
CREATE POLICY "Blog Images Policy - Upload by authenticated users" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'blog-images');

-- Create a policy to allow authenticated users to update their uploaded images
CREATE POLICY "Blog Images Policy - Update by authenticated users"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Create a policy to allow authenticated users to delete their uploaded images
CREATE POLICY "Blog Images Policy - Delete by authenticated users"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Create a policy to allow public to view images
CREATE POLICY "Blog Images Policy - View by everyone"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'blog-images');
