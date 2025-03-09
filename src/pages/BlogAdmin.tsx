
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
import { FileEdit, Users, LogOut, Briefcase } from "lucide-react";

const BlogAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();

  const handlePostEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleNewPost = () => {
    setCurrentPost(null);
    setIsEditing(true);
  };

  const handleBackToList = () => {
    setIsEditing(false);
    setCurrentPost(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Успешно излизане",
        description: "Вие се отписахте успешно от системата."
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Грешка при излизане",
        description: "Възникна проблем при отписването. Моля, опитайте отново.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Администраторски панел</h1>
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
              className="mb-6"
            >
              ← Назад към списъка
            </Button>
            <BlogForm 
              initialData={currentPost} 
              onSuccess={handleBackToList} 
            />
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
