
import { Bot, Users, LineChart, Database, MessageSquare, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Автоматизация",
    description: "Използвайте най-съвременен AI за автоматизиране на повтарящи се задачи и оптимизиране на работните процеси."
  },
  {
    icon: Users,
    title: "Генериране на Лийдове",
    description: "Генерирайте и развивайте висококачествени лийдове чрез интелигентна автоматизация."
  },
  {
    icon: LineChart,
    title: "Растеж на Приходите",
    description: "Ускорете растежа на бизнеса си с автоматизационни стратегии, базирани на данни."
  },
  {
    icon: Database,
    title: "CRM Интеграция",
    description: "Безпроблемна интеграция с вашите съществуващи CRM системи за повишена ефективност."
  },
  {
    icon: MessageSquare,
    title: "Маркетинг Автоматизация",
    description: "Автоматизирайте вашите маркетинг кампании за по-добро ангажиране и конверсия."
  },
  {
    icon: Zap,
    title: "Интелигентни Решения",
    description: "Персонализирани решения, създадени да отговорят на вашите специфични бизнес нужди."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-cool-100 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cool-400 mb-4">Нашите Решения</h2>
          <p className="text-cool-300 max-w-2xl mx-auto">
            Трансформирайте бизнеса си с нашия цялостен набор от автоматизационни решения.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 
                        hover:bg-white/10 hover:scale-105 hover:shadow-lg transition-all duration-300 
                        animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
              <h3 className="text-xl font-semibold text-cool-300 mb-2 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-cool-300/80 group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
