
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export interface ImageUploaderProps {
  initialImage: string;
  onImageUploaded: (url: string) => void;
  bucketName: string;
  folderPath: string;
}

export const ImageUploader = ({ 
  initialImage = "", 
  onImageUploaded, 
  bucketName,
  folderPath = ""
}: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  // Check if the storage bucket exists
  useEffect(() => {
    const checkBucket = async () => {
      try {
        // Try to get bucket details
        const { data, error } = await supabase.storage.getBucket(bucketName);
        
        if (error) {
          console.warn(`Bucket ${bucketName} may not exist. Error:`, error);
          setError(`Warning: Storage bucket "${bucketName}" may not exist. File uploads may fail.`);
        } else {
          setError(null);
        }
      } catch (err) {
        console.error("Error checking bucket:", err);
      }
    };
    
    checkBucket();
  }, [bucketName]);

  const handleUpload = async () => {
    if (!fileInput) {
      toast({
        title: "Моля, изберете файл",
        description: "Не сте избрали файл за качване.",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploadStatus("uploading");
      setError(null);
      
      // Generate a unique file name
      const fileExt = fileInput.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
      const filePath = `${folderPath}${fileName}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, fileInput);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      onImageUploaded(publicUrl);
      setUploadStatus("idle");
      
      toast({
        title: "Изображението е качено",
        description: "Изображението е успешно качено."
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setUploadStatus("error");
      
      // Set a more specific error message
      if (error.message && error.message.includes("not found")) {
        setError(`Bucket "${bucketName}" не съществува. Моля, свържете се с администратора.`);
      } else {
        setError(error.message || "Неуспешно качване на изображението.");
      }
      
      toast({
        title: "Грешка при качване",
        description: error.message || "Неуспешно качване на изображението.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="image-upload">Изберете изображение</Label>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            setFileInput(file);
          }}
        />
        <Button 
          type="button" 
          onClick={handleUpload}
          disabled={!fileInput || uploadStatus === "uploading"}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploadStatus === "uploading" ? "Качване..." : "Качи изображението"}
        </Button>
      </div>

      <div className="mt-2">
        <Label htmlFor="image_url">Или въведете URL на изображение</Label>
        <Input
          id="image_url"
          name="image_url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            onImageUploaded(e.target.value);
          }}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {imageUrl && (
        <div className="mt-4">
          <Label>Преглед на изображението</Label>
          <div className="mt-2 border rounded-md overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
            <img 
              src={imageUrl} 
              alt="Uploaded preview" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
