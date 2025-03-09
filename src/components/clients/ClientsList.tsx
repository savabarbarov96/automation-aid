import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Loader2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo: string;
  created_at: string;
}

interface ClientsListProps {
  onEdit: (client: Client) => void;
}

export const ClientsList = ({ onEdit }: ClientsListProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setClients(data as Client[] || []);
    } catch (error: any) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на клиенти.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете този клиент?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
      
      setClients((prev) => prev.filter((client) => client.id !== id));
      
      toast({
        title: "Клиентът е изтрит",
        description: "Клиентът беше успешно изтрит."
      });
    } catch (error: any) {
      console.error("Error deleting client:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно изтриване на клиента.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary/70" />
        <p className="text-lg font-medium">Зареждане на клиенти...</p>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border border-dashed border-border rounded-lg bg-muted/20">
        <p className="text-lg font-medium mb-1">Няма клиенти</p>
        <p className="text-sm">Използвайте бутона "Нов клиент", за да добавите първия.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {clients.map((client) => (
        <Card key={client.id} className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-0">
            <div className="bg-white p-6 rounded-t-lg border-b border-white/10 flex items-center justify-center h-40">
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{client.name}</h3>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(client)}
                  className="flex items-center gap-1 h-8"
                >
                  <Pencil size={14} /> Редактирай
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(client.id)}
                  className="flex items-center gap-1 h-8"
                >
                  <Trash2 size={14} /> Изтрий
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 