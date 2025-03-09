
import { formatDate } from "@/lib/utils";
import { BlogPostWithUser } from "@/types/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPostWithUser;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}

export const BlogPostCard = ({ 
  post, 
  onEdit, 
  onDelete, 
  onTogglePublish 
}: BlogPostCardProps) => {
  return (
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
              onClick={onEdit}
              className="flex items-center gap-1"
            >
              <Pencil size={14} /> Редактирай
            </Button>
            <Button
              variant={post.is_published ? "outline" : "default"}
              size="sm"
              onClick={onTogglePublish}
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
              onClick={onDelete}
              className="flex items-center gap-1"
            >
              <Trash2 size={14} /> Изтрий
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
