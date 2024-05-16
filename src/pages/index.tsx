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
  const [showVideo, setShowVideo] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedMedyBox, setSelectedMedyBox] = useState('A');
  const [selectedMedyLocker, setSelectedMedyLocker] = useState('A');

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
      <button onClick={() => setActiveModal('language')}>Change Language</button>
      <button onClick={() => setActiveModal('configuration')}>Change Configuration</button>
      <button onClick={() => setShowVideo(true)}>Restart Experience</button>
      {activeModal === 'language' && <LanguageModal onLanguageChange={setSelectedLanguage} onClose={() => setActiveModal(null)} />}
      {activeModal === 'configuration' && <ConfigurationModal onProductChange={handleProductChange} onClose={() => setActiveModal(null)} />}
      <Scene3D language={selectedLanguage} medyBox={selectedMedyBox} medyLocker={selectedMedyLocker}/>
      {showVideo && (
        <StartExperience videoSrc="/path/to/video.mp4" buttonText="Enter Experience" onButtonClick={handleStartButtonClick} />
      )}
    </div>
  </Layout>
</div>
    )
}