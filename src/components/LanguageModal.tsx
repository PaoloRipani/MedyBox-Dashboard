import React, { useState } from 'react';

import italianLogo from '../../public/italian-logo.png'

export default function LanguageModal({ onLanguageChange, onClose }) {  
  const [showModal, setShowModal] = useState(false);

  const handleLanguageClick = (language: string) => {
    onLanguageChange(language);
    onClose();
  };

  return (
    <div className='bg-white w-screen h-screen absolute top-0 z-20'>
      <div className='relative flex flex-col w-full h-full justify-center items-center px-28 py-16'>
        <h1 className='text-green-500 text-center neue-plak-wide text-7xl'>Change Language</h1>
        <div className="grid grid-cols-1 grid-rows-2 gap-y-14 w-full h-full">
          <div className='flex w-full gap-x-10 justify-center'>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green" 
              onClick={() => handleLanguageClick('it')}>
              <img src={italianLogo.src} alt='icon' className='h-full m-auto mix-blend-multiply'/>
              <h4 className='neue-plak-wide text-xl'>Italian</h4>
            </div>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green" 
              onClick={() => handleLanguageClick('en')}>
              <img src="" alt='icon' className='w-10 h-10 m-auto'/>
              <h4 className='neue-plak-wide text-xl'>English</h4>
            </div>
              <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green" 
              onClick={() => handleLanguageClick('de')}>
              <img src="" alt='icon' className='w-10 h-10 m-auto'/>
              <h4 className='neue-plak-wide text-xl'>German</h4>
            </div>
          </div>
          <div className='flex w-full gap-x-10 justify-center'>
            <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green" 
              onClick={() => handleLanguageClick('fr')}>
              <img src="" alt='icon' className='w-10 h-10 m-auto'/>
              <h4 className='neue-plak-wide text-xl'>French</h4>
            </div>
              <div className="max-w-72 flex flex-col rounded border border-green-1 text-green-4 text-center cursor-pointer bg-glass-green" 
              onClick={() => handleLanguageClick('es')}>
              <img src="" alt='icon' className='w-10 h-10 m-auto'/>
              <h4 className='neue-plak-wide text-xl'>Spanish</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
