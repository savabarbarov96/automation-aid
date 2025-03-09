
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, BlogPostWithUser } from "@/types/blog";
import { toast } from "@/components/ui/use-toast";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPostWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          blog_users:created_by (
            id,
            username,
            full_name,
            is_active
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(data as BlogPostWithUser[] || []);
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно зареждане на публикации.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!window.confirm("Сигурни ли сте, че искате да изтриете тази публикация?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      
      toast({
        title: "Публикацията е изтрита",
        description: "Публикацията беше успешно изтрита.",
      });
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast({
        title: "Грешка",
        description: "Неуспешно изтриване на публикацията.",
        variant: "destructive"
      });
    }
  };

  const togglePublish = async (post: BlogPost) => {
    try {
      const updates = {
        is_published: !post.is_published,
        published_at: !post.is_published ? new Date().toISOString() : post.published_at,
      };

      const { error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', post.id);

      if (error) {
        throw error;
      }

      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id ? { ...p, ...updates } : p
        )
      );

      toast({
        title: updates.is_published ? "Публикацията е публикувана" : "Публикацията е скрита",
        description: updates.is_published 
          ? "Публикацията вече е видима за всички." 
          : "Публикацията вече не е видима за посетителите."
      });
    } catch (error: any) {
      console.error("Error toggling publish status:", error);
      toast({
        title: "Грешка",
        description: "Неуспешна промяна на статуса на публикацията.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    deletePost,
    togglePublish,
    fetchPosts
  };
};
