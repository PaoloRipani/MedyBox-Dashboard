import React, { useState } from 'react';
import Logo from '../../public/Medybox Start Experience Temp 1.svg';

function StartExperience({ videoSrc, onButtonClick } : any) {
  const [showSecondGif, setShowSecondGif] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setShowSecondGif(true); // Change GIF instantly
    setButtonDisabled(true); // Disable the button to prevent multiple clicks

    // Delay the sliding transition in index.tsx
    setTimeout(() => {
      onButtonClick(); // Trigger slide-up in parent after 500ms
    }, 1000);
  };

  return (
<div className="relative h-full w-full flex items-center">
      {/* Background Overlay */}
      <div className="bg-opacity-65 bg-green-4 h-full w-full z-10">
        <video autoPlay loop muted className="absolute w-full 
          h-full object-cover mix-blend-luminosity opacity-30">
          <source src="./videointroduttivo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* GIFs */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className='w-4/6'>
        {!showSecondGif ? (
          <img
            src="./inizio-intro.gif"
            alt="Phase 1 animation"
            className="mix-blend-multiply w-full h-full object-contain transition-all duration-500 ease-in-out"
          />
        ) : (
          <img
            src="./fine-intro.gif"
            alt="Phase 2 animation"
            className="mix-blend-multiply w-full h-full object-contain transition-all duration-500 ease-in-out"
          />
        )}
      </div>
      </div>

      {/* Start Button */}
      {!showSecondGif && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-30 mt-56"
        >
          <button
            className={`bg-green-3 text-white py-2.5 px-5 flex gap-1.5 uppercase lato-semi-bold text-base ${
              buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleButtonClick}
            disabled={buttonDisabled} // Prevent multiple clicks
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default StartExperience;