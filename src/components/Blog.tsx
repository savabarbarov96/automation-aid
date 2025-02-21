
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
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Industrial Automation: 2024 Trends",
    description: "Explore the latest trends shaping the future of industrial automation, from AI integration to sustainable manufacturing practices.",
    date: "March 15, 2024",
    category: "Industry Trends",
    image: "/placeholder.svg",
    readTime: "5 min read",
    content: `Industrial automation is undergoing a revolutionary transformation in 2024. 
    The integration of artificial intelligence and machine learning has opened new horizons 
    for manufacturing efficiency and productivity. Smart factories are becoming increasingly 
    common, with IoT sensors and real-time analytics driving decision-making processes.

    Sustainable manufacturing practices are also taking center stage, with companies 
    focusing on reducing their carbon footprint through automated energy management 
    systems and waste reduction protocols. The future of industrial automation looks 
    promising, with continued innovation in robotics and process optimization.`
  },
  {
    id: "post-2",
    title: "How RPA is Transforming Manufacturing",
    description: "Discover how Robotic Process Automation is revolutionizing manufacturing operations and improving efficiency.",
    date: "March 10, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "4 min read",
    content: `Robotic Process Automation (RPA) is revolutionizing the manufacturing sector 
    by streamlining operations and reducing human error. From inventory management to 
    quality control, RPA is making its mark across various aspects of manufacturing.

    Companies implementing RPA are seeing significant improvements in productivity 
    and cost reduction. The technology enables 24/7 operations, consistent quality, 
    and faster production cycles. As RPA continues to evolve, we're seeing more 
    sophisticated applications that combine artificial intelligence and machine learning.`
  },
  {
    id: "post-3",
    title: "Success Story: Smart Factory Implementation",
    description: "Learn how our smart factory solutions helped a leading manufacturer achieve 150% productivity increase.",
    date: "March 5, 2024",
    category: "Case Study",
    image: "/placeholder.svg",
    readTime: "6 min read",
    content: `In this case study, we explore how a leading manufacturer implemented smart 
    factory solutions to achieve remarkable results. The company faced challenges with 
    production efficiency and quality consistency. Through the implementation of IoT 
    sensors, automated quality control systems, and real-time analytics, they were 
    able to transform their operations.

    The results were impressive: a 150% increase in productivity, 60% reduction in 
    quality issues, and significant cost savings. This success story demonstrates 
    the potential of smart factory solutions in modern manufacturing.`
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
            window.dispatchEvent(
              new CustomEvent("postInView", { detail: { postId: activePostId } })
            );
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    blogPosts.forEach((post) => {
      if (postRefs.current[post.id]) {
        observer.observe(postRefs.current[post.id]!);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="space-y-12">
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
              <CardDescription className="text-white">
                {post.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-white prose prose-invert">
                  {post.content?.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-muted">
                  <span className="text-sm text-white">{post.date}</span>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-white">
                    Share <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};
