import React from "react";
import { useQRCode } from 'next-qrcode';
import CloseIcon from '../../public/close button icon grey.svg'
import { getRedirectError } from "next/dist/client/components/redirect";

export default function ARModal( {arUrl, onClose, translations}: any) {
    const { Canvas } = useQRCode();
    console.log("translations in AR modal", translations)
    return(
    <div className="flex justify-center h-full w-full bg-black bg-opacity-35" 
    style={{pointerEvents: "auto"}}>
        <div className="relative m-auto left-auto right-auto z-20 max-w-80 min-h-64 flex flex-col 
        p-8
        items-center rounded bg-white text-medy-black">
            <h2 className="neue-plak-wide mb-2 text-green-4 text-[20px]">{translations.artitle}</h2>
            <img className="absolute right-4 top-4 w-6 h-6 cursor-pointer" src={CloseIcon.src} onClick={onClose} />
            <p className="lato-regular mb-6 text-medy-gray text-lg">{translations.artext}</p>
            <div className="rounded overflow-hidden border-glass-green border-solid border">
            <Canvas
                text={arUrl}
                options={{
                    errorCorrectionLevel: 'M',
                    margin: 3,
                    scale: 4,
                    width: 240,
                    color: {
                    dark: '#038667',
                    light: '#C9ECE33D',
                    },
                }}
                />
            </div>
        </div>
    </div>
    )
}