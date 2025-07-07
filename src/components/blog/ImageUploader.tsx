
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ImageFileUploader } from "./ImageFileUploader";
import { ImageUrlInput } from "./ImageUrlInput";
import { ImagePreview } from "./ImagePreview";
import { checkBucketExists, UploadStatus } from "@/lib/image-upload";

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
  const [imageUrl, setImageUrl] = useState(initialImage || "");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  // Check if the storage bucket exists
  useEffect(() => {
    const verifyBucket = async () => {
      try {
        const bucketError = await checkBucketExists(bucketName);
        if (bucketError) {
          console.error("Bucket error:", bucketError);
          setError(bucketError);
        } else {
          setError(null);
        }
      } catch (err: any) {
        console.error("Bucket check error:", err);
        setError(err.message || "Error checking bucket");
      }
    };
    
    verifyBucket();
  }, [bucketName]);

  const handleUrlChange = (url: string) => {
    setImageUrl(url);
    onImageUploaded(url);
  };

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
    onImageUploaded(url);
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <ImageFileUploader
        bucketName={bucketName}
        folderPath={folderPath}
        onImageUploaded={handleImageUploaded}
        setUploadStatus={setUploadStatus}
      />

      <ImageUrlInput 
        imageUrl={imageUrl} 
        onUrlChange={handleUrlChange} 
      />

      <ImagePreview imageUrl={imageUrl} />
    </div>
  );
};
