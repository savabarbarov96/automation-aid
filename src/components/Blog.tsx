
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

const blogPosts: BlogPost[] = [
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
    title: "Emerging Technologies in Manufacturing",
    description: "Discover the cutting-edge technologies revolutionizing the manufacturing sector.",
    date: "March 12, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "4 min read"
  },
  {
    id: "post-3",
    title: "How RPA is Transforming Manufacturing",
    description: "Discover how Robotic Process Automation is revolutionizing manufacturing operations and improving efficiency.",
    date: "March 10, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "4 min read"
  },
  {
    id: "post-4",
    title: "AI in Modern Manufacturing",
    description: "An in-depth look at how artificial intelligence is reshaping manufacturing processes.",
    date: "March 8, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "6 min read"
  },
  {
    id: "post-5",
    title: "Success Story: Smart Factory Implementation",
    description: "Learn how our smart factory solutions helped a leading manufacturer achieve 150% productivity increase.",
    date: "March 5, 2024",
    category: "Case Study",
    image: "/placeholder.svg",
    readTime: "6 min read"
  },
  {
    id: "post-6",
    title: "Digital Transformation Journey",
    description: "A comprehensive guide to digital transformation in manufacturing.",
    date: "March 1, 2024",
    category: "Case Study",
    image: "/placeholder.svg",
    readTime: "5 min read"
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-white">Latest Updates & Insights</h2>
          <p className="text-lg text-white mx-auto max-w-2xl">
            Stay informed about the latest developments in automation technology and industry trends.
          </p>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
              data-post-id={post.id}
            >
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
                <CardTitle className="text-xl mb-2 hover:text-primary cursor-pointer text-white">
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
          ))}
        </div>
      </div>
    </section>
  );
};
