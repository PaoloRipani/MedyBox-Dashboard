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
          <div onClick={() => handleLanguageClick('Italian')}>Italian</div>
          <div onClick={() => handleLanguageClick('English')}>English</div>
          <div onClick={() => handleLanguageClick('German')}>German</div>
          <div onClick={() => handleLanguageClick('French')}>French</div>
        </div>
      )}
    </div>
  );
};
