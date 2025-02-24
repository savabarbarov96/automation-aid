
import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  content?: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Industrial Automation: 2024 Trends",
    description: "Explore the latest trends shaping the future of industrial automation, from AI integration to sustainable manufacturing practices.",
    date: "March 15, 2024",
    category: "Industry Trends",
    readTime: "5 min read",
    slug: "future-industrial-automation-2024-trends",
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
    readTime: "4 min read",
    slug: "how-rpa-transforming-manufacturing",
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
    readTime: "6 min read",
    slug: "success-story-smart-factory-implementation",
    content: `In this case study, we explore how a leading manufacturer implemented smart 
    factory solutions to achieve remarkable results. The company faced challenges with 
    production efficiency and quality consistency. Through the implementation of IoT 
    sensors, automated quality control systems, and real-time analytics, they were 
    able to transform their operations.

    The results were impressive: a 150% increase in productivity, 60% reduction in 
    quality issues, and significant cost savings. This success story demonstrates 
    the potential of smart factory solutions in modern manufacturing.`
  },
  {
    id: "post-4",
    title: "Predictive Maintenance: The Key to Equipment Longevity",
    description: "Learn how predictive maintenance technologies are revolutionizing equipment management and reducing downtime.",
    date: "March 1, 2024",
    category: "Maintenance",
    readTime: "7 min read",
    slug: "predictive-maintenance-equipment-longevity",
    content: `Predictive maintenance is transforming how manufacturing facilities manage their 
    equipment. By leveraging advanced sensors, machine learning algorithms, and real-time 
    data analysis, companies can now predict potential equipment failures before they occur.

    This proactive approach has led to significant reductions in unplanned downtime, 
    with some facilities reporting up to 70% fewer equipment failures. The cost savings 
    are substantial, but equally important is the increased reliability and consistency 
    in production schedules. Modern predictive maintenance systems can even integrate 
    with ERP systems to automatically schedule maintenance activities during planned 
    production breaks.`
  },
  {
    id: "post-5",
    title: "The Rise of Digital Twins in Manufacturing",
    description: "Explore how digital twin technology is revolutionizing product development and production processes.",
    date: "February 28, 2024",
    category: "Technology",
    readTime: "5 min read",
    slug: "rise-of-digital-twins-manufacturing",
    content: `Digital twin technology has emerged as a game-changer in modern manufacturing. 
    By creating virtual replicas of physical products and processes, manufacturers can 
    simulate, test, and optimize their operations in a risk-free virtual environment.

    The applications are vast: from product design and testing to process optimization 
    and predictive maintenance. Companies using digital twins report faster time-to-market, 
    reduced development costs, and improved product quality. The technology is particularly 
    valuable in complex manufacturing environments where real-world testing would be 
    costly or impractical.`
  }
];

export const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initial scroll to selected post
  useEffect(() => {
    if (slug) {
      const post = blogPosts.find(p => p.slug === slug);
      if (post) {
        const element = document.getElementById(post.id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [slug]);

  // Set up intersection observer for URL updates
  useEffect(() => {
    const options = {
      threshold: 0.5,
      rootMargin: "-100px 0px -50% 0px"
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const postId = entry.target.id;
          const post = blogPosts.find(p => p.id === postId);
          if (post && post.slug !== slug) {
            navigate(`/resources/${post.slug}`, { replace: true });
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);

    // Observe all blog post elements
    blogPosts.forEach((post) => {
      const element = document.getElementById(post.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [navigate, slug]);

  return (
    <section className="space-y-12">
      {blogPosts.map((post) => (
        <div
          key={post.id}
          id={post.id}
          className="scroll-mt-24"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
