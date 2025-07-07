import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BlogList } from "@/components/BlogList";
import { BlogPost } from "@/components/BlogPost";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ArrowRight, Search, Tag, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const BlogPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

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
          console.error("Error fetching post:", error);
          setError(error);
          
          // Check if it's a permission error
          if (error.code === "PGRST301" || error.message.includes("permission") || error.message.includes("policy")) {
            console.log("Permission error detected for single post, using fallback data");
            
            // Create a fallback post based on the slug
            const fallbackPost = {
              id: "fallback",
              title: "Изкуственият интелект и бъдещето на бизнес автоматизацията",
              slug: slug,
              content: `
## Трансформиране на бизнес процесите чрез AI

Изкуственият интелект революционизира начина, по който бизнесите оперират и автоматизират процесите си. Модерните AI решения предлагат безпрецедентни възможности за оптимизация, ефективност и иновации.

### Ключови предимства на AI автоматизацията:

- **Повишена ефективност** - Автоматизирайте повтарящи се задачи и освободете човешки ресурс за по-стратегически дейности
- **Намаляване на грешките** - AI системите минимизират човешката грешка в критични процеси
- **Бързина на изпълнение** - Драстично съкращаване на времето за изпълнение на комплексни задачи
- **Персонализация в мащаб** - Адаптиране към индивидуалните нужди на всеки клиент без допълнителни разходи
- **Предиктивна аналитика** - Предвиждане на тенденции и превантивно решаване на проблеми преди да се случат

### Приложения в различни индустрии

Независимо от сектора, AI технологиите намират приложение във всеки бизнес:

- Финансови услуги - автоматизирана обработка на документи и детекция на измами
- Производство - оптимизация на веригата за доставки и предиктивна поддръжка
- Търговия на дребно - персонализирани препоръки и управление на инвентар
- Здравеопазване - диагностика, управление на данни и административни процеси

### Започнете своята AI трансформация днес

Внедряването на AI решения вече не е запазено само за големите корпорации с големи бюджети. Съвременните инструменти и платформи правят тези технологии достъпни за бизнеси от всякакъв мащаб.

Свържете се с нас, за да научите как можем да помогнем на вашия бизнес да започне своето AI пътешествие.
              `,
              excerpt: "Как изкуственият интелект трансформира бизнес процесите и открива нови възможности за растеж и ефективност.",
              featured_image: "/images/blog/ai-future.jpg",
              category: "AI Технологии",
              author: "Екипът на Automation Aid",
              published_at: new Date().toISOString(),
              created_at: new Date().toISOString()
            };
            
            setPost(fallbackPost);
            setLoading(false);
            return;
          }
        }

        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
        
        // Provide fallback data for any error scenario
        const fallbackPost = {
          id: "fallback",
          title: "Изкуственият интелект и бъдещето на бизнес автоматизацията",
          slug: slug,
          content: `
## Трансформиране на бизнес процесите чрез AI

Изкуственият интелект революционизира начина, по който бизнесите оперират и автоматизират процесите си. Модерните AI решения предлагат безпрецедентни възможности за оптимизация, ефективност и иновации.

### Ключови предимства на AI автоматизацията:

- **Повишена ефективност** - Автоматизирайте повтарящи се задачи и освободете човешки ресурс за по-стратегически дейности
- **Намаляване на грешките** - AI системите минимизират човешката грешка в критични процеси
- **Бързина на изпълнение** - Драстично съкращаване на времето за изпълнение на комплексни задачи
- **Персонализация в мащаб** - Адаптиране към индивидуалните нужди на всеки клиент без допълнителни разходи
- **Предиктивна аналитика** - Предвиждане на тенденции и превантивно решаване на проблеми преди да се случат

### Приложения в различни индустрии

Независимо от сектора, AI технологиите намират приложение във всеки бизнес:

- Финансови услуги - автоматизирана обработка на документи и детекция на измами
- Производство - оптимизация на веригата за доставки и предиктивна поддръжка
- Търговия на дребно - персонализирани препоръки и управление на инвентар
- Здравеопазване - диагностика, управление на данни и административни процеси

### Започнете своята AI трансформация днес

Внедряването на AI решения вече не е запазено само за големите корпорации с големи бюджети. Съвременните инструменти и платформи правят тези технологии достъпни за бизнеси от всякакъв мащаб.

Свържете се с нас, за да научите как можем да помогнем на вашия бизнес да започне своето AI пътешествие.
          `,
          excerpt: "Как изкуственият интелект трансформира бизнес процесите и открива нови възможности за растеж и ефективност.",
          featured_image: "/images/blog/ai-future.jpg",
          category: "AI Технологии",
          author: "Екипът на Automation Aid",
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        };
        
        setPost(fallbackPost);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, featured_image, published_at, created_at, category')
          .eq('is_published', true)
          .order('published_at', { ascending: false })
          .limit(5);

        if (error) {
          console.error("Error fetching recent posts:", error);
          
          // Provide fallback recent posts for permission or other errors
          const fallbackRecentPosts = [
            {
              id: "1",
              title: "Въведение в AI автоматизацията за бизнеса",
              slug: "intro-to-ai-automation",
              featured_image: "/images/blog/ai-automation.jpg",
              category: "AI Решения",
              published_at: new Date().toISOString(),
              created_at: new Date().toISOString()
            },
            {
              id: "2",
              title: "5 начина AI може да оптимизира вашия работен процес",
              slug: "5-ways-ai-optimize-workflow",
              featured_image: "/images/blog/workflow.jpg",
              category: "Продуктивност",
              published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
              id: "3",
              title: "Бъдещето на клиентското обслужване с AI чатботове",
              slug: "future-customer-service-ai-chatbots",
              featured_image: "/images/blog/chatbot.jpg", 
              category: "Клиентски опит",
              published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
              created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
            }
          ];
          
          setRecentPosts(fallbackRecentPosts);
          
          // Create fallback categories
          const fallbackCategories = [
            { name: "AI Решения", count: 3 },
            { name: "Продуктивност", count: 2 },
            { name: "Клиентски опит", count: 1 },
            { name: "Автоматизация", count: 1 },
            { name: "Бизнес стратегии", count: 1 }
          ];
          
          setPopularCategories(fallbackCategories);
          return;
        }

        setRecentPosts(data || []);

        // Extract categories for sidebar
        const categories = {};
        data.forEach(post => {
          if (post.category) {
            categories[post.category] = (categories[post.category] || 0) + 1;
          }
        });
        
        const sortedCategories = Object.entries(categories)
          .map(([name, count]) => ({ name, count: count as number }))
          .sort((a, b) => (b.count as number) - (a.count as number))
          .slice(0, 5);
          
        setPopularCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
        
        // Fallback data for any error
        const fallbackRecentPosts = [
          {
            id: "1",
            title: "Въведение в AI автоматизацията за бизнеса",
            slug: "intro-to-ai-automation",
            featured_image: "/images/blog/ai-automation.jpg",
            category: "AI Решения",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "5 начина AI може да оптимизира вашия работен процес",
            slug: "5-ways-ai-optimize-workflow",
            featured_image: "/images/blog/workflow.jpg",
            category: "Продуктивност",
            published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: "3",
            title: "Бъдещето на клиентското обслужване с AI чатботове",
            slug: "future-customer-service-ai-chatbots",
            featured_image: "/images/blog/chatbot.jpg", 
            category: "Клиентски опит",
            published_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        
        setRecentPosts(fallbackRecentPosts);
        
        // Create fallback categories
        const fallbackCategories = [
          { name: "AI Решения", count: 3 },
          { name: "Продуктивност", count: 2 },
          { name: "Клиентски опит", count: 1 },
          { name: "Автоматизация", count: 1 },
          { name: "Бизнес стратегии", count: 1 }
        ];
        
        setPopularCategories(fallbackCategories);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-28 pb-16">
          {slug ? (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-3/4">
                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : post ? (
                  <>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="mb-6 text-sm hover:bg-muted/50"
                    >
                      <Link to="/blog" className="flex items-center gap-1">
                        <ChevronLeft className="h-4 w-4" /> Всички публикации
                      </Link>
                    </Button>
                    <BlogPost post={post} />
                  </>
                ) : (
                  <div className="text-center py-16 bg-muted/10 rounded-lg border border-border/50">
                    <h2 className="text-2xl font-bold text-white mb-4">Публикацията не е намерена</h2>
                    <p className="text-muted-foreground mb-6">
                      Съжаляваме, но публикацията, която търсите, не съществува или е премахната.
                    </p>
                    <Button asChild variant="default">
                      <Link to="/blog">Към всички публикации</Link>
                    </Button>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-1/4 space-y-8">
                <div className="rounded-lg bg-muted/10 border border-border/50 p-5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="search" 
                      placeholder="Търси в блога..." 
                      className="pl-9 bg-background/50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-muted/10 border border-border/50 p-5">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" /> Последни публикации
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map(post => (
                      <Link 
                        key={post.id} 
                        to={`/blog/${post.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        {post.featured_image && (
                          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.featured_image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="text-sm font-medium mb-1 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.published_at || post.created_at)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-muted/10 border border-border/50 p-5">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" /> Категории
                  </h3>
                  <div className="space-y-2">
                    {popularCategories.map(category => (
                      <Link 
                        key={category.name} 
                        to={`/blog?category=${encodeURIComponent(category.name)}`}
                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted/20 transition-colors"
                      >
                        <span className="text-sm">{category.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted/20 px-2 py-0.5 rounded-full">
                          {category.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Нашият блог</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Открийте най-новите статии и ресурси за автоматизация, AI технологии и дигитална трансформация от нашия експертен екип.
                </p>
              </div>
              <BlogList searchQuery={searchQuery} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
