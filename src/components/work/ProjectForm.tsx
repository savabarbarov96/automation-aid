
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Project, Category } from "@/types/work";
import { ImageUploader } from "@/components/blog/ImageUploader";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ProjectFormProps {
  currentProject: Project | null;
  onSuccess: () => void;
}

export const ProjectForm = ({ currentProject, onSuccess }: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: "",
    category: "",
    image: "",
    link: "",
    description: ""
  });

  useEffect(() => {
    fetchCategories();
    
    if (currentProject) {
      setFormData({
        id: currentProject.id,
        title: currentProject.title,
        category: currentProject.category,
        image: currentProject.image,
        link: currentProject.link,
        description: currentProject.description || ""
      });
    }
  }, [currentProject]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('project_categories')
        .select('*')
        .order('name');
        
      if (error) throw error;
      setCategories(data as Category[] || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на категории.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const handleImageChange = (url: string) => {
    setUploadError(null);
    setFormData({
      ...formData,
      image: url
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.image) {
        setUploadError("Моля, качете изображение или въведете URL");
        setLoading(false);
        return;
      }

      if (currentProject) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            title: formData.title,
            category: formData.category,
            image: formData.image,
            link: formData.link,
            description: formData.description,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentProject.id);
          
        if (error) throw error;
        
        toast({
          title: "Проектът е обновен",
          description: "Промените са запазени успешно."
        });
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert({
            title: formData.title,
            category: formData.category,
            image: formData.image,
            link: formData.link,
            description: formData.description
          });
          
        if (error) throw error;
        
        toast({
          title: "Проектът е създаден",
          description: "Новият проект е добавен успешно."
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно запазване на проекта.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Заглавие</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Заглавие на проекта"
            required
          />
        </div>

        <div>
          <Label htmlFor="category">Категория</Label>
          <Select 
            value={formData.category}
            onValueChange={handleCategoryChange}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Изберете категория" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {categories.length === 0 && (
            <Alert variant="default" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Нямате създадени категории. Моля, създайте категория от таб "Категории".
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor="link">Линк</Label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Описание (незадължително)</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Кратко описание на проекта"
            rows={3}
          />
        </div>

        <div>
          <Label>Изображение</Label>
          {uploadError && (
            <Alert variant="destructive" className="mb-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}
          <ImageUploader 
            initialImage={formData.image}
            onImageUploaded={handleImageChange}
            bucketName="blog-images"
            folderPath="projects/"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading || categories.length === 0} className="w-full">
        {loading ? "Запазване..." : currentProject ? "Обнови проекта" : "Създай проект"}
      </Button>
    </form>
  );
};
