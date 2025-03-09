
import { supabase } from "@/integrations/supabase/client";

export type UploadStatus = "idle" | "uploading" | "error";

export const uploadImageToSupabase = async (
  file: File,
  bucketName: string,
  folderPath: string = ""
): Promise<{ url: string; error: string | null }> => {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = folderPath ? `${folderPath}${fileName}` : fileName;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      return { url: '', error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error('Unexpected error during upload:', error);
    return { url: '', error: error.message || 'An unexpected error occurred' };
  }
};

export const checkBucketExists = async (bucketName: string): Promise<string | null> => {
  try {
    // Try to get bucket details
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    if (error) {
      if (error.message.includes('The resource was not found')) {
        return `Bucket "${bucketName}" does not exist. Please create it in Supabase storage.`;
      }
      return `Error checking bucket: ${error.message}`;
    }
    
    if (!data) {
      return `Bucket "${bucketName}" not found`;
    }
    
    return null; // Bucket exists, no error
  } catch (error: any) {
    console.error('Error checking bucket:', error);
    return error.message || 'Error checking storage bucket';
  }
};
