
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/types/work";

export const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch projects
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (projectsError) throw projectsError;
        
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('project_categories')
          .select('name')
          .order('name');
          
        if (categoriesError) throw categoriesError;
        
        setProjects(projectsData as Project[] || []);
        
        // Extract unique categories and add "All"
        const uniqueCategories = ["All", ...categoriesData.map((cat: any) => cat.name)];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching work data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id={`work`} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cool-300 mb-4">
            Нашата Работа
          </h2>
          <p className="text-cool-300/80 text-lg">
            Разгледайте някои от нашите решения и проекти
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-6 py-2 transition-all duration-300",
                selectedCategory === category 
                  ? "bg-primary shadow-lg shadow-primary/20" 
                  : "hover:bg-secondary/80"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-muted-foreground">Зареждане на проекти...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-muted-foreground">Няма проекти в тази категория.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-cool-100 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl shadow-lg border border-white/5"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary mb-2 font-medium">{project.category}</div>
                  <h3 className="text-xl font-semibold text-cool-300 mb-4">{project.title}</h3>
                  {project.description && (
                    <p className="text-cool-300/80 mb-4 line-clamp-2">{project.description}</p>
                  )}
                  <Button variant="ghost" className="group/button flex items-center gap-2">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary flex items-center gap-2"
                    >
                      Разгледай Проекта
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
