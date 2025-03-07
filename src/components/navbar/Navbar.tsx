
import React, { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useWallet } from "@/hooks/use-wallet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isConnected, account, connectWallet, disconnectWallet, formatAddress } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out py-4 md:py-6",
        scrollPosition > 10
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-xl font-medium tracking-tighter text-primary"
          >
            HALO DEX
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {["Swap", "Pool", "Charts"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-800 tracking-wide hover:text-primary transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          
          <button
            onClick={isConnected ? disconnectWallet : connectWallet}
            className={cn(
              "flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300",
              isConnected 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-primary text-white hover:bg-primary/90"
            )}
          >
            <Wallet className="h-4 w-4" />
            {isConnected ? formatAddress(account!) : "Connect Wallet"}
          </button>
        </nav>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-30 flex flex-col pt-24 px-8 pb-8 md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8 mt-8">
          {["Swap", "Pool", "Charts"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xl font-medium text-gray-800 border-b border-gray-100 pb-2"
              onClick={() => {
                setIsOpen(false);
                document.body.style.overflow = "";
              }}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => {
              isConnected ? disconnectWallet() : connectWallet();
              setIsOpen(false);
              document.body.style.overflow = "";
            }}
            className={cn(
              "flex items-center justify-center gap-2 text-xl font-medium px-5 py-3 rounded-full",
              isConnected 
                ? "bg-green-100 text-green-800" 
                : "bg-primary text-white"
            )}
          >
            <Wallet className="h-5 w-5" />
            {isConnected ? formatAddress(account!) : "Connect Wallet"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
