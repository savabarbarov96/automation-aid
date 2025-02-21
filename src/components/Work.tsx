import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type Category = "All" | "LinkedIn Solutions" | "Lead Generation" | "Marketing Automations" | "Voice Agents";

interface Project {
  title: string;
  category: Exclude<Category, "All">;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "LinkedIn Growth Strategy",
    category: "LinkedIn Solutions",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Automated Lead Generation",
    category: "Lead Generation",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "Marketing Workflow Automation",
    category: "Marketing Automations",
    image: "/placeholder.svg",
    link: "#"
  },
  {
    title: "AI Voice Assistant Integration",
    category: "Voice Agents",
    image: "/placeholder.svg",
    link: "#"
  }
];

const categories: Category[] = ["All", "LinkedIn Solutions", "Lead Generation", "Marketing Automations", "Voice Agents"];

export const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-cool-300 mb-4">
            Our Work
          </h2>
          <p className="text-cool-300/80 text-lg">
            A showcase of our minimalist designs and creative solutions.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="group bg-cool-100 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-primary mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold text-cool-300 mb-4">{project.title}</h3>
                <Button variant="ghost" className="group/button" asChild>
                  <a href={project.link}>
                    View Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
