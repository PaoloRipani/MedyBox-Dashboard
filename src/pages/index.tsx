import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { parse } from 'node-html-parser';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState } from 'react'
import StartExperience from '../components/StartExperience';
import Scene3D from '../components/Scene3D';
import LanguageModal from '../components/LanguageModal';
import ConfigurationModal from '../components/ConfigurationModal';
import sceneData from '../lib/sceneData.json';
import ARModal from '../components/ARModal';

import Logo from '../../public/MedyBox Logo.svg'

export default function Home() {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('it');
  const [showVideo, setShowVideo] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedMedyBox, setSelectedMedyBox] = useState('A');
  const [selectedMedyLocker, setSelectedMedyLocker] = useState('A');
  const [sceneDataState, setSceneData] = useState({});
  const [annotationData, setAnnotationData] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const arUrl = sceneData['arUrl'] || '';
  
  const key = `${selectedMedyBox}-${selectedMedyLocker}`;
  const scene = sceneData[key] || { sketchfabUrl: 'defaultUrl', texts: 'defaultTexts' };

  useEffect(() => {
    const fetchTranslations = async () => {
      const response = await fetch(`/locales/${language}/common.json`);
      const data = await response.json();
      setTranslations(data);
    };
    fetchTranslations();
  }, [language]);

  const handleStartButtonClick = () => {
    setShowVideo(false);
  };

  const handleProductChange = (product : string, model : string) => {
    // forse dovrei semplicemente passare la variabile combinata e poi scorporarla all'interno di Scene3D.
    if (product === 'MedyBox') {
      setSelectedMedyBox(model);
    } else if (product === 'MedyLocker') {
      setSelectedMedyLocker(model);
    }
  };

  const handleSceneDataUpdate = (data) => {
    setSceneData(data);
  };

  const handleAnnotationDataUpdate = (data) => {
    setAnnotationData(data);
  };

  const handleAnnotationClick = (annotationIndex) => {
    setSelectedAnnotation(annotationIndex);
  };
  
  const getAnnotationText = () => {
    if (selectedAnnotation !== null) {
      const annotationKey = `annotation${selectedAnnotation + 1}`;
      return scene.annotations[annotationKey]?.[language]?.text || '';
    }
    return '';
  };

  return (
<div>
  <Layout> 
    <div className={`min-h-screen flex flex-col ${isInteracting ? 'interacting' : ''}`}>
      <div className='absolute z-10'>
          {activeModal === 'language' && (
            <LanguageModal onLanguageChange={setLanguage} onClose={() => setActiveModal(null)} />
          )}
          {activeModal === 'configuration' && (
            <ConfigurationModal onProductChange={handleProductChange} language={language} onClose={() => setActiveModal(null)} />
          )}
      </div>
      <Scene3D
        language={language}
        medyBox={selectedMedyBox}
        medyLocker={selectedMedyLocker}
        onSceneDataUpdate={handleSceneDataUpdate}
        onAnnotationDataUpdate={handleAnnotationDataUpdate}
        onAnnotationClick={handleAnnotationClick}
      />
        {showVideo && (
        <div className="absolute inset-0 z-20 w-full min-h-screen flex flex-col items-center bg-black">
          <StartExperience
            videoSrc="/path/to/video.mp4"
            onButtonClick={handleStartButtonClick}
          />
        </div>
        )}
      <div className='h-full w-full absolute grid grid-rows-2 grid-cols-3 gap-4 p-5 overlay'>
        {/* div top left */}
        <div className='row-start-1 col-start-1 text-left align-top'>
          <div className='z-10'>
            <img src={Logo.src} alt='logo' />
          </div>
        </div>
        {/* div top center */}
        <div className='row-start-1 col-start-2 text-center align-top'>
          <div className={`z-10 interactive ${isInteracting ? 'opacity-50' : 'opacity-100'}`}>scene name</div>
          <h1 className='interactive'>{scene.name[language]}</h1>
        </div>
        {/* div top right */}
        <div className='row-start-1 col-start-3 text-right align-top gap-3 flex flex-col items-end'>
          <div className='z-10 interactive'>
            <button className={`bg-green-2 py-3 px-5 interactive ${isInteracting ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => setActiveModal('language')}>{translations.changeLanguage}</button>
          </div>
          <div className='z-10 interactive w-60 p-2 bg-white flex flex-col rounded-lg gap-2 shadow-lg relative'>
            {/* Box informazioni scena selezionata */}
            <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
              <div className='flex flex-row justify-between py-3 px-4'>
                <div className='text-green-4'>Nome</div>
                <div className='text-medy-black'>icona</div>
              </div>
              <div className='flex flex-col py-3 px-4'>
                <div className='flex flex-row'>
                  <div className='text-gray-500'>testo</div>
                  <div className='text-gray-500 grow'>fill</div>
                  <div className='text-gray-500'>testo</div>
                </div>
              </div>
            </div>
            <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
              <div className='flex flex-row justify-between py-3 px-4'>
                <div className='text-green-4'>Nome</div>
                <div className='text-medy-black'>icona</div>
              </div>
              <div className='flex flex-col py-3 px-4'>
                <div className='flex flex-row'>
                  <div className='text-gray-500'>testo</div>
                  <div className='text-gray-500 grow'>fill</div>
                  <div className='text-gray-500'>testo</div>
                </div>
              </div>
            </div>
          </div>
          <p>{scene.texts[language].text1}</p>
          <p>{scene.texts[language].text2}</p>
          <p>{getAnnotationText()}</p>
        </div>
        {/* div bottom left */}
        <div className='row-start-2 col-start-1 text-left content-end'>
          <div className='z-10 interactive'>bottom left</div>
          {/* il pulsante è qui ma il modale dovrebbe essere in index. */}
          <ARModal arUrl={arUrl} />
        </div>
        {/* div bottom right */}
        <div className='row-start-2 col-start-3 text-right content-end justify-end items-end flex'>
          <div className='z-10 interactive w-52 gap-4 flex flex-col'>          
            <button className={`bg-green-2 py-3 px-5 interactive ${isInteracting ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => setActiveModal('configuration')}>{translations.changeConfiguration}</button>
            <button className='bg-green-1 text-green-3 py-3 px-5'
            onClick={() => setShowVideo(true)}>{translations.restartExperience}</button>
          </div>
        </div>
        <div className='invisible z-10 interactive'>
          {Object.keys(annotationData).map((key) => (
            <div key={key}>
              <h2>{annotationData[key].title}</h2>
              <p>{annotationData[key].text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
</div>
    )
}