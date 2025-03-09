
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDate } from "@/lib/utils";

export const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true)
          .order('published_at', { ascending: false });
        
        if (selectedCategory) {
          query = query.eq('category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPosts(data || []);

        // Extract unique categories
        if (!selectedCategory) {
          const uniqueCategories = [...new Set(data.map(post => post.category).filter(Boolean))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  if (loading) {
    return <div className="text-center py-10">Зареждане...</div>;
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Блог</h1>
        
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-white/70 hover:text-white"
              }`}
            >
              Всички
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-white/70 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              {selectedCategory
                ? `Няма публикации в категория "${selectedCategory}".`
                : "Все още няма публикации."}
            </p>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:text-primary/80 mt-2"
              >
                Покажи всички публикации
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-card hover:bg-card/80 rounded-lg overflow-hidden transition-all duration-300 h-full"
              >
                {post.featured_image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/60">
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    {post.category && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-white/70 text-sm mb-3">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-white/60">
                    Автор: {post.author}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
