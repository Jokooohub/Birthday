import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, RotateCcw, Save, Sparkles, Heart, Music, Image } from 'lucide-react';
import { BirthdayConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (updated: BirthdayConfig) => void;
  onResetDefault: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefault,
}) => {
  const [formData, setFormData] = useState<BirthdayConfig>({ ...config });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-end p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="bg-white dark:bg-[#261E1A] w-full max-w-lg h-full max-h-[92vh] rounded-[32px] p-6 sm:p-8 shadow-sm border border-[#F2E5DD] dark:border-[#382E28] flex flex-col justify-between overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#F2E5DD] dark:border-[#382E28] mb-6">
              <div className="flex items-center gap-2 text-[#4A3B33] dark:text-[#F5EBE6]">
                <Settings className="w-5 h-5 text-[#B5838D]" />
                <h3 className="font-serif font-light italic text-xl">
                  Customize Celebration Details
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#F2E5DD] dark:hover:bg-[#382E28] text-[#4A3B33] dark:text-[#DBC5B0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form id="settings-form" onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                    Girlfriend's Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                  />
                </div>

                <div>
                  <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Birthday Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.birthdayDate}
                  onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                />
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Partner / Boyfriend Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                />
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                />
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Personal Love Letter
                </label>
                <textarea
                  rows={6}
                  required
                  value={formData.loveLetter}
                  onChange={(e) => setFormData({ ...formData, loveLetter: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D] font-light"
                />
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Background Song Title
                </label>
                <input
                  type="text"
                  value={formData.songTitle}
                  onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                />
              </div>

              <div>
                <label className="block text-[#4A3B33] dark:text-[#E8D9CF] font-medium mb-1">
                  Background Music Audio URL
                </label>
                <input
                  type="url"
                  value={formData.songUrl}
                  onChange={(e) => setFormData({ ...formData, songUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5DD] dark:border-[#382E28] bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                />
              </div>

            </form>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#F2E5DD] dark:border-[#382E28] flex items-center justify-between gap-3 mt-6">
            <button
              type="button"
              onClick={onResetDefault}
              className="px-3.5 py-2.5 rounded-xl bg-[#F2E5DD] dark:bg-[#382E28] hover:bg-[#E8D9CF] text-[#4A3B33] dark:text-[#E8D9CF] text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#B5838D]" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              form="settings-form"
              className="px-5 py-2.5 rounded-xl bg-[#4A3B33] dark:bg-[#B5838D] hover:opacity-90 text-white text-xs uppercase tracking-wider font-medium shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#FFD8CC]" />
              <span>Save & Update</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
