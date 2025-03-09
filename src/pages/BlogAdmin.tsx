
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BlogForm } from "@/components/BlogForm";
import { BlogPostList } from "@/components/BlogPostList";
import { UserAdmin } from "@/components/users/UserAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const BlogAdmin = () => {
  const [editing, setEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  
  const handleEditPost = (post) => {
    setCurrentPost(post);
    setEditing(true);
  };
  
  const handleCreateNew = () => {
    setCurrentPost(null);
    setEditing(true);
  };
  
  const handleBack = () => {
    setEditing(false);
    setCurrentPost(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Блог Админ Панел</h1>
          
          <Tabs defaultValue="posts" className="space-y-6">
            <TabsList className="mb-6">
              <TabsTrigger value="posts">Публикации</TabsTrigger>
              <TabsTrigger value="users">Потребители</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts">
              <Card>
                <CardContent className="pt-6">
                  {editing ? (
                    <div>
                      <button 
                        onClick={handleBack}
                        className="mb-6 bg-muted hover:bg-muted/80 text-white py-2 px-4 rounded-md"
                      >
                        ← Назад към списъка
                      </button>
                      <BlogForm currentPost={currentPost} onSuccess={handleBack} />
                    </div>
                  ) : (
                    <div>
                      <button 
                        onClick={handleCreateNew}
                        className="mb-6 bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-4 rounded-md"
                      >
                        + Създай нова публикация
                      </button>
                      <BlogPostList onEdit={handleEditPost} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardContent className="pt-6">
                  <UserAdmin />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
