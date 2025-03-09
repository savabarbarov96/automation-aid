import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetadataFields } from "./blog/MetadataFields";
import { ContentFields } from "./blog/ContentFields";
import { PublishSettings } from "./blog/PublishSettings";
import { BlogFormSubmit } from "./blog/BlogFormSubmit";
import { BlogPost } from "@/types/blog";
import { useBlogForm } from "@/hooks/use-blog-form";
import { BlogFormError } from "./blog/BlogFormError";
import { FileText, MessageSquare, Image, Settings, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface BlogFormProps {
  currentPost: BlogPost | null;
  onSuccess: () => void;
}

export const BlogForm = ({ currentPost, onSuccess }: BlogFormProps) => {
  const {
    formData,
    loading,
    error,
    users,
    setError,
    updateField,
    handleSubmit
  } = useBlogForm({ currentPost, onSuccess });

  const [activeTab, setActiveTab] = useState("metadata");

  // Calculate completion percentage for each section
  const getCompletionPercentage = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Metadata section (4 fields)
    totalFields += 4;
    if (formData.title) completedFields++;
    if (formData.slug) completedFields++;
    if (formData.author) completedFields++;
    if (formData.created_by) completedFields++;

    // Content section (5 fields)
    totalFields += 5;
    if (formData.excerpt) completedFields++;
    if (formData.content) completedFields++;
    if (formData.featured_image) completedFields++;
    if (formData.category) completedFields++;
    if (formData.tags && formData.tags.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  // Validation checks
  const isMetadataComplete = formData.title && formData.slug && formData.author;
  const isContentComplete = formData.content && formData.featured_image;

  if (error) {
    return <BlogFormError error={error} onRetry={() => setError(null)} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {currentPost ? "Редактиране на публикация" : "Нова публикация"}
          </h2>
          <p className="text-muted-foreground">
            {currentPost 
              ? "Редактирайте съдържанието и настройките на съществуваща публикация" 
              : "Създайте нова публикация за вашия блог"}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{getCompletionPercentage()}% готово</span>
            <Progress value={getCompletionPercentage()} className="w-[120px]" />
          </div>
          <PublishSettings 
            isPublished={formData.is_published}
            onPublishChange={(checked) => updateField('is_published', checked)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="metadata" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Основна информация</span>
            {!isMetadataComplete && (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Съдържание</span>
            {!isContentComplete && (
              <AlertTriangle className="h-4 w-4 text-amber-500 ml-auto" />
            )}
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            <span>Медия и настройки</span>
          </TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          <TabsContent value="metadata" className="space-y-6 mt-0">
            <Card>
              <CardContent className="pt-6">
                <MetadataFields 
                  title={formData.title}
                  slug={formData.slug}
                  author={formData.author}
                  created_by={formData.created_by}
                  users={users}
                  onTitleChange={(value) => updateField('title', value)}
                  onSlugChange={(value) => updateField('slug', value)}
                  onAuthorChange={(value) => updateField('author', value)}
                  onUserChange={(value) => updateField('created_by', value)}
                  isEditing={!!currentPost}
                />
              </CardContent>
            </Card>

            {!isMetadataComplete && (
              <Alert className="bg-amber-500/10 border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-500">
                  Моля, попълнете всички задължителни полета във формата
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end">
              <Button 
                type="button" 
                onClick={() => setActiveTab("content")}
                className="w-full sm:w-auto"
              >
                Продължете към съдържание
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6 mt-0">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <ContentFields 
                      excerpt={formData.excerpt}
                      content={formData.content}
                      featured_image={formData.featured_image}
                      category={formData.category}
                      tags={formData.tags}
                      onExcerptChange={(value) => updateField('excerpt', value)}
                      onContentChange={(value) => updateField('content', value)}
                      onFeaturedImageChange={(value) => updateField('featured_image', value)}
                      onCategoryChange={(value) => updateField('category', value)}
                      onTagsChange={(value) => updateField('tags', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isContentComplete && (
              <Alert className="bg-amber-500/10 border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-500">
                  Добавете съдържание и основно изображение за по-добра публикация
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab("metadata")}
              >
                Назад към основна информация
              </Button>
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
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 gap-8">
                  {formData.featured_image && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Преглед на публикацията</h3>
                      <div className="bg-muted/30 rounded-lg p-6 border border-border">
                        <div className="aspect-video w-full mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={formData.featured_image} 
                            alt={formData.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold">{formData.title || "Заглавие на публикацията"}</h4>
                          <p className="text-muted-foreground">
                            {formData.excerpt || "Това е мястото за въвеждане на кратко резюме на публикацията"}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-primary">{formData.author || "Автор"}</span>
                            <span>•</span>
                            <span className="text-muted-foreground">
                              {formData.category || "Категория"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab("content")}
              >
                Назад към съдържание
              </Button>
              <BlogFormSubmit loading={loading} isEditing={!!currentPost} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </form>
  );
};
