import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ImageUploader } from "@/components/blog/ImageUploader";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Building, Image, Info, Terminal } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Client {
  id?: string;
  name: string;
  logo: string;
  created_at?: string;
}

interface ClientFormProps {
  currentClient: Client | null;
  onSuccess: () => void;
}

export const ClientForm = ({ currentClient, onSuccess }: ClientFormProps) => {
  const [formData, setFormData] = useState<Client>({
    name: currentClient?.name || "",
    logo: currentClient?.logo || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url: string) => {
    setUploadError(null);
    setFormData(prev => ({ ...prev, logo: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.logo) {
        setUploadError("Моля, качете лого на клиента");
        setLoading(false);
        return;
      }

      if (currentClient) {
        // Update existing client
        const { error } = await supabase
          .from('clients')
          .update({
            name: formData.name,
            logo: formData.logo,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentClient.id);
          
        if (error) throw error;
        
        toast({
          title: "Клиентът е обновен",
          description: "Промените са запазени успешно."
        });
      } else {
        // Create new client
        const { error } = await supabase
          .from('clients')
          .insert({
            name: formData.name,
            logo: formData.logo
          });
          
        if (error) throw error;
        
        toast({
          title: "Клиентът е създаден",
          description: "Новият клиент е добавен успешно."
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error("Error saving client:", error);
      toast({
        title: "Грешка",
        description: error.message || "Възникна грешка при запазването на клиента.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {currentClient ? "Редактиране на клиент" : "Нов клиент"}
          </CardTitle>
        </CardHeader>
        
        <Alert className="mx-6 mb-4 bg-blue-500/10 border-blue-500/30 text-blue-500">
          <Info className="h-4 w-4" />
          <AlertDescription>
            За да активирате функционалността за управление на клиенти, трябва да създадете таблицата в базата данни. 
            Изпълнете SQL скрипта от <code>supabase/migrations/clients_table.sql</code>.
          </AlertDescription>
        </Alert>
        
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-1.5">
              <Building className="h-4 w-4 text-primary" />
              Име на клиента
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Име на компанията"
              className="bg-background"
              required
            />
          </div>

          <div>
            <Label className="flex items-center gap-2 mb-1.5">
              <Image className="h-4 w-4 text-primary" />
              Лого
            </Label>
            {uploadError && (
              <p className="text-destructive text-sm mb-2">{uploadError}</p>
            )}
            <Card className="border border-dashed border-border/50 bg-background/50 hover:bg-background/80 transition-colors p-4">
              <ImageUploader 
                initialImage={formData.logo}
                onImageUploaded={handleImageChange}
                bucketName="blog-images"
                folderPath="clients/"
              />
            </Card>
            <p className="text-xs text-muted-foreground mt-2">
              Препоръчителен размер: 300x200 пиксела. Използвайте изображения с прозрачен фон (PNG).
            </p>
          </div>

          {formData.logo && (
            <div className="mt-4 p-4 bg-muted/10 rounded-lg border border-border/30">
              <h3 className="text-sm font-medium mb-3">Преглед</h3>
              <div className="bg-white p-6 rounded-xl border border-white/10 flex items-center justify-center h-40">
                <img 
                  src={formData.logo} 
                  alt={formData.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Отказ
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Запазване..." : currentClient ? "Обнови клиента" : "Създай клиент"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}; 