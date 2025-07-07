import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserIcon, Mail, Calendar, Pencil, Power, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface UsersListProps {
  onEdit: (user: User) => void;
}

export const UsersList = ({ onEdit }: UsersListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data as User[] || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на потребители.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете този потребител?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_users')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      
      toast({
        title: "Потребителят е изтрит",
        description: "Потребителят беше успешно изтрит.",
      });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "Грешка",
        description: error.message || "Неуспешно изтриване на потребителя.",
        variant: "destructive"
      });
    }
  };

  const toggleActive = async (user: User) => {
    try {
      const updates = {
        is_active: !user.is_active
      };

      const { error } = await supabase
        .from('blog_users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, ...updates } : u
        )
      );

      toast({
        title: updates.is_active ? "Потребителят е активиран" : "Потребителят е деактивиран",
        description: updates.is_active 
          ? "Потребителят вече може да бъде избран като автор." 
          : "Потребителят вече не може да бъде избран като автор."
      });
    } catch (error: any) {
      console.error("Error toggling user status:", error);
      toast({
        title: "Грешка",
        description: error.message || "Неуспешна промяна на статуса на потребителя.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary/70" />
        <p className="text-lg font-medium">Зареждане на потребители...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border border-dashed border-border rounded-lg bg-muted/20">
        <UserIcon className="h-12 w-12 mb-4 text-muted-foreground/50" />
        <p className="text-lg font-medium mb-1">Няма потребители</p>
        <p className="text-sm">Използвайте бутона "Нов потребител", за да създадете първия.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-5">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {user.full_name || user.username}
                  </h2>
                  {user.is_active ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                      Активен
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-600 hover:bg-red-700">
                      Неактивен
                    </Badge>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1.5">
                  <p className="flex items-center gap-1.5">
                    <UserIcon size={14} className="text-muted-foreground/70" />
                    <span>Потребител: {user.username}</span>
                  </p>
                  
                  {user.email && (
                    <p className="flex items-center gap-1.5">
                      <Mail size={14} className="text-muted-foreground/70" />
                      <span>{user.email}</span>
                    </p>
                  )}
                  
                  <p className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-muted-foreground/70" />
                    <span>Създаден: {formatDate(user.created_at)}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-2 p-3 bg-muted/10 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
              className="flex items-center gap-1 h-8"
            >
              <Pencil size={14} /> Редактирай
            </Button>
            <Button
              variant={user.is_active ? "outline" : "default"}
              size="sm"
              onClick={() => toggleActive(user)}
              className="flex items-center gap-1 h-8"
            >
              <Power size={14} />
              {user.is_active ? "Деактивирай" : "Активирай"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(user.id)}
              className="flex items-center gap-1 h-8"
            >
              <Trash2 size={14} /> Изтрий
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
