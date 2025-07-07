
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUrlInputProps {
  imageUrl: string;
  onUrlChange: (url: string) => void;
}

export const ImageUrlInput = ({ imageUrl, onUrlChange }: ImageUrlInputProps) => {
  return (
    <div className="mt-2">
      <Label htmlFor="image_url">Или въведете URL на изображение</Label>
      <Input
        id="image_url"
        name="image_url"
        value={imageUrl}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />
    </div>
  );
};
