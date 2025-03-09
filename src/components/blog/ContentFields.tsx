
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "./ImageUploader";

interface ContentFieldsProps {
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string[];
  onExcerptChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onFeaturedImageChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagsChange: (value: string[]) => void;
}

export const ContentFields = ({
  excerpt,
  content,
  featured_image,
  category,
  tags,
  onExcerptChange,
  onContentChange,
  onFeaturedImageChange,
  onCategoryChange,
  onTagsChange
}: ContentFieldsProps) => {
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
    onTagsChange(tagsArray);
  };

  console.log("ContentFields rendering with featured_image:", featured_image);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="excerpt">Кратко резюме</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Кратко резюме на публикацията"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="content">Съдържание</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Съдържание на публикацията..."
          rows={10}
          required
        />
        <p className="text-xs text-muted-foreground mt-1">
          Поддържа се markdown форматиране.
        </p>
      </div>

      <div>
        <Label htmlFor="featured_image">Основно изображение</Label>
        <ImageUploader 
          initialImage={featured_image || ""}
          onImageUploaded={onFeaturedImageChange}
          bucketName="blog-images"
          folderPath="blog/"
        />
      </div>

      <div>
        <Label htmlFor="category">Категория</Label>
        <Input
          id="category"
          name="category"
          value={category || ""}
          onChange={(e) => onCategoryChange(e.target.value)}
          placeholder="Категория"
        />
      </div>

      <div>
        <Label htmlFor="tags">Тагове (разделени със запетая)</Label>
        <Input
          id="tags"
          name="tags"
          value={tags ? tags.join(", ") : ""}
          onChange={handleTagsChange}
          placeholder="таг1, таг2, таг3"
        />
      </div>
    </div>
  );
};
