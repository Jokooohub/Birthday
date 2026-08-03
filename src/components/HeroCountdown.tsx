import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Cake, Gift, Calendar, Clock, ChevronDown, Wand2 } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface HeroCountdownProps {
  config: BirthdayConfig;
  onOpenLetter: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({
  config,
  onOpenLetter,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: false });
  const hasTriggeredZeroConfetti = useRef(false);

  // Calculate live countdown
  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(config.birthdayDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [config.birthdayDate]);

  // Enhanced canvas confetti animation trigger
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = [
      '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', 
      '#E8CEE4', '#FFD1DC', '#B5838D', '#FFD8CC', '#4A3B33'
    ];

    // Stage 1: Big central starburst
    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors,
      zIndex: 9999,
    });

    // Stage 2: Continuous side cannons for 3 seconds
    const interval: any = setInterval(() => {
      const remainingTime = animationEnd - Date.now();

      if (remainingTime <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (remainingTime / duration);

      // Left corner launch
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.75 },
        colors,
        zIndex: 9999,
      });

      // Right corner launch
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.75 },
        colors,
        zIndex: 9999,
      });
    }, 250);
  };

  // Trigger confetti automatically when countdown hits zero
  useEffect(() => {
    if (timeLeft.isPassed && !hasTriggeredZeroConfetti.current) {
      hasTriggeredZeroConfetti.current = true;
      triggerConfetti();
    } else if (!timeLeft.isPassed) {
      hasTriggeredZeroConfetti.current = false;
    }
  }, [timeLeft.isPassed]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 px-4 sm:px-6 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#FFD8CC]/40 dark:bg-[#382820]/30 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E2F0CB]/40 dark:bg-[#283220]/30 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#E8D9CF]/40 dark:bg-[#302620]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F2E5DD]/80 dark:bg-[#2A221D] border border-[#E8D9CF] dark:border-[#382E28] text-[#B5838D] dark:text-[#FFD8CC] text-xs sm:text-sm uppercase tracking-widest font-bold shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#B5838D] animate-spin-slow" />
          <span>Celebrating Quarter of a Century</span>
          <Heart className="w-3.5 h-3.5 fill-[#B5838D] text-[#B5838D]" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-light italic text-[#4A3B33] dark:text-[#F5EBE6] tracking-tight mb-4 leading-tight"
        >
          To the love of my life,{' '}
          <span className="font-handwriting text-4xl sm:text-6xl md:text-7xl text-[#B5838D] dark:text-[#FFD8CC] inline-block mt-1 not-italic">
            {config.name}.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-xl text-[#4A3B33]/80 dark:text-[#DBC5B0] max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          {config.subtitle}
        </motion.p>

        {/* Hero Image Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="relative max-w-2xl mx-auto mb-12 group"
        >
          <div className="relative rounded-[32px] overflow-hidden shadow-sm border-4 border-[#F2E5DD] dark:border-[#382E28] bg-[#F2E5DD]/50">
            <img
              src={config.heroBannerUrl}
              alt="Birthday Hero Banner"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B33]/80 via-[#4A3B33]/20 to-transparent flex flex-col justify-end p-6 text-white text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#B5838D]/90 text-white text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md mb-2 w-fit">
                Chapter 25
              </span>
              <p className="text-xl sm:text-2xl font-serif font-light italic text-[#FDF8F5]">
                "25 years of making the world a sweeter place. I love you."
              </p>
            </div>
          </div>
          {/* Decorative Polaroid Tape Elements */}
          <div className="absolute -top-3 left-10 w-16 h-6 bg-[#FFD8CC]/80 dark:bg-[#382820]/80 rotate-[-6deg] rounded-sm backdrop-blur-sm border border-[#E8D9CF]/50 shadow-sm" />
          <div className="absolute -top-3 right-10 w-16 h-6 bg-[#FFD8CC]/80 dark:bg-[#382820]/80 rotate-[6deg] rounded-sm backdrop-blur-sm border border-[#E8D9CF]/50 shadow-sm" />
        </motion.div>

        {/* Countdown Timer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="glass-card rounded-[32px] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm border border-[#F2E5DD] dark:border-[#382E28] mb-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[#4A3B33] dark:text-[#F5EBE6]">
              <Clock className="w-5 h-5 text-[#B5838D]" />
              <h2 className="font-serif font-light text-lg sm:text-xl">
                {timeLeft.isPassed ? "🎉 The Big Day Is Here!" : "Counting down to the magic"}
              </h2>
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B5838D] dark:text-[#FFD8CC] bg-[#F2E5DD] dark:bg-[#2A221D] px-3 py-1 rounded-full">
              {new Date(config.birthdayDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {timeLeft.isPassed ? (
            <div className="py-6 px-4 bg-[#4A3B33] dark:bg-[#B5838D] rounded-2xl text-white shadow-sm text-center animate-pulse">
              <Cake className="w-12 h-12 mx-auto mb-2 text-[#FFD8CC]" />
              <h3 className="font-serif font-light italic text-2xl sm:text-3xl mb-1">
                HAPPY BIRTHDAY, MY LOVE! 🎂💖
              </h3>
              <p className="text-sm opacity-90 font-light">
                Today is all about you! Enjoy your special day!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              <div className="bg-white/80 dark:bg-[#261E1A]/80 rounded-2xl p-3 sm:p-5 border border-[#F2E5DD] dark:border-[#382E28] shadow-sm text-center">
                <span className="block font-serif font-light text-2xl sm:text-4xl text-[#4A3B33] dark:text-[#F5EBE6]">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#B5838D] uppercase tracking-widest font-semibold mt-1 block">
                  Days
                </span>
              </div>
              <div className="bg-white/80 dark:bg-[#261E1A]/80 rounded-2xl p-3 sm:p-5 border border-[#F2E5DD] dark:border-[#382E28] shadow-sm text-center">
                <span className="block font-serif font-light text-2xl sm:text-4xl text-[#4A3B33] dark:text-[#F5EBE6]">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#B5838D] uppercase tracking-widest font-semibold mt-1 block">
                  Hours
                </span>
              </div>
              <div className="bg-white/80 dark:bg-[#261E1A]/80 rounded-2xl p-3 sm:p-5 border border-[#F2E5DD] dark:border-[#382E28] shadow-sm text-center">
                <span className="block font-serif font-light text-2xl sm:text-4xl text-[#4A3B33] dark:text-[#F5EBE6]">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#B5838D] uppercase tracking-widest font-semibold mt-1 block">
                  Minutes
                </span>
              </div>
              <div className="bg-white/80 dark:bg-[#261E1A]/80 rounded-2xl p-3 sm:p-5 border border-[#F2E5DD] dark:border-[#382E28] shadow-sm text-center">
                <span className="block font-serif font-light text-2xl sm:text-4xl text-[#4A3B33] dark:text-[#F5EBE6]">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-[#B5838D] uppercase tracking-widest font-semibold mt-1 block">
                  Seconds
                </span>
              </div>
            </div>
          )}

          {/* Interactive Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={triggerConfetti}
              className="px-6 py-3.5 rounded-2xl bg-[#4A3B33] dark:bg-[#B5838D] hover:opacity-90 text-white font-medium text-xs uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              <Wand2 className="w-4 h-4 text-[#FFD8CC]" />
              <span>Celebrate With Confetti 🎉</span>
            </button>

            <button
              onClick={onOpenLetter}
              className="px-6 py-3.5 rounded-2xl bg-[#FFD8CC]/80 dark:bg-[#382E28] hover:bg-[#FFD8CC] text-[#4A3B33] dark:text-[#FFD8CC] font-medium text-xs uppercase tracking-[0.15em] shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer flex items-center gap-2 border border-[#E8D9CF] dark:border-[#4A3B33]"
            >
              <Heart className="w-4 h-4 text-[#B5838D] fill-[#B5838D]" />
              <span>Read Love Letter 💌</span>
            </button>
          </div>
        </motion.div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto text-[#4A3B33] dark:text-[#DBC5B0] text-xs sm:text-sm">
          <div className="p-3 rounded-2xl bg-white/50 dark:bg-[#261E1A]/50 border border-[#F2E5DD] dark:border-[#382E28]">
            <span className="block font-serif font-light text-xl text-[#B5838D]">25 Years</span>
            <span className="text-[10px] uppercase tracking-wider text-[#4A3B33]/60 dark:text-[#DBC5B0]/60">Grace & magic</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/50 dark:bg-[#261E1A]/50 border border-[#F2E5DD] dark:border-[#382E28]">
            <span className="block font-serif font-light text-xl text-[#B5838D]">300 Months</span>
            <span className="text-[10px] uppercase tracking-wider text-[#4A3B33]/60 dark:text-[#DBC5B0]/60">Spreading smiles</span>
          </div>
          <div className="p-3 rounded-2xl bg-white/50 dark:bg-[#261E1A]/50 border border-[#F2E5DD] dark:border-[#382E28]">
            <span className="block font-serif font-light text-xl text-[#B5838D]">9,131 Days</span>
            <span className="text-[10px] uppercase tracking-wider text-[#4A3B33]/60 dark:text-[#DBC5B0]/60">Loved beyond words</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => {
              const el = document.getElementById('gallery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-[#B5838D]/80 hover:text-[#B5838D] transition-colors flex flex-col items-center gap-1 text-xs uppercase tracking-widest cursor-pointer"
          >
            <span>Explore Memories</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
