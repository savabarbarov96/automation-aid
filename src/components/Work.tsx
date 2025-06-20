import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight, ExternalLink, Eye } from "lucide-react";
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

        if (projectsError) {
          console.error("Error fetching projects:", projectsError);
          
          // Fallback projects data if we encounter permission errors
          if (projectsError.code === '42501' || projectsError.message.includes('permission denied')) {
            const fallbackProjects = [
              {
                id: '1',
                title: 'AI-Powered Customer Support',
                category: 'AI Integration',
                image: '/images/work/project1.jpg',
                link: 'https://example.com/project1',
                description: 'Автоматизирана система за обслужване на клиенти с изкуствен интелект',
                created_at: new Date().toISOString()
              },
              {
                id: '2',
                title: 'Workflow Automation Platform',
                category: 'Automation',
                image: '/images/work/project2.jpg',
                link: 'https://example.com/project2',
                description: 'Платформа за автоматизация на работни процеси',
                created_at: new Date().toISOString()
              },
              {
                id: '3',
                title: 'Smart Inventory Management',
                category: 'Software Development',
                image: '/images/work/project3.jpg',
                link: 'https://example.com/project3',
                description: 'Интелигентна система за управление на инвентара',
                created_at: new Date().toISOString()
              }
            ];
            setProjects(fallbackProjects);
            setCategories(["All", "AI Integration", "Automation", "Software Development"]);
            setLoading(false);
            return;
          }
          throw projectsError;
        }
        
        // Use projects data if available, otherwise fallback
        if (projectsData && projectsData.length > 0) {
          setProjects(projectsData as Project[] || []);
          
          // Fetch categories
          const { data: categoriesData, error: categoriesError } = await supabase
            .from('project_categories')
            .select('name')
            .order('name');
            
          if (categoriesError) {
            console.error("Error fetching categories:", categoriesError);
            // Fallback categories based on projects
            const projectCategories = [...new Set(projectsData.map(project => project.category))];
            setCategories(["All", ...projectCategories]);
          } else {
            // Extract unique categories and add "All"
            const uniqueCategories = ["All", ...categoriesData.map((cat: any) => cat.name)];
            setCategories(uniqueCategories);
          }
        } else {
          // Fallback projects if no data
          const fallbackProjects = [
            {
              id: '1',
              title: 'AI-Powered Customer Support',
              category: 'AI Integration',
              image: '/images/work/project1.jpg',
              link: 'https://example.com/project1',
              description: 'Автоматизирана система за обслужване на клиенти с изкуствен интелект',
              created_at: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Workflow Automation Platform',
              category: 'Automation',
              image: '/images/work/project2.jpg',
              link: 'https://example.com/project2',
              description: 'Платформа за автоматизация на работни процеси',
              created_at: new Date().toISOString()
            },
            {
              id: '3',
              title: 'Smart Inventory Management',
              category: 'Software Development',
              image: '/images/work/project3.jpg',
              link: 'https://example.com/project3',
              description: 'Интелигентна система за управление на инвентара',
              created_at: new Date().toISOString()
            }
          ];
          setProjects(fallbackProjects);
          setCategories(["All", "AI Integration", "Automation", "Software Development"]);
        }
      } catch (error) {
        console.error("Error fetching work data:", error);
        // Fallback projects for any other errors
        const fallbackProjects = [
          {
            id: '1',
            title: 'AI-Powered Customer Support',
            category: 'AI Integration',
            image: '/images/work/project1.jpg',
            link: 'https://example.com/project1',
            description: 'Автоматизирана система за обслужване на клиенти с изкуствен интелект',
            created_at: new Date().toISOString()
          },
          {
            id: '2',
            title: 'Workflow Automation Platform',
            category: 'Automation',
            image: '/images/work/project2.jpg',
            link: 'https://example.com/project2',
            description: 'Платформа за автоматизация на работни процеси',
            created_at: new Date().toISOString()
          },
          {
            id: '3',
            title: 'Smart Inventory Management',
            category: 'Software Development',
            image: '/images/work/project3.jpg',
            link: 'https://example.com/project3',
            description: 'Интелигентна система за управление на инвентара',
            created_at: new Date().toISOString()
          }
        ];
        setProjects(fallbackProjects);
        setCategories(["All", "AI Integration", "Automation", "Software Development"]);
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
                className="group bg-cool-100/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl shadow-lg border border-white/10"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  {project.description && (
                    <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                  )}
                  <div className="flex gap-2 mt-4">
                    <a 
                      href={`/project/${project.slug || project.id}`}
                      className="inline-flex items-center gap-2 text-white bg-primary/20 hover:bg-primary px-4 py-2 rounded-lg transition-colors duration-300 flex-1 justify-center"
                    >
                      <Eye className="h-4 w-4" />
                      Детайли
                    </a>
                    <a 
                      href={project.link && project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-secondary/20 hover:bg-secondary px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
