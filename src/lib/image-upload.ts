
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

    console.log(`Uploading file to ${bucketName}/${filePath}`);

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

    if (!data || !data.path) {
      return { url: '', error: 'No data returned from upload' };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    console.log(`File uploaded successfully. Public URL: ${publicUrl}`);
    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error('Unexpected error during upload:', error);
    return { url: '', error: error.message || 'An unexpected error occurred' };
  }
};

export const checkBucketExists = async (bucketName: string): Promise<string | null> => {
  try {
    console.log(`Checking if bucket "${bucketName}" exists...`);
    
    // Try to get a list of files from the bucket to verify access
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list();
    
    if (error) {
      console.error(`Error accessing bucket "${bucketName}":`, error);
      
      if (error.message.includes('The resource was not found') || 
          error.message.includes('does not exist')) {
        return `Bucket "${bucketName}" does not exist or is not accessible.`;
      }
      
      if (error.message.includes('Permission denied')) {
        return `Permission denied for bucket "${bucketName}". Check your storage policies.`;
      }
      
      return `Error checking bucket: ${error.message}`;
    }
    
    console.log(`Bucket "${bucketName}" exists and is accessible.`);
    return null; // Bucket exists and is accessible
  } catch (error: any) {
    console.error('Error checking bucket:', error);
    return error.message || 'Error checking storage bucket';
  }
};
