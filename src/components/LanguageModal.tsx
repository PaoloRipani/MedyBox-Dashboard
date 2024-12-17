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

export default function LanguageModal({ onLanguageChange, onClose }: any) {
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage(language);
    setRefreshKey((prev) => prev + 1); // Force refresh only for the selected language's container
    onLanguageChange(language);

    // Timeout to allow the GIF to play once before closing
    setTimeout(() => {
      onClose();
    }, 1500); // Adjust duration to match GIF play time
  };

  const handleMouseEnter = (language: string) => {
    setHoveredLanguage(language);
  };

  const handleMouseLeave = () => {
    setHoveredLanguage(null);
  };

  const getLogo = (language: string, staticLogo: string, hoverGif: string) => {
    if (selectedLanguage === language) {
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
  ];

  return (
    <div className="bg-white w-screen h-screen absolute top-0 z-20" style={{ pointerEvents: 'auto' }}>
      <div className="relative flex flex-col w-full h-full justify-center items-center px-28 py-16 gap-6">
        <div className="absolute top-2 left-2 h-20">
          <img src={logo.src} alt="logo" className="h-20" />
        </div>
        <div className="grid grid-cols-1 grid-rows-2 gap-y-14 w-full h-full">
          {languages.map((lang, index) => (
            <div
              key={`${lang.code}-${refreshKey}`} // Force refresh only for the selected language
              className="flex w-full gap-x-10 justify-center"
            >
              <div
                className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-4"
                onMouseEnter={() => handleMouseEnter(lang.code)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLanguageClick(lang.code)}
              >
                <img
                  src={getLogo(lang.code, lang.staticLogo.src, lang.hoverGif.src)}
                  alt={`${lang.label} Logo`}
                  className="h-32 w-auto object-contain m-auto"
                />
                <h4 className="neue-plak-wide text-h4 uppercase">{lang.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}