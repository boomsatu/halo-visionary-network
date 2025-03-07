
import React, { useState, useEffect } from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";

const Hero = () => {
  const { ref, isInView } = useInView();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden pt-24"
      id="home"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-30 animate-float animation-delay-200" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-20 animate-float animation-delay-400" />
      </div>

      <div 
        ref={ref}
        className={cn(
          "container mx-auto max-w-6xl text-center transition-opacity duration-1000 section-fade-in",
          isInView ? "in-view" : "",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      >
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide bg-gray-100 rounded-full mb-6">
          INTRODUCING THE NETWORK
        </span>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-balance">
          A Visionary Network for Tomorrow's World
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 text-balance">
          Connecting minds with purpose. Building bridges of innovation through simplicity and thoughtful design.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#features" 
            className="px-8 py-3 text-sm font-medium bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 ease-in-out"
          >
            Discover Features
          </a>
          <a 
            href="#vision" 
            className="px-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-300 ease-in-out"
          >
            Our Vision
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
