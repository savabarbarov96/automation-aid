import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/BlogForm";
import { BlogPostList } from "@/components/BlogPostList";
import { Navbar } from "@/components/Navbar";
import { BlogPost } from "@/types/blog";
import { UserAdmin } from "@/components/users/UserAdmin";
import { ClientAdmin } from "@/components/clients/ClientAdmin";
import { logout, useAuth } from "@/lib/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, Users, LogOut, Briefcase, ArrowLeft, AlertCircle, Building, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const BlogAdmin = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if storage bucket exists on component mount
  useEffect(() => {
    const checkStorage = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('blog-images')
          .list();

        if (error) {
          console.error("Storage check error:", error);
          setError(`Storage error: ${error.message}. Please check your Supabase storage configuration.`);
        }
      } catch (err: any) {
        console.error("Storage bucket check failed:", err);
        setError(`Failed to access storage: ${err.message}`);
      }
    };

    checkStorage();
  }, []);

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
      console.log("Initiating logout...");
      const { error: logoutError } = await logout();
      
      if (logoutError) {
        console.error("Logout error:", logoutError);
        throw logoutError;
      }
      
      // Clear local storage as a backup measure
      localStorage.removeItem("supabase.auth.token");
      
      toast({
        title: "Успешно излизане",
        description: "Вие се отписахте успешно от системата."
      });
      
      // Force navigation to login
      navigate('/login', { replace: true });
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
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
          <Card className="border-destructive">
            <CardHeader className="bg-destructive/10 border-b border-destructive/20">
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Възникна грешка
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">{error}</p>
              <Button variant="outline" onClick={() => setError(null)}>
                Опитайте отново
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Mobile admin actions
  const adminActions = [
    { 
      label: "Управление на проекти", 
      icon: <Briefcase className="h-4 w-4" />, 
      action: () => navigate('/work-admin'),
      variant: "outline"
    },
    { 
      label: "Изход", 
      icon: <LogOut className="h-4 w-4" />, 
      action: handleLogout,
      variant: "destructive" 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-foreground">Администраторски панел</h1>
          
          {/* Desktop actions */}
          <div className="hidden sm:flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-primary/10"
              asChild
            >
              <Link to="/work-admin">
                <Briefcase className="h-4 w-4" /> Управление на проекти
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Изход
            </Button>
          </div>
          
          {/* Mobile hamburger menu */}
          <div className="sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[400px]">
                <div className="px-1 py-6 h-full flex flex-col">
                  <h2 className="text-lg font-medium mb-5">Администраторски действия</h2>
                  <div className="flex flex-col gap-2">
                    {adminActions.map((action, index) => (
                      <Button
                        key={index}
                        variant={action.variant as any}
                        className="flex items-center justify-start gap-2 text-left h-12"
                        onClick={action.action}
                      >
                        {action.icon}
                        <span>{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        <Separator className="my-6" />

        {isEditing ? (
          <div className="space-y-6">
            <Button 
              onClick={handleBackToList} 
              variant="ghost" 
              className="mb-4 flex items-center gap-2 hover:bg-secondary"
            >
              <ArrowLeft className="h-4 w-4" /> Назад към списъка
            </Button>
            <Card className="shadow-sm border-muted">
              <CardHeader className="bg-card border-b border-border/40 pb-3">
                <CardTitle className="text-xl">
                  {currentPost ? "Редактиране на публикация" : "Нова публикация"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <BlogForm 
                  currentPost={currentPost} 
                  onSuccess={handleBackToList} 
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="shadow-sm border-muted">
            <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <CardHeader className={cn(
                "pb-3 flex flex-col gap-4",
                "sm:flex-row sm:items-center sm:justify-between"
              )}>
                <TabsList className="w-full overflow-x-auto scrollbar-hide sm:w-auto flex flex-row">
                  <TabsTrigger value="posts" className="flex items-center gap-2 whitespace-nowrap px-4">
                    <FileEdit className="h-4 w-4" /> Публикации
                  </TabsTrigger>
                  <TabsTrigger value="users" className="flex items-center gap-2 whitespace-nowrap px-4">
                    <Users className="h-4 w-4" /> Потребители
                  </TabsTrigger>
                  <TabsTrigger value="clients" className="flex items-center gap-2 whitespace-nowrap px-4">
                    <Building className="h-4 w-4" /> Клиенти
                  </TabsTrigger>
                </TabsList>
                
                {activeTab === "posts" && (
                  <Button onClick={handleNewPost} className="w-full sm:w-auto">
                    + Нова публикация
                  </Button>
                )}
              </CardHeader>
              
              <CardContent className="p-4 sm:p-6 pt-4">
                <TabsContent value="posts" className="mt-0">
                  <BlogPostList onEdit={handlePostEdit} />
                </TabsContent>
                
                <TabsContent value="users" className="mt-0">
                  <UserAdmin />
                </TabsContent>

                <TabsContent value="clients" className="mt-0">
                  <ClientAdmin />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;
