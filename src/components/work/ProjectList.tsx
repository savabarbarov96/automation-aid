import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Project } from "@/types/work";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface ProjectListProps {
  onEdit: (project: Project) => void;
}

export const ProjectList = ({ onEdit }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProjects(data as Project[] || []);
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на проекти.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете този проект?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));
      
      toast({
        title: "Проектът е изтрит",
        description: "Проектът беше успешно изтрит."
      });
    } catch (error: any) {
      console.error("Error deleting project:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно изтриване на проекта.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-10">Няма проекти. Създайте първия.</div>;
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-card p-4 rounded-lg border border-muted">
          <div className="flex flex-col md:flex-row gap-4">
            {project.image && (
              <div className="w-full md:w-48 h-32 overflow-hidden rounded-md">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-white">
                {project.title}
                <span className="ml-2 text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full">
                  {project.category}
                </span>
              </h2>
              {project.description && (
                <p className="text-muted-foreground mt-2">{project.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                <a 
                  href={project.link && project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <ExternalLink size={14} /> Отвори линк
                </a>
                {project.created_at && (
                  <span className="text-sm text-muted-foreground">
                    Създаден на: {formatDate(project.created_at)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(project)}
              className="flex items-center gap-1"
            >
              <Pencil size={14} /> Редактирай
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(project.id as string)}
              className="flex items-center gap-1"
            >
              <Trash2 size={14} /> Изтрий
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
