import React from "react";
// import component to make QR codes from URLs
import CloseIcon from '../../public/close button icon grey.svg'

export default function ARModal({ arUrl, onClose }) {
    
    return(
    <div className="flex justify-center h-full w-full bg-black bg-opacity-35" 
    style={{pointerEvents: "auto"}}>
        <div className="relative m-auto left-auto right-auto z-20 max-w-80 min-h-64 flex flex-col 
        p-8
        items-center rounded bg-white text-medy-black">
            <h2 className="neue-plak-wide mb-2 text-green-4 text-[20px]">Visualizza il modello in Realtà Aumentata</h2>
            <img className="absolute right-4 top-4 w-6 h-6 cursor-pointer" src={CloseIcon.src} onClick={onClose} />
            <p className="lato-regular mb-6 text-medy-gray text-lg">Scansiona il QR code con il tuo telefono per attivare la realtà aumentata!</p>
            <a href={arUrl}>QR IMAGE</a>
        </div>
    </div>
    )
}