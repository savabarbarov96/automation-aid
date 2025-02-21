
import { Bot, Users, LineChart, Database, MessageSquare, Zap } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Automation",
    description: "Leverage cutting-edge AI to automate repetitive tasks and streamline workflows."
  },
  {
    icon: Users,
    title: "Lead Generation",
    description: "Generate and nurture high-quality leads through intelligent automation."
  },
  {
    icon: LineChart,
    title: "Revenue Growth",
    description: "Accelerate your business growth with data-driven automation strategies."
  },
  {
    icon: Database,
    title: "CRM Integration",
    description: "Seamlessly integrate with your existing CRM systems for enhanced efficiency."
  },
  {
    icon: MessageSquare,
    title: "Marketing Automation",
    description: "Automate your marketing campaigns for better engagement and conversion."
  },
  {
    icon: Zap,
    title: "Intelligent Solutions",
    description: "Custom solutions designed to meet your specific business needs."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 bg-cool-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#000080] mb-4">Our Solutions</h2>
          <p className="text-[#000080] max-w-2xl mx-auto">
            Transform your business with our comprehensive suite of automation solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-cool-100 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-[#000080] mb-2">{feature.title}</h3>
              <p className="text-[#000080]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
