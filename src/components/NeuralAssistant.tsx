import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Send, Loader2, X, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface NeuralAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const NeuralAssistant: React.FC<NeuralAssistantProps> = ({ isOpen, onClose }) => {
  const [aiChat, setAiChat] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiChat, isChatting]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatting) return;

    const userMessage = chatInput.trim();
    setAiChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage,
        config: {
          systemInstruction: "You are Ziji AI, a high-fidelity cyber-electronic assistant for Nguyễn Thanh Phú (Ziji). You are professional, tech-savvy, and helpful. You represent Ziji's digital presence."
        }
      });
      if (response.text) {
        setAiChat(prev => [...prev, { role: 'bot', text: response.text.trim() }]);
      }
    } catch (error) {
      setAiChat(prev => [...prev, { role: 'bot', text: "ERROR: NEURAL_LINK_INTERRUPTED. PLEASE_RETRY." }]);
    } finally {
      setIsChatting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            height: isMinimized ? '60px' : '500px'
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 right-8 w-96 bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span className="text-[10px] font-headline uppercase tracking-widest text-secondary">NEURAL_ASSISTANT_V1.0</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-surface-container-highest rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-on-surface-variant" /> : <Minimize2 className="w-4 h-4 text-on-surface-variant" />}
              </button>
              <button 
                onClick={onClose}
                className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-colors"
              >
                <X className="w-4 h-4 text-on-surface-variant" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Chat Area */}
              <div 
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-secondary/20"
              >
                {aiChat.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                    <Bot className="w-12 h-12" />
                    <p className="text-xs font-headline uppercase tracking-widest">INITIALIZING_NEURAL_LINK...<br/>AWAITING_INPUT</p>
                  </div>
                )}
                {aiChat.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary/10 text-on-surface border-r-2 border-primary rounded-tr-none' : 'bg-surface-container-high text-on-surface border-l-2 border-secondary rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isChatting && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 bg-surface-container-high rounded-2xl rounded-tl-none flex gap-1">
                      <div className="w-1 h-1 bg-secondary rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form onSubmit={handleChat} className="p-4 bg-surface-container-high border-t border-outline-variant/10 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="QUERY_NEURAL_LINK..." 
                  className="flex-1 bg-background border border-outline-variant/20 rounded-full px-4 py-2 text-xs focus:ring-1 focus:ring-secondary outline-none uppercase"
                />
                <button 
                  type="submit"
                  disabled={isChatting || !chatInput.trim()}
                  className="w-10 h-10 bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:shadow-[0_0_15px_rgba(242,125,38,0.4)] transition-all disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NeuralAssistant;
