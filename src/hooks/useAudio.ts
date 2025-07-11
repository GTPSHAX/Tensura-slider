'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * A custom React hook to manage background music playback with manual autoplay support.
 * Provides a method to start playback manually, allowing control based on user settings (e.g., disable music).
 * Handles fade-in effects, user interaction fallbacks, and page visibility.
 *
 * @param audioSrc - The URL/path to the audio file (e.g., '/background-music.mp3')
 * @returns An object containing:
 *  - audioRef: Reference to the HTMLAudioElement
 *  - toggleAudio: Function to toggle play/pause
 *  - isPlaying: Current playback state (boolean)
 *  - autoPlay: Function to manually trigger playback with fade-in effect
 *
 * Example:
 * ```tsx
 * 'use client';
 *
 * import { useBackgroundMusic } from './useAudioHooks';
 * import { useState, useEffect } from 'react';
 *
 * export default function AudioComponent() {
 *   const { toggleAudio, isPlaying, autoPlay } = useBackgroundMusic('/background-music.mp3');
 *   const [musicEnabled, setMusicEnabled] = useState(true);
 *
 *   useEffect(() => {
 *     if (musicEnabled) {
 *       autoPlay();
 *     }
 *   }, [musicEnabled, autoPlay]);
 *
 *   return (
 *     <div>
 *       <button onClick={toggleAudio}>
 *         {isPlaying ? 'Pause Music' : 'Play Music'}
 *       </button>
 *       <button onClick={() => setMusicEnabled(!musicEnabled)}>
 *         {musicEnabled ? 'Disable Music' : 'Enable Music'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useBackgroundMusic(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = useRef<boolean>(false);
  const interactionAttempted = useRef<boolean>(false);

  // Function to attempt playing the audio
  const attemptPlay = useCallback(() => {
    if (audioRef.current && !isPlaying.current && !interactionAttempted.current) {
      interactionAttempted.current = true;
      audioRef.current.muted = true; 
      audioRef.current
        .play()
        .then(() => {
          isPlaying.current = true;
          // Fade in volume
          if (audioRef.current) {
            audioRef.current.muted = false;
            audioRef.current.volume = 0;
          }
          const fadeIn = setInterval(() => {
            if (audioRef.current && audioRef.current.volume < 0.1) {
              audioRef.current.volume = Math.min(audioRef.current.volume + 0.01, 0.1);
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        })
        .catch(error => {
          console.log('Autoplay failed:', error);
          // Fallback: Wait for user interaction
          const handleInteraction = () => {
            if (audioRef.current && !isPlaying.current) {
              audioRef.current.muted = false;
              audioRef.current.volume = 0.1;
              audioRef.current.play().catch(err => console.log('Interaction play failed:', err));
              isPlaying.current = true;
              document.removeEventListener("mousemove", handleInteraction);
              document.removeEventListener('click', handleInteraction);
            }
          };
          document.removeEventListener('mousemove', handleInteraction);
          document.addEventListener('click', handleInteraction);
        });
    }
  }, []);

  // Manual autoplay trigger
  const autoPlay = useCallback(() => {
    attemptPlay();
  }, [attemptPlay]);

  // Toggle play/pause
  const toggleAudio = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying.current) {
        audioRef.current.pause();
        isPlaying.current = false;
      } else {
        audioRef.current.play().catch(err => console.log('Toggle play failed:', err));
        isPlaying.current = true;
      }
    }
    return isPlaying.current; // Return current state for UI updates
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
      audioRef.current.preload = 'auto'; // Preload audio for faster playback
    }

    // Handle page visibility to pause/resume audio
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current && isPlaying.current) {
        audioRef.current.pause();
      } else if (!document.hidden && audioRef.current && isPlaying.current) {
        audioRef.current.play().catch(err => console.log('Visibility play failed:', err));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Clean up interaction listeners in case they were added
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('click', () => {});
    };
  }, [audioSrc]);

  return { audioRef, toggleAudio, isPlaying: isPlaying.current, autoPlay };
}

/**
 * A custom React hook to play a sound effect on hover (or other events).
 * Preloads the audio for low-latency playback and resets the audio to the start each time it's played.
 *
 * @param audioSrc - The URL/path to the audio file (e.g., '/hover-sound.mp3')
 * @returns A function to trigger the sound playback
 *
 * Example:
 * ```tsx
 * 'use client';
 *
 * import { useHoverSound } from './useAudioHooks';
 *
 * export default function ButtonComponent() {
 *   const playHoverSound = useHoverSound('/hover-sound.mp3');
 *
 *   return (
 *     <button onMouseEnter={playHoverSound}>
 *       Hover Me
 *     </button>
 *   );
 * }
 * ```
 */
export function useHoverSound(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.preload = 'auto'; // Preload for low latency
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch(error => {
        console.log('Hover sound playback failed:', error);
      });
    }
  }, []);

  return playSound;
}