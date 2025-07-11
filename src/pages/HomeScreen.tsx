'use client';

import { useEffect, useState } from 'react';
import LogoTensura from "@/components/LogoTensura";
import bg from "../../public/images/background/homescreen.webp";
import PixelatedCursor from "@/components/PixelatedCursor";
import DialogOverlay from '@/components/DialogOverlay';
import { useBackgroundMusic, useHoverSound } from "@/hooks/useAudio";
import LocalStorageManager from '@/utils/LocalStorageManager';

export default function HomeScreen() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [optionsManager] = useState<LocalStorageManager>(new LocalStorageManager('options'));
  const [isMusicEnabled, setMusicEnabled] = useState<boolean>(
    optionsManager.getItem('music') === 'true' || optionsManager.getItem('music') === null
  );
  const [isSoundEnabled, setSoundEnabled] = useState<boolean>(
    optionsManager.getItem('sound') === 'true' || optionsManager.getItem('sound') === null
  );

  const { audioRef, autoPlay, isPlaying } = useBackgroundMusic('/music/a_night_full_of_stars_peaceful_electronic_8_bitpiano_track_321551.mp3');

  const hoverSound = useHoverSound('/music/computer_processing_sound_effects_short_click_select_01_122134.mp3');
  const hoverSoundClose = useHoverSound('/music/computer_processing_sound_effects_short_click_select_01_122134_1.mp3');

  const playHoverSound = () => {
    if (isSoundEnabled) {
      hoverSound();
    }
  };
  const playHoverSoundClose = () => {
    if (isSoundEnabled) {
      hoverSoundClose();
    }
  };

  useEffect(() => {
    if (isMusicEnabled && !isPlaying) {
      autoPlay();
    } else if (!isMusicEnabled) {
      audioRef.current?.pause();
    }
    else {
      audioRef.current?.play();
    }
  }, [isMusicEnabled]);

  const handleMusicChange = (checked: boolean) => {
    setMusicEnabled(checked);
    optionsManager.setItem('music', checked.toString());
  };

  const handleSoundChange = (checked: boolean) => {
    setSoundEnabled(checked);
    optionsManager.setItem('sound', checked.toString());
  };

  return (
    <div
      className="font-[family-name:var(--font-pixelify-sans)] bg-cover bg-center min-h-[100svh] text-white p-8 sm:p-20 cursor-none flex items-center justify-center flex-col relative"
      style={{ backgroundImage: `url(${bg.src})` } as React.CSSProperties}
    >
      <div className="scale-120 lg:scale-130 animate-fade-in">
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
        callbackClose={playHoverSoundClose}
      >
        <div className="space-y-4">
          <div>
            <label className="relative flex items-center justify-between cursor-pointer">
              <span className="font-[family-name:var(--font-pixelify-sans)] text-lg">Music</span>
              <input
                type="checkbox"
                className="sr-only peer w-8 h-8" // Hide default checkbox
                checked={isMusicEnabled}
                onChange={(e) => handleMusicChange(e.target.checked)}
              />
              <div
                className="
                  w-8 h-8
                  bg-gray-700
                  border-2 border-white
                  peer-checked:bg-blue-500
                  peer-checked:border-blue-300
                  transition-all duration-200
                  pixelated-checkbox
                "
              ></div>
            </label>
          </div>
          <div>
            <label className="relative flex items-center justify-between cursor-pointer">
              <span className="font-[family-name:var(--font-pixelify-sans)] text-lg">Sound Effects</span>
              <input
                type="checkbox"
                className="sr-only peer w-8 h-8"
                checked={isSoundEnabled}
                onChange={(e) => handleSoundChange(e.target.checked)}
              />
              <div
                className="
                  w-8 h-8
                  bg-gray-700
                  border-2 border-white
                  peer-checked:bg-blue-500
                  peer-checked:border-blue-300
                  transition-all duration-200
                  pixelated-checkbox
                "
              ></div>
            </label>
          </div>
        </div>
      </DialogOverlay>

      <DialogOverlay
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        title="About"
        callbackClose={playHoverSoundClose}
      >
        <div className="space-y-4">
          <p>Tensura Slider is a fun sliding puzzle game featuring characters from "That Time I Got Reincarnated as a Slime".</p>
          <p>Version: 1.0.0</p>
          <p>Created with ❤️ by Tensura fans</p>
        </div>
      </DialogOverlay>

      <PixelatedCursor />
    </div>
  );
}