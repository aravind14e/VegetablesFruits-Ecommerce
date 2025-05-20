import { useState } from "react";

export default function VoiceSearch({ onSearch }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice recognition not supported');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setListening(true);
    recognition.onerror = (e) => {
      setError('Error: ' + e.error);
      setListening(false);
    };
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onSearch(transcript);
    };
    recognition.start();
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleVoice} className={`p-2 rounded-full ${listening ? 'bg-green-200' : 'bg-gray-200'} hover:bg-green-300`} aria-label="Voice Search">
        🎤
      </button>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
} 