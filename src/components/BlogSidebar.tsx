
import { useEffect, useState } from "react";

const blogPosts = [
  {
    id: "post-1",
    title: "The Future of Industrial Automation: 2024 Trends",
  },
  {
    id: "post-2",
    title: "Emerging Technologies in Manufacturing",
  },
  {
    id: "post-3",
    title: "How RPA is Transforming Manufacturing",
  },
  {
    id: "post-4",
    title: "AI in Modern Manufacturing",
  },
  {
    id: "post-5",
    title: "Success Story: Smart Factory Implementation",
  },
  {
    id: "post-6",
    title: "Digital Transformation Journey",
  }
];

export const BlogSidebar = () => {
  const [activePost, setActivePost] = useState<string>("post-1");

  useEffect(() => {
    const handleScroll = () => {
      const posts = document.querySelectorAll('[data-post-id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      posts.forEach((post) => {
        const element = post as HTMLElement;
        const { top, bottom } = element.getBoundingClientRect();
        const postId = element.getAttribute('data-post-id');

        if (postId && top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
          setActivePost(postId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPost = (postId: string) => {
    const element = document.querySelector(`[data-post-id="${postId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-64 min-h-screen bg-card rounded-lg p-4 sticky top-24">
      <h2 className="text-xl font-bold mb-4 text-white">Articles</h2>
      <div className="space-y-2">
        {blogPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => scrollToPost(post.id)}
            className={`w-full p-2 text-sm text-left rounded-md transition-colors ${
              activePost === post.id
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
