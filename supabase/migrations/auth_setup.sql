-- Enable the Auth schema
-- This script should be run to set up Supabase Auth properly

-- Create a trigger to automatically create auth.users entries when blog_users are created
CREATE OR REPLACE FUNCTION public.handle_blog_user_auth()
RETURNS TRIGGER AS $$
BEGIN
  -- Create a user in auth.users
  INSERT INTO auth.users (
    id, 
    email,
    raw_user_meta_data,
    created_at,
    updated_at,
    last_sign_in_at
  ) VALUES (
    NEW.id,
    NEW.email,
    json_build_object(
      'full_name', NEW.full_name,
      'username', NEW.username
    ),
    NEW.created_at,
    NEW.created_at,
    NEW.created_at
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add the trigger to the blog_users table
DROP TRIGGER IF EXISTS on_blog_user_created ON public.blog_users;
CREATE TRIGGER on_blog_user_created
  AFTER INSERT ON public.blog_users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_blog_user_auth();

-- Create a function to handle password updates
CREATE OR REPLACE FUNCTION update_auth_user_password()
RETURNS TRIGGER AS $$
DECLARE
  email_address TEXT;
BEGIN
  -- Get the email for the blog user
  SELECT email INTO email_address FROM public.blog_users WHERE id = NEW.id;
  
  -- Update the auth.users password
  PERFORM
    supabase_functions.http(
      'POST',
      'https://dagnscrjrktrrspyamwu.supabase.co/auth/v1/admin/users/' || NEW.id,
      '{"password":"' || NEW.password || '"}',
      '{"apikey":"' || current_setting('request.headers')::json->>'apikey' || '", "Content-Type":"application/json", "Authorization":"Bearer ' || current_setting('request.headers')::json->>'apikey' || '"}'
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add the trigger to update passwords
DROP TRIGGER IF EXISTS on_blog_user_password_update ON public.blog_users;
CREATE TRIGGER on_blog_user_password_update
  AFTER UPDATE OF password ON public.blog_users
  FOR EACH ROW
  WHEN (NEW.password IS DISTINCT FROM OLD.password)
  EXECUTE FUNCTION update_auth_user_password();

-- Policies for blog_users table
ALTER TABLE public.blog_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view blog users
CREATE POLICY "Authenticated users can view blog users"
  ON public.blog_users FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.blog_users FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Example of how to encrypt passwords (would need to be applied to existing users)
-- For security, in a real application, you should hash passwords properly and not store them in plaintext

-- To run this migration:
-- 1. Navigate to the Supabase dashboard
-- 2. Go to SQL Editor
-- 3. Paste this script and execute it 