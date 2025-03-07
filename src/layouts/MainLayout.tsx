
import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useScrollProgress } from "../lib/animations";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const progress = useScrollProgress();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div 
        className="fixed top-0 left-0 h-0.5 bg-primary z-50 transition-all duration-100 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
