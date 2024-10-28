import React from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle } from 'lucide-react';

interface RecordingButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  showTooltip: boolean;
}

const RecordingButton: React.FC<RecordingButtonProps> = ({
  isRecording,
  onToggleRecording,
  showTooltip,
}) => {
  return (
    <div className="relative flex justify-center mb-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleRecording}
        className={`p-6 rounded-full ${
          isRecording 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
        } text-white shadow-lg transition-all duration-300`}
      >
        {isRecording ? (
          <StopCircle className="w-12 h-12" />
        ) : (
          <Mic className="w-12 h-12" />
        )}
      </motion.button>
      
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          Click me to start recording
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-orange-500"></div>
        </motion.div>
      )}
    </div>
  );
};

export default RecordingButton;