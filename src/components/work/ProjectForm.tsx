import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/work";
import { useProjectForm } from "./hooks/useProjectForm";
import { ProjectBasicInfo } from "./components/ProjectBasicInfo";
import { ProjectCategorySelect } from "./components/ProjectCategorySelect";
import { ProjectImageUploader } from "./components/ProjectImageUploader";
import { ProjectGalleryManager } from "./components/ProjectGalleryManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Check, ExternalLink, AlertTriangle, FileText, Image as ImageIcon, Tag, Images } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProjectFormProps {
  currentProject: Project | null;
  onSuccess: () => void;
}

export const ProjectForm = ({ currentProject, onSuccess }: ProjectFormProps) => {
  const {
    loading,
    categories,
    uploadError,
    formData,
    setUploadError,
    handleChange,
    handleCategoryChange,
    handleImageChange,
    handleSubmit
  } = useProjectForm(currentProject, onSuccess);

  const [activeTab, setActiveTab] = useState("basic");

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Basic info (3 fields)
    totalFields += 3;
    if (formData.title) completedFields++;
    if (formData.link) completedFields++;
    if (formData.description) completedFields++;

    // Media (2 fields)
    totalFields += 2;
    if (formData.image) completedFields++;
    if (formData.category) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  // Validation states
  const isBasicInfoComplete = formData.title && formData.link;
  const isMediaComplete = formData.image && formData.category;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {currentProject ? "Редактиране на проект" : "Нов проект"}
          </h2>
          <p className="text-muted-foreground">
            {currentProject 
              ? "Редактирайте съдържанието и настройките на съществуващ проект" 
              : "Създайте нов проект за вашето портфолио"}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{getCompletionPercentage()}% готово</span>
          <Progress value={getCompletionPercentage()} className="w-[120px]" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Основна информация</span>
              {!isBasicInfoComplete && (
                <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
              )}
              {isBasicInfoComplete && (
                <Check className="h-4 w-4 text-green-500 ml-auto" />
              )}
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Медия и категория</span>
              {!isMediaComplete && (
                <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
              )}
              {isMediaComplete && (
                <Check className="h-4 w-4 text-green-500 ml-auto" />
              )}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              <span>Галерия</span>
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="basic" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> 
                    Основна информация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectBasicInfo 
                    formData={formData} 
                    handleChange={handleChange} 
                  />
                </CardContent>
              </Card>

              {!isBasicInfoComplete && (
                <Alert className="bg-amber-500/10 border-amber-500/20">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-500">
                    Моля, попълнете всички задължителни полета
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={() => setActiveTab("media")}
                >
                  Продължете към медия
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary" /> 
                    Медия и категория
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProjectCategorySelect 
                    selectedCategory={formData.category} 
                    categories={categories}
                    onCategoryChange={handleCategoryChange}
                  />

                  <ProjectImageUploader 
                    initialImage={formData.image}
                    onImageUploaded={handleImageChange}
                    uploadError={uploadError}
                  />

                  {formData.image && formData.title && (
                    <div className="mt-6 border border-border/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-3">Преглед на проекта</h3>
                      <div className="bg-muted/30 rounded-lg overflow-hidden">
                        <div className="aspect-video w-full rounded-t-lg overflow-hidden">
                          <img 
                            src={formData.image} 
                            alt={formData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-sm text-primary font-medium">
                            {formData.category || "Категория"}
                          </div>
                          <h4 className="text-lg font-semibold mb-2">{formData.title}</h4>
                          {formData.description && (
                            <p className="text-muted-foreground text-sm mb-3">{formData.description}</p>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-2 text-primary"
                          >
                            Разгледай Проекта <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("basic")}
                >
                  Назад
                </Button>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("gallery")}
                  >
                    Продължете към галерия
                  </Button>
                  <Button type="submit" disabled={loading || categories.length === 0}>
                    {loading ? "Запазване..." : currentProject ? "Обнови проекта" : "Създай проект"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6 mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Images className="h-4 w-4 text-primary" /> 
                    Галерия на проекта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ProjectGalleryManager 
                    gallery={formData.gallery || []}
                    onGalleryChange={(gallery) => {
                      // Update formData with new gallery
                      handleChange({
                        target: { name: 'gallery', value: gallery }
                      } as any);
                    }}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("media")}
                >
                  Назад
                </Button>
                <Button type="submit" disabled={loading || categories.length === 0}>
                  {loading ? "Запазване..." : currentProject ? "Обнови проекта" : "Създай проект"}
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </form>
    </div>
  );
};
