import React from 'react';

export const WaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Gradient Background */}
      <div className="absolute inset-0 wave-background" />
      
      {/* Animated Wave Layers */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-64 opacity-30"
        viewBox="0 0 1200 300" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="wave3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.15" />
            <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 */}
        <path 
          d="M0,160 C150,200 350,100 600,140 C850,180 1050,120 1200,160 L1200,300 L0,300 Z" 
          fill="url(#wave1)"
          className="animate-[wave-flow_12s_ease-in-out_infinite]"
        />
        
        {/* Wave 2 */}
        <path 
          d="M0,180 C250,220 450,140 700,160 C950,180 1150,140 1200,180 L1200,300 L0,300 Z" 
          fill="url(#wave2)"
          className="animate-[wave-flow_15s_ease-in-out_infinite_reverse]"
        />
        
        {/* Wave 3 */}
        <path 
          d="M0,200 C300,240 500,180 800,200 C1000,220 1100,200 1200,220 L1200,300 L0,300 Z" 
          fill="url(#wave3)"
          className="animate-[wave-flow_18s_ease-in-out_infinite]"
        />
      </svg>
      
      {/* Soft Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-glow/10 rounded-full blur-3xl animate-gentle-pulse" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-secondary/15 rounded-full blur-2xl animate-gentle-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-accent/10 rounded-full blur-3xl animate-gentle-pulse" style={{ animationDelay: '4s' }} />
    </div>
  );
};