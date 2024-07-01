import React, { useState } from 'react';

import italianLogo from '../../public/italian-logo.svg'
import frenchLogo from '../../public/french-logo.svg'
import spanishLogo from '../../public/spanish-logo.svg'
import germanLogo from '../../public/german-logo.svg'
import englishLogo from '../../public/english-logo.svg'
import logo from '../../public/MedyBOX Logo 2.svg'

export default function LanguageModal({ onLanguageChange, onClose } : any) {  
  const [showModal, setShowModal] = useState(false);

  const handleLanguageClick = (language: string) => {
    onLanguageChange(language);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className='bg-white w-screen h-screen absolute top-0 z-20'
        style={{pointerEvents: "auto"}}>
      <div className='relative flex flex-col w-full h-full justify-center items-center px-28 py-16 gap-6'>
        <div className='absolute top-2 left-2 h-20'>
          <img src={logo.src} alt='logo' className='h-20'/>
        </div>
        <h1 className='text-medy-black text-center neue-plak-wide text-7xl neue-plak-wide'>
          Scegli la <b className='text-green-3'>lingua</b>
        </h1>
        <div className="grid grid-cols-1 grid-rows-2 gap-y-14 w-full h-full"
        style={{pointerEvents: "auto"}}>
          <div className='flex w-full gap-x-10 justify-center'>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green z-20 p-3" 
              onClick={() => handleLanguageClick('it')}>
              <img src={italianLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-h4 uppercase'>Italiano</h4>
            </div>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-3" 
              onClick={() => handleLanguageClick('fr')}>
              <img src={germanLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-h4 uppercase'>Français</h4>
            </div>
              <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-3" 
              onClick={() => handleLanguageClick('de')}>
              <img src={spanishLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-h4 uppercase'>Deutsch</h4>
            </div>
          </div>
          <div className='flex w-full gap-x-10 justify-center'>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-3" 
              onClick={() => handleLanguageClick('es')}>
              <img src={englishLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-h4 uppercase'>Español</h4>
            </div>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green p-3" 
              onClick={() => handleLanguageClick('en')}>
              <img src={frenchLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-h4 uppercase'>English</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
