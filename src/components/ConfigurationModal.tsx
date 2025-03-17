import { useState } from 'react';
import sceneDataJson from '../lib/sceneData.json';

import Close from '../../public/material-symbols_close.svg'
import enterIcon from '../../public/enter chevron icon.svg'
import top from '../../public/medybox-top.png'
import medio from '../../public/medybox-medio.png'
import mini from '../../public/medybox-mini.png'
import medylocker252 from '../../public/medylocker-252.png'
import medylocker300 from '../../public/medylocker-300.png'
import medylocker500 from '../../public/medylocker-500.png'
import hide from '../../public/hide icon.svg'
import hidewhite from '../../public/hide icon white.svg'
import CloseButtonIcon from '../../public/close button icon grey.svg'
import InfoIcon from '../../public/material-symbols_info.png'
import OpenIcon from '../../public/open chevron icon.svg'
import CloseIcon from '../../public/close chevron icon.svg'
import { StaticImageData } from 'next/image';

export default function ConfigurationModal({ 
  translation, translations, onProductChange, onClose, selectedMedyBox, selectedMedyLocker, setSelectedMedyBox, setSelectedMedyLocker }
  : { translation: any, translations: any, onProductChange: (product: string, model: string) => void, onClose: () => void, selectedMedyBox: any, 
    selectedMedyLocker: any, setSelectedMedyBox: (medyBox : string) => void, setSelectedMedyLocker: (medyLocker : string) => void }) {
      
  interface Scene {
    sketchfabUrl: string;
    previewImage: string;
    selectingMedyBoxImage: string;
    selectingMedyLockerImage: string;
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
      en: {
        text1: string;
        text2: string;
      };
      it: {
        text1: string;
        text2: string;
      };
    };
    annotations: {};
  }
  
  interface SceneData {
    [key: string]: Scene;
  } 

  const [tempMedyBox, setTempMedyBox] = useState<string>(selectedMedyBox);
  const [tempMedyLocker, setTempMedyLocker] = useState<string>(selectedMedyLocker);
  const [selectingMedyBox, setSelectingMedyBox] = useState(false);
  const [selectingMedyLocker, setSelectingMedyLocker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempSceneData, setTempSceneData] = useState<SceneData>(sceneDataJson as SceneData);
  const [showData1, setShowData1] = useState(true);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [isBoxShown, setIsBoxShown] = useState(true);

  const sceneData: SceneData = sceneDataJson as SceneData;

  const getMedyBoxImage = () => {
    switch(tempMedyBox) {
      case 'A': return top;
      case 'B': return medio;
      case 'C': return mini;
      default: return '-';
    }
  };

  const getMedyBoxName = () => {
    switch(tempMedyBox) {
      case 'A': return "MedyBox Top";
      case 'B': return "MedyBox Medio";
      case 'C': return "MedyBox Mini";
      default: return translation.nomedybox;
    }
  };

  const getMedyLockerImage = () => {
    switch(tempMedyLocker) {
      case 'A': return medylocker252;
      case 'B': return medylocker300;
      case 'C': return medylocker500;
      default: return '-';
    }
  };

  const getMedyLockerName = () => {
    switch(tempMedyLocker) {
      case 'A': return "MedyLocker 500";
      case 'B': return "MedyLocker 300";
      case 'C': return "MedyLocker 252";
      default: return translation.nomedylocker;
    }
  };

  const handleMedyBoxChange = (medyBox : string) => {
    if (medyBox === '' && tempMedyLocker === '') {
      alert(translation.errorNoSelection|| "You must select at least one MedyBox or MedyLocker."); 
      return;
    }
    setTempMedyBox(medyBox);
    setHasChanges(true);
  };

  const handleMedyLockerChange = (medyLocker : string) => {
    if (medyLocker === '' && tempMedyBox === '') {
      alert(translation.errorNoSelection|| "You must select at least one MedyBox or MedyLocker.");
      return;
    }
    setTempMedyLocker(medyLocker);
    setHasChanges(true);
  };

  const handleConfirm = () => {
    setSelectedMedyBox(tempMedyBox);
    setSelectedMedyLocker(tempMedyLocker);
    onProductChange('MedyBox', tempMedyBox);
    onProductChange('MedyLocker', tempMedyLocker);
    setHasChanges(false);
    onClose();
  };

  const handleBackToSelection = () => {
    setSelectingMedyBox(false);
    setSelectingMedyLocker(false);
  }

  const products = Object.keys(sceneData);

  const key = `${selectedMedyBox}-${selectedMedyLocker}`;

  const medyBoxes = Object.keys(sceneData).filter(key => key.startsWith('MedyBox'));
  const medyLockers = Object.keys(sceneData).filter(key => key.startsWith('MedyLocker'));

