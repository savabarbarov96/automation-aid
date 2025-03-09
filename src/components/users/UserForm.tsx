
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/blog";

interface UserFormProps {
  currentUser: User | null;
  onSuccess: () => void;
}

export const UserForm = ({ currentUser, onSuccess }: UserFormProps) => {
  const [loading, setLoading] = useState(false);
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

    try {
      // Prepare user data for submission
      const userData: any = { ...formData };
      
      // For updates, only send password if provided
      if (!userData.password && currentUser) {
        delete userData.password;
      }

      let response;
      
      if (currentUser) {
        // Update existing user
        response = await supabase
          .from('blog_users')
          .update({
            username: userData.username,
            full_name: userData.full_name,
            email: userData.email,
            is_active: userData.is_active
          })
          .eq('id', currentUser.id);
          
        // If password is provided, update it separately
        if (userData.password) {
          const passwordResponse = await supabase
            .from('blog_users')
            .update({ password: userData.password })
            .eq('id', currentUser.id);
            
          if (passwordResponse.error) throw passwordResponse.error;
        }
      } else {
        // Create new user - password is required for new users
        response = await supabase
          .from('blog_users')
          .insert({
            username: userData.username,
            password: userData.password,
            full_name: userData.full_name,
            email: userData.email,
            is_active: userData.is_active
          });
      }

      if (response.error) {
        throw response.error;
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

        <div>
          <Label htmlFor="email">Имейл</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="example@domain.com"
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
