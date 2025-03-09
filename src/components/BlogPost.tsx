
import { formatDate } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

export const BlogPost = ({ post }) => {
  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto">
      {post.featured_image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-auto"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-white/60">
        <div>Автор: {post.author}</div>
        <div>
          Публикувано: {formatDate(post.published_at || post.created_at)}
        </div>
        {post.category && (
          <div className="px-2 py-1 bg-primary/10 text-primary rounded-full">
            {post.category}
          </div>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-muted text-white/70 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg prose-invert max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};
