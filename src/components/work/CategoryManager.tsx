
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Category } from "@/types/work";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

export const CategoryManager = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('project_categories')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      setCategories(data as Category[] || []);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на категории.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast({
        title: "Внимание",
        description: "Моля, въведете име на категорията.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('project_categories')
        .insert({ name: newCategory.trim() })
        .select();

      if (error) {
        throw error;
      }

      setCategories([...categories, data[0]]);
      setNewCategory("");
      
      toast({
        title: "Категорията е добавена",
        description: "Новата категория е добавена успешно."
      });
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно добавяне на категория.",
        variant: "destructive"
      });
    }
  };

  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEditing = async () => {
    if (!editingName.trim()) {
      toast({
        title: "Внимание",
        description: "Името на категорията не може да бъде празно.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('project_categories')
        .update({ name: editingName.trim() })
        .eq('id', editingId);

      if (error) {
        throw error;
      }

      setCategories(categories.map(cat => 
        cat.id === editingId ? { ...cat, name: editingName.trim() } : cat
      ));
      
      setEditingId(null);
      setEditingName("");
      
      toast({
        title: "Категорията е обновена",
        description: "Категорията беше успешно обновена."
      });
    } catch (error: any) {
      console.error("Error updating category:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно обновяване на категорията.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    // Check if category is used in any project
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id')
        .eq('category', categories.find(cat => cat.id === id)?.name)
        .limit(1);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        toast({
          title: "Не може да бъде изтрита",
          description: "Тази категория се използва в съществуващи проекти.",
          variant: "destructive"
        });
        return;
      }
    } catch (error) {
      console.error("Error checking category usage:", error);
    }

    if (!window.confirm("Сигурни ли сте, че искате да изтриете тази категория?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('project_categories')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setCategories(categories.filter(cat => cat.id !== id));
      
      toast({
        title: "Категорията е изтрита",
        description: "Категорията беше успешно изтрита."
      });
    } catch (error: any) {
      console.error("Error deleting category:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно изтриване на категорията.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <div className="flex-grow">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Ново име на категория"
          />
        </div>
        <Button onClick={handleAddCategory} className="flex items-center gap-1">
          <Plus size={16} /> Добави
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          Няма създадени категории. Добавете първата категория по-горе.
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-3 border rounded-md">
              {editingId === category.id ? (
                <div className="flex-grow flex space-x-2">
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    size="sm" 
                    onClick={saveEditing}
                    className="flex items-center gap-1"
                  >
                    <Save size={14} /> Запази
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={cancelEditing}
                    className="flex items-center gap-1"
                  >
                    <X size={14} /> Отказ
                  </Button>
                </div>
              ) : (
                <>
                  <span>{category.name}</span>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => startEditing(category)}
                      className="flex items-center gap-1"
                    >
                      <Pencil size={14} /> Редактирай
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(category.id as string)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Изтрий
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
