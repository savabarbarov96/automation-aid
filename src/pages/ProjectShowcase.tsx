import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Project, GalleryItem } from "@/types/work";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink, ArrowLeft, Users, Clock, Eye, Sparkles, BookOpen } from "lucide-react";
import { toast } from "sonner";

export const ProjectShowcase = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const metaGridRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      fetchProject(slug);
    }
  }, [slug]);

  // Scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const elements = [
      heroRef.current,
      sliderRef.current,
      descriptionRef.current,
      detailsRef.current,
      metaGridRef.current,
      techRef.current,
      ctaRef.current
    ].filter(Boolean);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [project]);

  const fetchProject = async (projectSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', projectSlug)
        .single();

      if (error) throw error;
      
      setProject(data as Project);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error("Проектът не беше намерен");
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (project?.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === project.gallery!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (project?.gallery && project.gallery.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? project.gallery!.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-white/60 text-lg">Зареждане на проекта...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-red-500/10 flex items-center justify-center">
            <Eye className="w-12 h-12 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Проектът не беше намерен</h1>
          <p className="text-white/60 text-lg">Възможно е проектът да е преместен или изтрит</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl"
          >
            Върни се към началото
          </Button>
        </div>
      </div>
    );
  }

  const sortedGallery = project.gallery ? [...project.gallery].sort((a, b) => a.order - b.order) : [];
  const hasGallery = sortedGallery.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Premium Header */}
      <div className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5"></div>
        <div className="relative container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Назад към портфолиото</span>
            </Button>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                {project.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Project Title */}
      <div ref={heroRef} className="relative py-16 px-6 scroll-fade-in">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
        <div className="relative container mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Premium Image Slider - Centerpiece */}
      <div ref={sliderRef} className="container mx-auto px-6 pb-16 scroll-scale">
        <div className="relative">
          {hasGallery ? (
            <div className="space-y-8">
              {/* Main Slider */}
              <div className="relative group">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
                  <div className="relative h-full">
                    <img
                      src={sortedGallery[currentImageIndex].image}
                      alt={sortedGallery[currentImageIndex].title}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Navigation Arrows */}
                    {sortedGallery.length > 1 && (
                      <>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                          onClick={prevImage}
                        >
                          <ChevronLeft className="h-6 w-6 text-white" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                          onClick={nextImage}
                        >
                          <ChevronRight className="h-6 w-6 text-white" />
                        </Button>
                      </>
                    )}

                    {/* Image Counter */}
                    {sortedGallery.length > 1 && (
                      <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                        <span className="text-white font-medium">
                          {currentImageIndex + 1} / {sortedGallery.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Title and Description - Moved below image */}
              <div ref={descriptionRef} className="max-w-4xl mx-auto scroll-slide-left">
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {sortedGallery[currentImageIndex].title}
                  </h3>
                  {sortedGallery[currentImageIndex].description && (
                    <p className="text-white/80 text-lg leading-relaxed">
                      {sortedGallery[currentImageIndex].description}
                    </p>
                  )}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {sortedGallery.length > 1 && (
                <div className="flex justify-center">
                  <div className="flex gap-3 p-4 bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 max-w-full overflow-x-auto">
                    {sortedGallery.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-20 h-12 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'border-primary shadow-lg shadow-primary/25 scale-110' 
                            : 'border-white/20 hover:border-white/40 hover:scale-105'
                        }`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Fallback to main project image with premium styling
            <div className="space-y-8">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 shadow-2xl">
                <div className="relative h-full group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Image Title and Description - Below image */}
              <div ref={descriptionRef} className="max-w-4xl mx-auto scroll-slide-left">
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-2">Основно изображение</h3>
                  <p className="text-white/80 text-lg">Представяне на проекта</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Details Card */}
          <Card ref={detailsRef} className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden scroll-fade-in">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Детайли на проекта</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Project Description */}
                {(project.description || project.detailed_description) && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white/90">Описание</h3>
                    <div className="space-y-4">
                      {project.description && (
                        <div className="text-white/70 text-lg leading-relaxed">
                          <div 
                            className="[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:space-y-2 [&>strong]:font-bold [&>strong]:text-white/90 [&>em]:italic [&>br]:block [&>br]:mb-2"
                            dangerouslySetInnerHTML={{ 
                            __html: project.description
                              .replace(/\n\n/g, '<br><br>')
                              .replace(/\n/g, '<br>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/^- (.+)/gm, '<li>$1</li>')
                              .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
                              .replace(/^(\d+\. .+)/gm, '<li>$1</li>')
                              .replace(/(<li>\d+\. .*?<\/li>)/gs, '<ol>$1</ol>')
                          }} />
                        </div>
                      )}
                      {project.detailed_description && (
                        <div className="text-white/70 text-lg leading-relaxed">
                          <div 
                            className="[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:space-y-2 [&>strong]:font-bold [&>strong]:text-white/90 [&>em]:italic [&>br]:block [&>br]:mb-2"
                            dangerouslySetInnerHTML={{ 
                            __html: project.detailed_description
                              .replace(/\n\n/g, '<br><br>')
                              .replace(/\n/g, '<br>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em>$1</em>')
                              .replace(/^- (.+)/gm, '<li>$1</li>')
                              .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
                              .replace(/^(\d+\. .+)/gm, '<li>$1</li>')
                              .replace(/(<li>\d+\. .*?<\/li>)/gs, '<ol>$1</ol>')
                          }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Project Meta Grid */}
                <div ref={metaGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-slide-right">
                  {project.client && (
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="space-y-2">
                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Клиент</p>
                        <p className="text-white text-lg font-semibold">{project.client}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.duration && (
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Продължителност</p>
                        </div>
                        <p className="text-white text-lg font-semibold">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.team_size && (
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" />
                          <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Екип</p>
                        </div>
                        <p className="text-white text-lg font-semibold">{project.team_size} човека</p>
                      </div>
                    </div>
                  )}
                  
                  {project.status && project.status !== 'in_progress' && (
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <div className="space-y-2">
                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">Статус</p>
                        <Badge variant={
                          project.status === 'completed' ? 'default' : 
                          project.status === 'active' ? 'secondary' : 'outline'
                        } className="text-lg px-3 py-1">
                          {project.status === 'completed' ? 'Завършен' : 
                           project.status === 'active' ? 'Активен' : 'В процес'}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div ref={techRef} className="space-y-4 scroll-fade-in">
                    <h3 className="text-xl font-semibold text-white/90">Използвани технологии</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-4 py-2 text-base"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div ref={ctaRef} className="text-center space-y-4 scroll-scale">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
              >
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <ExternalLink className="h-6 w-6" />
                  Разгледай проекта на живо
                </a>
              </Button>
              
              {project.documentation_url && (
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline"
                  className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-12 py-6 rounded-2xl text-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <a 
                    href={project.documentation_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <BookOpen className="h-6 w-6" />
                    Документация
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 