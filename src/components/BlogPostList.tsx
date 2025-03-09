
import { BlogPost } from "@/types/blog";
import { useBlogPosts } from "@/hooks/use-blog-posts";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogPostsEmpty } from "@/components/blog/BlogPostsEmpty";

interface BlogPostListProps {
  onEdit: (post: BlogPost) => void;
}

export const BlogPostList = ({ onEdit }: BlogPostListProps) => {
  const { posts, loading, deletePost, togglePublish } = useBlogPosts();

  if (loading || posts.length === 0) {
    return <BlogPostsEmpty isLoading={loading} />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          onEdit={() => onEdit(post)}
          onDelete={() => deletePost(post.id as string)}
          onTogglePublish={() => togglePublish(post)}
        />
      ))}
    </div>
  );
};
