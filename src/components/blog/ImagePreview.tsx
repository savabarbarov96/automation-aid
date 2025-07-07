
import { Label } from "@/components/ui/label";

interface ImagePreviewProps {
  imageUrl: string;
}

export const ImagePreview = ({ imageUrl }: ImagePreviewProps) => {
  if (!imageUrl) return null;
  
  return (
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
  );
};
