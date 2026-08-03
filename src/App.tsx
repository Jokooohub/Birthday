import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroCountdown } from './components/HeroCountdown';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveLettersAndReasons } from './components/LoveLettersAndReasons';
import { SettingsModal } from './components/SettingsModal';
import { Footer } from './components/Footer';
import { MouseSparkles } from './components/MouseSparkles';
import { RomanticPreloader } from './components/RomanticPreloader';
import { FloatingBackgroundHearts } from './components/FloatingBackgroundHearts';

import { BirthdayConfig, PhotoItem } from './types';
import { INITIAL_CONFIG, DEFAULT_PHOTOS } from './data/defaultData';

export default function App() {
  // Preloader state
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlaySignal, setAutoPlaySignal] = useState<number>(0);

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('birthday_darkmode');
    return saved ? JSON.parse(saved) : false; // Default to Natural Tones light mode
  });

  // Config state
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    const saved = localStorage.getItem('birthday_config_mitche_25th');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  // Photos state
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    const saved = localStorage.getItem('birthday_photos_25th');
    return saved ? JSON.parse(saved) : DEFAULT_PHOTOS;
  });

  // Settings Modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('birthday_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Persist config
  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    localStorage.setItem('birthday_config_mitche_25th', JSON.stringify(newConfig));
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset all settings to default romantic configuration?")) {
      setConfig(INITIAL_CONFIG);
      setPhotos(DEFAULT_PHOTOS);
      localStorage.removeItem('birthday_config_mitche_25th');
      localStorage.removeItem('birthday_photos_25th');
      localStorage.removeItem('birthday_coupons_25th');
      localStorage.removeItem('birthday_coupons_interactive_v3');
      setIsSettingsOpen(false);
    }
  };

  // Photo actions
  const handleAddPhoto = (newPhoto: Omit<PhotoItem, 'id' | 'likes'>) => {
    const item: PhotoItem = {
      ...newPhoto,
      id: 'photo_' + Date.now(),
      likes: 1,
    };
    const updated = [item, ...photos];
    setPhotos(updated);
    localStorage.setItem('birthday_photos_25th', JSON.stringify(updated));
  };

  const handleLikePhoto = (id: string) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p));
    setPhotos(updated);
    localStorage.setItem('birthday_photos_25th', JSON.stringify(updated));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePreloaderEnter = (playMusic: boolean) => {
    setIsLoading(false);
    if (playMusic) {
      setAutoPlaySignal(Date.now());
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] dark:bg-[#1C1613] text-[#4A3B33] dark:text-[#F5EBE6] transition-colors duration-300 relative selection:bg-[#FFD8CC] selection:text-[#4A3B33]">
      {/* Romantic Preloader Screen */}
      <AnimatePresence>
        {isLoading && (
          <RomanticPreloader
            config={config}
            onEnter={handlePreloaderEnter}
          />
        )}
      </AnimatePresence>

      {/* Subtle Mouse Trailing Particle Effect */}
      <MouseSparkles />

      {/* Floating Background Hearts */}
      <FloatingBackgroundHearts />

      {/* Navbar */}
      <Navbar
        config={config}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        autoPlaySignal={autoPlaySignal}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero & Countdown */}
        <HeroCountdown
          config={config}
          onOpenLetter={() => scrollToSection('reasons')}
        />

        {/* 2. Photo Memory Galleries */}
        <PhotoGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onLikePhoto={handleLikePhoto}
        />

        {/* 3. Personalized Love Letter */}
        <LoveLettersAndReasons
          config={config}
        />
      </main>

      {/* Footer */}
      <Footer config={config} />

      {/* Configuration Settings Drawer/Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        onResetDefault={handleResetDefaults}
      />

    </div>
  );
}
