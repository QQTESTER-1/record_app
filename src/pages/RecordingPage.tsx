import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecordingButton from '../components/RecordingButton';

const RecordingPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showTooltip, setShowTooltip] = useState(true);
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      // Create AudioContext to handle audio processing
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      // Connect to Deepgram WebSocket
      socketRef.current = new WebSocket(
        'wss://api.deepgram.com/v1/listen?encoding=linear16&sample_rate=16000',
        ['token', '50bc1543b0649c888a641dad7bfd8c9f4a6411ef']
      );

      socketRef.current.onopen = () => {
        console.log('WebSocket connection opened');

        // Process audio data
        processor.onaudioprocess = (e) => {
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            // Convert float32 to int16
            const int16Data = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16Data[i] = Math.max(
                -32768,
                Math.min(32767, Math.floor(inputData[i] * 32768))
              );
            }
            socketRef.current.send(int16Data.buffer);
          }
        };
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.channel?.alternatives?.[0]?.transcript) {
          setTranscript(
            (prev) => prev + ' ' + data.channel.alternatives[0].transcript
          );
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setTranscript(
          'Error connecting to transcription service. Please try again.'
        );
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
        source.disconnect();
        processor.disconnect();
      };

      setIsRecording(true);
      setShowTooltip(false);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setTranscript(
        'Error accessing microphone. Please check your permissions.'
      );
    }
  };

  const stopRecording = () => {
    if (socketRef.current) {
      socketRef.current.close();
    }
    setIsRecording(false);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
            Voice Recorder
          </h1>

          <RecordingButton
            isRecording={isRecording}
            onToggleRecording={handleToggleRecording}
            showTooltip={showTooltip}
          />

          <AnimatePresence>
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 backdrop-blur-sm p-6 rounded-lg border border-orange-200">
                  <h2 className="text-xl font-semibold mb-4 text-orange-600">
                    Live Transcript
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-semibold text-orange-600">
                        You:
                      </span>{' '}
                      {transcript}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default RecordingPage;
