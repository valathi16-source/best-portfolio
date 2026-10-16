import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Cpu, 
  RefreshCw, 
  ChevronRight, 
  Volume2, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import VoiceAssistant from './VoiceAssistant';
import { PORTFOLIO_CONFIG } from '../config/portfolio';

export default function NovaChatbot({ isOpen, onToggle }) {
  const { nova } = PORTFOLIO_CONFIG;
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'nova',
      text: nova.welcomeGreeting,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'system'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  // Speak response out loud using Web Speech API
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const botReply = data.response || "Cyber-core latency detected. Please try asking again.";

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'nova',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botReply);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'nova',
        text: "Direct telemetry link disrupted. Operating in offline mode: Valathi specializes in React, Python, Linux, and ethical cybersecurity. Ask about skills or projects!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'offline',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = (transcript) => {
    handleSendMessage(transcript);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-purple-600 text-slate-950 font-bold shadow-neon-cyan hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group"
        aria-label="Toggle Nova AI Chatbot"
        title="Open Nova AI Assistant"
      >
        <div className="relative">
          <Bot className="w-6 h-6 text-slate-950 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-950 animate-ping"></span>
        </div>
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[80vh] bg-[#050814] border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-float-delayed">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#0a1026] border-b border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-cyan-950 border border-cyan-400/50 p-1">
                <img src={nova.avatar} alt="Nova AI" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-cyber font-bold text-sm text-slate-100">{nova.botName}</h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    ONLINE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-purple-400">{nova.botVersion}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <VoiceAssistant
                onTranscriptReceived={handleVoiceInput}
                isSpeaking={isSpeaking}
                setIsSpeaking={setIsSpeaking}
              />
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                aria-label="Close Nova Chatbot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                      : 'bg-[#0c1430] border border-cyan-500/20 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] font-mono text-slate-500">
                  <span>{msg.time}</span>
                  {msg.source && msg.source === 'local_knowledge_base' && (
                    <span className="text-cyan-500 font-semibold">[Knowledge Base Engine]</span>
                  )}
                  {msg.source && msg.source === 'gemini' && (
                    <span className="text-purple-400 font-semibold">[Gemini AI]</span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 p-3 bg-[#0c1430] border border-cyan-500/20 rounded-2xl rounded-tl-none w-28">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Questions Chips */}
          <div className="px-3 py-2 bg-[#080d20] border-t border-cyan-500/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {nova.suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap bg-slate-900/90 text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0a1026] border-t border-cyan-500/30 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Nova about Valathi or speak..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 text-xs text-slate-100 placeholder-slate-500 outline-none font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors disabled:opacity-40"
              aria-label="Send message to Nova"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
