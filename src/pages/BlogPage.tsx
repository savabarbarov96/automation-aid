
import { Blog } from "@/components/Blog";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Navbar } from "@/components/Navbar";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 flex gap-8">
        <BlogSidebar />
        <div className="flex-1">
          <Blog />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
