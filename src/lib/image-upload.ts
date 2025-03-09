
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export type UploadStatus = "idle" | "uploading" | "error";

export const uploadImageToSupabase = async (
  file: File,
  bucketName: string,
  folderPath: string = ""
): Promise<{ url: string; error: string | null }> => {
  try {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
    const filePath = `${folderPath}${fileName}`;

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) throw error;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
  } catch (error: any) {
    console.error("Error uploading image:", error);
    
    // Set a more specific error message
    let errorMessage = error.message || "Failed to upload image.";
    if (errorMessage.includes("not found")) {
      errorMessage = `Bucket "${bucketName}" does not exist. Please contact the administrator.`;
    }
    
    return { url: "", error: errorMessage };
  }
};

export const checkBucketExists = async (bucketName: string): Promise<string | null> => {
  try {
    // Try to get bucket details
    const { data, error } = await supabase.storage.getBucket(bucketName);
    
    if (error) {
      console.warn(`Bucket ${bucketName} may not exist. Error:`, error);
      return `Warning: Storage bucket "${bucketName}" may not exist. File uploads may fail.`;
    }
    
    return null;
  } catch (err) {
    console.error("Error checking bucket:", err);
    return "Error checking storage bucket.";
  }
};
