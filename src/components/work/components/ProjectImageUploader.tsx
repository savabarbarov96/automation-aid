
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ImageUploader } from "@/components/blog/ImageUploader";

interface ProjectImageUploaderProps {
  initialImage: string;
  onImageUploaded: (url: string) => void;
  uploadError: string | null;
}

export const ProjectImageUploader = ({ 
  initialImage, 
  onImageUploaded, 
  uploadError 
}: ProjectImageUploaderProps) => {
  return (
    <div>
      <Label>Изображение</Label>
      {uploadError && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      <ImageUploader 
        initialImage={initialImage}
        onImageUploaded={onImageUploaded}
        bucketName="blog-images"
        folderPath="projects/"
      />
    </div>
  );
};
