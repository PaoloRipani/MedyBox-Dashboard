import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { parse } from 'node-html-parser';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState, useRef } from 'react'
import StartExperience from '../components/StartExperience';
import Scene3D from '../components/Scene3D';
import LanguageModal from '../components/LanguageModal';
import ConfigurationModal from '../components/ConfigurationModal';
import sceneDataJson from '../lib/sceneData.json';
import ARModal from '../components/ARModal';
import MediaModal from '../components/MediaModal';
import OnboardingDialog from '../components/OnboardingDialog';

import Logo from '../../public/MedyBox Logo Black.svg'
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
import MedyboxExperience from '../../public/medybox experience logo.svg'
import QuestionIcon from '../../public/question icon green.svg'

export default function Home() {

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
    annotations: {
      [key: string]: {
        [lang: string]: {
          title: string,
          text: string,
          images: string
        };
      };
    };
  }
  
  interface SceneData {
    [key: string]: Scene;
  }

  interface Translations {
    startExperience: String,
    restartExperience: String,
    arButton: String,
    changeLanguage: String,
    changeConfiguration: String,
    height: String,
    width: String,
    depth: String,
    capacity: String
  }
  const [translations, setTranslations] = useState<Translations | null>(null);
  const [fetchedTranslations, setFetchedTranslations] = useState(false);
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
  const [onboardingActive, setOnboardingActive] = useState(false);
  const [onboardingTranslations, setOnboardingTranslations] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const startExperienceRef = useRef(null);
  const scene3DRef = useRef(null);
  const [resetCamera, setResetCamera] = useState<(() => void) | null>(null);
  const configurationButtonRef = useRef(null);
  const [configurationLanguage, setConfigurationLanguage] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const sceneData: SceneData = sceneDataJson as SceneData;
  //const typedSceneData: SceneData = sceneData;

  //const [sceneDataState, setSceneData] = useState<SceneData>(typedSceneData);
  
  const key = `${selectedMedyBox}-${selectedMedyLocker}`;
  const scene : Scene | undefined = sceneData[key];
  //const textsForLanguage = scene?.texts?.[language] ?? { text1: 'Default Text 1', text2: 'Default Text 2' };
  const arUrl: string = 'https://sketchfab.com/models/' + (scene?.sketchfabUrl || 'defaultUrl') + '/ar-redirect';
  
  const onboardingSteps = [
    {
      index: 1,
      ref: startExperienceRef,
      selector: '#start-experience',
      title: 'Welcome to the Start Experience!',
      text: 'This is where you begin your journey.',
      position: 'center', 
      avatarPosition: 'center-left'
    },
    {
      index: 2,
      ref: scene3DRef,
      selector: '#3d-scene',
      title: '3D Scene',
      text: 'Here is the 3D scene.',
      position: 'center-left',
      avatarPosition: 'bottom'
    },
    {
      index: 3,
      ref: configurationButtonRef,
      selector: '#configuration-button',
      title: 'Configuration',
      text: 'Here you can configure your settings.',
      position: 'left',
      avatarPosition: 'left'
    },
  ];

  const getSceneName = (data: SceneData, key: string, language: string): string => {
    const scene = data[key];
    if (scene && scene.name) {
      return scene.name[language as keyof typeof scene.name] || 'Default Scene Name';
    }
    return 'Default Scene Name';
  };

  const getAnnotationTitle = () => {
    if (selectedAnnotation !== null) {
      const annotationKey = `annotation${selectedAnnotation + 1}`;
      if (scene && scene.annotations[annotationKey] && scene.annotations[annotationKey][language]) {
        return scene.annotations[annotationKey][language].title;
      }
    }
    return '';
  };

  const getAnnotationText = () => {
    if (selectedAnnotation !== null) {
      const annotationKey = `annotation${selectedAnnotation + 1}`;
      if (scene && scene.annotations[annotationKey] && scene.annotations[annotationKey][language]) {
        return scene.annotations[annotationKey][language].text;
      }
    }
    return '';
  };

  const getAnnotationImage = () => {
    if (selectedAnnotation !== null) {
      const annotationKey = `annotation${selectedAnnotation + 1}`;
      if (scene && scene.annotations[annotationKey] && scene.annotations[annotationKey][language]) {
        return scene.annotations[annotationKey][language].images;
      }
    }
    return ''; // Return an empty string if no image is found
  };
  
  useEffect(() => {
    console.log("scene: ", scene);
    const fetchTranslations = async () => {
      try {
          const response = await fetch(`./locales/${language}/common.json`);
          const data = await response.json();
          console.info("data json common: ", data);
          setTranslations(data);
          setOnboardingTranslations(data.onboarding);
          setConfigurationLanguage(data.configuration);
          setFetchedTranslations(true);
      } catch (error) {
          console.error("Error fetching translations: ", error);
      }
  };
    fetchTranslations();
  }, [language]);

  const handleStartButtonClick = () => {
    setActiveModal('language')
    setTransitioning(true); // Trigger the transition
    setTimeout(() => {
      setShowVideo(false); // Hide StartExperience after the transition
      // setOnboardingActive(true); // Activate Onboarding
    }, 1000); // Match this timeout with the transition duration
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

  const handleRestartExperience = () => {
    setTransitioning(false); // Reset any transitions
    setShowVideo(true); // Show StartExperience again
    setIsFirstTime(true); // Reset onboarding
    setOnboardingStep(0); // Reset onboarding steps
    setSelectedAnnotation(-1); // Clear annotations
  };

  const handleMediaClick = (type: string, src: string) => {
    setMediaType(type);
    setMediaSrc(src);
    setActiveModal('media');
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const handleCloseAnnotationModal = () => {
    console.log("Close annotation modal");
    setSelectedAnnotation(-1);
    setActiveModal(null);
  
    if (resetCamera) {
      console.log('ResetCamera function exists');
      resetCamera(); // Reset camera to the initial position
    } else {
      console.warn('ResetCamera function is not assigned');
    }
  };

  const handleLanguageChange = (language : string) => {
    if (isFirstTime) {
      setLanguage(language)
      setOnboardingActive(true); // Enable steps only on the first selection
      setIsFirstTime(false);
    }
    setLanguage(language);
  };

  const startOnboarding = () => {
    setOnboardingActive(true);
    setOnboardingStep(0);
  };

  const handleNextStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setOnboardingActive(false);
      setOnboardingStep(0);
    }
  };

  const handleCloseOnboarding = () => {
    setOnboardingActive(false);
    setOnboardingStep(0);
  };

  const handleScroll = (e : any) => {
    const container = e.currentTarget;
    if (e.deltaY !== 0) {
      container.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  return (
<div>
  <Layout> 
    <div className={'min-h-screen flex flex-col overflow-hidden selector1'} ref={startExperienceRef}>
      {/* test element z-index with the blur background 1 */}
      { onboardingStep === 2 && onboardingActive ? (
      <div className={`bg-green-3 py-2.5 px-5 flex gap-1.5 uppercase absolute bottom-20 right-4 justify-center z-40 w-64`}>
        <img src={ConfigurationIcon.src}></img>
        <div className=' lato-semi-bold text-white'
            ref={configurationButtonRef}>{translations?.changeConfiguration}</div>
      </div>) : (<></>)}

      {/* Transition Container */}
      <div
          className={`transition-container ${
            transitioning ? 'roll-up' : ''
          }`}
        >
      {/* Modals Container */}
      <div className={'absolute z-10 w-full h-full'} style={{pointerEvents: "none"}}>
          {activeModal === 'configuration' &&(
            <ConfigurationModal onProductChange={handleProductChange} 
            translation={configurationLanguage} 
            onClose={() => setActiveModal(null)}
            selectedMedyBox={selectedMedyBox}
            selectedMedyLocker={selectedMedyLocker}
            setSelectedMedyBox={setSelectedMedyBox}
            setSelectedMedyLocker={setSelectedMedyLocker} 
            translations={translations}
            />
          )}
          {activeModal === 'ar' &&(
            <ARModal arUrl={arUrl} translations={translations} onClose={() => setActiveModal(null)}/>
          )}
          {activeModal === 'media' &&(
            <MediaModal mediaType={mediaType} mediaSrc={mediaSrc} translation={translations} onClose={handleClose} />
          )}
      </div> {/* End Modals Container */}

      {/* Start Experience Section */}
      {showVideo && selectedAnnotation < 0 && (
            <div className={`start-experience absolute inset-0 z-10 w-full min-h-screen flex flex-col items-center bg-black
                  ${!showVideo ? 'hidden' : 'visible'}`}>
              <StartExperience
                videoSrc="../../public/videointroduttivo.mp4"
                onButtonClick={handleStartButtonClick}
              />
            </div>
          )}
      {/* End Start Experience Section */}

      {/* Scene3D Section */}
      <div className="scene-3d">
        <Scene3D
          medyBox={selectedMedyBox}
          medyLocker={selectedMedyLocker}
          onSceneDataUpdate={handleSceneDataUpdate}
          onAnnotationDataUpdate={handleAnnotationDataUpdate}
          onAnnotationClick={handleAnnotationClick}
          onInteractionChange={setIsInteracting}
          onResetCameraRef={setResetCamera}
          ref={scene3DRef}
        />
        {activeModal === 'language' &&(
          <LanguageModal onLanguageChange={handleLanguageChange} onClose={() => (setActiveModal(null),startOnboarding())} />
        )}
        {/* creating onboarding background - glass element with z-index 1000 */}
        {onboardingActive && (
          <div className='h-full w-full absolute top-0 left-0'>
            <div className='z-[1001] absolute top-0 left-0 h-full w-full'
            style={{pointerEvents: "auto"}}>
              <OnboardingDialog
                step={onboardingSteps[onboardingStep]}
                onNext={handleNextStep}
                onClose={handleCloseOnboarding}
                translations={onboardingTranslations}
              />
            </div>
          </div>
        )}
        {onboardingActive && onboardingStep !== 1 ? (
          <div className="shadow-2xl bg-green-4 bg-opacity-30 backdrop-blur-md h-full w-full z-20 absolute top-0 left-0">
            <img src={MedyboxExperience.src} alt="logo" className="w-60 m-auto mt-20" />
          </div>
        ) : (<></>)}
        </div>
      </div> {/* Closing Transition Container */}

      {/* Overlays in 6 Zone Container */}
      {(!onboardingActive && !showVideo && fetchedTranslations && activeModal == null) &&(
      <div className='h-full w-full absolute grid grid-rows-2 grid-cols-3 gap-4 p-5 overlay z-10'>

        {/* div top left */}
        {onboardingStep !== 1 && (
          <>
        <div className='row-start-1 col-start-1 text-left align-top flex flex-col gap-3'>
          <div className='z-10'>
            <img src={Logo.src} alt='logo' className='w-52'/>
          </div>
          {/* Pulsante restart onboarding */}
          {selectedAnnotation < 0 && (
            <div className={`z-10 interactive cursor-pointer bg-white rounded h-14 w-14 ml-2 flex items-center 
              justify-center shadow-lg
              ${onboardingStep == 1 ? 'opacity-0' : 'opacity-100'}`} 
              onClick={() => startOnboarding()}
              style={{pointerEvents: "auto"}}>
                <img src={QuestionIcon.src}></img>
              </div>
          )}
          </div>
        </>
        )}
        {/* div top center */}
        {selectedAnnotation == null || selectedAnnotation < 0 && onboardingStep !== 1 ? (
        <div className='row-start-1 col-start-2 text-center align-top'>
          <div className={`z-10 interactive neue-plak-wide text-xl text-green-4`} >
            {getSceneName(sceneData, key, language)}
          </div>
        </div>
        ) : (<></>)}
        {/* div top right */}
        {selectedAnnotation == null || selectedAnnotation < 0 && onboardingStep !== 1 ? (
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
              <div className={`z-10 interactive cursor-pointer bg-white rounded h-14 w-14 ml-2 flex items-center 
              shadow-lg justify-center
              ${onboardingStep == 1 ? 'opacity-0' : 'opacity-100'}`} 
              onClick={() => setIsBoxShown(!isBoxShown)}>
                {isBoxShown ? <img src={CloseButtonIcon.src}></img> : <img src={InfoIcon.src}></img>}
              </div>
              {/* Box informazioni scena selezionata */}
              {isBoxShown && onboardingStep !== 1 ? (
              <div className='z-10 interactive w-60 p-2 bg-white flex flex-col rounded-lg gap-2 shadow-lg relative'>
                <div className='flex min-h-12 bg-glass-green flex-col rounded-s'>
                  <div className='flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-green-1 
                  rounded-s' 
                  onClick={() => setShowData1(prevState => !prevState)}>
                    <div className='text-green-4'>Standard</div>
                    <div className='text-medy-black'>
                      <img src={showData1 ? CloseIcon.src : OpenIcon.src}></img>
                    </div>
                  </div>
                  {showData1 && (<div className='flex flex-col py-3 px-4'>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.width}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.depth}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>68</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.height}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>202</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.capacity}</div>
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
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.width}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.depth}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>48</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.height}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>202</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.capacity}</div>
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
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.width}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>149</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.depth}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>68</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.height}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>169</b> cm</div>
                    </div>
                    <div className='flex flex-row'>
                      <div className=' lato-regular text-sm text-medy-gray'>{translations?.capacity}</div>
                      <div className=' grow dot-fill'></div>
                      <div className='lato-regular text-medy-gray text-sm'><b>100+</b></div>
                    </div>
                  </div>)}
                </div>
              </div>
              ) : (<></>)}
            </div>
          </div> 
        ): (<></>)}
        {/* div bottom left */}
        {selectedAnnotation == null || selectedAnnotation < 0 && onboardingStep !== 1 ? (
        <div className='row-start-2 col-start-1 text-left content-end'>
          <div className='z-10'>
            <div className='interactive cursor-pointer flex items-center py-2.5 px-5 bg-green-2 
            gap-1.5 w-64 justify-center'
            onClick={() => setActiveModal('ar')}>
              <div className='w-5 h-5'>
                <img src={ARIcon.src} />
              </div>
              <div className='lato-semi-bold text-green-4 text-md uppercase'>
              {translations?.arButton}
              </div>
            <div/>
          </div>
          </div>
        </div>
          ) : (<></>)}
        {/* div bottom right */}
        {selectedAnnotation == null || selectedAnnotation < 0 && onboardingStep !== 1 ? (
          <>
        <div className='row-start-2 col-start-3 text-right content-end justify-end items-end flex'>
          <div className='z-10 interactive w-64 gap-4 flex flex-col'>      
            <div className={`bg-green-3 py-2.5 px-5 flex gap-1.5 cursor-pointer uppercase
            ${isInteracting ? 'opacity-50' : 'opacity-100'} justify-center`}
            onClick={() => setActiveModal('configuration')}>
              <img src={ConfigurationIcon.src}></img>
              <div className=' lato-semi-bold'>{translations?.changeConfiguration}</div>
            </div>   
            <div className={`bg-green-2 text-green-4 py-2.5 px-5 flex gap-1.5 cursor-pointer uppercase
            ${isInteracting ? 'opacity-50' : 'opacity-100'} justify-center`}
            onClick={handleRestartExperience}>
              <img src={RestartIcon.src}></img>
              <div className=' lato-semi-bold'>{translations?.restartExperience}</div>
            </div>
          </div>
        </div>
          </>
        ) : (<></>)}
        {/* Annotation HUD - visible when annotation index is > 0 */}
        {selectedAnnotation != null && selectedAnnotation > -1 && onboardingStep !== 1 ? (
        <div className='absolute right-0 h-svh w-96 p-4 flex flex-col bg-white text-black z-20 interactive'
        style={{pointerEvents: "auto"}}>
          <div className='flex items-end justify-end'>
            <div className=''>
              <img src={CloseButtonIcon.src} className='w-6 cursor-pointer' onClick={handleCloseAnnotationModal}></img>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col gap-8'>
              <div className='neue-plak-wide text-xl'>{getAnnotationTitle()}</div>
              <div className='lato-bold text-green-3 text-sm uppercase'>{getAnnotationText()}</div>
            </div> 
            <div className='flex flex-col gap-8'>
              <div className='lato-regular text-lg'>
              {/* {getAnnotationText()} */}
              </div>
              {/* video container */}
              <div>
                {/* <img src={PlaceholderVideo.src} alt='video' className='w-full'
                 onClick={() => handleMediaClick('video', PlaceholderVideo.src)}></img> */}
                 <img src={getAnnotationImage() ? `./${getAnnotationImage()}` : PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                  onClick={() => handleMediaClick('image', `./${getAnnotationImage()}`)}></img>
              </div>
              {/* slider immagini */}
              
              {/* <div className='image-slider gap-4 hide-scrollbar' onWheel={(e) => handleScroll(e)}>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                 onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
                <img src={PlaceholderImage.src} alt='image' className='scroll-snap-stop h-3/4 w-3/4'
                onClick={() => handleMediaClick('image', PlaceholderImage.src)}></img>
              </div> */}

            </div>
          </div>
        </div>
        ) : (<></>)}
      </div>
      )} {/* End Overlays in 6 Zone Container */}
    </div>
  </Layout>
</div>
)
}