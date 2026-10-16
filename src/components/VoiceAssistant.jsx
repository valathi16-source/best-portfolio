import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, AlertCircle } from 'lucide-react';

export default function VoiceAssistant({ onTranscriptReceived, isSpeaking, setIsSpeaking }) {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [synthSupported, setSynthSupported] = useState(true);
  const [voiceError, setVoiceError] = useState(null);
  const [speechEnabled, setSpeechEnabled] = useState(true); // Whether Nova speaks aloud

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          onTranscriptReceived(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission was denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          setVoiceError('No speech was detected. Please try speaking again.');
        } else {
          setVoiceError(`Voice input error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    // Check Speech Synthesis support
    if (!('speechSynthesis' in window)) {
      setSynthSupported(false);
    }
  }, [onTranscriptReceived]);

  const toggleListening = () => {
    setVoiceError(null);
    if (!speechSupported) {
      setVoiceError('Speech recognition is not supported in this browser. Try Google Chrome, Edge, or Brave.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
      } catch (err) {
        setVoiceError('Failed to initialize microphone. Please check browser permissions.');
      }
    }
  };

  const toggleSpeechAloud = () => {
    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
    setSpeechEnabled(!speechEnabled);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        
        {/* Mic Toggle Button */}
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2 rounded-xl transition-all duration-200 border ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse shadow-neon-cyan'
              : 'bg-slate-900/80 border-cyan-500/30 text-cyan-400 hover:border-cyan-400'
          }`}
          title={isListening ? 'Stop listening' : 'Speak to Nova (Voice Input)'}
          aria-label={isListening ? 'Stop voice recording' : 'Start voice input'}
        >
          {isListening ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Text-to-Speech Output Mute/Unmute */}
        {synthSupported && (
          <button
            type="button"
            onClick={toggleSpeechAloud}
            className={`p-2 rounded-xl transition-all duration-200 border ${
              speechEnabled
                ? 'bg-slate-900/80 border-purple-500/30 text-purple-400 hover:border-purple-400'
                : 'bg-slate-900/40 border-slate-700 text-slate-500'
            }`}
            title={speechEnabled ? 'Nova voice output active (Click to mute)' : 'Nova voice output muted'}
            aria-label="Toggle voice output audio"
          >
            {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        )}

        {/* Listening Waveform Indicator */}
        {isListening && (
          <div className="flex items-center gap-1 px-2 py-1 bg-red-950/60 border border-red-500/40 rounded-lg text-[10px] font-mono text-red-300 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span>LISTENING...</span>
          </div>
        )}
      </div>

      {/* Voice Error Notice */}
      {voiceError && (
        <div className="text-[11px] font-mono text-amber-400 bg-amber-950/80 p-2 rounded-lg border border-amber-500/40 flex items-start gap-1.5 mt-1">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
          <span>{voiceError}</span>
        </div>
      )}
    </div>
  );
}
