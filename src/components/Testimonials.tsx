
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
    name: "Мария Иванова",
    role: "Оперативен Мениджър",
    company: "ТехКорп ООД",
    content: "Automation Aid трансформира нашия производствен процес. Решенията за автоматизация увеличиха ефективността ни с 200%, като същевременно значително намалиха грешките.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Георги Димитров",
    role: "Директор Производство",
    company: "ИноватеX",
    content: "Внедряването беше безпроблемно, а резултатите бяха незабавни. Нашият екип се адаптира бързо към новите системи, а поддръжката беше изключителна.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    name: "Елена Петрова",
    role: "Супервайзор Качествен Контрол",
    company: "ПрецизионТех",
    content: "Автоматизираните системи за контрол на качеството революционизираха процеса ни на инспекция. Наблюдаваме 75% намаление на дефектите след внедряването.",
    rating: 4,
    image: "/placeholder.svg"
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-white">Какво Казват Нашите Клиенти</h2>
          <p className="text-lg text-white mx-auto max-w-2xl">
            Вижте как нашите решения за автоматизация трансформираха бизнеси и подобриха операциите в различни индустрии.
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
                    <h3 className="font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-white">
                      {testimonial.role} в {testimonial.company}
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
                <p className="text-white">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
