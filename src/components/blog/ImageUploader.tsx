
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

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

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

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
      
      toast({
        title: "Грешка при качване",
        description: error.message || "Неуспешно качване на изображението.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
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
