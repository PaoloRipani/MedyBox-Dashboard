import React, { useState } from 'react';

export default function MediaModal ({ mediaType, mediaSrc, onClose } : any) {
    return(
  <div className="fixed inset-0 z-30 flex items-center justify-center"
    style={{pointerEvents: "auto"}}>
    {mediaType === 'image' && <img src={mediaSrc} alt="" className="w-full h-full object-cover" />}
    {mediaType === 'video' && <video src={mediaSrc} className="w-full h-full object-cover bg-black" autoPlay loop />}
    <button onClick={onClose} className="absolute top-0 right-0 m-4">Close</button>
  </div>
    );
}