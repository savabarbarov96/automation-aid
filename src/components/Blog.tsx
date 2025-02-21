
import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Industrial Automation: 2024 Trends",
    description: "Explore the latest trends shaping the future of industrial automation, from AI integration to sustainable manufacturing practices.",
    date: "March 15, 2024",
    category: "Industry Trends",
    image: "/placeholder.svg",
    readTime: "5 min read"
  },
  {
    id: "post-2",
    title: "How RPA is Transforming Manufacturing",
    description: "Discover how Robotic Process Automation is revolutionizing manufacturing operations and improving efficiency.",
    date: "March 10, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "4 min read"
  },
  {
    id: "post-3",
    title: "Success Story: Smart Factory Implementation",
    description: "Learn how our smart factory solutions helped a leading manufacturer achieve 150% productivity increase.",
    date: "March 5, 2024",
    category: "Case Study",
    image: "/placeholder.svg",
    readTime: "6 min read"
  }
];

export const Blog = () => {
  const postRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activePostId = entry.target.id;
            // Dispatch custom event when a post becomes visible
            window.dispatchEvent(
              new CustomEvent("postInView", { detail: { postId: activePostId } })
            );
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    // Observe all post elements
    blogPosts.forEach((post) => {
      if (postRefs.current[post.id]) {
        observer.observe(postRefs.current[post.id]!);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-muted">
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            id={post.id}
            ref={(el) => (postRefs.current[post.id] = el)}
            className="scroll-mt-24"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white">{post.category}</span>
                  <span className="text-sm text-white">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl mb-2 text-white">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-white">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white">{post.date}</span>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-white">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
