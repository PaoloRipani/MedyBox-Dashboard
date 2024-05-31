import { useState } from 'react';
import sceneData from '../lib/sceneData.json';

import Close from '../../public/material-symbols_close.svg'
import enterIcon from '../../public/enter chevron icon.svg'
import top from '../../public/medybox-top.png'
import medio from '../../public/medybox-medio.png'
import mini from '../../public/medybox-mini.png'

export default function ConfigurationModal({ language, onProductChange, onClose }) {
  const [selectedMedyBox, setSelectedMedyBox] = useState<string>('');
  const [selectedMedyLocker, setSelectedMedyLocker] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectingMedyBox, setSelectingMedyBox] = useState(false);
  const [selectingMedyLocker, setSelectingMedyLocker] = useState(false);
  const [tempMedyBox, setTempMedyBox] = useState<string>(selectedMedyBox);
  const [tempMedyLocker, setTempMedyLocker] = useState<string>(selectedMedyLocker);

  const handleMedyBoxChange = (medyBox) => {
    setTempMedyBox(medyBox);
  };

  const handleMedyLockerChange = (medyLocker) => {
    setTempMedyLocker(medyLocker);
  };

  const handleConfirm = () => {
    setSelectedMedyBox(tempMedyBox);
    setSelectedMedyLocker(tempMedyLocker);
    setSelectedProduct(`${tempMedyBox}-${tempMedyLocker}`);
    setSelectingMedyBox(false);
    setSelectingMedyLocker(false);
  };

  const products = Object.keys(sceneData);

  const key = `${selectedMedyBox}-${selectedMedyLocker}`;

  const medyBoxes = Object.keys(sceneData).filter(key => key.startsWith('MedyBox'));
  const medyLockers = Object.keys(sceneData).filter(key => key.startsWith('MedyLocker'));

  const previewUrlMedyBox = sceneData[tempMedyBox]?.previewUrl || '/path/to/defaultPreview.png';
  const dimensionsMedyBox = sceneData[tempMedyBox]?.dimensions || 'No dimensions available';

  const previewUrlMedyLocker = sceneData[tempMedyLocker]?.previewUrl || '/path/to/defaultPreview.png';
  const dimensionsMedyLocker = sceneData[tempMedyLocker]?.dimensions || 'No dimensions available';

  return (
    <div className='absolute flex w-screen h-screen bg-white z-20'>
      <div className='relative bg-white w-screen h-screen text-black'>
        <div className='flex w-full h-full'>
          <div className='flex flex-col w-96 z-20 p-6 shadow-sm'>
            <div className='flex items-end text-right justify-end'>
              <button onClick={onClose}>
                <img src={Close.src} alt='Close' />
              </button>
            </div>
            <div className='grow flex-col'>
              <div className='flex flex-col mb-8 gap-2'>
                <h1>Configuratore</h1>
                <p>Seleziona quale modello desideri configurare</p>
              </div>
            {!selectingMedyBox && !selectingMedyLocker ? (
              <>
              <div className='flex flex-col gap-8'>
                {/* MedyBox Selector*/}
                <div className='bg-glass-green border border-green-1 rounded cursor-pointer'
                 onClick={() => setSelectingMedyBox(true)}>
                  <div className='flex h-12 bg-glass-green-2 py-3 px-6 justify-between'>
                    <h2>MedyBox</h2>
                    <img src={enterIcon.src} alt='Enter' className='w-6 h-6'/>
                  </div>
                  <div className=''>
                    {/* selected MedyBox */}
                    <div className='flex py-2 px-3 items-center'>
                      <div>
                        <img src='' alt='' className='w-16 h-16'/>
                      </div>
                      <p>
                        MedyBox A
                      </p>
                    </div>
                  </div>
                </div>
                {/* MedyLocker Selector*/}
                <div className='bg-glass-green border border-green-1 rounded cursor-pointer'
                 onClick={() => setSelectingMedyLocker(true)}>
                  <div className='flex h-12 bg-glass-green-2 py-3 px-6 justify-between'>
                    <h2>MedyLocker</h2>
                    <img src={enterIcon.src} alt='Enter' className='w-6 h-6'/>
                  </div>
                  <div className=''>
                    {/* selected MedyLocker */}
                    <div className='flex py-2 px-3 items-center'>
                      <div>
                        <img src='' alt='' className='w-16 h-16'/>
                      </div>
                      <p>
                        MedyLocker A
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
                    <div className='relative cursor-pointer' onClick={() => setTempMedyBox('C')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={mini.src} alt='' className='h-28 z-20'></img>
                        <p className='z-20'>Mini</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => setTempMedyBox('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={medio.src} alt='' className='h-28 z-20'></img>
                        <p className='z-20'>Medio</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => setTempMedyBox('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src={top.src} alt='' className='h-28 z-20'></img>
                        <p className='z-20'>Top</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>                  
                  </div>
                  <div>
                    <button onClick={() => setTempMedyBox('')}
                      className='h-10 mt-6 w-full bg-glass-green-3 text-green-3'>
                      Nascondi MedyBox
                    </button>
                  </div>
                </div>
              </>
            ) : selectingMedyLocker ? (
              <>
                <div className='flex flex-col gap-2 bg-glass-green border border-green-1 rounded- pt-6 px-4 pb-4'>
                  <h1 className=''>MedyLocker</h1>
                  <div className='grid gap-4'>
                    <div className='relative cursor-pointer' onClick={() => setTempMedyLocker('A')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src='' alt='' className='w-28 h-28 z-20'></img>
                        <p className='z-20'>300</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>
                    <div className='relative cursor-pointer' onClick={() => setTempMedyLocker('B')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src='' alt='' className='w-28 h-28 z-20'></img>
                        <p className='z-20'>400</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>
                    <div className='relative col-span-2 cursor-pointer' onClick={() => setTempMedyLocker('C')}>
                      <div className='p-3 flex flex-col text-center items-center'>
                        <img src='' alt='' className='w-28 h-28 z-20'></img>
                        <p className='z-20'>500</p>
                      </div>
                      <div className='absolute top-0 mt-8 h-[calc(100%-32px)] w-full bg-glass-green-3 border border-green-1 rounded-s z-10'></div>
                    </div>                  
                  </div>
                  <div>
                    <button className='h-10 mt-6 w-full bg-glass-green-3 text-green-3'
                     onClick={() => setTempMedyLocker('')}>Nascondi MedyLocker
                    </button>
                  </div>
                </div>
              </>
            ) : (<></>)}

            </div>
            <div>
              { !selectingMedyBox && !selectingMedyLocker ? (
                <button onClick={onClose} className='bg-green-1 text-green-3 w-full h-11'>
                  Esci dal configuratore
                </button>) : (
                <div className='flex justify-end'>
                <button className='bg-green-3 px-6 h-11 text-white'
                onClick={() => (setSelectingMedyBox(false),setSelectingMedyLocker(false),handleConfirm())}>
                  Conferma
                </button>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col grow bg-white z-20 p-6'>
            {selectedProduct && (
              <>
                <h1>{selectedMedyBox || ''}{selectedMedyLocker || ''} || {selectedProduct}</h1>
                <img src='' alt="Preview" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}