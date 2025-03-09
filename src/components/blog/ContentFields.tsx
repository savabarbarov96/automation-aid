import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "./ImageUploader";
import { RichTextEditor } from "./RichTextEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Hash, Bookmark } from "lucide-react";

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
    const tagsArray = e.target.value.split(",").map(tag => tag.trim()).filter(Boolean);
    onTagsChange(tagsArray);
  };

  const popularCategories = [
    "Технологии", "Бизнес", "Маркетинг", "Автоматизация", 
    "AI", "Приложения", "Съвети", "Новини"
  ];

  return (
    <div className="space-y-8">
      <div>
        <Label htmlFor="excerpt" className="text-base font-medium flex items-center gap-2 mb-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          Кратко резюме
        </Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(e) => onExcerptChange(e.target.value)}
          placeholder="Кратко и завладяващо описание на публикацията (до 160 символа)"
          rows={2}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Добрите резюмета привличат повече читатели и помагат в SEO оптимизацията
        </p>
      </div>

      <div>
        <Label htmlFor="content" className="text-base font-medium flex items-center gap-2 mb-2">
          <MessageSquare className="h-4 w-4 text-primary" />
          Съдържание
        </Label>
        <RichTextEditor
          value={content}
          onChange={onContentChange}
          placeholder="Въведете съдържанието на публикацията тук..."
          minRows={12}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Поддържа се markdown форматиране. Използвайте форматиращите бутони за по-лесно редактиране.
        </p>
      </div>

      <Card className="border border-border/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Hash className="h-4 w-4 text-primary" />
            Категоризация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="category">Категория</Label>
            <Input
              id="category"
              name="category"
              value={category || ""}
              onChange={(e) => onCategoryChange(e.target.value)}
              placeholder="Изберете или въведете категория"
              list="category-suggestions"
            />
            <datalist id="category-suggestions">
              {popularCategories.map((cat, index) => (
                <option key={index} value={cat} />
              ))}
            </datalist>
            <div className="mt-2 flex flex-wrap gap-1">
              {popularCategories.map((cat, index) => (
                <Badge 
                  key={index} 
                  variant={category === cat ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => onCategoryChange(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Тагове (разделени със запетая)</Label>
            <Input
              id="tags"
              name="tags"
              value={tags ? tags.join(", ") : ""}
              onChange={handleTagsChange}
              placeholder="технологии, автоматизация, ai"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Добавете 3-5 тага, които описват съдържанието на публикацията
            </p>
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="featured_image" className="text-base font-medium flex items-center gap-2 mb-2">
          <Bookmark className="h-4 w-4 text-primary" />
          Основно изображение
        </Label>
        <ImageUploader 
          initialImage={featured_image || ""}
          onImageUploaded={onFeaturedImageChange}
          bucketName="blog-images"
          folderPath="blog/"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Препоръчителен размер: 1200x630 пиксела. Подходящото изображение увеличава ангажираността.
        </p>
      </div>
    </div>
  );
};
