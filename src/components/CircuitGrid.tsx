import React, { useEffect, useRef } from 'react';

const CircuitGrid: React.FC<{ opacity: number, mousePos: { x: number, y: number } }> = ({ opacity, mousePos }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(mousePos);

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      
      ctx.clearRect(0, 0, w, h);
      
      const spacing = 24;
      const dotRadius = 1;
      const avoidRadius = 150;
      const avoidStrength = 20;

      ctx.fillStyle = `rgba(129, 236, 255, ${opacity})`;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      for (let x = spacing / 2; x < w; x += spacing) {
        for (let y = spacing / 2; y < h; y += spacing) {
          const dx = x - mX;
          const dy = y - mY;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          
          let drawX = x;
          let drawY = y;
          let scale = 1;

          if (dist < avoidRadius && dist > 0) {
            const force = (avoidRadius - dist) / avoidRadius;
            drawX += (dx / dist) * force * avoidStrength;
            drawY += (dy / dist) * force * avoidStrength;
            scale = Math.max(0.1, dist / avoidRadius); 
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, dotRadius * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default CircuitGrid;
