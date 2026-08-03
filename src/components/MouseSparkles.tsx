import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  type: 'star' | 'heart' | 'circle';
  rotation: number;
  rotationSpeed: number;
}

const PARTICLE_COLORS = ['#B5838D', '#FFD8CC', '#E2F0CB', '#E8D9CF', '#DBC5B0'];

export const MouseSparkles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let distanceTraveled = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawHeart = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const drawStar = (ctx: CanvasRenderingContext2D, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos(((180 + i * 90) * Math.PI) / 180) * r, Math.sin(((180 + i * 90) * Math.PI) / 180) * r);
        ctx.lineTo(Math.cos(((225 + i * 90) * Math.PI) / 180) * (r * 0.35), Math.sin(((225 + i * 90) * Math.PI) / 180) * (r * 0.35));
      }
      ctx.closePath();
      ctx.fill();
    };

    const createParticle = (x: number, y: number) => {
      const typeRand = Math.random();
      const type: Particle['type'] = typeRand < 0.25 ? 'heart' : typeRand < 0.6 ? 'star' : 'circle';
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      particles.push({
        x,
        y,
        size: type === 'heart' ? Math.random() * 6 + 6 : type === 'star' ? Math.random() * 5 + 4 : Math.random() * 3 + 2,
        color,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.8, // slight upward float
        alpha: 1,
        decay: Math.random() * 0.02 + 0.02,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
      });
    };

    const handlePointerMove = (x: number, y: number) => {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      distanceTraveled += dist;

      if (distanceTraveled > 12) {
        const particleCount = Math.min(Math.floor(dist / 15) + 1, 3);
        for (let i = 0; i < particleCount; i++) {
          createParticle(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8);
        }
        distanceTraveled = 0;
      }

      lastX = x;
      lastY = y;
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'heart') {
          drawHeart(ctx, p.size);
        } else if (p.type === 'star') {
          drawStar(ctx, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
};
