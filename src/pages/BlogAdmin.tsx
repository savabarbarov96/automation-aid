
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { BlogForm } from "@/components/BlogForm";
import { BlogPostList } from "@/components/BlogPostList";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Блог Админ Панел</h1>
          
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
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
