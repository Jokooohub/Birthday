import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface FooterProps {
  config: BirthdayConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-[#F2E5DD] dark:border-[#382E28] bg-white/50 dark:bg-[#1C1613] text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F2E5DD] dark:bg-[#2A221D] text-[#B5838D] mb-2">
          <Heart className="w-5 h-5 fill-current animate-pulse" />
        </div>

        <h3 className="font-serif font-light italic text-xl sm:text-2xl text-[#4A3B33] dark:text-[#F5EBE6]">
          Happy Birthday, {config.name}! Mwaaa 💕
        </h3>

        <p className="text-xs sm:text-sm text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light max-w-md mx-auto">
          It's ya boi, {config.partnerName}.
        </p>

        <div className="pt-4 flex items-center justify-center gap-4 text-xs text-[#4A3B33]/60 dark:text-[#DBC5B0]/60">
          <span>Always & Forever</span>
          <span>•</span>
          <span>miss uuuuu hehehe</span>
          <span>•</span>
          <button
            onClick={scrollToTop}
            className="text-[#B5838D] hover:underline flex items-center gap-1 cursor-pointer font-medium uppercase text-[10px] tracking-wider"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
