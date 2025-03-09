
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { ProjectForm } from "@/components/work/ProjectForm";
import { ProjectList } from "@/components/work/ProjectList";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Project } from "@/types/work";
import { CategoryManager } from "@/components/work/CategoryManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WorkAdmin = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [editing, setEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const { user, loading } = useAuth();

  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setEditing(true);
  };
  
  const handleCreateNew = () => {
    setCurrentProject(null);
    setEditing(true);
  };
  
  const handleBack = () => {
    setEditing(false);
    setCurrentProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">Моля, влезте в системата, за да управлявате проектите.</p>
          <Button asChild>
            <Link to="/login">Вход</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Управление на Проекти</h1>
          <Button asChild variant="outline">
            <Link to="/blog-admin" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Назад към блог админ
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="projects">Проекти</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Проекти</CardTitle>
              </CardHeader>
              <CardContent>
                {editing ? (
                  <div>
                    <Button 
                      onClick={handleBack}
                      className="mb-6"
                      variant="outline"
                    >
                      ← Назад към списъка
                    </Button>
                    <ProjectForm currentProject={currentProject} onSuccess={handleBack} />
                  </div>
                ) : (
                  <div>
                    <Button 
                      onClick={handleCreateNew}
                      className="mb-6"
                    >
                      + Добави нов проект
                    </Button>
                    <ProjectList onEdit={handleEditProject} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Категории</CardTitle>
              </CardHeader>
              <CardContent>
                <CategoryManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkAdmin;