/*
  const previewUrlMedyBox = sceneData[tempMedyBox]?.previewUrl || '/path/to/defaultPreview.png';
  const dimensionsMedyBox = sceneData[tempMedyBox]?.dimensions || 'No dimensions available';

  const previewUrlMedyLocker = sceneData[tempMedyLocker]?.previewUrl || '/path/to/defaultPreview.png';
  const dimensionsMedyLocker = sceneData[tempMedyLocker]?.dimensions || 'No dimensions available';
*/

  const handleClose = () => {
    if (hasChanges) {
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmModal(false);
    onClose();
  };

  const getPreviewImage = () => {
    const key = `${tempMedyBox}-${tempMedyLocker}`;
    

    if (selectingMedyBox) {
      return "/medyboxdashboard" + tempSceneData[key]?.selectingMedyBoxImage || 'path/to/defaultSelectingMedyBoxPreview.png';
      //return "" + tempSceneData[key]?.selectingMedyBoxImage || 'path/to/defaultSelectingMedyBoxPreview.png';
    }

    if (selectingMedyLocker) {
      return "/medyboxdashboard" + tempSceneData[key]?.selectingMedyLockerImage || 'path/to/defaultSelectingMedyLockerPreview.png';
    }

    return "/medyboxdashboard" + tempSceneData[key]?.previewImage || 'path/to/defaultPreviewImage.png';
  };

  const getImagePath = () => {
    let tempMedyBox = selectingMedyBox ? `s${selectedMedyBox}` : selectedMedyBox || 's';
    let tempMedyLocker = selectingMedyLocker ? `s${selectedMedyLocker}` : selectedMedyLocker || 's';
    return `/public/${tempMedyBox}-${tempMedyLocker}.png`;
  };

  const isConfirmDisabled = !tempMedyBox || !tempMedyLocker;
  console.log("Translations in ConfigurationModal:", translations);

  return (
    <div className='absolute flex w-screen h-screen bg-white z-30' style={{pointerEvents: "auto"}}>
      <div className='relative bg-white w-screen h-screen text-black'>
        <div className='flex w-full h-full'>
          <div className='flex flex-col min-w-96 z-30 p-6 shadow-sm'>
            <div className='flex items-end text-right justify-end'>
              <button onClick={() => handleClose()} className='cursor-pointer'>
                <img src={Close.src} alt='Close' />
              </button>
            </div>
            <div className='grow flex-col'>
              <div className='flex flex-col mb-8 gap-2'>
                <h1 className='neue-plak-wide text-bold text-xl'>{translation.title}</h1>
                <p className='lato-regular text-lg'>{translation.text}</p>
              </div>
            {!selectingMedyBox && !selectingMedyLocker ? (
              <>
              <div className='flex flex-col gap-8'>
                {/* MedyBox Selector*/}
                <div className='bg-glass-green border border-green-1 rounded cursor-pointer'
                 onClick={() => setSelectingMedyBox(true)}>
                  <div className='flex h-12 bg-glass-green-2 py-3 px-6 justify-between items-center'>
                    <h2 className='neue-plak-wide text-bold text-lg'>MedyBox</h2>
                    <img src={enterIcon.src} alt='Enter' className='w-6 h-6'/>
                  </div>
                  <div className=''>
                    {/* selected MedyBox */}
                    <div className='flex py-2 px-3 items-center'>
                      <div className='w-16 h-16'>
                      <img src={(getMedyBoxImage() as StaticImageData).src} alt='' className='h-16'/>
                      </div>
                      <p className='lato-bold text-md'>
                        {getMedyBoxName()}
                      </p>
                    </div>
                  </div>
                </div>
                {/* MedyLocker Selector*/}
                <div className='bg-glass-green border border-green-1 rounded cursor-pointer'
                 onClick={() => setSelectingMedyLocker(true)}>
                  <div className='flex h-12 bg-glass-green-2 py-3 px-6 justify-between items-center'>
                    <h2 className='neue-plak-wide text-bold text-lg'>MedyLocker</h2>
                    <img src={enterIcon.src} alt='Enter' className='w-6 h-6'/>
                  </div>
                  <div className=''>
                    {/* selected MedyLocker */}
                    <div className='flex py-2 px-3 items-center'>
                      <div className='w-16 h-16'>
                        <img src={(getMedyLockerImage() as StaticImageData).src} alt='' className='h-16'/>
                      </div>
                      <p className='lato-bold text-md'>
                        {getMedyLockerName()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ) : selectingMedyBox ? (
              <>
                <div className='flex flex-col gap-2 bg-glass-green border border-green-1 rounded pt-6 px-4 pb-4'>
                  <h1 className=''>MedyBox</h1>
                  <div className='grid gap-4'>
                    <div className='relative cursor-pointer' onClick={() => handleMedyBoxChange('C')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={mini.src} alt='' className='h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyBox === 'C' ? 'text-white' : ''}`}>Mini</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'C' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => handleMedyBoxChange('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medio.src} alt='' className='h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyBox === 'B' ? 'text-white' : ''}`}>Medio</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'B' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => handleMedyBoxChange('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={top.src} alt='' className='h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyBox === 'A' ? 'text-white' : ''}`}>Top</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'A' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>                  
                  </div>
                  <div>
                    <button onClick={() => handleMedyBoxChange('')}
                      className={`h-10 mt-6 w-full ${tempMedyBox === '' ? 'bg-green-3 text-white' : 'bg-glass-green-3 text-green-3'} rounded`}>
                      <div className='flex gap-2 justify-center'>
                      <img src={tempMedyBox === '' ? hidewhite.src : hide.src} alt='hide icon'></img>
                      <div className=''>{translation.hidemedybox}</div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : selectingMedyLocker ? (
              <>
                <div className='flex flex-col gap-2 bg-glass-green border border-green-1 rounded pt-6 px-4 pb-4'>
                  <h1 className=''>MedyLocker</h1>
                  <div className='grid gap-4'>
                    <div className='relative cursor-pointer' onClick={() => handleMedyLockerChange('C')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medylocker252.src} alt='' className='w-28 h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyLocker === 'C' ? 'text-white' : ''}`}>252</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'C' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => handleMedyLockerChange('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medylocker300.src} alt='' className='w-28 h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyLocker === 'B' ? 'text-white' : ''}`}>300</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'B' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => handleMedyLockerChange('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medylocker500.src} alt='' className='w-28 h-28 z-30'></img>
                        <p className={`z-30 ${tempMedyLocker === 'A' ? 'text-white' : ''}`}>500</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'A' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>                  
                  </div>
                  <div>
                    <button className={`h-10 mt-6 w-full ${tempMedyLocker === '' ? 'bg-green-3 text-white' : 'bg-glass-green-3 text-green-3'} rounded`}
                     onClick={() => handleMedyLockerChange('')}>
                      <div className='flex gap-2 justify-center'>
                        <img src={tempMedyLocker === '' ? hidewhite.src : hide.src} alt='hide icon'></img>
                        <div className=''>{translation.hidemedylocker}</div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (<></>)}

            </div>
            <div>
              { !selectingMedyBox && !selectingMedyLocker && !hasChanges ? (
                <button onClick={() => (handleConfirm(),onClose())} className='bg-green-1 text-green-3 w-full h-11 lato-semi-bold text-md uppercase'>
                  {translation.exit}
                </button>) : !selectingMedyBox && !selectingMedyLocker && hasChanges ? (
                <button onClick={() => (handleConfirm(),onClose())} className='bg-green-3 text-white w-full h-11 lato-semi-bold text-md uppercase'>
                  {translation.apply}
                </button>) : (
                <div className='flex justify-end'>
                <button className={`w-full h-11 lato-semi-bold text-md uppercase bg-green-3 text-white`}
                onClick={() => handleBackToSelection()}>
                  {translation.confirm}
                </button>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col grow bg-white z-30'>
            {/* Preview Image container - left side */}
            {tempMedyBox !== null && tempMedyLocker !== null && (
              <div className='flex w-full h-full grow overflow-hidden'>
                {/* <h1 className='absolute top-4'>{tempMedyBox}{tempMedyLocker} || {`${tempMedyBox}-${tempMedyLocker}`}</h1> */}
                <img src={getPreviewImage()} alt="Preview" className='object-cover w-full h-full scale-105' />
                {/* <img src={getImagePath()} alt="Preview" className='object-cover' /> */}
              </div>
            )}
            {showConfirmModal && (
              <div className='absolute flex w-screen h-screen z-30 top-0 left-0' style={{pointerEvents: "auto"}}>
                <div className='relative bg-opacity-30 bg-medy-black w-screen h-screen text-black'>
                  <div className='flex w-full h-full justify-center items-center'>
                    <div className='p-6 shadow-sm bg-white rounded w-80 flex flex-col gap-3'>
                      <h2 className='text-h4 neue-plak-wide text-green-4'>{translation.aystitle}</h2>
                      <p className='lato-regular text-medy-gray text-lg'>{translation.aystext}</p>
                      <div className='grid grid-cols-2 gap-4 w-full'>
                        <button className='text-green-3 lato-semi-bold p-3 uppercase text-base'
                          onClick={() => setShowConfirmModal(false)}>
                          {translation.ayscancel}
                        </button>
                        <button className='bg-green-3 p-3 lato-semi-bold uppercase text-base text-white'
                          onClick={handleConfirmClose}>
                          {translation.aysexit}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* div top right */}
        
          </div>
        <div className='h-full w-full absolute grid grid-rows-2 grid-cols-3 gap-4 p-5 overlay z-30'>
          <div className='row-start-1 col-start-3 text-right align-top gap-3 flex flex-col items-end'>
            <div className='flex flex-row-reverse'>
              {/* Pulsante Box informazioni scena selezionata */}
              <div className={`z-10 interactive cursor-pointer bg-white rounded h-14 w-14 ml-2 flex items-center 
              shadow-lg justify-center opacity-100'}`} 
              onClick={() => setIsBoxShown(!isBoxShown)}>
                {isBoxShown ? <img src={CloseButtonIcon.src}></img> : <img src={InfoIcon.src}></img>}
              </div>
              {/* Box informazioni scena selezionata */}
              {isBoxShown && (
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
              )}
            </div>
          </div> 
          </div>
        </div>
      </div>
    </div>
  );
}