
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BlogForm } from "@/components/BlogForm";
import { BlogPostList } from "@/components/BlogPostList";
import { UserAdmin } from "@/components/users/UserAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth, logout } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { BlogPost } from "@/types/blog";

const BlogAdmin = () => {
  const [editing, setEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleEditPost = (post: BlogPost) => {
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
  
  const handleLogout = async () => {
    const { error } = await logout();
    
    if (error) {
      toast({
        title: "Грешка при излизане",
        description: "Неуспешно излизане от системата.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Излязохте успешно",
      description: "Успешно излязохте от админ панела.",
    });
    
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Блог Админ Панел</h1>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-white">
                  Здравейте, {user.full_name || user.username}
                </div>
              )}
              <Button variant="secondary" onClick={handleLogout}>
                Изход
              </Button>
            </div>
          </div>
          
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
