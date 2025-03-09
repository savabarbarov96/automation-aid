
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/BlogForm";
import { BlogPostList } from "@/components/BlogPostList";
import { Navbar } from "@/components/Navbar";
import { BlogPost } from "@/types/blog";
import { UserAdmin } from "@/components/users/UserAdmin";
import { logout } from "@/lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { FileEdit, Users, LogOut, Briefcase, ArrowLeft } from "lucide-react";

const BlogAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handlePostEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
    setError(null);
  };

  const handleNewPost = () => {
    setCurrentPost(null);
    setIsEditing(true);
    setError(null);
  };

  const handleBackToList = () => {
    setIsEditing(false);
    setCurrentPost(null);
    setError(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Успешно излизане",
        description: "Вие се отписахте успешно от системата."
      });
      navigate('/login');
    } catch (error: any) {
      console.error("Logout error:", error);
      setError(error.message || "Error during logout");
      toast({
        title: "Грешка при излизане",
        description: "Възникна проблем при отписването. Моля, опитайте отново.",
        variant: "destructive"
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="bg-destructive/10 p-6 rounded-lg border border-destructive mb-6">
            <h2 className="text-xl font-semibold text-destructive mb-2">Възникна грешка</h2>
            <p className="mb-4">{error}</p>
            <Button variant="outline" onClick={() => setError(null)}>
              Опитайте отново
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-foreground">Администраторски панел</h1>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
            >
              <Link to="/work-admin">
                <Briefcase className="h-4 w-4" /> Управление на проекти
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Изход
            </Button>
          </div>
        </div>

        {isEditing ? (
          <div>
            <Button 
              onClick={handleBackToList} 
              variant="outline" 
              className="mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Назад към списъка
            </Button>
            <Card>
              <CardContent className="p-6">
                <BlogForm 
                  currentPost={currentPost} 
                  onSuccess={handleBackToList} 
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="posts" className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" /> Публикации
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Потребители
                </TabsTrigger>
              </TabsList>
              
              {activeTab === "posts" && (
                <Button onClick={handleNewPost}>
                  + Нова публикация
                </Button>
              )}
            </div>
            
            <TabsContent value="posts">
              <BlogPostList onEdit={handlePostEdit} />
            </TabsContent>
            
            <TabsContent value="users">
              <UserAdmin />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
