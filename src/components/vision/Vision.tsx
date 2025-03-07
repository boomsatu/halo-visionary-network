
import React, { useEffect, useState } from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";

const quotes = [
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Vision Statement"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Design Philosophy"
  },
  {
    text: "Focus and simplicity — once you get there, you can move mountains.",
    author: "Our Approach"
  }
];

const Vision = () => {
  const { ref, isInView } = useInView();
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="vision" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div 
            ref={ref}
            className={cn(
              "w-full lg:w-1/2 section-fade-in",
              isInView ? "in-view" : ""
            )}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide bg-gray-200 rounded-full mb-6">
              OUR VISION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              A Network Built on Principles of Excellence
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We believe in creating technology that enhances human capability through elegant design and purposeful innovation. Our approach combines technical excellence with an unwavering focus on the user experience.
            </p>
            <p className="text-gray-600 text-lg mb-10">
              Every element of our network is crafted with precision, balancing form and function to create solutions that are as beautiful as they are useful.
            </p>
            <a 
              href="#connect" 
              className="inline-flex items-center px-8 py-3 text-sm font-medium bg-white border border-gray-200 text-gray-800 rounded-full hover:bg-gray-50 transition-all duration-300 ease-in-out"
            >
              Learn More
            </a>
          </div>
          
          <div className="w-full lg:w-1/2 h-96 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl overflow-hidden flex items-center justify-center p-12">
              {quotes.map((quote, index) => (
                <div 
                  key={index}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center p-12 transition-opacity duration-500",
                    activeQuote === index ? "opacity-100" : "opacity-0"
                  )}
                >
                  <div className="text-center">
                    <p className="text-white text-xl md:text-2xl font-light italic mb-6 text-balance">
                      "{quote.text}"
                    </p>
                    <span className="text-gray-300 text-sm uppercase tracking-widest">
                      {quote.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quote navigation dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {quotes.map((_, index) => (
                <button 
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeQuote === index ? "bg-white w-4" : "bg-white/50"
                  )}
                  onClick={() => setActiveQuote(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
