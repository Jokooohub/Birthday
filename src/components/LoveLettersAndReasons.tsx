import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Copy, Check } from 'lucide-react';
import { ReasonItem, BirthdayConfig } from '../types';

interface LoveLettersAndReasonsProps {
  config: BirthdayConfig;
  reasons?: ReasonItem[];
}

export const LoveLettersAndReasons: React.FC<LoveLettersAndReasonsProps> = ({
  config,
}) => {
  const [copied, setCopied] = useState(false);

  const copyLetter = () => {
    navigator.clipboard.writeText(config.loveLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.section
      id="reasons"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 px-4 sm:px-6 relative max-w-6xl mx-auto"
    >
      
      {/* Love Letter Card */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5DD] dark:bg-[#2A221D] text-[#B5838D] dark:text-[#FFD8CC] text-xs uppercase tracking-widest font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-[#B5838D] text-[#B5838D]" />
            <span>A Personal Birthday Note</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light italic text-[#4A3B33] dark:text-[#F5EBE6] mb-3">
            Letter To My Girlfriend
          </h2>
          <p className="text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light text-base">
            Written from the heart.
          </p>
        </div>

        {/* Parchment Styled Glass Letter Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto bg-white/80 dark:bg-[#261E1A]/90 rounded-[32px] p-6 sm:p-12 shadow-sm border border-[#F2E5DD] dark:border-[#382E28] overflow-hidden"
        >
          {/* Wax Seal Decorative Badge */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#B5838D] shadow-sm flex items-center justify-center text-[#FFD8CC] border-2 border-[#E8D9CF]">
            <Heart className="w-6 h-6 fill-current" />
          </div>

          {/* Background Watermark Heart */}
          <div className="absolute -bottom-10 -right-10 text-[#FFD8CC]/20 dark:text-[#382820]/30 pointer-events-none">
            <Heart className="w-72 h-72 fill-current" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-[#F2E5DD] dark:border-[#382E28] pb-4">
              <span className="font-handwriting text-3xl font-bold text-[#B5838D] dark:text-[#FFD8CC]">
                To My Dearest {config.name},
              </span>
              {/* <button
                onClick={copyLetter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F2E5DD]/70 dark:bg-[#382E28] text-xs font-medium text-[#4A3B33] dark:text-[#E8D9CF] hover:bg-[#E8D9CF] transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#B5838D]" />}
                <span>{copied ? 'Copied' : 'Copy Note'}</span>
              </button> */}
            </div>

            <div className="whitespace-pre-line text-[#4A3B33] dark:text-[#F5EBE6] font-sans text-base sm:text-lg leading-relaxed font-light italic">
              {config.loveLetter}
            </div>

            <div className="pt-6 border-t border-[#F2E5DD] dark:border-[#382E28] flex items-center justify-between text-s text-[#4A3B33]/70 dark:text-[#DBC5B0]">
              <span>With endless love & devotion,</span>
              <span className="font-handwriting text-2xl font-bold text-[#B5838D]">{config.partnerName} 💖</span>
            </div>
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
};

