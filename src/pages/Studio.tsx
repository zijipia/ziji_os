import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Youtube, Play, SkipForward, Volume2, ChevronRight, MessageSquare } from 'lucide-react';
import { YouTubeVideo, YouTubeComment, YouTubeStats } from '../types';

const StudioPage: React.FC<{ transition: any }> = ({ transition }) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [comments, setComments] = useState<YouTubeComment[]>([]);
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || 'UC-lHJZR3GqxkQlow71PqfPg';

  useEffect(() => {
    const fetchYouTubeData = async () => {
      if (!YOUTUBE_API_KEY) {
        setError('YOUTUBE_API_KEY_MISSING');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch Videos
        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=5&type=video`
        );
        const videosData = await videosRes.json();
        
        if (videosData.error) throw new Error(videosData.error.message);

        const formattedVideos = (videosData.items || []).map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));

        // Fetch Comments
        const commentsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}&allThreadsRelatedToChannelId=${CHANNEL_ID}&part=snippet&maxResults=5&order=time`
        );
        const commentsData = await commentsRes.json();

        const formattedComments = (commentsData.items || []).map((item: any) => ({
          id: item.id,
          author: item.snippet.topLevelComment.snippet.authorDisplayName,
          authorThumb: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          text: item.snippet.topLevelComment.snippet.textDisplay,
          publishedAt: new Date(item.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString()
        }));

        // Fetch Channel Stats
        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?key=${YOUTUBE_API_KEY}&id=${CHANNEL_ID}&part=statistics`
        );
        const statsData = await statsRes.json();
        if (statsData.items && statsData.items[0]) {
          setStats(statsData.items[0].statistics);
        }

        setVideos(formattedVideos);
        setComments(formattedComments);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeData();
  }, [YOUTUBE_API_KEY, CHANNEL_ID]);

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (isNaN(n)) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={transition}
      className="space-y-12"
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant/15 p-8 rounded-xl relative overflow-hidden">
          <div className="absolute top-4 right-4 text-[10px] tracking-widest text-secondary uppercase opacity-40">SIGNAL_FLOW: ACTIVE</div>
          <div className="space-y-8">
            <div>
              <h1 className="font-headline text-5xl font-black tracking-tighter uppercase">NEW_VIDEO</h1>
              <p className="text-on-surface-variant max-w-md mt-2">Latest production from Ziji Studio. High-fidelity visual synthesis and neural-audio integration.</p>
            </div>
            
            {videos.length > 0 ? (
              <div className="aspect-video relative rounded-lg overflow-hidden border border-outline-variant/20 group">
                <img 
                  src={videos[0].thumbnail} 
                  alt={videos[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <div className="text-[10px] font-headline text-primary uppercase tracking-[0.4em]">PREMIERE_NOW</div>
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight line-clamp-2">{videos[0].title}</h2>
                  <a 
                    href={videos[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-on-primary rounded-full font-headline text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(129,236,255,0.5)] transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" /> WATCH_ON_YOUTUBE
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-end justify-between gap-1 px-4">
                {[40, 65, 30, 85, 50, 95, 70, 40, 60, 30, 75, 55, 90, 45, 65, 35, 80, 50, 70].map((h, i) => (
                  <div key={i} className={`w-2 rounded-full ${i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-primary-dim'}`} style={{ height: `${h}%` }}></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-rows-2 gap-6">
          <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-primary/30">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] text-primary uppercase font-bold tracking-widest">CHANNEL_STATS</span>
              <span className="text-[10px] text-on-surface-variant">LIVE_SYNC</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-[10px] text-on-surface-variant uppercase">Subscribers</div>
                <div className="text-3xl font-headline font-bold text-primary">{stats ? formatNumber(stats.subscriberCount) : '---'}</div>
              </div>
              <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-high p-6 rounded-xl border-b-2 border-secondary/30">
            <span className="text-[10px] text-secondary uppercase font-bold tracking-widest block mb-4">ENGAGEMENT_METRICS</span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Total Views</div>
                <div className="text-xl font-headline font-bold">{stats ? formatNumber(stats.viewCount) : '---'}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Videos</div>
                <div className="text-xl font-headline font-bold">{stats ? stats.videoCount : '---'}</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Status</div>
                <div className="text-[10px] font-headline font-bold text-secondary">VERIFIED_PARTNER</div>
              </div>
              <div>
                <div className="text-[10px] text-on-surface-variant uppercase">Region</div>
                <div className="text-[10px] font-headline font-bold">GLOBAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-outline-variant/10 pb-4">
          <h2 className="font-headline text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
            <Youtube className="w-6 h-6 text-red-500" /> STUDIO_SHOWCASE
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="text-[10px] font-headline uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 hover:bg-primary/10 transition-colors"
          >
            REFRESH_BUFFER
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="font-headline text-[10px] tracking-[0.3em] text-primary animate-pulse uppercase">UPLINKING_YOUTUBE_DATA...</span>
          </div>
        ) : error === 'YOUTUBE_API_KEY_MISSING' ? (
          <div className="bg-surface-container-high border border-outline-variant/20 p-8 rounded-xl text-center space-y-4">
            <div className="text-primary opacity-50 flex justify-center"><Youtube className="w-12 h-12" /></div>
            <h3 className="font-headline text-xl font-bold uppercase">API_KEY_REQUIRED</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">Please configure VITE_YOUTUBE_API_KEY in your environment to synchronize with the Ziji Studio channel.</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/30 p-6 text-red-500 font-headline text-sm uppercase tracking-widest">
            ERROR: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Latest Videos */}
            <div className="lg:col-span-8 space-y-4">
              <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest mb-4">LATEST_TRANSMISSIONS</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video) => (
                  <a 
                    key={video.id} 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative bg-surface-container-low border border-outline-variant/10 overflow-hidden hover:border-primary/50 transition-all"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg">
                          <Play className="fill-current ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-[10px] text-primary font-bold tracking-widest uppercase">{video.publishedAt}</div>
                      <h3 className="font-headline text-sm font-bold uppercase line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-on-surface-variant uppercase tracking-widest">
                        <span>PLAY_NOW</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Comments */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-[10px] font-headline text-on-surface-variant uppercase tracking-widest mb-4">COMMUNITY_FEEDBACK</div>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-surface-container-low p-4 border-l-2 border-secondary/30 hover:bg-surface-container-high transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={comment.authorThumb} 
                        alt={comment.author} 
                        className="w-6 h-6 rounded-full border border-outline-variant/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-secondary uppercase tracking-tight">{comment.author}</div>
                        <div className="text-[8px] text-on-surface-variant uppercase">{comment.publishedAt}</div>
                      </div>
                      <MessageSquare className="w-3 h-3 text-on-surface-variant opacity-30" />
                    </div>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-3 italic" dangerouslySetInnerHTML={{ __html: comment.text }}></p>
                  </div>
                ))}
                {comments.length === 0 && (
                  <div className="text-[10px] text-on-surface-variant uppercase tracking-widest text-center py-8 border border-dashed border-outline-variant/20">
                    NO_RECENT_COMMENTS_FOUND
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default StudioPage;
