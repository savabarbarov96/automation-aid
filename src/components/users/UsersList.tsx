
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { User } from "@/types/blog";

export const UsersList = ({ onEdit }) => {
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
    return <div className="text-center py-10">Зареждане...</div>;
  }

  if (users.length === 0) {
    return <div className="text-center py-10">Няма потребители. Създайте първия.</div>;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="bg-card p-4 rounded-lg border border-muted">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {user.full_name || user.username}
                {user.is_active ? (
                  <span className="ml-2 text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Активен
                  </span>
                ) : (
                  <span className="ml-2 text-xs px-2 py-1 bg-red-900/30 text-red-400 rounded-full">
                    Неактивен
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Потребител: {user.username}
              </p>
              {user.email && (
                <p className="text-sm text-muted-foreground">
                  Email: {user.email}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
            >
              Редактирай
            </Button>
            <Button
              variant={user.is_active ? "outline" : "default"}
              size="sm"
              onClick={() => toggleActive(user)}
            >
              {user.is_active ? "Деактивирай" : "Активирай"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(user.id)}
            >
              Изтрий
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
