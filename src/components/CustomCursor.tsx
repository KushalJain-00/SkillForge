import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [targetBounds, setTargetBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isMobile = useIsMobile();
  const animationFrame = useRef<number>();

  useEffect(() => {
    if (isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      animationFrame.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.tagName === 'BUTTON' || 
                           target.tagName === 'A' || 
                           target.tagName === 'INPUT' ||
                           target.tagName === 'TEXTAREA' ||
                           !!target.closest('button') || 
                           !!target.closest('a') ||
                           !!target.closest('[role="button"]') ||
                           target.style.cursor === 'pointer' ||
                           target.classList.contains('cursor-pointer');
      
      if (isInteractive) {
        setHoveredElement(target);
        const rect = target.getBoundingClientRect();
        setTargetBounds({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      } else {
        setHoveredElement(null);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot - always visible */}
      <div
        className={`fixed pointer-events-none z-[9999] rounded-full transition-all duration-150 ${
          isClicking ? 'w-2 h-2 bg-accent' : 'w-1.5 h-1.5 bg-primary'
        }`}
        style={{
          left: position.x - (isClicking ? 4 : 3),
          top: position.y - (isClicking ? 4 : 3),
          background: `hsl(var(${isClicking ? '--accent' : '--primary'}))`,
        }}
      />
      
      {/* Target brackets - appear on hover */}
      {hoveredElement && (
        <div
          className={`fixed pointer-events-none z-[9998] transition-all duration-300 ${
            isClicking ? 'scale-90' : 'scale-100'
          }`}
          style={{
            left: targetBounds.x - 4,
            top: targetBounds.y - 4,
            width: targetBounds.width + 8,
            height: targetBounds.height + 8,
          }}
        >
          {/* Top-left bracket */}
          <div
            className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/60 animate-scale-in"
            style={{ borderColor: 'hsl(var(--primary) / 0.6)' }}
          />
          {/* Top-right bracket */}
          <div
            className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/60 animate-scale-in"
            style={{ borderColor: 'hsl(var(--primary) / 0.6)', animationDelay: '0.05s' }}
          />
          {/* Bottom-left bracket */}
          <div
            className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/60 animate-scale-in"
            style={{ borderColor: 'hsl(var(--primary) / 0.6)', animationDelay: '0.1s' }}
          />
          {/* Bottom-right bracket */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/60 animate-scale-in"
            style={{ borderColor: 'hsl(var(--primary) / 0.6)', animationDelay: '0.15s' }}
          />
        </div>
      )}
      
      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997] rounded-full border-2 border-accent/50 animate-ping"
          style={{
            left: position.x - 12,
            top: position.y - 12,
            width: '24px',
            height: '24px',
            borderColor: 'hsl(var(--accent) / 0.5)',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;