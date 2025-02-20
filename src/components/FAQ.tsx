
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What types of automation solutions do you offer?",
    answer: "We provide a comprehensive range of automation solutions including robotic process automation (RPA), industrial automation, smart manufacturing systems, and custom-tailored solutions for specific industry needs. Our solutions can be integrated with existing systems or implemented as standalone solutions.",
  },
  {
    question: "How long does implementation typically take?",
    answer: "Implementation timelines vary based on the complexity and scope of the project. Simple automation solutions can be implemented within 2-4 weeks, while more complex enterprise-wide systems might take 3-6 months. We provide detailed timeline estimates during the initial consultation.",
  },
  {
    question: "What kind of support do you provide after implementation?",
    answer: "We offer comprehensive post-implementation support including 24/7 technical assistance, regular maintenance checks, software updates, and continuous optimization services. Our support team is always available to address any concerns and ensure your automation systems run smoothly.",
  },
  {
    question: "Can your solutions integrate with our existing systems?",
    answer: "Yes, our automation solutions are designed to seamlessly integrate with most existing systems and software. We conduct thorough compatibility assessments before implementation and can customize our solutions to work with your current infrastructure.",
  },
  {
    question: "What ROI can we expect from your automation solutions?",
    answer: "While ROI varies by project, our clients typically see returns within 6-12 months of implementation. This includes reduced operational costs, increased productivity, improved accuracy, and better resource utilization. We provide detailed ROI projections during the planning phase.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-black">Frequently Asked Questions</h2>
          <p className="text-lg text-black mx-auto max-w-2xl">
            Find answers to common questions about our automation solutions and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-black">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
