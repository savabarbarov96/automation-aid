import { formatDate } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostProps {
  post: any;
}

export const BlogPost = ({ post }: BlogPostProps) => {
  if (!post) return null;

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <article className="bg-muted/5 rounded-lg border border-border/30 overflow-hidden">
      {post.featured_image && (
        <div className="w-full h-[400px] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.category && (
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {post.category}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{post.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground border-b border-border/30 pb-6">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-primary" />
            {post.author}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            {formatDate(post.published_at || post.created_at)}
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="flex items-center gap-1 px-3 py-1 bg-muted/20 text-muted-foreground rounded-full text-xs"
              >
                <Tag className="h-3 w-3" /> {tag}
              </span>
            ))}
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none mb-8">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="border-t border-border/30 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Споделете тази публикация:
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9 bg-muted/10 hover:bg-blue-600/20 hover:text-blue-500"
                onClick={shareOnFacebook}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9 bg-muted/10 hover:bg-sky-500/20 hover:text-sky-400"
                onClick={shareOnTwitter}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full h-9 w-9 bg-muted/10 hover:bg-blue-700/20 hover:text-blue-600"
                onClick={shareOnLinkedIn}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
