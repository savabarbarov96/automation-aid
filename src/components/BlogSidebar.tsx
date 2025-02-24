
import { useNavigate, useLocation } from "react-router-dom";
import { blogPosts } from "./Blog";

export const BlogSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handlePostClick = (postSlug: string) => {
    navigate(`/resources/${postSlug}`);
  };

  return (
    <div className="sticky top-24 w-64 bg-card rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Resources</h2>
      <div className="space-y-2">
        {blogPosts.map((post) => {
          const isCurrentPost = currentPath === `/resources/${post.slug}`;
          
          return (
            <button
              key={post.id}
              onClick={() => handlePostClick(post.slug)}
              className={`w-full text-left p-2 rounded-md transition-colors ${
                isCurrentPost
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-white hover:bg-muted"
              }`}
            >
              {post.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};
