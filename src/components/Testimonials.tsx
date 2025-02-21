
import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Operations Manager",
    company: "TechCorp Inc.",
    content: "Quantum Automations has transformed our manufacturing process. The automation solutions have increased our efficiency by 200% while reducing errors significantly.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Michael Chen",
    role: "Production Director",
    company: "InnovateX",
    content: "The implementation was seamless, and the results were immediate. Our team adapted quickly to the new systems, and the support has been exceptional.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Emily Rodriguez",
    role: "Quality Control Supervisor",
    company: "PrecisionTech",
    content: "The automated quality control systems have revolutionized our inspection process. We've seen a 75% reduction in defects since implementation.",
    rating: 4,
    image: "/placeholder.svg"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-[#000080]">What Our Clients Say</h2>
          <p className="text-lg text-[#000080] mx-auto max-w-2xl">
            Discover how our automation solutions have transformed businesses and improved operations across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-[#000080]">{testimonial.name}</h3>
                    <p className="text-sm text-[#000080]">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#000080]">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
