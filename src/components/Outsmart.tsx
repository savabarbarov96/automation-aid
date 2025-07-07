import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  logo: string;
  created_at: string;
}

export const Outsmart = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch clients from Supabase
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching clients:", error);
          // In case there's an error (like unauthorized), show some default clients
          if (error.code === '42501' || error.message.includes('permission denied')) {
            setClients([
              { 
                id: '1', 
                name: 'ParfumeTester', 
                logo: '/lovable-uploads/c2b82e3c-97ab-462f-bd82-36e5ba67bd32.png',
                created_at: new Date().toISOString()
              },
              { 
                id: '2', 
                name: 'Datex', 
                logo: '/lovable-uploads/da04e3c9-0a1d-4978-851a-ced02054d743.png',
                created_at: new Date().toISOString()
              },
              { 
                id: '3', 
                name: 'RM Sport Center', 
                logo: '/lovable-uploads/41de0218-3567-497b-a5b7-0ed1e59a8c93.png',
                created_at: new Date().toISOString()
              }
            ]);
          }
          return;
        }

        if (data && data.length > 0) {
          setClients(data as Client[] || []);
        } else {
          // If no data, use fallback clients
          setClients([
            { 
              id: '1', 
              name: 'ParfumeTester', 
              logo: '/lovable-uploads/c2b82e3c-97ab-462f-bd82-36e5ba67bd32.png',
              created_at: new Date().toISOString()
            },
            { 
              id: '2', 
              name: 'Datex', 
              logo: '/lovable-uploads/da04e3c9-0a1d-4978-851a-ced02054d743.png',
              created_at: new Date().toISOString()
            },
            { 
              id: '3', 
              name: 'RM Sport Center', 
              logo: '/lovable-uploads/41de0218-3567-497b-a5b7-0ed1e59a8c93.png',
              created_at: new Date().toISOString()
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        // Use fallback clients
        setClients([
          { 
            id: '1', 
            name: 'ParfumeTester', 
            logo: '/lovable-uploads/c2b82e3c-97ab-462f-bd82-36e5ba67bd32.png',
            created_at: new Date().toISOString()
          },
          { 
            id: '2', 
            name: 'Datex', 
            logo: '/lovable-uploads/da04e3c9-0a1d-4978-851a-ced02054d743.png',
            created_at: new Date().toISOString()
          },
          { 
            id: '3', 
            name: 'RM Sport Center', 
            logo: '/lovable-uploads/41de0218-3567-497b-a5b7-0ed1e59a8c93.png',
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      // Initial check
      checkScrollability();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      }
    };
  }, []);

  useEffect(() => {
    // Check scrollability again when clients are loaded
    if (!loading && clients.length > 0) {
      setTimeout(checkScrollability, 100);
    }
  }, [loading, clients]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-background border-t border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-30"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Нашите Клиенти</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Партньорство с бизнеси, които ни се доверяват за трансформация чрез автоматизация.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <span className="ml-3 text-white/70">Зареждане на клиенти...</span>
            </div>
          ) : clients.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/70">Все още няма добавени клиенти.</p>
            </div>
          ) : (
            <>
              {/* Navigation buttons */}
              {clients.length > 3 && (
                <>
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full bg-background/80 border border-white/10 shadow-glow p-2 ${
                        !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary'
                      }`}
                      onClick={() => scroll('left')}
                      disabled={!canScrollLeft}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                  </div>
                  
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full bg-background/80 border border-white/10 shadow-glow p-2 ${
                        !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/20 hover:text-primary'
                      }`}
                      onClick={() => scroll('right')}
                      disabled={!canScrollRight}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </>
              )}

              {/* Scrollable container */}
              <div 
                ref={scrollContainerRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory py-8 px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {clients.map((client, index) => (
                  <motion.div
                    key={client.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-60 mx-4 snap-center"
                  >
                    <div className="bg-white p-6 rounded-xl border border-white/10 shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105 h-full flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-auto object-contain filter brightness-100 transition-all duration-300"
                      />
                    </div>
                    <p className="text-center mt-3 text-white/70 font-medium">{client.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* Scroll indicators */}
              {clients.length > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {clients.map((client, index) => (
                    <button
                      key={client.id}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                        index === 0 ? 'bg-primary w-5' : 'bg-white/20 hover:bg-white/40'
                      }`}
                      onClick={() => {
                        const container = scrollContainerRef.current;
                        if (container) {
                          const scrollAmount = (container.scrollWidth / clients.length) * index;
                          container.scrollTo({
                            left: scrollAmount,
                            behavior: 'smooth'
                          });
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
