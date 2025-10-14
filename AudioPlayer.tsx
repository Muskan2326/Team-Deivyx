import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set gentle volume
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 p-3 bg-background/90 backdrop-blur-md rounded-full shadow-soft border border-border/50">
        {/* Audio Element */}
        <audio 
          ref={audioRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
        >
          {/* Placeholder for calming music - in production, add your audio file */}
          <source src="/audio/calming-background.mp3" type="audio/mpeg" />
          <source src="/audio/calming-background.ogg" type="audio/ogg" />
        </audio>

        {/* Play/Pause Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="w-8 h-8 p-0 rounded-full hover:bg-primary-light/30"
          title={isPlaying ? 'Pause music' : 'Play calming music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-primary" />
          )}
        </Button>

        {/* Mute Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="w-8 h-8 p-0 rounded-full hover:bg-primary-light/30"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-primary" />
          )}
        </Button>

        {/* Music Indicator */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-primary animate-pulse' : 'bg-muted-foreground/30'}`} />
          <span className="whitespace-nowrap">Calming Music</span>
        </div>
      </div>
    </div>
  );
};