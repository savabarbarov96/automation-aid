
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { formatDate } from "@/lib/utils";
import { BlogPost, User, BlogPostWithUser } from "@/types/blog";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

interface BlogPostListProps {
  onEdit: (post: BlogPost) => void;
}

export const BlogPostList = ({ onEdit }: BlogPostListProps) => {
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
        <Card key={post.id} className="overflow-hidden border border-border">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      {post.title}
                    </h2>
                    {post.is_published ? (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded-full">
                        <Eye size={12} /> Публикувана
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-orange-900/30 text-orange-400 rounded-full">
                        <EyeOff size={12} /> Чернова
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 space-y-1">
                    <p>
                      Автор: <span className="font-medium">{post.author}</span>
                      {post.blog_users && (
                        <span className="ml-2">(от потребител: {post.blog_users.full_name || post.blog_users.username})</span>
                      )}
                    </p>
                    <p>
                      Създадена: {formatDate(post.created_at || "")}
                      {post.published_at && post.is_published && (
                        <span className="ml-2">| Публикувана: {formatDate(post.published_at)}</span>
                      )}
                    </p>
                    {post.category && (
                      <p>
                        Категория: <span className="font-medium">{post.category}</span>
                      </p>
                    )}
                  </div>
                </div>
                
                {post.featured_image && (
                  <div className="hidden sm:block w-24 h-24 overflow-hidden rounded-md">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              
              {post.excerpt && (
                <p className="text-muted-foreground text-sm">{post.excerpt}</p>
              )}
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(post)}
                  className="flex items-center gap-1"
                >
                  <Pencil size={14} /> Редактирай
                </Button>
                <Button
                  variant={post.is_published ? "outline" : "default"}
                  size="sm"
                  onClick={() => togglePublish(post)}
                  className="flex items-center gap-1"
                >
                  {post.is_published ? (
                    <><EyeOff size={14} /> Скрий</>
                  ) : (
                    <><Eye size={14} /> Публикувай</>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(post.id as string)}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={14} /> Изтрий
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
