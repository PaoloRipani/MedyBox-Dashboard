import React from 'react';
import Logo from '../../public/Medybox Start Experience Temp 1.svg';

function StartExperience({ videoSrc, onButtonClick } : any) {
  return (
    <div className="relative h-full w-full flex items-center">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="">
          <img src={Logo.src} alt="MedyBox"/>
        </div>
        <button onClick={onButtonClick} className="p-4 bg-blue-500 text-white rounded">
          Inizia Esperienza
        </button>
      </div>
    </div>
  );
}

export default StartExperience;