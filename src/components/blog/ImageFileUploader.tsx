
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { uploadImageToSupabase, UploadStatus } from "@/lib/image-upload";

interface ImageFileUploaderProps {
  bucketName: string;
  folderPath: string;
  onImageUploaded: (url: string) => void;
  setUploadStatus: (status: UploadStatus) => void;
}

export const ImageFileUploader = ({
  bucketName,
  folderPath,
  onImageUploaded,
  setUploadStatus
}: ImageFileUploaderProps) => {
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!fileInput) {
      toast({
        title: "Моля, изберете файл",
        description: "Не сте избрали файл за качване.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus("uploading");
    
    console.log(`Starting upload to bucket: ${bucketName}, folder: ${folderPath}`);
    
    const { url, error } = await uploadImageToSupabase(fileInput, bucketName, folderPath);
    
    if (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
      setIsUploading(false);
      toast({
        title: "Грешка при качване",
        description: error,
        variant: "destructive"
      });
      return;
    }

    console.log("Upload successful:", url);
    onImageUploaded(url);
    setUploadStatus("idle");
    setIsUploading(false);
    setFileInput(null);
    
    toast({
      title: "Изображението е качено",
      description: "Изображението е успешно качено."
    });
  };

  return (
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
        disabled={!fileInput || isUploading}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {isUploading ? "Качване..." : "Качи изображението"}
      </Button>
    </div>
  );
};
