import React from 'react';
import Logo from '../../public/Medybox Start Experience Temp 1.svg';

function StartExperience({ videoSrc, onButtonClick } : any) {
  return (
    <div className="relative h-full w-full flex items-center">
      <div className='bg-opacity-65 bg-green-4 h-full w-full z-10'></div>
      <video autoPlay loop muted className="absolute w-full h-full object-cover mix-blend-luminosity opacity-30">
        <source src="./videointroduttivo.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="z-20">
          {/* <img src={Logo.src} alt="MedyBox"/> */}
          <img src="./Medybox-black.gif" alt="animation gif" className='mix-blend-multiply'/>
        </div>
        <div className='bg-green-3 text-white py-2.5 px-5 flex gap-1.5 cursor-pointer uppercase 
        lato-semi-bold text-base z-20'
        onClick={onButtonClick}>
          Inizia Esperienza
        </div>
      </div>
    </div>
  );
}

export default StartExperience;