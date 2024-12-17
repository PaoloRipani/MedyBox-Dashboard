import React, { useEffect, useState } from 'react';

import robotLeft from '../../public/left-loop.gif';
import robotBottom from '../../public/bottom-loop.gif';
import close from '../../public/close button icon grey.svg';

const OnboardingDialog = ({ step, onNext, onClose, translations }: any) => {
  const [dialogTransform, setDialogTransform] = useState({ x: 0, y: 0 });
  const [avatarTransform, setAvatarTransform] = useState({ x: 0, y: 0 });
  const [avatarSrc, setAvatarSrc] = useState(robotLeft); // Default avatar GIF

  useEffect(() => {
    const target = step.ref?.current;

    console.log('Step:', step);
    console.log('Target Ref:', target);

    let newDialogTransform = { x: 0, y: 0 };
    let newAvatarTransform = { x: 0, y: 0 };

    // Calculate dialog position
    if (target) {
      const rect = target.getBoundingClientRect();
      switch (step.position) {
        case 'left':
          newDialogTransform = { x: rect.left - 420, y: rect.top - 150 };
          break;
        case 'right':
          newDialogTransform = { x: rect.right + 20, y: rect.top };
          break;
        case 'top':
          newDialogTransform = { x: rect.left, y: rect.top - 120 };
          break;
        case 'bottom':
          newDialogTransform = { x: rect.left, y: rect.bottom + 20 };
          break;
        default:
          newDialogTransform = { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 };
      }
    } else {
      console.warn('Ref is null, applying fallback positions.');
      switch (step.position) {
        case 'center-left':
          newDialogTransform = { x: 40, y: window.innerHeight / 2 - 100 };
          break;
        case 'center':
          newDialogTransform = { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 100 };
          break;
        default:
          newDialogTransform = { x: 50, y: 50 };
      }
    }

    // Avatar positioning and GIF selection
    switch (step.avatarPosition) {
      case 'left':
        newAvatarTransform = { x: newDialogTransform.x - 40, y: newDialogTransform.y + 40 };
        setAvatarSrc(robotLeft); // Use left avatar GIF
        break;
      case 'bottom':
        newAvatarTransform = { x: newDialogTransform.x + 100, y: newDialogTransform.y + 260 };
        setAvatarSrc(robotBottom); // Use bottom avatar GIF
        break;
      default:
        newAvatarTransform = { x: newDialogTransform.x - 50, y: newDialogTransform.y };
        setAvatarSrc(robotLeft); // Default to left avatar GIF
    }

    console.log('New Dialog Transform:', newDialogTransform);
    console.log('New Avatar Transform:', newAvatarTransform);

    setDialogTransform(newDialogTransform);
    setAvatarTransform(newAvatarTransform);
  }, [step]);

  const handleNext = () => onNext();
  const handleClose = () => onClose();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Avatar */}
      <div
        className="avatar"
        style={{
          position: 'absolute',
          transform: `translate(${avatarTransform.x}px, ${avatarTransform.y}px)`,
          transition: 'transform 0.5s ease-in-out',
          zIndex: 1001,
          pointerEvents: 'auto',
        }}
      >
        <img
          src={avatarSrc.src}
          alt="avatar"
          className="h-40 w-40 object-contain"
        />
      </div>

      {/* Dialog */}
      <div
        className="dialog-box"
        style={{
          position: 'absolute',
          transform: `translate(${dialogTransform.x}px, ${dialogTransform.y}px)`,
          transition: 'transform 0.5s ease-in-out',
          zIndex: 1002,
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '1.5rem',
          maxWidth: '320px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          pointerEvents: 'auto',
        }}
      >
        <div className="dialog-content flex flex-col gap-2 text-black">
          <h4 className="neue-plak-wide text-h4 text-gray-900">
            {translations[step.index]?.title}
          </h4>
          <p className="text-lg lato-regular text-gray-800">
            {translations[step.index]?.text}
          </p>
          <div className="dialog-actions flex gap-3 mt-4">
            <button
              onClick={handleClose}
              className="text-green-3 lato-semi-bold flex-grow py-2 text-base uppercase"
            >
              {translations?.buttons?.done || 'Done'}
            </button>
            <button
              onClick={handleNext}
              className="bg-green-3 text-white lato-semi-bold flex-grow py-2 text-base uppercase"
            >
              {translations?.buttons?.next || 'Next'}
            </button>
          </div>
        </div>
        <button onClick={handleClose} className="absolute top-2 right-2">
          <img src={close.src} alt="close" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default OnboardingDialog;