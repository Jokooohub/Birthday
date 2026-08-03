import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Heart, MapPin, Calendar, Plus, X, Maximize2, ChevronLeft, ChevronRight, Sparkles, Filter, Grid, Layers, Clock, ZoomIn, ZoomOut } from 'lucide-react';
import { PhotoItem, PhotoCategory } from '../types';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onAddPhoto: (photo: Omit<PhotoItem, 'id' | 'likes'>) => void;
  onLikePhoto: (id: string) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onAddPhoto,
  onLikePhoto,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'polaroid' | 'timeline'>('polaroid');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<PhotoCategory>('Dates');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newMemoryNote, setNewMemoryNote] = useState('');

  const categories: PhotoCategory[] = ['All', 'Trips', 'Dates', 'Milestones'];

  const filteredPhotos = photos.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  // Reset zoom state when photo changes
  useEffect(() => {
    setIsZoomed(false);
  }, [activePhotoIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        handleNextPhoto();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos.length]);

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl.trim() || !newCaption.trim()) return;

    onAddPhoto({
      url: newPhotoUrl.trim(),
      caption: newCaption.trim(),
      category: newCategory,
      date: newDate.trim() || 'Special Memory',
      location: newLocation.trim() || undefined,
      memoryNote: newMemoryNote.trim() || undefined,
    });

    // Reset form
    setNewPhotoUrl('');
    setNewCaption('');
    setNewDate('');
    setNewLocation('');
    setNewMemoryNote('');
    setIsAddModalOpen(false);
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="py-20 px-4 sm:px-6 relative bg-[#FDF8F5]/60 dark:bg-[#1A1412]/60"
    >
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2E5DD] dark:bg-[#2A221D] text-[#B5838D] dark:text-[#FFD8CC] text-xs uppercase tracking-widest font-semibold mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>Our Memory Vault</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light italic text-[#4A3B33] dark:text-[#F5EBE6] mb-4">
            Photos Through The Years
          </h2>
          <p className="text-[#4A3B33]/80 dark:text-[#DBC5B0] font-light text-base">
            Every smile and cozy dates saved in our not so aesthetic gallery.
              <br></br>
              <br></br>
             Di na nako mabutang tanan kay daghan ayo man hehehe
          </p>
        </div>

        {/* Controls: Category Tabs & View Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8D9CF] dark:border-[#382E28]">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#4A3B33] text-white dark:bg-[#B5838D] shadow-sm scale-105'
                    : 'bg-white dark:bg-[#261E1A] text-[#4A3B33] dark:text-[#E8D9CF] border border-[#F2E5DD] dark:border-[#382E28] hover:bg-[#F2E5DD]'
                }`}
              >
                {cat === 'All' ? 'All Moments' : cat === 'Trips' ? 'Trips' : cat === 'Dates' ? 'Dates' : 'Milestones'}
              </button>
            ))}
          </div>

          {/* View Modes & Add Photo Button */}
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-[#261E1A] p-1 rounded-full border border-[#F2E5DD] dark:border-[#382E28] flex items-center">
              <button
                onClick={() => setViewMode('polaroid')}
                title="Polaroid Style"
                className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  viewMode === 'polaroid' ? 'bg-[#FFD8CC]/80 dark:bg-[#382E28] text-[#4A3B33] dark:text-[#FFD8CC] font-semibold' : 'text-[#4A3B33]/60 dark:text-[#DBC5B0]/60'
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Clean Grid Style"
                className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#FFD8CC]/80 dark:bg-[#382E28] text-[#4A3B33] dark:text-[#FFD8CC] font-semibold' : 'text-[#4A3B33]/60 dark:text-[#DBC5B0]/60'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                title="Memory Timeline"
                className={`p-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  viewMode === 'timeline' ? 'bg-[#FFD8CC]/80 dark:bg-[#382E28] text-[#4A3B33] dark:text-[#FFD8CC] font-semibold' : 'text-[#4A3B33]/60 dark:text-[#DBC5B0]/60'
                }`}
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Gallery Grid Display */}
        {viewMode === 'polaroid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white dark:bg-slate-800 p-4 pt-6 rounded-2xl shadow-xl hover:shadow-2xl border border-pink-100/80 dark:border-slate-700/80 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setActivePhotoIndex(index)}
              >
                {/* Tape accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-amber-100/90 dark:bg-amber-900/40 rotate-1 rounded-sm shadow-sm border border-amber-200/60 z-10" />

                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-rose-50 dark:bg-slate-900 mb-4">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-handwriting text-2xl font-bold text-slate-800 dark:text-pink-100 leading-tight">
                    {photo.caption}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-pink-400" />
                        {photo.date}
                      </span>
                      {photo.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          {photo.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#B5838D] font-medium" title="Forever In My Heart">
                      <Heart className="w-4 h-4 fill-[#B5838D] text-[#B5838D]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900 shadow-md cursor-pointer"
                onClick={() => setActivePhotoIndex(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
                  <p className="font-handwriting text-xl font-bold text-[#FFD8CC]">{photo.caption}</p>
                  <p className="text-[11px] text-slate-300">{photo.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="relative border-l-2 border-[#B5838D]/40 dark:border-[#4A3B33] ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white dark:bg-[#261E1A] p-5 rounded-2xl shadow-md border border-[#F2E5DD] dark:border-[#382E28] flex flex-col sm:flex-row gap-5 items-center cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setActivePhotoIndex(index)}
              >
                {/* Timeline Node */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-[#B5838D] border-4 border-white dark:border-[#1C1613] shadow-sm" />

                <div className="w-full sm:w-48 h-36 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <span className="text-xs font-semibold text-[#B5838D] dark:text-[#FFD8CC] bg-[#FFD8CC]/30 dark:bg-[#382E28] px-2.5 py-1 rounded-full">
                    {photo.date}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#4A3B33] dark:text-[#F5EBE6]">
                    {photo.caption}
                  </h3>
                  {photo.memoryNote && (
                    <p className="text-xs text-[#4A3B33]/70 dark:text-[#DBC5B0] font-light italic">
                      "{photo.memoryNote}"
                    </p>
                  )}
                  {photo.location && (
                    <div className="flex items-center gap-1 text-xs text-[#B5838D]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{photo.location}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-[#140F0D]/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 overflow-hidden"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar Controls */}
            <div
              className="w-full max-w-6xl mx-auto flex items-center justify-between z-20 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#382E28] text-[#FFD8CC] text-xs font-semibold tracking-wider uppercase border border-[#52433B]">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                <span className="text-xs text-[#E8D9CF]/70 font-medium hidden sm:inline">
                  Memory {activePhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2 rounded-full bg-[#261E1A] hover:bg-[#382E28] text-[#FFD8CC] border border-[#52433B] transition-colors cursor-pointer flex items-center gap-1 text-xs px-3"
                  title="Toggle Zoom / Close-up"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isZoomed ? 'Zoom Out' : 'Close-up Zoom'}</span>
                </button>

                <button
                  onClick={() => setActivePhotoIndex(null)}
                  className="p-2 rounded-full bg-[#261E1A] hover:bg-[#382E28] text-[#F5EBE6] border border-[#52433B] transition-colors cursor-pointer"
                  title="Close Lightbox (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Stage: Image with Close-up Animation & Details */}
            <div
              className="flex-1 w-full max-w-6xl mx-auto relative flex flex-col md:flex-row items-center justify-center gap-6 my-2 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Box */}
              <div className="relative flex-1 w-full h-full max-h-[68vh] flex items-center justify-center overflow-hidden rounded-2xl bg-[#1C1613] border border-[#382E28]/80 shadow-2xl p-2">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={filteredPhotos[activePhotoIndex].id + (isZoomed ? '-zoomed' : '')}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: isZoomed ? 1.45 : 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                    src={filteredPhotos[activePhotoIndex].url}
                    alt={filteredPhotos[activePhotoIndex].caption}
                    referrerPolicy="no-referrer"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`max-h-full max-w-full object-contain rounded-xl transition-all duration-300 ${
                      isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                    }`}
                  />
                </AnimatePresence>

                {/* Left/Right Navigation Arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#261E1A]/80 hover:bg-[#382E28] text-[#FFD8CC] border border-[#52433B] transition-all hover:scale-110 cursor-pointer shadow-lg"
                  title="Previous Photo (←)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#261E1A]/80 hover:bg-[#382E28] text-[#FFD8CC] border border-[#52433B] transition-all hover:scale-110 cursor-pointer shadow-lg"
                  title="Next Photo (→)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Side Info Panel */}
              <motion.div
                key={filteredPhotos[activePhotoIndex].id + '-info'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full md:w-80 shrink-0 bg-[#261E1A] border border-[#382E28] rounded-2xl p-5 text-[#F5EBE6] flex flex-col justify-between shadow-xl space-y-4 max-h-[68vh] overflow-y-auto"
              >
                <div>
                  <h3 className="font-handwriting text-3xl font-bold text-[#FFD8CC] mb-3 leading-tight">
                    {filteredPhotos[activePhotoIndex].caption}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#E8D9CF]/80 mb-4 pb-3 border-b border-[#382E28]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B5838D]" />
                      {filteredPhotos[activePhotoIndex].date}
                    </span>
                    {filteredPhotos[activePhotoIndex].location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FFD8CC]" />
                        {filteredPhotos[activePhotoIndex].location}
                      </span>
                    )}
                  </div>

                  {filteredPhotos[activePhotoIndex].memoryNote && (
                    <div className="p-3.5 rounded-xl bg-[#1C1613] border border-[#382E28] text-[#E8D9CF] text-xs leading-relaxed italic font-light">
                      "{filteredPhotos[activePhotoIndex].memoryNote}"
                    </div>
                  )}
                </div>

                {/* Heart Badge (No Numbers) */}
                <div className="pt-3 border-t border-[#382E28] flex items-center justify-between">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#382E28] text-[#FFD8CC] text-xs font-medium border border-[#52433B]">
                    <Heart className="w-4 h-4 fill-[#B5838D] text-[#B5838D] animate-pulse" />
                    <span>Forever In My Heart</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Filmstrip Thumbnail Navigation */}
            <div
              className="w-full max-w-6xl mx-auto pt-2 overflow-x-auto no-scrollbar flex items-center justify-center gap-2 z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 px-2 py-1.5 bg-[#261E1A]/90 rounded-2xl border border-[#382E28] max-w-full overflow-x-auto no-scrollbar">
                {filteredPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border ${
                      idx === activePhotoIndex
                        ? 'border-[#FFD8CC] scale-110 shadow-md ring-2 ring-[#B5838D]/50'
                        : 'border-[#382E28] opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
