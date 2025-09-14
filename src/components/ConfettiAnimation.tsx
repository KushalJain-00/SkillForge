import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  shape: string;
}

interface ConfettiAnimationProps {
  trigger: boolean;
  onComplete?: () => void;
}

const ConfettiAnimation = ({ trigger, onComplete }: ConfettiAnimationProps) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const colors = ['#A7D8F5', '#C7B9FF', '#B2F0E4', '#FFB6C1', '#87CEEB', '#DDA0DD'];
  const shapes = ['■', '●', '♦', '▲'];

  useEffect(() => {
    if (trigger) {
      // Create confetti pieces
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * -15 - 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
      
      setConfetti(pieces);
      setIsActive(true);

      // Animation loop
      const animate = () => {
        setConfetti(prev => 
          prev.map(piece => ({
            ...piece,
            x: piece.x + piece.vx,
            y: piece.y + piece.vy,
            vy: piece.vy + 0.3, // gravity
          })).filter(piece => piece.y < window.innerHeight + 100)
        );
      };

      const interval = setInterval(animate, 16);

      // Clean up after 3 seconds
      const timeout = setTimeout(() => {
        setIsActive(false);
        setConfetti([]);
        clearInterval(interval);
        onComplete?.();
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [trigger, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute text-lg font-bold animate-pulse"
          style={{
            left: piece.x,
            top: piece.y,
            color: piece.color,
            transform: `rotate(${piece.vx * 10}deg)`,
          }}
        >
          {piece.shape}
        </div>
      ))}
    </div>
  );
};

export default ConfettiAnimation;