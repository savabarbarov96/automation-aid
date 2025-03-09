
import { useState } from "react";
import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { Button } from "@/components/ui/button";

export const UserAdmin = () => {
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const handleEditUser = (user) => {
    setCurrentUser(user);
    setEditing(true);
  };
  
  const handleCreateNew = () => {
    setCurrentUser(null);
    setEditing(true);
  };
  
  const handleBack = () => {
    setEditing(false);
    setCurrentUser(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Управление на потребители</h2>
      
      {editing ? (
        <div>
          <Button 
            onClick={handleBack}
            className="mb-6 bg-muted hover:bg-muted/80 text-white"
          >
            ← Назад към списъка
          </Button>
          <UserForm currentUser={currentUser} onSuccess={handleBack} />
        </div>
      ) : (
        <div>
          <Button 
            onClick={handleCreateNew}
            className="mb-6 bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            + Създай нов потребител
          </Button>
          <UsersList onEdit={handleEditUser} />
        </div>
      )}
    </div>
  );
};
