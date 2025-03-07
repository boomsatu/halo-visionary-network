
import React from "react";
import { useInView } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Shield, Globe, Zap, Layers } from "lucide-react";

const featuresList = [
  {
    icon: <Shield className="w-10 h-10 text-blue-500" />,
    title: "Advanced Security",
    description: "Secure connections enhanced by cutting-edge encryption technology ensuring your data remains private.",
  },
  {
    icon: <Globe className="w-10 h-10 text-indigo-500" />,
    title: "Global Connectivity",
    description: "Connect with networks worldwide through our strategically positioned nodes for optimal performance.",
  },
  {
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    title: "Lightning Speed",
    description: "Experience unprecedented speed with our optimized routing algorithm and state-of-the-art infrastructure.",
  },
  {
    icon: <Layers className="w-10 h-10 text-red-500" />,
    title: "Intuitive Interface",
    description: "Navigate seamlessly through complex operations with our meticulously designed user experience.",
  },
];

const Features = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gray-50 -z-10" />
      <div className="absolute inset-0 opacity-30 -z-10" style={{ backgroundImage: "radial-gradient(#e0e0e0 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wide bg-gray-200 rounded-full mb-6">
            CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Exceptional Features Designed for Excellence
          </h2>
          <p className="text-gray-600 text-lg">
            Our technology combines innovative solutions with elegant design to deliver a superior experience.
          </p>
        </div>

        <div 
          ref={ref}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 section-fade-in",
            isInView ? "in-view" : ""
          )}
        >
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
