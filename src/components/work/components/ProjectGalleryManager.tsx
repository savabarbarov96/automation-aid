import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { GalleryItem } from "@/types/work";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Upload, ArrowUp, ArrowDown } from "lucide-react";

interface ProjectGalleryManagerProps {
  gallery: GalleryItem[];
  onGalleryChange: (gallery: GalleryItem[]) => void;
}

export const ProjectGalleryManager = ({ gallery, onGalleryChange }: ProjectGalleryManagerProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-gallery')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      toast.success("Изображението е качено успешно!");
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Грешка при качване на изображението");
    } finally {
      setUploading(false);
    }
  };

  const handleAddItem = () => {
    if (!formData.title || !formData.image) {
      toast.error("Моля попълнете заглавие и изображение");
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      order: gallery.length
    };

    onGalleryChange([...gallery, newItem]);
    setFormData({ title: "", description: "", image: "" });
    setIsDialogOpen(false);
    toast.success("Елементът е добавен успешно!");
  };

  const handleEditItem = () => {
    if (!editingItem || !formData.title || !formData.image) {
      toast.error("Моля попълнете заглавие и изображение");
      return;
    }

    const updatedGallery = gallery.map(item => 
      item.id === editingItem.id 
        ? { ...item, title: formData.title, description: formData.description, image: formData.image }
        : item
    );

    onGalleryChange(updatedGallery);
    setEditingItem(null);
    setFormData({ title: "", description: "", image: "" });
    setIsDialogOpen(false);
    toast.success("Елементът е редактиран успешно!");
  };

  const handleDeleteItem = (id: string) => {
    const updatedGallery = gallery.filter(item => item.id !== id);
    // Reorder remaining items
    const reorderedGallery = updatedGallery.map((item, index) => ({
      ...item,
      order: index
    }));
    onGalleryChange(reorderedGallery);
    toast.success("Елементът е изтрит успешно!");
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = gallery.findIndex(item => item.id === id);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= gallery.length) return;

    const newGallery = [...gallery];
    [newGallery[currentIndex], newGallery[newIndex]] = [newGallery[newIndex], newGallery[currentIndex]];
    
    // Update order numbers
    const reorderedGallery = newGallery.map((item, index) => ({
      ...item,
      order: index
    }));

    onGalleryChange(reorderedGallery);
  };

  const openEditDialog = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setFormData({ title: "", description: "", image: "" });
    setIsDialogOpen(true);
  };

  const sortedGallery = [...gallery].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Галерия на проекта</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Добави изображение
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Редактиране на елемент" : "Добавяне на нов елемент"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Заглавие</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Въведете заглавие"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Въведете описание"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image">Изображение</Label>
                <div className="space-y-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    disabled={uploading}
                  />
                  {formData.image && (
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                      <img 
                        src={formData.image} 
                        alt="Преглед" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Отказ
                </Button>
                <Button 
                  onClick={editingItem ? handleEditItem : handleAddItem}
                  disabled={uploading || !formData.title || !formData.image}
                >
                  {uploading ? "Качване..." : editingItem ? "Запази" : "Добави"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {sortedGallery.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Upload className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Все още няма добавени изображения в галерията
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedGallery.map((item, index) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="aspect-video w-24 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveItem(item.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveItem(item.id, 'down')}
                        disabled={index === sortedGallery.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 