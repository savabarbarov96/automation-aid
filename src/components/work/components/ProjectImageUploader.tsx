import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Image as ImageIcon } from "lucide-react";
import { ImageUploader } from "@/components/blog/ImageUploader";
import { Card } from "@/components/ui/card";

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
    <div className="space-y-3">
      <Label className="flex items-center gap-2 mb-1.5">
        <ImageIcon className="h-4 w-4 text-primary" />
        Изображение на проекта
      </Label>
      {uploadError && (
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      <Card className="border border-dashed border-border/50 bg-background/50 hover:bg-background/80 transition-colors p-4">
        <ImageUploader 
          initialImage={initialImage}
          onImageUploaded={onImageUploaded}
          bucketName="blog-images"
          folderPath="projects/"
        />
      </Card>
      <p className="text-xs text-muted-foreground mt-2">
        Препоръчителен размер: 1200x800 пиксела. Използвайте изображения с високо качество.
      </p>
    </div>
  );
};
