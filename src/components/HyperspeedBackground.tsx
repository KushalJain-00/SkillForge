import { useEffect, useRef } from "react";

const HyperspeedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Stars array
    const stars: Array<{
      x: number;
      y: number;
      z: number;
      prevX: number;
      prevY: number;
    }> = [];

    // Initialize stars
    for (let i = 0; i < 800; i++) {
      stars.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
      });
    }

    let speed = 0.5;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach((star) => {
        // Store previous position
        star.prevX = (star.x / star.z) * canvas.width + centerX;
        star.prevY = (star.y / star.z) * canvas.height + centerY;

        // Move star
        star.z -= speed;

        // Reset star if it's too close
        if (star.z <= 0) {
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = 1000;
        }

        // Calculate new position
        const x = (star.x / star.z) * canvas.width + centerX;
        const y = (star.y / star.z) * canvas.height + centerY;

        // Only draw if star is visible
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          const size = (1 - star.z / 1000) * 2;
          const opacity = 1 - star.z / 1000;

          // Draw star trail
          ctx.strokeStyle = `rgba(167, 216, 245, ${opacity * 0.8})`; // Sky blue
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // Draw star
          ctx.fillStyle = `rgba(199, 185, 255, ${opacity})`; // Lavender
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}
    />
  );
};

export default HyperspeedBackground;