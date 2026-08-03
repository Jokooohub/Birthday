import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeartItem {
  id: number;
  left: number; // percentage 0 - 100
  size: number; // px
  duration: number; // seconds for full vertical drift
  delay: number; // seconds
  opacity: number;
  color: string;
  sway: number; // px horizontal drift
  rotate: number; // deg
}

const HEART_COLORS = [
  '#B5838D',
  '#FFD8CC',
  '#E8D9CF',
  '#E2F0CB',
  '#DBC5B0',
];

export const FloatingBackgroundHearts: React.FC = () => {
  // Generate a fixed set of floating hearts
  const hearts = useMemo<FloatingHeartItem[]>(() => {
    return Array.from({ length: 22 }, (_, index) => {
      const size = Math.floor(Math.random() * 14) + 10; // 10px - 24px
      const duration = Math.random() * 12 + 14; // 14s - 26s slow drift
      const delay = Math.random() * 10;
      const left = Math.random() * 96 + 2; // 2% - 98%
      const opacity = Math.random() * 0.2 + 0.12; // 0.12 - 0.32 subtle
      const color = HEART_COLORS[index % HEART_COLORS.length];
      const sway = (Math.random() - 0.5) * 60; // sway -30px to +30px
      const rotate = (Math.random() - 0.5) * 40;

      return {
        id: index,
        left,
        size,
        duration,
        delay,
        opacity,
        color,
        sway,
        rotate,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    >
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{
            y: '105vh',
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            x: [0, h.sway, -h.sway / 2, 0],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [0, h.rotate, -h.rotate, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${h.left}%`,
            color: h.color,
          }}
        >
          <Heart
            style={{ width: h.size, height: h.size }}
            className="fill-current drop-shadow-sm"
          />
        </motion.div>
      ))}
    </div>
  );
};
