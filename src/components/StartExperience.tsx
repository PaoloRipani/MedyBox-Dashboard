import React from 'react';
import { useTranslation } from 'next-i18next';

const StartExperience: React.FC<{ videoSrc: string, buttonText: string, onButtonClick: () => void }> = ({ videoSrc, buttonText, onButtonClick }) => {
  const { t } = useTranslation('common');
  return (
    <div className="relative">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <button onClick={onButtonClick} className="p-4 bg-blue-500 text-white rounded">
          {t('startExperience')}
        </button>
      </div>
    </div>
  );
};

export default StartExperience;