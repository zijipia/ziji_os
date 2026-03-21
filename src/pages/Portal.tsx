import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Facebook, Github, Disc, Youtube, ExternalLink, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PortalPage: React.FC<{ transition: any }> = ({ transition }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiChat, setAiChat] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  const enhanceMessage = async () => {
    if (!formData.message.trim()) return;
    setIsEnhancing(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Enhance this contact message to be more professional, clear, and impactful, while keeping the original intent. Keep it concise. Message: "${formData.message}"`,
      });
      if (response.text) {
        setFormData(prev => ({ ...prev, message: response.text.trim() }));
      }
    } catch (error) {
      console.error("AI Enhancement Error:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={transition}
      className="space-y-12"
    >
      <header className="border-l-4 border-primary pl-8 py-4">
        <span className="font-headline text-xs tracking-[0.3em] text-primary uppercase block mb-2">SYSTEM_ACTION // UPLINK</span>
        <h1 className="font-headline text-6xl font-black uppercase tracking-tighter">ESTABLISH_CONTACT_LINK</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant/30">
            <div className="bg-background p-8 space-y-8">
              <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-cyan-500/50"></div>
                </div>
                <span className="text-[10px] text-on-surface-variant tracking-widest uppercase">root@ziji-os:~/uplink/message_composer</span>
              </div>
              <form className="space-y-8">
                <div className="space-y-2 group">
                  <label className="text-[10px] text-primary uppercase tracking-widest">01_IDENTITY_STRING</label>
                  <div className="flex items-center gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                    <span className="text-primary opacity-50">&gt;</span>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      placeholder="ENTER_NAME..." 
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30" 
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <label className="text-[10px] text-primary uppercase tracking-widest">02_COMMS_ENDPOINT</label>
                  <div className="flex items-center gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                    <span className="text-primary opacity-50">&gt;</span>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      placeholder="EMAIL_ADDRESS..." 
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30" 
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] text-primary uppercase tracking-widest">03_DATA_PAYLOAD</label>
                    <button 
                      type="button"
                      onClick={enhanceMessage}
                      disabled={isEnhancing || !formData.message.trim()}
                      className="flex items-center gap-2 text-[10px] text-secondary uppercase tracking-widest hover:text-primary transition-colors disabled:opacity-30"
                    >
                      {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      ENHANCE_WITH_AI
                    </button>
                  </div>
                  <div className="flex items-start gap-4 border-b border-outline-variant/20 group-focus-within:border-primary transition-colors">
                    <span className="text-primary opacity-50 mt-1">&gt;</span>
                    <textarea 
                      value={formData.message}
                      onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      placeholder="INITIALIZE_MESSAGE_INPUT..." 
                      className="w-full bg-transparent border-none focus:ring-0 text-xl font-headline uppercase placeholder:text-outline-variant/30 h-32 resize-none" 
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-10 py-4 bg-primary text-on-primary font-headline font-bold uppercase tracking-widest rounded-full hover:shadow-[0_0_25px_rgba(129,236,255,0.4)] transition-all">
                    EXECUTE_SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          {/* Neural Assistant Chat */}
          <div className="bg-surface-container-low border border-outline-variant/20 rounded-lg overflow-hidden flex flex-col h-[500px] shadow-xl">
            <div className="bg-surface-container-high px-4 py-3 flex items-center justify-between border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-[10px] font-headline uppercase tracking-widest text-secondary">NEURAL_ASSISTANT_V1.0</span>
              </div>
              <Bot className="w-4 h-4 text-secondary opacity-50" />
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-secondary/20">
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
                  <div className={`p-4 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-primary/10 text-on-surface border-r-2 border-primary' : 'bg-surface-container-high text-on-surface border-l-2 border-secondary'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isChatting && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 bg-surface-container-high rounded-lg flex gap-1">
                    <div className="w-1 h-1 bg-secondary rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-secondary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1 h-1 bg-secondary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>
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
          </div>

          <div className="bg-surface-container-low p-8 border-r border-secondary/20 space-y-6">
            <h2 className="font-headline text-2xl font-black text-secondary uppercase flex items-center gap-2">
              <Activity className="w-6 h-6" /> SECURE_NODES
            </h2>
            <div className="space-y-4">
              {[
                { icon: Facebook, label: 'FACEBOOK_NODE', url: 'https://www.facebook.com/Ziji.Pia' },
                { icon: Github, label: 'GITHUB_REPO', url: 'https://github.com/zijipia' },
                { icon: Disc, label: 'DISCORD_VOID', url: 'https://discord.gg/zaskhD7PTW' },
                { icon: Youtube, label: 'STUDIO_CHANNEL', url: 'https://www.youtube.com/@ZijiStudio' },
                { icon: Youtube, label: 'NIGHTCORE_CHANNEL', url: 'https://www.youtube.com/@ZijiNightcore' },
              ].map((node, i) => (
                <a 
                  key={i} 
                  href={node.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-surface-container-high border-l-2 border-secondary/20 hover:border-secondary transition-all hover:translate-x-2 group"
                >
                  <div className="flex items-center gap-4">
                    <node.icon className="w-5 h-5 text-secondary" />
                    <span className="text-xs font-headline uppercase tracking-widest">{node.label}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PortalPage;
