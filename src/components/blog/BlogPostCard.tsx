import { formatDate } from "@/lib/utils";
import { BlogPostWithUser } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, Trash2, Calendar, User, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    <Card key={post.id} className="overflow-hidden border border-border hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {post.featured_image && (
            <div className="w-full md:w-48 h-48 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-border">
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="flex-1 p-5">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-xl font-semibold text-foreground">
                      {post.title}
                    </h2>
                    {post.is_published ? (
                      <Badge variant="default" className="inline-flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700">
                        <Eye size={12} /> Публикувана
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="inline-flex items-center gap-1 text-xs bg-orange-600 hover:bg-orange-700">
                        <EyeOff size={12} /> Чернова
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1.5">
                    <p className="flex items-center gap-1.5">
                      <User size={14} className="text-muted-foreground/70" />
                      <span className="font-medium">{post.author}</span>
                      {post.blog_users && (
                        <span className="text-xs opacity-80">(потребител: {post.blog_users.full_name || post.blog_users.username})</span>
                      )}
                    </p>
                    
                    <p className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-muted-foreground/70" />
                      <span>Създадена: {formatDate(post.created_at || "")}</span>
                      {post.published_at && post.is_published && (
                        <span className="text-xs opacity-80">Публикувана: {formatDate(post.published_at)}</span>
                      )}
                    </p>
                    
                    {post.category && (
                      <p className="flex items-center gap-1.5">
                        <Tag size={14} className="text-muted-foreground/70" />
                        <span className="font-medium">{post.category}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {post.excerpt && (
                <>
                  <Separator />
                  <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 p-3 bg-muted/10 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="flex items-center gap-1 h-8"
        >
          <Pencil size={14} /> Редактирай
        </Button>
        <Button
          variant={post.is_published ? "outline" : "default"}
          size="sm"
          onClick={onTogglePublish}
          className="flex items-center gap-1 h-8"
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
          className="flex items-center gap-1 h-8"
        >
          <Trash2 size={14} /> Изтрий
        </Button>
      </CardFooter>
    </Card>
  );
};
