import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Facebook, Github, Disc, Youtube, ExternalLink, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const PortalPage: React.FC<{ transition: any }> = ({ transition }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isEnhancing, setIsEnhancing] = useState(false);

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
        <div className="lg:col-span-8 space-y-8">
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

        <div className="lg:col-span-4 space-y-8">
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
