
import { Building2, UtensilsCrossed, Dumbbell, BarChart3, Search, Smartphone } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "ImotiDesk - CRM за недвижими имоти",
    description: "Цялостна платформа за брокерски агенции с управление на имоти, екип, SEO оптимизация и аналитични данни.",
    link: "https://imotidesk.automationaid.eu/"
  },
  {
    icon: UtensilsCrossed,
    title: "MenuMaster - Дигитални менюта",
    description: "QR код менюта за ресторанти и кафенета. Лесно управление, актуализации в реално време и подобрено клиентско изживяване.",
    link: "https://box.task-helper.eu/"
  },
  {
    icon: Dumbbell,
    title: "FitManager - Управление на фитнес зали",
    description: "Автоматизирано управление на членства, тренировки и AI-генерирани персонализирани фитнес планове.",
    link: "https://rm.task-helper.eu/"
  },
  {
    icon: BarChart3,
    title: "Property Pro - Управление на вили",
    description: "Система за резервации, управление на гости и автоматизация на процесите за villa rental бизнеси.",
    link: "https://hypnotic-thermalvillas.com/"
  },
  {
    icon: Search,
    title: "SEO Оптимизация",
    description: "Всички наши решения са SEO оптимизирани за максимална видимост в търсещи машини и повече клиенти."
  },
  {
    icon: Smartphone,
    title: "Мобилна съвместимост",
    description: "Адаптивни решения, работещи перфектно на всички устройства - компютри, таблети и мобилни телефони."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 bg-gradient-to-b from-cool-100 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cool-400 mb-4">Нашите Специализирани Решения</h2>
          <p className="text-cool-300 max-w-2xl mx-auto">
            Доказани AI решения за недвижими имоти, туризъм и фитнес. Създадени специално за българския пазар.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 
                        hover:bg-white/10 hover:scale-105 hover:shadow-lg transition-all duration-300 
                        animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => feature.link && window.open(feature.link, '_blank')}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:text-accent transition-colors" />
              <h3 className="text-xl font-semibold text-cool-300 mb-2 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-cool-300/80 group-hover:text-white/90 transition-colors mb-4">
                {feature.description}
              </p>
              {feature.link && (
                <div className="flex items-center text-primary group-hover:text-accent transition-colors text-sm">
                  <span>Вижте демо</span>
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
