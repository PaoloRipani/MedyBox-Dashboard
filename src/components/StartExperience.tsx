import React from 'react';

function StartExperience({ videoSrc, onButtonClick }) {
  return (
    <div className="relative">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <button onClick={onButtonClick} className="p-4 bg-blue-500 text-white rounded">
          startExperience
        </button>
      </div>
    </div>
  );
}

export default StartExperience;