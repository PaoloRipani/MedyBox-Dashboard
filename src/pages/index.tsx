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
import sceneDataJson from '../lib/sceneData.json';
import ARModal from '../components/ARModal';
import MediaModal from '../components/MediaModal';

import Logo from '../../public/MedyBox Logo.svg'
import LanguageIcon from '../../public/language icon.svg'
import ARIcon from '../../public/AR icon.svg'
import ConfigurationIcon from '../../public/configuration-icon.svg'
import RestartIcon from '../../public/restart icon.svg'
import OpenIcon from '../../public/open chevron icon.svg'
import CloseIcon from '../../public/close chevron icon.svg'
import CloseButtonIcon from '../../public/close button icon grey.svg'
import InfoIcon from '../../public/material-symbols_info.png'
import PlaceholderImage from '../../public/placeimg.png'
import PlaceholderVideo from '../../public/placevideo.png'

import { Steps, Hints } from 'intro.js-react';
import 'intro.js/introjs.css';

export default function Home() {

  const steps = [
    {
      element: '.selector1',
      intro: 'test 1',
      position: 'right',
      tooltipClass: 'myTooltipClass1',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.selector1',
      intro: 'test 1',
      position: 'right',
      tooltipClass: 'myTooltipClass1',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.selector2',
      intro: 'test 2',
      position: 'left',
      tooltipClass: 'myTooltipClass2',
      highlightClass: 'myHighlightClass',
    },
    {
      element: '.selector3',
      intro: 'test 3',
      tooltipClass: 'myTooltipClass3',
      highlightClass: 'myHighlightClass',
    },
  ];

  const options = {
    showProgress: true,
    showBullets: true,
    //exitOnOverlayClick: true,
    exitOnEsc: true,
    nextLabel: "Procedi",
    prevLabel: "Salta",
    hideSkip: true,
    doneLabel: "Capito",
    overlayOpacity: 0.5,
    overlayColor: "#003233",
    showStepNumbers: true,
    keyboardNavigation: true,
    scrollToElement: true,
    helperElementPadding: 2,
    showButtons: true,
  };

  interface Scene {
    sketchfabUrl: string;
    previewImage: string;
    selectingMedyBoxImage: string,
    selectingMedyLockerImage: string,
    name: {
      en: string,
      it: string,
      fr?: string,
      de?: string,
      es?: string
    };
    dimensions: {
      width: string,
      depth: string,
      height: string
    };
    texts: {
      en: { text1: string, text2: string },
      it: { text1: string, text2: string }
    };
    annotations: {};
  }
  
  interface SceneData {
    [key: string]: Scene;
  }

  interface Translations {
    startExperience: String,
    restartExperience: String,
    reset: String,
    arButton: String,
    changeLanguage: String,
    changeConfiguration: String
  }
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [language, setLanguage] = useState('it');
  const [showVideo, setShowVideo] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string | null>(null);
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [selectedMedyBox, setSelectedMedyBox] = useState<string>('A');
  const [selectedMedyLocker, setSelectedMedyLocker] = useState<string>('A');
  const [annotationData, setAnnotationData] = useState({});
  const [selectedAnnotation, setSelectedAnnotation] = useState(-1);
  const [showData1, setShowData1] = useState(true);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [isBoxShown, setIsBoxShown] = useState(true);
  const [sceneDataState, setSceneData] = useState<SceneData>(sceneDataJson as SceneData);
  const [tempkey,setTempkey] = useState<string>(`${selectedMedyBox}-${selectedMedyLocker}`);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const sceneData: SceneData = sceneDataJson as SceneData;
  //const typedSceneData: SceneData = sceneData;

  //const [sceneDataState, setSceneData] = useState<SceneData>(typedSceneData);
  
  const key = `${selectedMedyBox}-${selectedMedyLocker}`;
  const scene : Scene | undefined = sceneData[key];
  //const textsForLanguage = scene?.texts?.[language] ?? { text1: 'Default Text 1', text2: 'Default Text 2' };
  const arUrl: string = 'https://sketchfab.com/models/' + (scene?.sketchfabUrl || 'defaultUrl') + '/ar-redirect';
  
  const getSceneName = (data: SceneData, key: string, language: string): string => {
    const scene = data[key];
    if (scene && scene.name) {
      return scene.name[language as keyof typeof scene.name] || 'Default Scene Name';
    }
    return 'Default Scene Name';
  };

  useEffect(() => {
    console.log("scene: ", scene);
    const fetchTranslations = async () => {
      //const response = await fetch(`/medyboxdashboard/locales/${language}/common.json`);
      const response = await fetch(`/locales/${language}/common.json`);
      const data = await response.json();
      setTranslations(data);
    };
    fetchTranslations();
  }, [language]);

  const handleStartButtonClick = () => {
    setShowVideo(false);
    setActiveModal("language")
  };

  const handleProductChange = (product : string, model : string) => {
    // forse dovrei semplicemente passare la variabile combinata e poi scorporarla all'interno di Scene3D.
    if (product === 'MedyBox') {
      setSelectedMedyBox(model);
    } else if (product === 'MedyLocker') {
      setSelectedMedyLocker(model);
    }
  };

  const handleSceneDataUpdate = (data : any) => {
    setSceneData(data);
  };

  const handleAnnotationDataUpdate = (data : any) => {
    setAnnotationData(data);
  };

  const handleAnnotationClick = (annotationIndex : number) => {
    setSelectedAnnotation(annotationIndex);
    console.info("Annotation selected: ", annotationIndex);
  };
  
  const getAnnotationText = () => {
    if (selectedAnnotation !== null) {
      const annotationKey = `annotation${selectedAnnotation + 1}`;
      // return scene?.annotations[annotationKey]?.[language]?.text || '';
    }
    return '';
  };

  const handleMediaClick = (type: string, src: string) => {
    setMediaType(type);
    setMediaSrc(src);
    setActiveModal('media');
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleLanguageChange = (language : string) => {
    if (isFirstTime) {
      setStepsEnabled(true); // Enable steps only on the first selection
      setIsFirstTime(false);
    }
    setLanguage(language);
  };

  return (


<div>
  
{/*<div className='z-50 top-0 left-0 w-screen h-screen'>
        <iframe className='w-full h-full'
        title="Medybox - Mini 90 IT" frameborder="0" allowfullscreen mozallowfullscreen="true" 
        webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" 
        xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share 
        src="https://sketchfab.com/models/57ec6e1f9e744c908870425c23d81123/embed?camera=0&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&annotations_visible=0"> </iframe>
</div>*/}
  <Layout> 
    <div className={'min-h-screen flex flex-col overflow-hidden selector1'}>
    <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={1}
      options={options}
      onExit={() => setStepsEnabled(false)}
    />
      <div className={'absolute z-10 w-full h-full'}
        style={{pointerEvents: "none"}}>
          {activeModal === 'language' &&(
            <LanguageModal onLanguageChange={handleLanguageChange} onClose={() => setActiveModal(null)} />
          )}
          {activeModal === 'configuration' &&(
            <ConfigurationModal onProductChange={handleProductChange} language={language} 
            onClose={() => setActiveModal(null)}
            selectedMedyBox={selectedMedyBox}
            selectedMedyLocker={selectedMedyLocker}
            setSelectedMedyBox={setSelectedMedyBox}
            setSelectedMedyLocker={setSelectedMedyLocker} 
            />
          )}
          {activeModal === 'ar' &&(
            <ARModal arUrl={arUrl}  onClose={() => setActiveModal(null)}/>
          )}
          {activeModal === 'media' &&(
            <MediaModal mediaType={mediaType} mediaSrc={mediaSrc} onClose={handleClose} />
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
        id={"-start-experience"}
        className="-start-experience"
      />
        {showVideo && selectedAnnotation < 0 &&(
        <div className="absolute inset-0 z-20 w-full min-h-screen flex flex-col items-center bg-black">
          <StartExperience
            videoSrc="../../public/videointroduttivo.mp4"
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
          <div className={`z-10 interactive neue-plak-wide text-xl text-green-4`} >
            {getSceneName(sceneData, key, language)}
          </div>
        </div>
        )}
        {/* div top right */}
        {selectedAnnotation == null || selectedAnnotation < 0 && (
          <div className='row-start-1 col-start-3 text-right align-top gap-3 flex flex-col items-end'>
            <div className='z-10 interactive'>
              <div className='flex flex-row gap-1.5 h-11 items-center justify-center cursor-pointer'
                onClick={() => setActiveModal('language')}>
                <img src={LanguageIcon.src} alt='icon' className='w-5 h-5' />
                <div className={`text-green-3 interactive ${isInteracting ? 'opacity-50' : 'opacity-100'} lato-semi-bold uppercase`}>{translations?.changeLanguage}</div>
              </div>
            </div>
            <div className='flex flex-row-reverse'>
              {/* Pulsante Box informazioni scena selezionata */}
              <div className='z-10 interactive cursor-pointer bg-white rounded h-14 w-14 ml-2 flex items-center justify-center' onClick={() => setIsBoxShown(!isBoxShown)}>
                {isBoxShown ? <img src={CloseButtonIcon.src}></img> : <img src={InfoIcon.src}></img>}
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
            <div className='interactive cursor-pointer flex items-center py-2.5 px-5 bg-green-2 
            gap-1.5 w-60 justify-center'
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
          <div className='z-10 interactive w-64 gap-4 flex flex-col'>      
            <div className={`bg-green-3 py-2.5 px-5 flex gap-1.5 cursor-pointer uppercase selector3
            ${isInteracting ? 'opacity-50' : 'opacity-100'} justify-center`}
            onClick={() => setActiveModal('configuration')}>
              <img src={ConfigurationIcon.src}></img>
              <div className=' lato-semi-bold'>{translations?.changeConfiguration}</div>
            </div>   
            <div className={`bg-green-2 text-green-4 py-2.5 px-5 flex gap-1.5 cursor-pointer uppercase
            ${isInteracting ? 'opacity-50' : 'opacity-100'} justify-center`}
            onClick={() => setShowVideo(true)}>
              <img src={RestartIcon.src}></img>
              <div className=' lato-semi-bold'>{translations?.restartExperience}</div>
            </div>
          </div>
        </div>
          </>
        )}
        {/* Annotation HUD - visible when annotation index is > 0 */}
        {selectedAnnotation != null && selectedAnnotation > -1 ? (
        <div className='absolute right-0 h-svh w-96 p-4 flex flex-col bg-white text-black z-20 interactive'>
          <div className='flex items-end justify-end'>
            <div className=''>
              <img src={CloseButtonIcon.src} className='w-6 cursor-pointer' onClick={() => setSelectedAnnotation(-1)}></img>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col gap-8'>
              <div className='neue-plak-wide text-xl'>titolo</div>
              <div className='lato-bold text-green-3 text-sm uppercase'>sottotitolo</div>
            </div>
            <div className='flex flex-col gap-8'>
              <div className='lato-regular text-lg'>
              Lorem ipsum dolor sit amet consectetur. Risus maecenas ultrices augue tortor id eget morbi. Volutpat ultrices elementum pharetra vel molestie nisl libero vitae dui. Sem in a quam cras. Mauris euismod est viverra lacus sed.
              Sapien nisl consectetur enim vulputate. Eleifend magnis orci euismod convallis a turpis. Platea etiam neque laoreet sed cras. Erat venenatis enim est turpis urna lectus.
              </div>
              {/* video container */}
              <div>
                <img src={PlaceholderVideo.src} alt='video' className='w-full'
                 onClick={() => handleMediaClick('video', PlaceholderVideo.src)}></img>
              </div>
              {/* slider immagini */}
              <div className='image-slider gap-4 hide-scrollbar'>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                 onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
              </div>
            </div>
          </div>
        </div>
        ) : (<></>)}
          <div id="start-experience"></div>
          <div id="3d-scene"></div>
          <div id="configuration-button"></div>
      </div>
    </div>
  </Layout>
</div>
)
}