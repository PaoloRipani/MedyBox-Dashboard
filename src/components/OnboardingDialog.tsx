import React, { useEffect, useState } from 'react';

import robot from '../../public/robot onboarding.svg'
import close from '../../public/close button icon grey.svg'

const OnboardingDialog = ({ step, onNext, onClose, translations } : any) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [avatarPosition, setAvatarPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        console.log('Current step:', step);
        console.log('Current translations:', translations);
        const target = step.ref.current;

        if (target) {
            const rect = target.getBoundingClientRect();
            console.log("rect: ", rect);
            let newPosition = { top: 0, left: 0 };

            switch (step.position) {
            case 'left':
                newPosition = {
                top: rect.top + window.scrollY - 136,
                left: rect.left + window.scrollX - 336,
                };
                break;
            case 'right':
                newPosition = {
                top: rect.top + window.scrollY,
                left: rect.right + window.scrollX + 20,
                };
                break;
            case 'top':
                newPosition = {
                top: rect.top + window.scrollY - 100,
                left: rect.left + window.scrollX,
                };
                break;
            case 'bottom':
                newPosition = {
                top: rect.bottom + window.scrollY + 20,
                left: rect.left + window.scrollX,
                };
                break;
            case 'center-left':
                newPosition = {
                top: (window.scrollY / 2) + 20,
                left: -250,
                };
                break;
            default:
                newPosition = {
                top: window.innerHeight / 2 - 100,
                left: window.innerWidth / 2 - 150,
                };
                break;
            }

            setPosition(newPosition);
            setAvatarPosition(getAvatarPosition(newPosition, step.avatarPosition));
        } else {

          let newPosition = { top: 0, left: 0 };

          switch (step.position) {
            case 'left':
                newPosition = {
                top: window.innerHeight - 96,
                left: window.innerWidth - 336,
                };
                break;
            case 'right':
                newPosition = {
                top: window.innerHeight,
                left: window.innerWidth + 20,
                };
                break;
            case 'top':
                newPosition = {
                top: window.innerHeight - 100,
                left: window.innerWidth,
                };
                break;
            case 'bottom':
                newPosition = {
                top: window.innerHeight + 20,
                left: window.innerWidth,
                };
                break;
            case 'center-left':
                newPosition = {
                top: (window.innerHeight / 2) - 120,
                left: 20,
                };
                break;
            default:
                newPosition = {
                top: window.innerHeight / 2 - 100,
                left: window.innerWidth / 2 - 150,
                };
                break;
            }
            setPosition(newPosition);
            setAvatarPosition(getAvatarPosition(newPosition, step.avatarPosition));
        }
    }, [step]);

    const getAvatarPosition = (dialogPosition : any, avatarPosition : string) => {
      console.info("positions avatar dialog: ", avatarPosition, dialogPosition);
        switch (avatarPosition) {
            case 'left':
                return { top: -32, left: -128 };
            case 'right':
                return { top: dialogPosition.top, left: dialogPosition.left + 336 };
            case 'top':
                return { top: dialogPosition.top - 128, left: dialogPosition.left };
            case 'bottom':
                return { top: 240, left: 24 };
            case 'center-left':
                return { top: 0, left: -128 };
            default:
                return { top: 0, left: 0 };
        }
    };

    const handleNext = () => {
        onNext();
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div style={{ position: 'absolute', top: position.top, left: position.left, transition: 'transform 0.3s ease' }}>
          <div className="avatar h-40 w-40" style={{ position: 'absolute', zIndex: 1001, top: avatarPosition.top, left: avatarPosition.left, transition: 'top 0.3s ease, left 0.3s ease' }}>
            <img src={robot.src} alt="robot" />
          </div>
          <div className="pt-8 px-6 pb-6 text-black bg-white rounded-lg max-w-80" style={{ zIndex: 1002, transition: 'top 0.3s ease, left 0.3s ease' }}>
            <div className="dialog-content flex flex-col gap-2">
              <h4 className='neue-plak-wide text-h4'>{translations[step.index].title}</h4>
              <p className='text-lg lato-regular'>{translations[step.index].text}</p>
              <div className="dialog-actions w-full flex gap-3 mt-2">
                <button onClick={handleClose} 
                className='text-green-3 lato-semi-bold flex-grow py-3 text-base uppercase'>
                  {translations['buttons'].done}</button>
                <button onClick={handleNext} 
                className='bg-green-3 text-white lato-semi-bold flex-grow py-3 text-base uppercase'>
                  {translations['buttons'].next}</button>
              </div>
              <button onClick={handleClose} className="close-button">
                <img src={close.src} alt="close" />
              </button>
            </div>
          </div>
        </div>
      );
};

export default OnboardingDialog;
