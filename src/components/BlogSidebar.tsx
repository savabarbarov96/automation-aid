
import { useEffect, useState } from "react";
import { blogPosts } from "./Blog";

export const BlogSidebar = () => {
  const [activePostId, setActivePostId] = useState<string>(blogPosts[0].id);

  useEffect(() => {
    const handlePostInView = (event: CustomEvent<{ postId: string }>) => {
      setActivePostId(event.detail.postId);
    };

    window.addEventListener("postInView", handlePostInView as EventListener);

    return () => {
      window.removeEventListener("postInView", handlePostInView as EventListener);
    };
  }, []);

  const scrollToPost = (postId: string) => {
    const element = document.getElementById(postId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-24 w-64 bg-card rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-white">Articles</h2>
      <div className="space-y-2">
        {blogPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => scrollToPost(post.id)}
            className={`w-full text-left p-2 rounded-md transition-colors ${
              activePostId === post.id
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
