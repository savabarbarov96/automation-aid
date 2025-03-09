
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Project, Category } from "@/types/work";

export const useProjectForm = (currentProject: Project | null, onSuccess: () => void) => {
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

  return {
    loading,
    categories,
    uploadError,
    formData,
    setUploadError,
    handleChange,
    handleCategoryChange,
    handleImageChange,
    handleSubmit
  };
};
