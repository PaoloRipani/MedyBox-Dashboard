import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { parse } from 'node-html-parser';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState, createContext } from 'react'

import StartExperience from '../components/StartExperience';
import Scene3D from '../components/Scene3D';
import LanguageModal from '../components/LanguageModal';
import ConfigurationModal from '../components/ConfigurationModal';

export default function Home() {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');
  
  const [showVideo, setShowVideo] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedMedyBox, setSelectedMedyBox] = useState('A');
  const [selectedMedyLocker, setSelectedMedyLocker] = useState('A');

  useEffect(() => {
    const fetchTranslations = async () => {
      const response = await fetch(`/locales/${language}/common.json`);
      const data = await response.json();
      setTranslations(data);
    };
    fetchTranslations();
  }, [language]);

  const handleStartButtonClick = () => {
    // Handle button click here
    setShowVideo(false); // Hide the video after button click
  };

  const handleProductChange = (product : string, model : string) => {
    // forse dovrei semplicemente passare la variabile combinata e poi scorporarla all'interno di Scene3D.
    if (product === 'MedyBox') {
      setSelectedMedyBox(model);
    } else if (product === 'MedyLocker') {
      setSelectedMedyLocker(model);
    }
  };

  return (
<div>
  <Layout> 
    <div>
      <div>
          <button onClick={() => setActiveModal('language')}>{translations.changeLanguage}</button>
          <button onClick={() => setActiveModal('configuration')}>{translations.changeConfiguration}</button>
          <button onClick={() => setShowVideo(true)}>{translations.restartExperience}</button>
          {activeModal === 'language' && (
            <LanguageModal onLanguageChange={setLanguage} onClose={() => setActiveModal(null)} />
          )}
          {activeModal === 'configuration' && (
            <ConfigurationModal onProductChange={handleProductChange} language={language} onClose={() => setActiveModal(null)} />
          )}
      </div>
      <Scene3D language={language} medyBox={selectedMedyBox} medyLocker={selectedMedyLocker} />
        {showVideo && (
          <div className="absolute inset-0 z-10">
            <StartExperience
              videoSrc="/path/to/video.mp4"
              onButtonClick={handleStartButtonClick}
            />
          </div>
        )}
    </div>
  </Layout>
</div>
    )
}