
import { Blog } from "@/components/Blog";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Navbar } from "@/components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import { blogPosts } from "@/components/Blog";

const ResourcesPage = () => {
  const firstPostSlug = blogPosts[0].slug;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="flex gap-12">
          <div className="w-64 shrink-0">
            <BlogSidebar />
          </div>
          <div className="flex-1 max-w-4xl">
            <Routes>
              <Route path="/" element={<Navigate to={`/resources/${firstPostSlug}`} replace />} />
              <Route path="/:slug" element={<Blog />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
