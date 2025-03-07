
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="border-t border-gray-100 pt-16 pb-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="text-xl font-medium tracking-tighter text-primary mb-6 inline-block">
              HALO
            </Link>
            <p className="text-gray-600 mb-6">
              A network designed with purpose, connecting tomorrow's visionaries today.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Network</h4>
            <ul className="space-y-4">
              <li>
                <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              </li>
              <li>
                <a href="#vision" className="text-gray-600 hover:text-primary transition-colors">Our Vision</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Security</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Technology</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Press</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Newsletter</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Social Media</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Support</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} HALO Network. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
