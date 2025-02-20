
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { ThemeProvider } from "next-themes";
import { Widget } from "../components/Widget";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="fixed bottom-4 right-4">
          <Widget />
        </div>
        <Hero />
        <Features />
      </div>
    </ThemeProvider>
  );
};

export default Index;
