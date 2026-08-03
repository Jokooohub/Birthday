import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Cake, Music, Flame, Stars } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../types';

interface RomanticPreloaderProps {
  config: BirthdayConfig;
  onEnter: (playMusic: boolean) => void;
}

const ROMANTIC_QUOTES = [
  "Preparing 25 years of laughter, grace, and endless light...",
  "Gathering golden memories made just for you...",
  "Tuning the romantic Happy Birthday serenade...",
  "Lighting 25 birthday candles with love...",
  "Unwrapping your special celebration... 💖",
];

export const RomanticPreloader: React.FC<RomanticPreloaderProps> = ({ config, onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Rotate quotes every 700ms
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
    }, 800);
    return () => clearInterval(quoteInterval);
  }, []);

  // Smooth loading progression
  useEffect(() => {
    const duration = 2400; // 2.4s total load time
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleStart = (withAudio: boolean) => {
    // Burst confetti when entering main page
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#B5838D', '#FFD8CC', '#E2F0CB', '#E8D9CF', '#DBC5B0'],
      zIndex: 99999,
    });
    onEnter(withAudio);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6]"
    >
      {/* Soft Ambient Radial Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFD8CC]/40 dark:bg-[#B5838D]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-[#E2F0CB]/30 dark:bg-[#4A3B33]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Gentle Icons in Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0.6 + Math.random() * 0.8,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
            className="absolute text-[#B5838D] dark:text-[#FFD8CC]"
          >
            {i % 3 === 0 ? (
              <Heart className="w-5 h-5 fill-current" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-4 h-4" />
            ) : (
              <Stars className="w-4 h-4 text-[#DBC5B0]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Preloader Card */}
      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Glowing Heart & Candle Centerpiece */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#FFD8CC] via-[#F2E5DD] to-[#E8D9CF] dark:from-[#382E28] dark:to-[#4A3B33] p-1 shadow-xl flex items-center justify-center border border-[#E8D9CF] dark:border-[#52433B]">
            <div className="w-full h-full rounded-full bg-[#FDF8F5] dark:bg-[#261E1A] flex flex-col items-center justify-center relative overflow-hidden">
              <Flame className="w-7 h-7 text-[#FFB7B2] dark:text-[#FFD8CC] animate-pulse mb-0.5 drop-shadow-[0_0_8px_rgba(255,183,178,0.8)]" />
              <Heart className="w-6 h-6 text-[#B5838D] dark:text-[#FFD8CC] fill-[#B5838D]" />
            </div>
          </div>
          {/* Outer Pulsing Halo */}
          <span className="absolute -inset-2 rounded-full border border-[#B5838D]/30 dark:border-[#FFD8CC]/20 animate-ping opacity-75 pointer-events-none" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl sm:text-3xl font-light italic text-[#4A3B33] dark:text-[#F5EBE6] mb-2"
        >
          Celebrating <span className="text-[#B5838D] dark:text-[#FFD8CC] font-normal">{config.name}</span>
        </motion.h1>

        <p className="text-xs uppercase tracking-[0.2em] text-[#B5838D] dark:text-[#DBC5B0] font-medium mb-8">
          A Special 25th Birthday Experience
        </p>

        {/* Animated Quote */}
        <div className="h-10 mb-6 flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-light italic text-[#4A3B33]/80 dark:text-[#E8D9CF]/90 max-w-xs"
            >
              "{ROMANTIC_QUOTES[quoteIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="w-64 sm:w-72 mb-8">
          <div className="flex justify-between items-center text-[11px] font-medium text-[#B5838D] dark:text-[#DBC5B0] mb-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Unwrapping...
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-[#E8D9CF]/50 dark:bg-[#382E28] rounded-full overflow-hidden p-0.5 border border-[#F2E5DD] dark:border-[#4A3B33]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#B5838D] via-[#FFD8CC] to-[#E2F0CB] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Action Button once ready */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="flex flex-col gap-3 items-center"
          >
            <button
              onClick={() => handleStart(true)}
              className="px-8 py-3.5 rounded-full bg-[#4A3B33] dark:bg-[#B5838D] hover:bg-[#382E28] dark:hover:bg-[#a2717b] text-white font-medium text-xs uppercase tracking-[0.18em] shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-2 border border-[#FFD8CC]/30"
            >
              <Music className="w-4 h-4 text-[#FFD8CC] animate-bounce" />
              <span>Enter Celebration & Play Music 💖</span>
            </button>
            <button
              onClick={() => handleStart(false)}
              className="text-[11px] text-[#B5838D] dark:text-[#DBC5B0] hover:underline cursor-pointer"
            >
              Enter silently without music
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
