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
import LanguageIcon from '../../public/language icon.svg'
import ARIcon from '../../public/AR icon.svg'
import ConfigurationIcon from '../../public/configuration-icon.svg'
import RestartIcon from '../../public/restart icon.svg'
import OpenIcon from '../../public/open chevron icon.svg'
import CloseIcon from '../../public/close chevron icon.svg'

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
  const [selectedAnnotation, setSelectedAnnotation] = useState(-1);
  const [showData, setShowData] = useState(true);
  const [showData1, setShowData1] = useState(false);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [isBoxShown, setIsBoxShown] = useState(false);
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
    console.info("Annotation selected: " + annotationIndex);
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
    <div className={'min-h-screen flex flex-col'}>
      <div className={'absolute z-10 w-full h-full'}
        style={{pointerEvents: "none"}}>
          {activeModal === 'language' &&(
            <LanguageModal onLanguageChange={setLanguage} onClose={() => setActiveModal(null)} />
          )}
          {activeModal === 'configuration' &&(
            <ConfigurationModal onProductChange={handleProductChange} language={language} onClose={() => setActiveModal(null)} 
            />
          )}
          {activeModal === 'ar' &&(
            <ARModal arUrl={arUrl}  onClose={() => setActiveModal(null)}/>
          )}
      </div>
      <Scene3D
        language={language}
        medyBox={selectedMedyBox}
        medyLocker={selectedMedyLocker}
        onSceneDataUpdate={handleSceneDataUpdate}
        onAnnotationDataUpdate={handleAnnotationDataUpdate}
        onAnnotationClick={handleAnnotationClick}
        onInteractionChange={setIsInteracting}
      />
        {showVideo && selectedAnnotation == null &&(
        <div className="absolute inset-0 z-20 w-full min-h-screen flex flex-col items-center bg-black">
          <StartExperience
            videoSrc="/path/to/video.mp4"
            onButtonClick={handleStartButtonClick}
          />
        </div>
        )}
      <div className='h-full w-full absolute grid grid-rows-2 grid-cols-3 gap-4 p-5 overlay z-0'>
        {/* div top left */}
        <div className='row-start-1 col-start-1 text-left align-top'>
          <div className='z-10'>
            <img src={Logo.src} alt='logo' className='w-52'/>
          </div>
        </div>
        {/* div top center */}
        {selectedAnnotation == null || selectedAnnotation < 0 && (
        <div className='row-start-1 col-start-2 text-center align-top'>
          <div className={`z-10 interactive neue-plak-wide text-xl text-green-4`}>{scene.name[language]}</div>
        </div>
          )}
        {/* div top right */}
        {selectedAnnotation == null || selectedAnnotation < 0 && (
          <div className='row-start-1 col-start-3 text-right align-top gap-3 flex flex-col items-end'>
            <div className='z-10 interactive'>
              <div className='flex flex-row gap-1.5 h-11 items-center justify-center cursor-pointer'
                onClick={() => setActiveModal('language')}>
                <img src={LanguageIcon.src} alt='icon' className='w-5 h-5' />
                <div className={`text-green-2 interactive ${isInteracting ? 'opacity-50' : 'opacity-100'} lato-semi-bold`}>{translations.changeLanguage}</div>
              </div>
            </div>
            <div className='flex flex-row-reverse'>
              {/* Pulsante Box informazioni scena selezionata */}
              <div className='' onClick={() => setIsBoxShown(!isBoxShown)}>
                {isBoxShown ? <img src={CloseIcon.src}></img> : <img src={OpenIcon.src}></img>}
              </div>
              {/* Box informazioni scena selezionata */}
              {isBoxShown && (
              <div className='z-10 interactive w-60 p-2 bg-white flex flex-col rounded-lg gap-2 shadow-lg relative'>
                <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
                  <div className='flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-green-1 rounded-s' 
                  onClick={() => setShowData1(prevState => !prevState)}>
                    <div className='text-green-4'>Standard</div>
                    <div className='text-medy-black'>
                      <img src={showData1 ? CloseIcon.src : OpenIcon.src}></img>
                    </div>
                  </div>
                  {showData1 && (<div className='flex flex-col py-3 px-4'>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Larghezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Profondità</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>68</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Altezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>202</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Capienza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>100+</b></div>
                    </div>
                  </div>)}
                </div>
                <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
                  <div className='flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-green-1 rounded-s'
                  onClick={() => setShowData2(prevState => !prevState)}>
                    <div className='text-green-4'>Slim</div>
                    <div className='text-medy-black'>
                      <img src={showData2 ? CloseIcon.src : OpenIcon.src}></img>
                    </div>
                  </div>
                  {showData2 && (<div className='flex flex-col py-3 px-4'>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Larghezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Profondità</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>68</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Altezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>202</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Capienza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>100+</b></div>
                    </div>
                  </div>)}
                </div>
                <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
                  <div className='flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-green-1 rounded-s'
                  onClick={() => setShowData3(prevState => !prevState)}>
                    <div className='text-green-4'>Baby</div>
                    <div className='text-medy-black'>
                      <img src={showData3 ? CloseIcon.src : OpenIcon.src}></img>
                    </div>
                  </div>
                  {showData3 && (<div className='flex flex-col py-3 px-4'>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Larghezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Profondità</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>68</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Altezza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>202</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>Capienza</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>100+</b></div>
                    </div>
                  </div>)}
                </div>
              </div>
              )}
            </div>
          </div> 
        )}
        {/* div bottom left */}
        {selectedAnnotation == null || selectedAnnotation < 0 && (
        <div className='row-start-2 col-start-1 text-left content-end'>
          <div className='z-10'>
            <div className='interactive cursor-pointer flex items-center h-10 py-3 px-5 bg-green-2 gap-1.5 w-60'
            onClick={() => setActiveModal('ar')}>
              <div className='w-5 h-5'>
                <img src={ARIcon.src} />
              </div>
              <div className='lato-semi-bold text-green-4 text-md uppercase'>
                Realtà Aumentata
              </div>
            <div/>
          </div>
          </div>
        </div>
          )}
        {/* div bottom right */}
        {selectedAnnotation == null || selectedAnnotation < 0 && (
          <>
        <div className='row-start-2 col-start-3 text-right content-end justify-end items-end flex'>
          <div className='z-10 interactive w-52 gap-4 flex flex-col'>      
            <div className={`bg-green-3 py-3 px-5 flex gap-1.5 cursor-pointer uppercase
            ${isInteracting ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => setActiveModal('configuration')}>
              <img src={ConfigurationIcon.src}></img>
              <div className=' lato-semi-bold'>{translations.changeConfiguration}</div>
            </div>   
            <div className={`bg-green-2 text-green-4 py-3 px-5 flex gap-1.5 cursor-pointer uppercase
            ${isInteracting ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => setShowVideo(true)}>
              <img src={RestartIcon.src}></img>
              <div className=' lato-semi-bold'>{translations.restartExperience}</div>
            </div>
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
          </>
        )}
        {/* Annotation HUD - visible when annotation index is > 0 */}
        {selectedAnnotation != null && selectedAnnotation > -1 ? (
        <div className='absolute right-0 h-svh w-96 p-4 flex flex-col bg-white text-black z-20 interactive'>
          <div className='flex items-end justify-end'>
            <div className=''>X</div>
          </div>
          <div className='p-4'>
            <div className=''>
              <div className='neue-plak-wide text-xl'>titolo</div>
              <div className='lato-bold text-green-3 text-sm uppercase'>sottotitolo</div>
            </div>
            <div className=''>
              <div className='lato-regular text-lg'>testo paragrafo</div>
              <div>slider immagini</div>
              <div>video</div>
            </div>
          </div>
        </div>
        ) : (<></>)}
      </div>
    </div>
  </Layout>
</div>
    )
}