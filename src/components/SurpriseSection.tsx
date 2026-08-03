import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Film, Palmtree, CheckCircle2, Lock, Unlock, PartyPopper, ExternalLink, Save, Heart, Calendar, Plus, X } from 'lucide-react';
import { CouponItem, BirthdayConfig } from '../types';

interface SurpriseSectionProps {
  config: BirthdayConfig;
  coupons: CouponItem[];
  onRedeemCoupon: (id: string, userSelection?: string) => void;
  onUpdateCoupon: (coupon: CouponItem) => void;
  onAddCoupon: (newCoupon: Omit<CouponItem, 'id' | 'isRedeemed' | 'code'>) => void;
}

export const SurpriseSection: React.FC<SurpriseSectionProps> = ({
  config,
  coupons,
  onRedeemCoupon,
  onUpdateCoupon,
  onAddCoupon,
}) => {
  const [saveFeedbackId, setSaveFeedbackId] = useState<string | null>(null);
  const [dateErrorId, setDateErrorId] = useState<string | null>(null);
  const [isAddWishModalOpen, setIsAddWishModalOpen] = useState(false);

  // New wish state
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');

  // Sort coupons by stepNumber
  const sortedCoupons = [...coupons].sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0));

  // Count redeemed
  const redeemedCount = sortedCoupons.filter((c) => c.isRedeemed).length;
  const totalCount = Math.max(4, sortedCoupons.length);
  const allRedeemed = redeemedCount >= 4;

  const handleSaveDraft = (coupon: CouponItem) => {
    onUpdateCoupon(coupon);
    setSaveFeedbackId(coupon.id);
    setTimeout(() => setSaveFeedbackId(null), 2500);
  };

  const handleRedeemGift = (coupon: CouponItem, index: number) => {
    // Validation for Gift 3 (Trip) date requirement
    if (coupon.stepNumber === 3 && !coupon.tripDate?.trim()) {
      setDateErrorId(coupon.id);
      return;
    }
    setDateErrorId(null);

    // Summarize details
    let summary = '';
    if (coupon.stepNumber === 1) {
      summary = `👟 Shoes: ${coupon.shoesName || 'Any choice'} ${coupon.shoesLink ? `(${coupon.shoesLink})` : ''}`;
    } else if (coupon.stepNumber === 2) {
      summary = `🍿 Movie: ${coupon.movieName || 'Movie choice'} ${coupon.movieCinema ? `@ ${coupon.movieCinema}` : ''} | Snacks: ${coupon.movieSnacks || 'Favorite snacks'}`;
    } else if (coupon.stepNumber === 3) {
      summary = `🌅 Trip Date: ${coupon.tripDate} ${coupon.tripDestination ? `| Dest: ${coupon.tripDestination}` : ''}`;
    } else if (coupon.stepNumber === 4) {
      summary = `🎁 Wish: ${coupon.giftName || 'Dream Wish'} ${coupon.giftLink ? `(${coupon.giftLink})` : ''}`;
    } else {
      summary = `✨ Wish: ${coupon.title}`;
    }

    onRedeemCoupon(coupon.id, summary);

    // Confetti celebration
    if (coupon.stepNumber === 4 || index === sortedCoupons.length - 1) {
      // Grand Finale Confetti
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFD1DC', '#B5838D', '#E2F0CB', '#FFD8CC', '#FFB7B2']
      });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
        });
      }, 300);
    } else {
      // Step confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B5838D', '#FFD8CC', '#E2F0CB', '#E8D9CF']
      });
    }

    // Scroll to next unlocked gift
    const nextIndex = index + 1;
    if (nextIndex < sortedCoupons.length) {
      setTimeout(() => {
        const nextElement = document.getElementById(`gift-card-${nextIndex + 1}`);
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  };

  const handleAddCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    onAddCoupon({
      title: customTitle.trim(),
      description: customDesc.trim() || 'A custom birthday wish requested by Mitche.',
      icon: 'Gift',
    });

    setCustomTitle('');
    setCustomDesc('');
    setIsAddWishModalOpen(false);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <motion.section
      id="surprise"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 px-4 sm:px-6 relative bg-[#FDF8F5]/90 dark:bg-[#1A1412]/90"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2E5DD] dark:bg-[#2A221D] text-[#B5838D] dark:text-[#FFD8CC] text-xs uppercase tracking-widest font-semibold mb-3 border border-[#E8D9CF] dark:border-[#382E28]">
            <Gift className="w-3.5 h-3.5 text-[#B5838D]" />
            <span>Interactive Birthday Rewards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light italic text-[#4A3B33] dark:text-[#F5EBE6] mb-3">
            Your Birthday Gift Progression 🎁
          </h2>
          <p className="text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light text-sm sm:text-base">
            Redeem each gift in order to unlock the next surprise! Fill in your personal preferences, choices, and preferred trip dates.
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="mb-12 bg-white dark:bg-[#261E1A] rounded-3xl p-6 shadow-md border border-[#F2E5DD] dark:border-[#382E28] text-center">
          <h3 className="font-serif font-medium text-lg text-[#4A3B33] dark:text-[#F5EBE6] mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B5838D]" />
            <span>Birthday Gift Progress</span>
          </h3>

          {/* Visual Step Indicator Boxes */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-4 text-2xl sm:text-3xl font-mono">
            {[1, 2, 3, 4].map((step) => {
              const isDone = (sortedCoupons[step - 1]?.isRedeemed) || false;
              return (
                <span key={step} className="transition-all">
                  {isDone ? '🟩' : '⬜'}
                </span>
              );
            })}
            <span className="text-base font-bold text-[#4A3B33] dark:text-[#FFD8CC] ml-2">
              ({redeemedCount}/4)
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-[#B5838D] dark:text-[#FFD8CC]">
            "{redeemedCount} of 4 gifts redeemed"
          </p>
        </div>

        {/* Grand Finale Message when All Redeemed */}
        <AnimatePresence>
          {allRedeemed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-[#FFD8CC] via-[#FDF8F5] to-[#E2F0CB] dark:from-[#382E28] dark:via-[#261E1A] dark:to-[#1C1613] border-2 border-[#B5838D] text-center shadow-xl relative overflow-hidden"
            >
              <div className="inline-flex p-4 rounded-full bg-[#B5838D] text-white mb-3 shadow-md">
                <PartyPopper className="w-8 h-8 text-[#FFD8CC]" />
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#4A3B33] dark:text-[#F5EBE6] mb-2">
                🎉 All Birthday Gifts Redeemed! 🎉
              </h3>
              <p className="text-sm sm:text-base text-[#4A3B33] dark:text-[#FFD8CC] font-serif italic max-w-lg mx-auto">
                Thank you for sharing your wishes, {config.name}. I can't wait to make every single one of them come true! ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gift Cards Container */}
        <div className="space-y-8">
          {sortedCoupons.map((coupon, index) => {
            const stepNum = coupon.stepNumber || index + 1;
            // Unlocked logic: Step 1 unlocked by default, Step N requires Step N-1 redeemed
            const isUnlocked = index === 0 || sortedCoupons[index - 1]?.isRedeemed;
            const isRedeemed = coupon.isRedeemed;

            return (
              <div
                key={coupon.id}
                id={`gift-card-${stepNum}`}
                className="scroll-mt-24"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-3xl p-6 sm:p-8 transition-all border shadow-lg ${
                    isRedeemed
                      ? 'bg-[#FDF8F5]/80 dark:bg-[#261E1A]/80 border-[#81B29A]/50 ring-1 ring-[#81B29A]/30'
                      : isUnlocked
                      ? 'bg-white dark:bg-[#261E1A] border-2 border-[#B5838D] ring-4 ring-[#B5838D]/15 shadow-xl'
                      : 'bg-gray-50/60 dark:bg-[#1C1613]/40 border-gray-200 dark:border-[#2C231F] opacity-60'
                  }`}
                >
                  {/* Ribbon / Status Badge */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F2E5DD] dark:border-[#382E28]">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                        isRedeemed
                          ? 'bg-[#81B29A]/20 text-[#2B5038] border-[#81B29A]/40 dark:text-[#A8DADC]'
                          : isUnlocked
                          ? 'bg-[#FFD8CC] text-[#4A3B33] border-[#B5838D]/40'
                          : 'bg-gray-200 text-gray-500 border-gray-300 dark:bg-[#2C231F] dark:text-gray-400'
                      }`}>
                        Gift {stepNum}
                      </span>

                      <span className="text-xs font-semibold text-[#B5838D] dark:text-[#FFD8CC]">
                        {isRedeemed ? '✅ Redeemed' : isUnlocked ? '🔓 Unlocked' : '🔒 Locked'}
                      </span>
                    </div>

                    {isRedeemed && (
                      <div className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 font-bold text-xs flex items-center gap-1 shadow-sm border border-rose-200 dark:border-rose-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>Redeemed ❤️</span>
                      </div>
                    )}
                  </div>

                  {/* Locked Overlay Hint */}
                  {!isUnlocked && (
                    <div className="p-4 rounded-2xl bg-gray-100/90 dark:bg-[#261E1A]/90 border border-gray-200 dark:border-[#382E28] text-center my-4 flex items-center justify-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <span>Complete the previous gift first to unlock Gift #{stepNum}.</span>
                    </div>
                  )}

                  {/* Card Content Header */}
                  <div className="mb-6">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                      {coupon.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light">
                      {coupon.description}
                    </p>
                  </div>

                  {/* Custom Form Fields per Gift */}
                  <div className="space-y-4 mb-6">
                    
                    {/* GIFT 1: SHOES OF CHOICE */}
                    {stepNum === 1 && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Shoes Name / Style / Size *
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.shoesName || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, shoesName: e.target.value })}
                            placeholder="e.g. Nike Dunk Low Pink Velvet (Size 38 EU), or White Adidas Samba"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Product Link (Optional)
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              disabled={!isUnlocked || isRedeemed}
                              value={coupon.shoesLink || ''}
                              onChange={(e) => onUpdateCoupon({ ...coupon, shoesLink: e.target.value })}
                              placeholder="Product Link (Lazada, Shopee, Nike, Adidas, etc.)"
                              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                            />
                            {coupon.shoesLink && (
                              <a
                                href={coupon.shoesLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#B5838D] hover:text-[#4A3B33]"
                                title="Open Link"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Notes (Optional)
                          </label>
                          <textarea
                            rows={2}
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.shoesNotes || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, shoesNotes: e.target.value })}
                            placeholder="e.g. Preferred color, size details, or store link..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    {/* GIFT 2: MOVIE CHOICE & SNACK RUN */}
                    {stepNum === 2 && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Movie Name *
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.movieName || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, movieName: e.target.value })}
                            placeholder="e.g. Inside Out 2, Rom-Com choice, Action..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Optional Cinema / Venue
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.movieCinema || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, movieCinema: e.target.value })}
                            placeholder="e.g. SM Cinema, Director's Club, or Home Cozy Setup"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Favorite Snacks
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.movieSnacks || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, movieSnacks: e.target.value })}
                            placeholder="e.g. Large Caramel Popcorn, Iced Latte & Sour Patch Kids"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    {/* GIFT 3: WEEKEND TRIP TOGETHER */}
                    {stepNum === 3 && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-[#B5838D] dark:text-[#FFD8CC] mb-1 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Preferred Date (Required) *</span>
                          </label>
                          <input
                            type="date"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.tripDate || ''}
                            onChange={(e) => {
                              setDateErrorId(null);
                              onUpdateCoupon({ ...coupon, tripDate: e.target.value });
                            }}
                            className={`w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed ${
                              dateErrorId === coupon.id ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-[#E8D9CF] dark:border-[#382E28]'
                            }`}
                          />
                          {dateErrorId === coupon.id && (
                            <p className="text-[11px] text-rose-500 font-medium mt-1">
                              ⚠️ Please select a preferred date for our trip!
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Destination Ideas (Optional)
                          </label>
                          <textarea
                            rows={2}
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.tripDestination || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, tripDestination: e.target.value })}
                            placeholder="e.g. Seaside beach resort, cozy mountain cabin, or city staycation..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Notes (Optional)
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.tripNotes || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, tripNotes: e.target.value })}
                            placeholder="Any specific schedule notes or timing preferences..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    {/* GIFT 4: YOUR DREAM GIFT */}
                    {stepNum === 4 && (
                      <>
                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Gift Name *
                          </label>
                          <input
                            type="text"
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.giftName || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, giftName: e.target.value })}
                            placeholder="e.g. Designer bag, jewelry piece, camera, or surprise me!"
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Product Link (Optional)
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              disabled={!isUnlocked || isRedeemed}
                              value={coupon.giftLink || ''}
                              onChange={(e) => onUpdateCoupon({ ...coupon, giftLink: e.target.value })}
                              placeholder="e.g. https://..."
                              className="w-full px-4 py-2.5 pr-10 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                            />
                            {coupon.giftLink && (
                              <a
                                href={coupon.giftLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#B5838D] hover:text-[#4A3B33]"
                                title="Open Link"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                            Reason (Optional)
                          </label>
                          <textarea
                            rows={2}
                            disabled={!isUnlocked || isRedeemed}
                            value={coupon.giftReason || ''}
                            onChange={(e) => onUpdateCoupon({ ...coupon, giftReason: e.target.value })}
                            placeholder="Why you love this or special instructions..."
                            className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    {/* EXTRA CUSTOM GIFTS (if any added) */}
                    {stepNum > 4 && (
                      <div>
                        <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                          Wish Details
                        </label>
                        <textarea
                          rows={2}
                          disabled={!isUnlocked || isRedeemed}
                          value={coupon.userSelection || ''}
                          onChange={(e) => onUpdateCoupon({ ...coupon, userSelection: e.target.value })}
                          placeholder="Details for this wish..."
                          className="w-full px-4 py-2.5 rounded-xl bg-[#FDF8F5] dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5838D] disabled:opacity-80 disabled:cursor-not-allowed"
                        />
                      </div>
                    )}

                  </div>

                  {/* Save feedback banner */}
                  {saveFeedbackId === coupon.id && (
                    <p className="text-xs text-[#81B29A] font-semibold mb-3 flex items-center gap-1 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Draft details saved!</span>
                    </p>
                  )}

                  {/* Card Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#F2E5DD] dark:border-[#382E28]">
                    <span className="font-mono text-[10px] text-[#B5838D] uppercase tracking-wider">
                      {coupon.code}
                    </span>

                    {isUnlocked && !isRedeemed && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveDraft(coupon)}
                          className="px-4 py-2 rounded-xl border border-[#B5838D]/40 text-[#4A3B33] dark:text-[#FFD8CC] hover:bg-[#F2E5DD] dark:hover:bg-[#382E28] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Save className="w-3.5 h-3.5 text-[#B5838D]" />
                          <span>{stepNum === 3 ? 'Save Schedule' : stepNum === 2 ? 'Save Choice' : 'Save Wish'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRedeemGift(coupon, index)}
                          className="px-5 py-2 rounded-xl bg-[#4A3B33] dark:bg-[#B5838D] text-white hover:opacity-90 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:scale-105 flex items-center gap-1.5"
                        >
                          <Gift className="w-3.5 h-3.5 text-[#FFD8CC]" />
                          <span>Redeem Gift 💖</span>
                        </button>
                      </div>
                    )}

                    {isRedeemed && (
                      <span className="text-xs font-semibold text-[#81B29A] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Voucher Claimed</span>
                      </span>
                    )}
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Add Wish Button for Her */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsAddWishModalOpen(true)}
            className="px-6 py-3 rounded-full bg-white dark:bg-[#261E1A] hover:bg-[#FFD8CC]/40 text-[#4A3B33] dark:text-[#FFD8CC] font-medium text-xs uppercase tracking-wider border-2 border-[#B5838D]/40 transition-all cursor-pointer shadow-sm flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4 text-[#B5838D]" />
            <span>Have another wish? Add Custom Wish ✨</span>
          </button>
        </div>

      </div>

      {/* Add Custom Wish Modal */}
      <AnimatePresence>
        {isAddWishModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#140F0D]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsAddWishModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#FDF8F5] dark:bg-[#261E1A] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#B5838D] shadow-2xl text-[#4A3B33] dark:text-[#F5EBE6] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsAddWishModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#F2E5DD] dark:bg-[#382E28] hover:opacity-80 text-[#4A3B33] dark:text-[#F5EBE6] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#B5838D]" />
                <h3 className="font-serif font-light italic text-2xl text-[#4A3B33] dark:text-[#F5EBE6]">
                  Add Extra Birthday Wish 💖
                </h3>
              </div>
              <p className="text-xs text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light mb-6">
                Add any extra custom gift or wish to your reward list!
              </p>

              <form onSubmit={handleAddCustomWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                    Wish Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Pandora Silver Bracelet, Full Body Spa Day..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A3B33] dark:text-[#F5EBE6] mb-1">
                    Description / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="Tell Alex why you love this wish..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-[#1C1613] border border-[#E8D9CF] dark:border-[#382E28] text-xs focus:outline-none focus:ring-2 focus:ring-[#B5838D]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8D9CF] dark:border-[#382E28]">
                  <button
                    type="button"
                    onClick={() => setIsAddWishModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#4A3B33]/70 dark:text-[#DBC5B0] hover:underline cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#4A3B33] dark:bg-[#B5838D] text-white font-medium text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
                  >
                    Add Gift to List ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
