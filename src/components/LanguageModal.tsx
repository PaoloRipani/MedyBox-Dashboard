import React, { useState } from 'react';

import italianLogo from '../../public/it-still.png';
import italianGif from '../../public/it-no-loop.gif';
import frenchLogo from '../../public/fr-still.png';
import frenchGif from '../../public/fr-no-loop.gif';
import spanishLogo from '../../public/es-still.png';
import spanishGif from '../../public/es-no-loop.gif';
import germanLogo from '../../public/de-still.png';
import germanGif from '../../public/de-no-loop.gif';
import englishLogo from '../../public/uk-still.png';
import englishGif from '../../public/uk-no-loop.gif';
import logo from '../../public/MedyBOX Logo 2.svg';

type LanguageCode = 'it' | 'de' | 'es' | 'en' | 'fr';

export default function LanguageModal({ onLanguageChange, onClose }: any) {
  const [hoveredLanguage, setHoveredLanguage] = useState<LanguageCode | null>(null);
  const [playingLanguage, setPlayingLanguage] = useState<LanguageCode | null>(null);
  const [gifKeys, setGifKeys] = useState<Record<LanguageCode, number>>({
    it: 0,
    de: 0,
    es: 0,
    en: 0,
    fr: 0,
  });

  const handleLanguageClick = (language: LanguageCode) => {
    setPlayingLanguage(language);

    // Update the key to force GIF restart
    setGifKeys((prevKeys) => ({
      ...prevKeys,
      [language]: prevKeys[language] + 1,
    }));

    onLanguageChange(language);

    // Delay closing to allow the fade-out animation
    setTimeout(() => {
      onClose();
    }, 1500); // Adjust duration to match the fade-out time
  };

  const handleMouseEnter = (language: LanguageCode) => {
    setHoveredLanguage(language);
  };

  const handleMouseLeave = () => {
    setHoveredLanguage(null);
  };

  const getLogo = (language: LanguageCode, staticLogo: string, hoverGif: string) => {
    if (playingLanguage === language) {
      return hoverGif; // Force GIF play on selection
    }
    return hoveredLanguage === language ? hoverGif : staticLogo;
  };

  const languages = [
    { code: 'it', label: 'Italiano', staticLogo: italianLogo, hoverGif: italianGif },
    { code: 'de', label: 'Deutsch', staticLogo: germanLogo, hoverGif: germanGif },
    { code: 'es', label: 'Español', staticLogo: spanishLogo, hoverGif: spanishGif },
    { code: 'en', label: 'English', staticLogo: englishLogo, hoverGif: englishGif },
    { code: 'fr', label: 'Français', staticLogo: frenchLogo, hoverGif: frenchGif },
  ] as const;

  return (
    <div
      className={`bg-white w-screen h-screen absolute top-0 z-[1010] transition-opacity duration-700`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="relative flex flex-col w-full h-full justify-center items-center px-28 py-16 gap-6">
        <div className="absolute top-2 left-2 h-20">
          <img src={logo.src} alt="logo" className="h-20" />
        </div>

        {/* Grid layout */}
        <div
          className={`grid gap-y-12`}
        >
          {/* First row with 3 languages */}
          <div className="grid grid-cols-6 gap-x-12 justify-center">
            {languages.slice(0, 3).map((lang) => (
              <div
                key={lang.code}
                className={`flex flex-col col-span-2 items-center rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-4 transition-opacity duration-700 ${
                  playingLanguage && playingLanguage !== lang.code ? 'opacity-0' : 'opacity-100'
                }`}
                onMouseEnter={() => handleMouseEnter(lang.code)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLanguageClick(lang.code)}
              >
                <img
                  key={gifKeys[lang.code]} // Use unique key for each GIF
                  src={getLogo(lang.code, lang.staticLogo.src, lang.hoverGif.src)}
                  alt={`${lang.label} Logo`}
                  className="h-64 w-64 object-contain"
                />
                <h4 className="neue-plak-wide text-h4 uppercase">{lang.label}</h4>
              </div>
            ))}
          </div>

          {/* Second row with 2 languages */}
          <div className="grid grid-cols-6 gap-x-12 justify-center items-center">
            <div className='col-span-1'></div>
            {languages.slice(3).map((lang) => (
              <div
                key={lang.code}
                className={`flex flex-col col-span-2 items-center justify-center rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-4 transition-opacity duration-700 ${
                  playingLanguage && playingLanguage !== lang.code ? 'opacity-0' : 'opacity-100'
                }`}
                onMouseEnter={() => handleMouseEnter(lang.code)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLanguageClick(lang.code)}
              >
                <img
                  key={gifKeys[lang.code]} // Use unique key for each GIF
                  src={getLogo(lang.code, lang.staticLogo.src, lang.hoverGif.src)}
                  alt={`${lang.label} Logo`}
                  className="h-64 w-64 w-auto object-contain"
                />
                <h4 className="neue-plak-wide text-h4 uppercase">{lang.label}</h4>
              </div>
            ))}
            <div className='col-span-1'></div>
          </div>
        </div>
      </div>
    </div>
  );
}