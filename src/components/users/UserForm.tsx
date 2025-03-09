
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/blog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface UserFormProps {
  currentUser: User | null;
  onSuccess: () => void;
}

export const UserForm = ({ currentUser, onSuccess }: UserFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<User>({
    id: "",
    username: "",
    password: "",
    full_name: "",
    email: "",
    is_active: true
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        id: currentUser.id,
        username: currentUser.username || "",
        password: "", // Don't populate password for security
        full_name: currentUser.full_name || "",
        email: currentUser.email || "",
        is_active: currentUser.is_active ?? true
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleToggleActive = (checked: boolean) => {
    setFormData({
      ...formData,
      is_active: checked
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For new users, we'll only add them to the blog_users table without auth
      // This approach is simpler and avoids permission issues
      if (currentUser) {
        // Update existing user
        const dataToUpdate = {
          username: formData.username,
          full_name: formData.full_name,
          email: formData.email,
          is_active: formData.is_active
        };
        
        // If password was provided, update it too
        if (formData.password) {
          dataToUpdate['password'] = formData.password;
        }
        
        const { error } = await supabase
          .from('blog_users')
          .update(dataToUpdate)
          .eq('id', currentUser.id);
          
        if (error) throw error;
      } else {
        // Create new user
        const dataToInsert = {
          username: formData.username,
          full_name: formData.full_name,
          email: formData.email,
          is_active: formData.is_active,
          password: formData.password // Store hashed or encrypted in production
        };
        
        const { error } = await supabase
          .from('blog_users')
          .insert(dataToInsert);
          
        if (error) throw error;
      }

      toast({
        title: currentUser ? "Потребителят е обновен" : "Потребителят е създаден",
        description: "Промените са запазени успешно.",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error saving user:", error);
      setError(error.message || "Неуспешно запазване на потребителя.");
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно запазване на потребителя.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="username">Потребителско име</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Потребителско име"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Имейл</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="example@domain.com"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Имейлът се използва за идентификация на потребителя
          </p>
        </div>

        <div>
          <Label htmlFor="password">
            {currentUser ? "Нова парола (оставете празно за да запазите текущата)" : "Парола"}
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required={!currentUser}
          />
        </div>

        <div>
          <Label htmlFor="full_name">Пълно име</Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Име и фамилия"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="is_active"
            checked={formData.is_active}
            onCheckedChange={handleToggleActive}
          />
          <Label htmlFor="is_active">Активен</Label>
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Запазване..." : currentUser ? "Обнови потребителя" : "Създай потребител"}
      </Button>
    </form>
  );
};
