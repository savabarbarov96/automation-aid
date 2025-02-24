
import { Blog } from "@/components/Blog";
import { BlogSidebar } from "@/components/BlogSidebar";
import { Navbar } from "@/components/Navbar";
import { Route, Routes } from "react-router-dom";

const ResourcesPage = () => {
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
