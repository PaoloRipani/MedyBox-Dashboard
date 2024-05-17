import React, { useState } from 'react';

export default function LanguageModal({ onLanguageChange, onClose }) {  
  const [showModal, setShowModal] = useState(false);

  const handleLanguageClick = (language: string) => {
    onLanguageChange(language);
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Change Language</button>
      {showModal && (
        <div className="modal">
          <div onClick={() => handleLanguageClick('it')}>Italian</div>
          <div onClick={() => handleLanguageClick('en')}>English</div>
          <div onClick={() => handleLanguageClick('de')}>German</div>
          <div onClick={() => handleLanguageClick('fr')}>French</div>
          <div onClick={() => handleLanguageClick('es')}>Spanish</div>
        </div>
      )}
    </div>
  );
};
