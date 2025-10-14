import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AudioPlayer } from './AudioPlayer';
import { WaveBackground } from './WaveBackground';

export const Layout = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <WaveBackground />
      
      {/* Floating Particles */}
      <div className="floating-particles fixed inset-0 pointer-events-none" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>
      
      {/* Background Music Player */}
      <AudioPlayer />
    </div>
  );
};