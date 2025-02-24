
import { useNavigate, useParams } from "react-router-dom";
import { blogPosts } from "./Blog";

export const BlogSidebar = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const handlePostClick = (postSlug: string) => {
    navigate(`/resources/${postSlug}`);
  };

  return (
    <div className="sticky top-24 w-64 bg-card rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Resources</h2>
      <div className="space-y-2">
        {blogPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            className={`w-full text-left p-2 rounded-md transition-colors ${
              slug === post.slug
                ? "bg-primary text-primary-foreground"
                : "text-white hover:bg-muted"
            }`}
          >
            {post.title}
          </button>
        ))}
      </div>
    </div>
  );
};
