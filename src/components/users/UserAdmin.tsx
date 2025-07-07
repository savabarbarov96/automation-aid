import { useState } from "react";
import { UserForm } from "./UserForm";
import { UsersList } from "./UsersList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, UserPlus } from "lucide-react";

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
      {editing ? (
        <div className="space-y-4">
          <Button 
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 hover:bg-secondary"
          >
            <ArrowLeft size={16} /> Назад към списъка
          </Button>
          
          <Card className="shadow-sm border-muted">
            <CardHeader className="bg-card border-b border-border/40 pb-3">
              <CardTitle className="text-xl">
                {currentUser ? "Редактиране на потребител" : "Нов потребител"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <UserForm currentUser={currentUser} onSuccess={handleBack} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Управление на потребители</h2>
            
            <Button 
              onClick={handleCreateNew}
              className="flex items-center gap-2"
            >
              <UserPlus size={16} /> Нов потребител
            </Button>
          </div>
          
          <UsersList onEdit={handleEditUser} />
        </div>
      )}
    </div>
  );
};
