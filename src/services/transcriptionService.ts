import { Deepgram } from '@deepgram/sdk';

const DEEPGRAM_API_KEY = '50bc1543b0649c888a641dad7bfd8c9f4a6411ef';

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const deepgram = new Deepgram(DEEPGRAM_API_KEY);
    
    // Convert audio blob to base64
    const reader = new FileReader();
    const audioBase64Promise = new Promise<string>((resolve) => {
      reader.onloadend = () => {
        const base64Audio = reader.result as string;
        const base64Data = base64Audio.split(',')[1];
        resolve(base64Data);
      };
    });
    
    reader.readAsDataURL(audioBlob);
    const base64Audio = await audioBase64Promise;

    // Send to Deepgram API
    const response = await deepgram.transcription.preRecorded({
      buffer: Buffer.from(base64Audio, 'base64'),
      mimetype: 'audio/webm',
    }, {
      smart_format: true,
      model: 'general',
    });

    return response.results?.channels[0]?.alternatives[0]?.transcript || '';
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio. Please try again.');
  }
};