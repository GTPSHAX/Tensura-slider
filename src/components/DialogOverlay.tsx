import React from 'react';

import { useHoverSound } from "@/hooks/useAudio";

export default function DialogOverlay({ 
  isOpen, 
  onClose, 
  title, 
  callbackClose = () => {},
  children, 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  callbackClose: () => void;
  children: React.ReactNode; 
}) { 
  const playHoverSound = useHoverSound("/music/computer_processing_sound_effects_short_click_select_01_122134_1.mp3");
 
  if (!isOpen) return null; 

  return ( 
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ imageRendering: 'pixelated' }}>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ddd 1px, transparent 1px),
            linear-gradient(to bottom, #ddd 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          backgroundColor: '#f0f0f0'
        }}
      />
      
      {/* Semi-transparent overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-20" 
        onClick={onClose}
        onMouseEnter={playHoverSound}
      />
      
      {/* Dialog box */}
      <div 
        className="relative max-w-md w-full m-4 animate-[fadeIn_300ms_ease-out]" 
        style={{ 
          imageRendering: 'pixelated',
          filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))'
        }} 
      > 
        {/* Main dialog container */}
        <div
          className="border-[3px] border-sky-800"
          style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)',
            borderRadius: '0',
          }}
        >
          {/* Title bar */}
          <div 
            className="flex justify-between items-center px-3 py-2 border-b-[2px] border-b-sky-800"
            style={{
              background: 'linear-gradient(180deg, #87CEEB 0%, #4682B4 100%)',
              boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3)'
            }}
          > 
            <span 
              className="text-white font-bold tracking-wide text-xl md:text-1xl lg:text-2xl"
              style={{ 
                textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
              }}
            > 
              {title}
            </span>
            
            {/* Close button */}
            <button 
              onClick={onClose} 
              onMouseEnter={callbackClose}
              className="w-6 h-6 bg-red-500 border-2 border-black text-white font-bold text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
              style={{ 
                imageRendering: 'pixelated',
                textShadow: '1px 1px 0px rgba(0,0,0,0.5)',
                boxShadow: 'inset 1px 1px 0px rgba(255,255,255,0.3), inset -1px -1px 0px rgba(0,0,0,0.3)'
              }}
            > 
              &#10006;
            </button> 
          </div>
          
          {/* Content area */}
          <div 
            className="p-4"
            style={{
              boxShadow: 'inset 2px 2px 0px rgba(255,255,255,0.3), inset -2px -2px 0px rgba(0,0,0,0.3)'
            }}
          >
            <div 
              className="text-sky-100 mb-4"
              style={{
                lineHeight: '1.4',
                textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
              }}
            > 
              {children} 
            </div>
          </div>
        </div>
      </div>
    </div> 
  ); 
}