
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "The Future of Industrial Automation: 2024 Trends",
    description: "Explore the latest trends shaping the future of industrial automation, from AI integration to sustainable manufacturing practices.",
    date: "March 15, 2024",
    category: "Industry Trends",
    image: "/placeholder.svg",
    readTime: "5 min read"
  },
  {
    title: "How RPA is Transforming Manufacturing",
    description: "Discover how Robotic Process Automation is revolutionizing manufacturing operations and improving efficiency.",
    date: "March 10, 2024",
    category: "Technology",
    image: "/placeholder.svg",
    readTime: "4 min read"
  },
  {
    title: "Success Story: Smart Factory Implementation",
    description: "Learn how our smart factory solutions helped a leading manufacturer achieve 150% productivity increase.",
    date: "March 5, 2024",
    category: "Case Study",
    image: "/placeholder.svg",
    readTime: "6 min read"
  }
];

export const Blog = () => {
  return (
    <section id="blog" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-[#000080]">Latest Updates & Insights</h2>
          <p className="text-lg text-[#000080] mx-auto max-w-2xl">
            Stay informed about the latest developments in automation technology and industry trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#000080]">{post.category}</span>
                  <span className="text-sm text-[#000080]">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl mb-2 hover:text-primary cursor-pointer text-[#000080]">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-[#000080]">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#000080]">{post.date}</span>
                  <Button variant="ghost" className="p-0 hover:bg-transparent text-[#000080]">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in">
          <Button className="px-6 text-[#000080]">
            View All Articles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
