
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import { BlogPost, User } from "@/types/blog";

interface BlogPostListProps {
  onEdit: (post: BlogPost) => void;
}

export const BlogPostList = ({ onEdit }: BlogPostListProps) => {
  const [posts, setPosts] = useState<(BlogPost & { blog_users?: User })[]>([]);
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
            full_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setPosts(data || []);
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

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
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

  if (loading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">Няма публикации. Създайте първата.</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-card p-4 rounded-lg border border-muted">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {post.title}
                {post.is_published ? (
                  <span className="ml-2 text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                    Публикувана
                  </span>
                ) : (
                  <span className="ml-2 text-xs px-2 py-1 bg-orange-900/30 text-orange-400 rounded-full">
                    Чернова
                  </span>
                )}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Автор: {post.author}
                {post.blog_users && (
                  <span className="ml-2">(от потребител: {post.blog_users.full_name || post.blog_users.username})</span>
                )}
              </p>
              <p className="text-sm text-muted-foreground">
                Създадена: {formatDate(post.created_at || "")}
                {post.published_at && post.is_published && (
                  <span className="ml-2">| Публикувана: {formatDate(post.published_at)}</span>
                )}
              </p>
              {post.category && (
                <p className="text-sm text-muted-foreground">
                  Категория: {post.category}
                </p>
              )}
              {post.excerpt && (
                <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
              )}
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(post)}
            >
              Редактирай
            </Button>
            <Button
              variant={post.is_published ? "outline" : "default"}
              size="sm"
              onClick={() => togglePublish(post)}
            >
              {post.is_published ? "Скрий" : "Публикувай"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(post.id as string)}
            >
              Изтрий
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
