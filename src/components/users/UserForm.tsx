
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
      // First handle the Supabase Auth operations
      if (currentUser) {
        // Update existing user
        if (formData.password) {
          // TODO: Handle password reset if needed
          console.log("Password updates through admin panel are not yet supported");
        }
      } else {
        // For new users, create them in Auth
        if (!formData.email) {
          throw new Error("Email is required for new users");
        }
        
        if (!formData.password) {
          throw new Error("Password is required for new users");
        }
        
        // Create the user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: formData.email,
          password: formData.password,
          email_confirm: true
        });
        
        if (authError) {
          // If there's an auth error but it's just that the user already exists, we can proceed
          if (!authError.message.includes("already exists")) {
            throw authError;
          }
        }
        
        // If user was created successfully, use the new user's ID
        if (authData?.user) {
          formData.id = authData.user.id;
        }
      }
      
      // Now handle the blog_users operations
      let response;
      
      if (currentUser) {
        // Update existing user in blog_users
        const dataToUpdate = {
          username: formData.username,
          full_name: formData.full_name,
          email: formData.email,
          is_active: formData.is_active
        };
        
        response = await supabase
          .from('blog_users')
          .update(dataToUpdate)
          .eq('id', currentUser.id);
      } else {
        // Create new user in blog_users
        const dataToInsert = {
          id: formData.id, // This will be the UUID from Auth
          username: formData.username,
          full_name: formData.full_name,
          email: formData.email,
          is_active: formData.is_active,
          password: formData.password // This is stored for reference only, not for auth
        };
        
        response = await supabase
          .from('blog_users')
          .insert(dataToInsert);
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
            Имейлът се използва за вход в системата
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
