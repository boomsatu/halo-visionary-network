
import React, { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Swap from "../components/swap/Swap";
import Pool from "../components/pool/Pool";
import Charts from "../components/charts/Charts";
import { useInView } from "../lib/animations";

const Index = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const swapSection = useInView();
  const poolSection = useInView();
  const chartsSection = useInView();

  return (
    <MainLayout>
      <div className="container mx-auto px-6 md:px-12 pt-24 pb-12">
        {/* Hero section */}
        <div className="text-center max-w-3xl mx-auto py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trade, Swap, and Earn with <span className="text-primary">HALO DEX</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Decentralized trading platform with lightning-fast swaps, low fees,
            and deep liquidity pools. Connect your wallet and start trading now.
          </p>
          <a
            href="#swap"
            className="bg-primary text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            Start Trading
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-primary/5 border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">$4.2B+</h3>
            <p className="text-gray-600">Total Value Locked</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-primary/5 border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">2.5M+</h3>
            <p className="text-gray-600">Users Worldwide</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg shadow-primary/5 border border-gray-100 text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">$120M+</h3>
            <p className="text-gray-600">Daily Trading Volume</p>
          </div>
        </div>

        {/* Swap Section */}
        <div
          ref={swapSection.ref}
          className={`py-12 transition-all duration-1000 transform ${
            swapSection.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Swap />
        </div>

        {/* Pool Section */}
        <div
          ref={poolSection.ref}
          className={`py-12 transition-all duration-1000 transform ${
            poolSection.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Pool />
        </div>

        {/* Charts Section */}
        <div
          ref={chartsSection.ref}
          className={`py-12 transition-all duration-1000 transform ${
            chartsSection.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Charts />
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
