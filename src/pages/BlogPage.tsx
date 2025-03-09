
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BlogList } from "@/components/BlogList";
import { BlogPost } from "@/components/BlogPost";
import { supabase } from "@/integrations/supabase/client";

const BlogPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {slug ? (
          <>
            {loading ? (
              <div className="text-center py-10">Зареждане...</div>
            ) : post ? (
              <>
                <Link to="/blog" className="text-white/70 hover:text-white mb-6 inline-block">
                  ← Назад към всички публикации
                </Link>
                <BlogPost post={post} />
              </>
            ) : (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-white mb-4">Публикацията не е намерена</h2>
                <Link 
                  to="/blog" 
                  className="text-primary hover:text-primary/80"
                >
                  Към всички публикации
                </Link>
              </div>
            )}
          </>
        ) : (
          <BlogList />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
