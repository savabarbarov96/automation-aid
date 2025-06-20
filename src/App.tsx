import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import BlogAdmin from "./pages/BlogAdmin";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import ResourcesPage from "./pages/ResourcesPage";
import WorkAdmin from "./pages/WorkAdmin";
import { ProjectShowcase } from "./pages/ProjectShowcase";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./lib/auth";
import { Toaster } from "./components/ui/toaster";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/project/:slug" element={<ProjectShowcase />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/blog-admin" 
            element={
              <ProtectedRoute>
                <BlogAdmin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/work-admin" 
            element={
              <ProtectedRoute>
                <WorkAdmin />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
