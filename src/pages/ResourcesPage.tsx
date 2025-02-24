
import { Blog } from "@/components/Blog";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Navbar } from "@/components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { blogPosts } from "@/components/Blog";

const ResourcesPage = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const slug = path.split('/resources/')[1];
    
    if (slug) {
      const post = blogPosts.find(post => post.slug === slug);
      if (post) {
        const postElement = document.getElementById(post.id);
        if (postElement) {
          // Use smooth scrolling for better UX
          postElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    } else {
      // If no slug, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]); // React to pathname changes

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
              <Route path="/" element={<Blog />} />
              <Route path="/:slug" element={<Blog />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
