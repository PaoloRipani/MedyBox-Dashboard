import React from 'react';
import Logo from '../../public/Medybox Start Experience Temp 1.svg';


function StartExperience({ videoSrc, onButtonClick } : any) {
  return (
    <div className="relative h-full w-full flex items-center">
      <div className='bg-opacity-65 bg-black h-full w-full z-10'></div>
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src={videoSrc.src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="z-20">
          <img src={Logo.src} alt="MedyBox"/>
        </div>
        <button onClick={onButtonClick} className="p-4 bg-blue-500 text-white rounded z-20">
          Inizia Esperienza
        </button>
      </div>
    </div>
  );
}

export default StartExperience;