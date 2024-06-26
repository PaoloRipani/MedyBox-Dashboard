import { useState } from 'react';
import sceneData from '../lib/sceneData.json';

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
import { StaticImageData } from 'next/image';

export default function ConfigurationModal({ 
  language, onProductChange, onClose, selectedMedyBox, selectedMedyLocker, setSelectedMedyBox, setSelectedMedyLocker }
  : { language: string, onProductChange: (product: string, model: string) => void, onClose: () => void, selectedMedyBox: any, 
    selectedMedyLocker: any, setSelectedMedyBox: (medyBox : string) => void, setSelectedMedyLocker: (medyLocker : string) => void }) {
  const [tempMedyBox, setTempMedyBox] = useState<string>(selectedMedyBox);
  const [tempMedyLocker, setTempMedyLocker] = useState<string>(selectedMedyLocker);
  const [selectingMedyBox, setSelectingMedyBox] = useState(false);
  const [selectingMedyLocker, setSelectingMedyLocker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const getMedyBoxImage = () => {
    switch(tempMedyBox) {
      case 'A': return top;
      case 'B': return medio;
      case 'C': return mini;
      default: return '-';
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

  const handleMedyBoxChange = (medyBox : string) => {
    setTempMedyBox(medyBox);
    setHasChanges(true);
  };

  const handleMedyLockerChange = (medyLocker : string) => {
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

  return (
    <div className='absolute flex w-screen h-screen bg-white z-20' style={{pointerEvents: "auto"}}>
      <div className='relative bg-white w-screen h-screen text-black'>
        <div className='flex w-full h-full'>
          <div className='flex flex-col w-96 z-20 p-6 shadow-sm'>
            <div className='flex items-end text-right justify-end'>
              <button onClick={() => handleClose()} className='cursor-pointer'>
                <img src={Close.src} alt='Close' />
              </button>
            </div>
            <div className='grow flex-col'>
              <div className='flex flex-col mb-8 gap-2'>
                <h1 className='neue-plak-wide text-bold text-xl'>Configuratore</h1>
                <p className='lato-regular text-lg'>Seleziona quale modello desideri configurare</p>
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
                        MedyBox {tempMedyBox}
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
                        MedyLocker {tempMedyLocker}
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
                        <img src={mini.src} alt='' className='h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyBox === 'C' ? 'text-white' : ''}`}>Mini</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'C' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => handleMedyBoxChange('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medio.src} alt='' className='h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyBox === 'B' ? 'text-white' : ''}`}>Medio</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'B' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => handleMedyBoxChange('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={top.src} alt='' className='h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyBox === 'A' ? 'text-white' : ''}`}>Top</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyBox === 'A' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>                  
                  </div>
                  <div>
                    <button onClick={() => handleMedyBoxChange('')}
                      className={`h-10 mt-6 w-full ${tempMedyBox === '' ? 'bg-green-3 text-white' : 'bg-glass-green-3 text-green-3'} rounded`}>
                      <div className='flex gap-2 justify-center'>
                      <img src={tempMedyBox === '' ? hidewhite.src : hide.src} alt='hide icon'></img>
                      <div className=''>Nascondi MedyBox</div>
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
                        <img src={medylocker252.src} alt='' className='w-28 h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyLocker === 'C' ? 'text-white' : ''}`}>252</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'C' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => handleMedyLockerChange('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medylocker300.src} alt='' className='w-28 h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyLocker === 'B' ? 'text-white' : ''}`}>300</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'B' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => handleMedyLockerChange('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medylocker500.src} alt='' className='w-28 h-28 z-20'></img>
                        <p className={`z-20 ${tempMedyLocker === 'A' ? 'text-white' : ''}`}>500</p>
                      </div>
                      <div className={`absolute top-0 mt-8 h-[calc(100%-32px)] w-full ${tempMedyLocker === 'A' ? 'bg-green-3' : 'bg-glass-green-3'} border border-green-1 rounded-s z-10`}></div>
                    </div>                  
                  </div>
                  <div>
                    <button className={`h-10 mt-6 w-full ${tempMedyLocker === '' ? 'bg-green-3 text-white' : 'bg-glass-green-3 text-green-3'} rounded`}
                     onClick={() => handleMedyLockerChange('')}>
                      <div className='flex gap-2 justify-center'>
                        <img src={tempMedyLocker === '' ? hidewhite.src : hide.src} alt='hide icon'></img>
                        <div className=''>Nascondi MedyLocker</div>
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
                  Esci dal configuratore
                </button>) : !selectingMedyBox && !selectingMedyLocker && hasChanges ? (
                <button onClick={() => (handleConfirm(),onClose())} className='bg-green-3 text-white w-full h-11 lato-semi-bold text-md uppercase'>
                  Applica
                </button>) : (
                <div className='flex justify-end'>
                <button className='bg-green-3 px-6 h-11 text-white'
                onClick={() => handleBackToSelection()}>
                  Conferma Selezione
                </button>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col grow bg-white z-20 p-6'>
            {tempMedyBox && tempMedyLocker && (
              <>
                <h1>{tempMedyBox}{tempMedyLocker} || {`${tempMedyBox}-${tempMedyLocker}`}</h1>
                <img src='' alt="Preview" />
              </>
            )}
            {showConfirmModal && (
              <div className='absolute flex w-screen h-screen z-20 top-0 left-0' style={{pointerEvents: "auto"}}>
                <div className='relative bg-opacity-30 bg-medy-black w-screen h-screen text-black'>
                  <div className='flex w-full h-full justify-center items-center'>
                    <div className='p-6 shadow-sm bg-white rounded w-80 flex flex-col gap-3'>
                      <h2 className='text-h4 neue-plak-wide text-green-4'>Vuoi uscire senza configurare?</h2>
                      <p className='lato-regular text-medy-gray text-lg'> Se esci perderai la configurazione appena impostata.</p>
                      <div className='grid grid-cols-2 gap-4 w-full'>
                        <button className='text-green-3 lato-semi-bold p-3 uppercase text-base'
                          onClick={() => setShowConfirmModal(false)}>
                          Annulla
                        </button>
                        <button className='bg-green-3 p-3 lato-semi-bold uppercase text-base text-white'
                          onClick={handleConfirmClose}>
                          Esci
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}