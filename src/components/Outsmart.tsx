
import { motion } from "framer-motion";

const partners = [
  { src: "/lovable-uploads/c2b82e3c-97ab-462f-bd82-36e5ba67bd32.png", alt: "ParfumeTester" },
  { src: "/lovable-uploads/da04e3c9-0a1d-4978-851a-ced02054d743.png", alt: "Datex" },
  { src: "/lovable-uploads/41de0218-3567-497b-a5b7-0ed1e59a8c93.png", alt: "RM Sport Center" },
];

export const Outsmart = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#F1F0FB] to-[#FFFFFF]">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#F3F3F3]/50 via-[#F1F0FB]/30 to-[#FFFFFF]/20"
        style={{
          transform: 'translateY(calc(var(--scroll) * -0.1))',
          willChange: 'transform'
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full max-w-[280px] hover:scale-105 transition-transform duration-300"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="w-full h-auto object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
