export type Module = 'TERMINAL' | 'ARCHIVES' | 'SPECS' | 'STUDIO' | 'PORTAL' | 'SHELL' | 'SETTINGS';

export interface AppSettings {
  scanline: boolean;
  circuitGrid: number;
  neuralAcceleration: boolean;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
}

export interface YouTubeComment {
  id: string;
  author: string;
  authorThumb: string;
  text: string;
  publishedAt: string;
}

export interface YouTubeStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}
