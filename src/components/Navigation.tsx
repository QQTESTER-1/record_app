import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
              Vivo
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Features</a>
              <a href="#about" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">About</a>
              <a href="#contact" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-orange-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-600 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#about" className="text-gray-600 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">About</a>
            <a href="#contact" className="text-gray-600 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;