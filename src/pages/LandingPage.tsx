import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mic, FastForward, FileText, Menu, X } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="w-8 h-8 text-orange-500" />,
      title: "Record Anything",
      description: "Capture audio from any source - meetings, lectures, or personal notes."
    },
    {
      icon: <FastForward className="w-8 h-8 text-orange-500" />,
      title: "Instant Transcription",
      description: "Get real-time transcriptions powered by advanced AI technology."
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "Easy Export",
      description: "Export your transcriptions in multiple formats with one click."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
                Vivo
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#features" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#about" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="#contact" className="text-gray-600 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>

            {/* Mobile menu button */}
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

        {/* Mobile menu */}
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

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          >
            Recording made easy
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 mb-8"
          >
            Transform your voice into text instantly with our powerful AI transcription
          </motion.p>
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/record')}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Recording
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Voice Recording"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;