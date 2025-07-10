'use client';

import { useState } from 'react';
import LogoTensura from "@/components/LogoTensura";
import bg from "../../public/images/background/homescreen.webp";
import PixelatedCursor from "@/components/PixelatedCursor";
import DialogOverlay from '@/components/DialogOverlay';
import { useBackgroundMusic, useHoverSound } from "@/hooks/useAudio";

export default function homescreen() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  // Initialize background music
  useBackgroundMusic('/music/a_night_full_of_stars_peaceful_electronic_8_bitpiano_track_321551.mp3');
  
  // Initialize hover sound
  const playHoverSound = useHoverSound('/music/computer_processing_sound_effects_short_click_select_01_122134.mp3');

  return(
    <div
      className="animated-background font-[family-name:var(--font-pixelify-sans)] bg-cover bg-center min-h-[100svh] text-white p-8 sm:p-20 cursor-none flex items-center justify-center flex-col relative"
      style={{ '--bg-image': `url(${bg.src})` } as React.CSSProperties}
    >
      <div className="lg:scale-130 animate-fade-in">
        {LogoTensura()}
      </div>
      <div
        className="mt-20 text-5xl lg:text-6xl font-bold font-[family-name:var(--font-jersey-10)] flex flex-col items-center justify-center gap-8"
      >
        <a
          href="?page=GameView" 
          className="menu-item relative group bg-gradient-to-b from-sky-500 to-sky-950 text-transparent bg-clip-text transition-all duration-300 hover:scale-110"
          style={{
            textShadow: '-3px -3px 0 oklch(80% 0.169 237.323)',
          }}
          onMouseEnter={playHoverSound}
        >
          Play Game
        </a>
        <button
          onClick={() => setIsOptionsOpen(true)} 
          className="menu-item relative group bg-gradient-to-b from-sky-500 to-sky-950 text-transparent bg-clip-text transition-all duration-300 hover:scale-110"
          style={{
            textShadow: '-3px -3px 0 oklch(75% 0.169 237.323)',
          }}
          onMouseEnter={playHoverSound}
        >
          Options
        </button>
        <button
          onClick={() => setIsAboutOpen(true)} 
          className="menu-item relative group bg-gradient-to-b from-sky-500 to-sky-950 text-transparent bg-clip-text transition-all duration-300 hover:scale-110"
          style={{
            textShadow: '-3px -3px 0 oklch(70% 0.169 237.323)',
          }}
          onMouseEnter={playHoverSound}
        >
          About
        </button>
      </div>
      
      <DialogOverlay
        isOpen={isOptionsOpen}
        onClose={() => setIsOptionsOpen(false)}
        title="Options"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Music Volume</span>
            <input type="range" className="w-32" />
          </div>
          <div className="flex items-center justify-between">
            <span>Sound Effects</span>
            <input type="range" className="w-32" />
          </div>
        </div>
      </DialogOverlay>

      <DialogOverlay
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About"
      >
        <div className="space-y-4">
          <p>Tensura Slider is a fun sliding puzzle game featuring characters from "That Time I Got Reincarnated as a Slime".</p>
          <p>Version: 1.0.0</p>
          <p>Created with ❤️ by Tensura fans</p>
        </div>
      </DialogOverlay>
      
      <PixelatedCursor />
    </div>
  )
}