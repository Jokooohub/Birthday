import React, { useState, useEffect, useRef } from 'react';
import { Heart, Moon, Sun, Music, Volume2, VolumeX, Settings, Sparkles, Image } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { HappyBirthdaySynthesizer } from '../utils/happyBirthdayAudio';

interface NavbarProps {
  config: BirthdayConfig;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenSettings: () => void;
  autoPlaySignal?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  darkMode,
  setDarkMode,
  onOpenSettings,
  autoPlaySignal,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<HappyBirthdaySynthesizer | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger audio playback when autoPlaySignal updates
  useEffect(() => {
    if (autoPlaySignal && autoPlaySignal > 0) {
      startPlaying();
    }
  }, [autoPlaySignal]);

  const startPlaying = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Audio URL blocked, starting synthesized Happy Birthday tune:", e);
        if (!synthRef.current) {
          synthRef.current = new HappyBirthdaySynthesizer();
        }
        synthRef.current.start();
        setIsPlaying(true);
      });
    }
  };

  const togglePlayAudio = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (synthRef.current) {
        synthRef.current.stop();
      }
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 px-4' : 'py-4 px-6'
      }`}
    >
      <audio
        ref={audioRef}
        src={config.songUrl}
        loop
      />

      <div className="max-w-6xl mx-auto glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-sm border border-[#E8D9CF] dark:border-[#3A2F28]">
        
        {/* Logo / Girlfriend Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-[#4A3B33] dark:bg-[#B5838D] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Heart className="w-4 h-4 fill-current animate-pulse text-[#FFD8CC]" />
          </div>
          <div>
            <span className="font-serif font-bold text-base sm:text-lg text-[#4A3B33] dark:text-[#F5EBE6] block leading-none">
              {config.name}'s <span className="text-[#B5838D] dark:text-[#FFD8CC]">Birthday</span>
            </span>
            <span className="text-[10px] tracking-widest text-[#B5838D] dark:text-[#DBC5B0] uppercase font-medium">
              Happy Birthday!
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => scrollToSection('hero')}
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#4A3B33] dark:text-[#E8D9CF] hover:text-[#B5838D] dark:hover:text-[#FFD8CC] rounded-full hover:bg-[#F2E5DD]/70 dark:hover:bg-[#382E28]/70 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B5838D]" />
            <span>Countdown</span>
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#4A3B33] dark:text-[#E8D9CF] hover:text-[#B5838D] dark:hover:text-[#FFD8CC] rounded-full hover:bg-[#F2E5DD]/70 dark:hover:bg-[#382E28]/70 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Image className="w-3.5 h-3.5 text-[#DBC5B0]" />
            <span>Memories</span>
          </button>
          <button
            onClick={() => scrollToSection('reasons')}
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[#4A3B33] dark:text-[#E8D9CF] hover:text-[#B5838D] dark:hover:text-[#FFD8CC] rounded-full hover:bg-[#F2E5DD]/70 dark:hover:bg-[#382E28]/70 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-[#B5838D]" />
            <span>Love Note</span>
          </button>
        </nav>

        {/* Right Actions: Music, Dark Mode, Settings */}
        <div className="flex items-center gap-2">
          {/* Audio Player Button */}
          <div className="relative group flex items-center">
            <button
              onClick={togglePlayAudio}
              title={isPlaying ? "Pause Music" : "Play Birthday Song"}
              className={`p-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5 ${
                isPlaying
                  ? 'bg-[#FFD8CC]/80 text-[#4A3B33] dark:bg-[#382E28] dark:text-[#FFD8CC] border border-[#E8D9CF] dark:border-[#52433B] shadow-sm'
                  : 'bg-[#F2E5DD]/60 text-[#4A3B33] dark:bg-[#2A221D] dark:text-[#E8D9CF] hover:bg-[#E8D9CF]'
              }`}
            >
              <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce text-[#B5838D]' : ''}`} />
              <span className="hidden lg:inline text-[11px] font-medium max-w-[100px] truncate">
                {isPlaying ? config.songTitle : 'Play Music'}
              </span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Natural Light Mode" : "Switch to Natural Dark Mode"}
            className="p-2 rounded-full bg-[#F2E5DD]/80 dark:bg-[#2A221D] text-[#4A3B33] dark:text-[#E8D9CF] hover:bg-[#E8D9CF] transition-colors cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-[#FFD8CC] animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-[#4A3B33]" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
