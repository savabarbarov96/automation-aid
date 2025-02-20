
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { ThemeProvider } from "next-themes";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <Hero />
        <Features />
      </div>
    </ThemeProvider>
  );
};

export default Index;
