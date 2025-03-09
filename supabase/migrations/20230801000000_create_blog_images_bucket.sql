
-- Create a storage bucket for blog images if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog-images', 'blog-images', true, 10485760, '{image/png,image/jpeg,image/gif,image/webp}')
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow authenticated users to upload images
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Blog Images Policy - Upload by authenticated users',
  '(bucket_id = ''blog-images''::text AND auth.role() = ''authenticated''::text)',
  'blog-images'
)
ON CONFLICT (name, bucket_id) DO NOTHING;

-- Create a policy to allow public to view images
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Blog Images Policy - View by everyone',
  '(bucket_id = ''blog-images''::text)',
  'blog-images'
)
ON CONFLICT (name, bucket_id) DO NOTHING;
