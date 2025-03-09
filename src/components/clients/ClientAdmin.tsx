import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { ClientsList } from "@/components/clients/ClientsList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo: string;
  created_at: string;
}

export const ClientAdmin = () => {
  const [editing, setEditing] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  
  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setEditing(true);
  };
  
  const handleCreateNew = () => {
    setCurrentClient(null);
    setEditing(true);
  };
  
  const handleBack = () => {
    setEditing(false);
    setCurrentClient(null);
  };

  const handleSuccess = () => {
    setEditing(false);
    setCurrentClient(null);
  };

  return (
    <div className="space-y-6">
      {editing ? (
        <div className="space-y-4">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-secondary"
          >
            ← Назад към списъка
          </Button>
          
          <ClientForm 
            currentClient={currentClient} 
            onSuccess={handleSuccess} 
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Клиенти</h2>
            <Button 
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Нов клиент
            </Button>
          </div>
          
          <ClientsList onEdit={handleEditClient} />
        </>
      )}
    </div>
  );
}; 