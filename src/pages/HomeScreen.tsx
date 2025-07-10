'use client';


import LogoTensura from "@/components/LogoTensura";
import bg from "../../public/images/background/homescreen.webp";
import PixelatedCursor from "@/components/PixelatedCursor";
import { useBackgroundMusic, useHoverSound } from "@/hooks/useAudio";

export default function homescreen() {
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
          <span className="absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">▶</span>
        </a>
        <a
          href="#options" 
          className="menu-item relative group bg-gradient-to-b from-sky-500 to-sky-950 text-transparent bg-clip-text transition-all duration-300 hover:scale-110"
          style={{
            textShadow: '-3px -3px 0 oklch(75% 0.169 237.323)',
          }}
          onMouseEnter={playHoverSound}
        >
          Options
          <span className="absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">⚙</span>
        </a>
        <a
          href="#about" 
          className="menu-item relative group bg-gradient-to-b from-sky-500 to-sky-950 text-transparent bg-clip-text transition-all duration-300 hover:scale-110"
          style={{
            textShadow: '-3px -3px 0 oklch(70% 0.169 237.323)',
          }}
          onMouseEnter={playHoverSound}
        >
          About
          <span className="absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">ℹ</span>
        </a>
      </div>
      <PixelatedCursor />
    </div>
  )
}