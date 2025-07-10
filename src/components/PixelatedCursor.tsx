'use client';

import { useState, useEffect, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

interface TrailPoint extends Position {
    id: number;
}

interface Sparkle extends Position {
    id: number;
    size: number;
    opacity: number;
    rotation: number;
    color: string;
    vx: number;
    vy: number;
}

const PixelatedCursor = () => {
    const [mousePosition, setMousePosition] = useState<Position>({ x: -100, y: -100 });
    const [followerPosition, setFollowerPosition] = useState<Position>({ x: -100, y: -100 });
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const [trail, setTrail] = useState<TrailPoint[]>([]);
    const animationFrameId = useRef<number | null>(null);
    const sparkleId = useRef<number>(0);
    const isClicking = false;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
        const newPos = { x: e.clientX, y: e.clientY };
        setMousePosition(newPos);
        
        // Add trail point
        setTrail(prev => {
            const newTrail = [...prev, { ...newPos, id: Date.now() + Math.random() }];
            return newTrail.slice(-8); // Keep last 8 points
        });

        // Create sparkles randomly
        if (Math.random() < 0.3) {
            const colors = ['#ff6b9d', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
            const newSparkle: Sparkle = {
                id: sparkleId.current++,
                x: newPos.x + (Math.random() - 0.5) * 40,
                y: newPos.y + (Math.random() - 0.5) * 40,
                size: Math.random() * 3 + 2,
                opacity: 1,
                rotation: Math.random() * 360,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: 0,
                vy: 0
            };
            setSparkles(prev => [...prev, newSparkle]);
        }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const followMouse = () => {
        setFollowerPosition(prev => {
            const dx = mousePosition.x - prev.x;
            const dy = mousePosition.y - prev.y;
            return {
            x: prev.x + dx * 0.15,
            y: prev.y + dy * 0.15,
            };
        });
        animationFrameId.current = requestAnimationFrame(followMouse);
        };

        animationFrameId.current = requestAnimationFrame(followMouse);

        return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        //   window.removeEventListener('mousedown', handleMouseDown);
        //   window.removeEventListener('mouseup', handleMouseUp);
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
        };
    }, [mousePosition]);

    // Update sparkles
    useEffect(() => {
        const interval = setInterval(() => {
        setSparkles(prev => prev.map(sparkle => ({
            ...sparkle,
            x: sparkle.x + sparkle.vx,
            y: sparkle.y + sparkle.vy,
            opacity: sparkle.opacity - 0.015,
            rotation: sparkle.rotation + 3,
            vy: sparkle.vy + 0.1 // gravity effect
        })).filter(sparkle => sparkle.opacity > 0));
        }, 16);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cursor-container">
        <style jsx>{`
            .cursor-container {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
            width: 100vw;
            height: 100vh;
            }

            .magic-cursor {
            position: fixed;
            width: 12px;
            height: 12px;
            background: ${isClicking ? 
                'radial-gradient(circle, #ff6b9d 0%, #4ecdc4 50%, #45b7d1 100%)' : 
                'linear-gradient(45deg, #ff6b9d, #4ecdc4)'};
            border-radius: 50%;
            box-shadow: 
                0 0 ${isClicking ? '20px' : '10px'} #ff6b9d,
                0 0 ${isClicking ? '40px' : '20px'} #4ecdc4,
                0 0 ${isClicking ? '60px' : '30px'} #45b7d1;
            animation: ${isClicking ? 'click-pulse 0.2s ease-out' : 'pulse 1.5s ease-in-out infinite'};
            transform: translate(-50%, -50%) ${isClicking ? 'scale(1.5)' : 'scale(1)'};
            transition: all 0.1s ease;
            }

            .magic-cursor::before {
            content: '';
            position: absolute;
            width: ${isClicking ? '30px' : '20px'};
            height: 2px;
            background: linear-gradient(90deg, transparent, #fff, transparent);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: ${isClicking ? 'fast-rotate 0.5s linear infinite' : 'rotate 2s linear infinite'};
            }

            .magic-cursor::after {
            content: '';
            position: absolute;
            width: 2px;
            height: ${isClicking ? '30px' : '20px'};
            background: linear-gradient(0deg, transparent, #fff, transparent);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: ${isClicking ? 'fast-rotate 0.5s linear infinite' : 'rotate 2s linear infinite'};
            }

            .magic-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,107,157,0.3) 0%, rgba(78,205,196,0.1) 50%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%) ${isClicking ? 'scale(2)' : 'scale(1)'};
            animation: float 3s ease-in-out infinite;
            transition: transform 0.2s ease;
            }

            .sparkle {
            position: fixed;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9998;
            width: var(--size);
            height: var(--size);
            filter: drop-shadow(0 0 6px var(--color));
            }

            .sparkle svg {
            width: 100%;
            height: 100%;
            fill: var(--color);
            opacity: var(--opacity);
            transform: rotate(var(--rotation));
            animation: sparkle-twinkle 1.2s ease-in-out infinite;
            }

            .trail-point {
            position: fixed;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(255,107,157,0.8) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9997;
            }

            @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.2); }
            }

            @keyframes click-pulse {
            0% { transform: translate(-50%, -50%) scale(1.5); }
            50% { transform: translate(-50%, -50%) scale(2); }
            100% { transform: translate(-50%, -50%) scale(1.5); }
            }

            @keyframes rotate {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes fast-rotate {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            50% { transform: translate(-50%, -50%) scale(1.1) rotate(180deg); }
            }

            @keyframes sparkle-twinkle {
            0%, 100% { 
                opacity: 0.4; 
                transform: scale(0.8) rotate(var(--rotation)); 
            }
            25% { 
                opacity: 1; 
                transform: scale(1.3) rotate(calc(var(--rotation) + 90deg)); 
            }
            75% { 
                opacity: 0.8; 
                transform: scale(1.1) rotate(calc(var(--rotation) + 270deg)); 
            }
            }

            body {
            cursor: none;
            }
        `}</style>
        
        {/* Main cursor */}
        <div 
            className="magic-cursor"
            style={{ 
            left: mousePosition.x,
            top: mousePosition.y
            }}
        />
        
        {/* Follower */}
        <div 
            className="magic-follower"
            style={{ 
            left: followerPosition.x,
            top: followerPosition.y
            }}
        />
        
        {/* Trail */}
        {trail.map((point, index) => (
            <div
            key={point.id}
            className="trail-point"
            style={{
                left: point.x,
                top: point.y,
                opacity: (index + 1) / trail.length * 0.5,
                transform: `translate(-50%, -50%) scale(${(index + 1) / trail.length})`
            }}
            />
        ))}
        
        {/* Sparkles */}
        {sparkles.map((sparkle: Sparkle) => (
            <div
            key={sparkle.id}
            className="sparkle"
            style={{
                left: sparkle.x,
                top: sparkle.y,
                '--size': `${sparkle.size * 4}px`,
                '--color': sparkle.color,
                '--opacity': sparkle.opacity,
                '--rotation': `${sparkle.rotation}deg`
            } as React.CSSProperties & {
                '--size': string;
                '--color': string;
                '--opacity': number;
                '--rotation': string;
            }}
            >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z" />
            </svg>
            </div>
        ))}
        </div>
    );
};

export default PixelatedCursor;