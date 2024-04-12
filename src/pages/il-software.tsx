import { useState, useEffect } from 'react';
import Link from 'next/link'
import { fetchIlSoftwareACF, fetchModuliACF, fetchFunzionalitaPrincipaliACF } from '../lib/api'
import Layout from '../app/layout'
import '../app/globals.css'
import '../app/globals.scss'

import play from '../../public/Play.svg'
import close from '../../public/material-symbols_close.svg'
import decorazione2 from '../../public/elemento-decorativo-ilsoftware-1.svg'
import decorazione3 from '../../public/elemento-decorativo-ilsoftware-mobile-1.svg'

export default function IlSoftware() {
type AcfData = {
    [key: string]: any;
};
type moduliData = {
    [key: string]: any;
};

type funzionalitaData = {
    [key: string]: any;
};

type ModuleType = {
    moduloAcf?: {
        titolo?: string;
        descrizioneModulo?: string;
        immagineOVideo?: string[];
        immagine?: {
            node: {
                link?: string;
            };
        };
        popupIcon?: {
            node: {
                link?: string;
            };
        };
        icon?: {
            node: {
                link?: string;
            };
        };
        video?: {
            node: {
                link?: string;
            };
        };
    }
};

function applyColorToApostrophes(text: string) {
    return text.replace(/'([^']*)'/g, "<span style='color: #F59D21;'>$1</span>");
}
    
const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
const [acf, setAcf] = useState<AcfData>({});
const [moduli, setModuli] = useState<moduliData>([]);
const [funzionalita, setFunzionalita] = useState<funzionalitaData>([]);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [isModalLarge, setIsModalLarge] = useState(false);

const handleModuleClick = (module : any) => {
    setSelectedModule(module);
}

useEffect(() => {
    const fetchData = async () => {
        try {
            const resFetchIlSoftwareACF = await fetchIlSoftwareACF();
            resFetchIlSoftwareACF.heroTitle = applyColorToApostrophes(resFetchIlSoftwareACF.heroTitle);
            resFetchIlSoftwareACF.scopriIModuliTitle = applyColorToApostrophes(resFetchIlSoftwareACF.scopriIModuliTitle);
            resFetchIlSoftwareACF.vantaggiTitle = applyColorToApostrophes(resFetchIlSoftwareACF.vantaggiTitle);
            resFetchIlSoftwareACF.funzionalitaPrincipaliTitle = applyColorToApostrophes(resFetchIlSoftwareACF.funzionalitaPrincipaliTitle);
            resFetchIlSoftwareACF.vuoiApprofondireTitle = applyColorToApostrophes(resFetchIlSoftwareACF.vuoiApprofondireTitle);
            setAcf(resFetchIlSoftwareACF);

            const resFetchModuliACF = await fetchModuliACF();
            setModuli(resFetchModuliACF);

            const resFetchFunzionalitaPrincipaliACF = await fetchFunzionalitaPrincipaliACF()
            console.log(resFetchFunzionalitaPrincipaliACF);
            setFunzionalita(resFetchFunzionalitaPrincipaliACF);
        } catch (err) {
            console.error(err);
        }
    }

    fetchData().then(() => {
        console.log("loaded")
        console.log("funzionalita",funzionalita)
    })
}, [])

return (
    <>
    <Layout>
        <>
            {/* First Section - Scopri il software */}
            {/* 3 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[480px] bg-black relative p-6'>
                    <div className='absolute inset-0 object-cover overflow-hidden flex items-center justify-center'>
                        {acf?.heroImage && (<img className='object-cover h-full w-full' src={acf.heroImage?.node?.link} alt="heroimage" />)}
                        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#000000b6] to-transparent from-30% '></div>
                    </div>
                <div className='w-full max-w-[1106px] z-10'>
                    <div className='flex flex-col items-start'>
                    <h2 className='lg:text-h1 text-h1m text-white' 
                        dangerouslySetInnerHTML={{ __html: acf.heroTitle }}></h2>
                    <p className='nunito lg:text-h4 text-m text-grey-1' 
                        dangerouslySetInnerHTML={{ __html: acf.heroDescription }}></p>
                    <Link href=''>
                        <div className="border-0 text-white flex justify-start
                        h-10 relative mt-6">
                        <button type="submit" className='w-44 pr-2 flex items-center justify-center cursor-pointer '>
                            <svg width="184" height="40" className='absolute z-0 left-0'>
                                <path d="M0,0 h168 l16,20 l-16,20 h-168z" fill="#ef7923" />
                            </svg>
                            <span className='z-20 leading-tight secular' 
                            dangerouslySetInnerHTML={{ __html: acf.heroButtonText }}></span>
                        </button>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Second Section - i vantaggi di Gesiqa */}
            {/* 3 Elementi in verticale. L'ultimo ha una griglia a 4 colonne che diventa 
            a 2 colonne in mobile*/}
            <div className='flex w-full items-center justify-center min-h-[520px] pt-20 bg-grey-1 px-6 border-b-[80px] border-grey-1 relative'>
                <div className='absolute w-full items-center justify-center self-end'>
                    <div className='absolute w-full flex items-center justify-center'>{/* elemento decorativo a dx */}
                        <img src={decorazione3.src} alt='decorative-element' className='z-[21] -mt-32'/>
                    </div>
                </div> 
                <div className='max-w-[1106px] relative z-[22]'>
                    <div className='grid grid-cols-1 gap-6'>
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='flex flex-col gap-2'>
                        <h1 className='lg:text-h1 text-h1m text-gs-black'
                            dangerouslySetInnerHTML={{ __html: acf.vantaggiTitle }}>
                        </h1>
                        <p className='nunito text-grey-4 lg:text-l text-m font-semibold'
                            dangerouslySetInnerHTML={{ __html: acf.vantaggiDescription }}>
                        </p>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-4 grid-cols-2 gap-6 justify-items-center'>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl min-w-40 max-w-64 rounded'>
                            <div className='h-16 w-16'>
                                {acf?.vantaggi1stElementIcon && (<img src={acf?.vantaggi1stElementIcon?.node?.link} alt="1sticon" />) }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black min-h-6' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-m min-h-6' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl min-w-40 max-w-64 rounded'>
                            <div className='h-16 w-16'>
                            {acf?.vantaggi2ndElementIcon && (<img src={acf.vantaggi2ndElementIcon?.node?.link} alt="2ndicon" />) }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-m' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl min-w-40 max-w-64 rounded'>
                            <div className='h-16 w-16'>
                            {acf?.vantaggi3rdElementIcon && (<img src={acf.vantaggi3rdElementIcon?.node?.link} alt="3rdicon" />) }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-m' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl min-w-40 max-w-64 rounded'>
                            <div className='h-16 w-16'>
                            {acf?.vantaggi4thElementIcon && (<img src={acf.vantaggi4thElementIcon?.node?.link} alt="4thicon" />) }
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-m' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementDescription }}></p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Third Section - funzionalità principali */}
            {/* 3 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[400px] pt-20 bg-gs-white z-20 relative p-6'>
                <div className='max-w-[1106px] w-full'>
                    <div className='flex flex-col items-start lg:w-1/2'>
                        <h1 className='lg:text-h1 text-h1m text-gs-black mb-8'
                        dangerouslySetInnerHTML={{ __html: acf.funzionalitaPrincipaliTitle }}>
                        </h1>
                    </div>
                    <div className='grid lg:grid-cols-2 grid-cols-1 w-full py-10 lg:px-16 px-4 bg-white gap-x-6 gap-y-4 drop-shadow-xl rounded -mb-20 z-20'>
                    { funzionalita && funzionalita.map((item : funzionalitaData, index : number) => (
                        <div key={index} className='flex gap-4 items-center'>
                            <div className='h-10 w-10'>
                                <img src={item.funzionalitaPrincipaliAcf?.icon?.node?.link} alt="icon" />
                            </div>
                            <p className='nunito text-gs-black'
                            dangerouslySetInnerHTML={{ __html: item.funzionalitaPrincipaliAcf?.name}}>
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* Fourth Section - vuoi approfondire */}
            {/* 2 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[400px] bg-black pt-20 relative z-0 p-6'>
                    <div className='absolute inset-0 object-cover overflow-hidden flex items-center justify-center'>
                        <img className='object-cover h-full w-full' src={acf.vuoiApprofondireImage?.node?.link} alt="vuoiapprofondireimage" />
                        <div className='absolute inset-0 bg-black bg-opacity-30'></div>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#000000b6] to-transparent from-30% '></div>
                    </div>
                <div className='w-full max-w-[1106px] items-center z-10'>
                    <div className='flex flex-col items-start'>
                    <h2 className='text-h2'
                    dangerouslySetInnerHTML={{ __html: acf.vuoiApprofondireTitle}}>
                    </h2>
                    <Link href=''>
                        <div className="border-0 text-white flex justify-start
                        h-10 relative mt-6">
                        <button type="submit" className='w-44 pr-2 flex items-center justify-center cursor-pointer '>
                            <svg width="184" height="40" className='absolute z-0 left-0'>
                                <path d="M0,0 h168 l16,20 l-16,20 h-168z" fill="#ef7923" />
                            </svg>
                            <span className='z-20 leading-button secular' 
                            dangerouslySetInnerHTML={{ __html: acf.vuoiApprofondireButtonText }}></span>
                        </button>
                        </div>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Fifth Section - scopri i moduli */}
            <div className='flex w-full items-center justify-center min-h-[400px] pt-20 pb-32 bg-gs-white p-6'>
                <div className='max-w-[1106px]'>
                    <div className='mb-8 flex flex-col gap-2'>
                        <h1 className='lg:text-h1 text-h1m text-gs-black'
                        dangerouslySetInnerHTML={{ __html: acf.scopriIModuliTitle}}>
                        </h1>
                        <p className='nunito text-grey-4 lg:text-l text-m'
                        dangerouslySetInnerHTML={{ __html: acf.scopriIModuliDescription}}>
                        </p>
                    </div>
                    <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 relative'>
                    { moduli && moduli.map((item : moduliData, index : number) => (
                        <div key={index} className='text-gs-black bg-white shadow-lg px-8 py-6 flex flex-col h-full lg:items-start items-center'>
                            <div className='h-14 w-14 mb-4 flex items-center justify-center'>
                                <img src={item?.moduloAcf?.icon?.node?.link} alt="icon" />
                            </div>
                            <h4 className='nunito grow font-bold text-category text-black'
                            dangerouslySetInnerHTML={{ __html: item?.moduloAcf?.titolo}}>
                            </h4>
                            <div>
                                <button className="px-8 py-1.5 border-yellow-3 border-2 text-yellow-3 hover:bg-yellow-3 hover:text-white
                                text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3"
                                onClick={() => handleModuleClick(item)} >
                                Dettagli
                                </button>
                            </div>
                        </div>
                    ))}
                    </div> 
                </div>
            </div>
        </>
    </Layout>
    {selectedModule && (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40' onClick={() => {setSelectedModule(null); setIsModalLarge(false); setIsVideoPlaying(false)}}>
        <div className={`modal bg-white m-8 max-h-[calc(100vh-96px)] ${isModalLarge ? 'max-w-[calc(100vw - 96px)]' : 'max-w-96 sm:max-w-[480px]'}`} 
            onClick={e => e.stopPropagation()}>
            <div className='lg:min-h-96 h-full relative'>
                <div className={` relative ${!isModalLarge ? 'aspect-video' : 'w-full h-full'}`}>
                    {selectedModule?.moduloAcf?.immagineOVideo?.[0] === 'Immagine' && (
                        <div className='absolute inset-0'>
                            <img className='object-cover h-full w-full' src={selectedModule?.moduloAcf?.immagine?.node?.link ?? ''} alt='' />
                            <button className='absolute top-0 right-0 m-2 p-2 z-50 hover:bg-white hover:bg-opacity-20 rounded-full' onClick={() => {setSelectedModule(null); setIsModalLarge(false); setIsVideoPlaying(false)}}>
                                <img src={close.src} alt='close' />
                            </button>
                        </div>
                    )}
                    {selectedModule?.moduloAcf?.immagineOVideo?.[0] === 'Video' && (
                    <div className={`${!isModalLarge ? 'absolute inset-0' : ''}`}>
                        <video {...(isVideoPlaying ? { controls: true } : {})} className='object-cover h-full'>
                            <source src={selectedModule?.moduloAcf?.video?.node?.link} type='video/mp4' />
                        </video>
                        <button className='absolute top-0 right-0 m-2 p-2 z-50 hover:bg-white hover:bg-opacity-20 rounded-full' onClick={() => {setSelectedModule(null); setIsModalLarge(false); setIsVideoPlaying(false)}}>
                            <img src={close.src} alt='close' />
                        </button>
                        {!isVideoPlaying && (
                            <div className='bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center'>
                                <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onClick={() => {setIsVideoPlaying(true); setIsModalLarge(true);}}>
                                    <img src={play.src} alt='play icon' />
                                </button>
                            </div>
                        )}
                    </div>
                    )}
                </div>
                <div className={`flex flex-col p-8 pt-6 gap-4 overflow-auto ${isVideoPlaying ? 'hidden' : ''}`}>
                    <div className='flex items-center text-black gap-3'>
                        <img src={selectedModule?.moduloAcf?.popupIcon?.node?.link ?? ''} alt='icon'></img>
                        <h4 className='text-h4'>{selectedModule?.moduloAcf?.titolo}</h4>
                    </div>
                    <div className='flex text-grey-4 nunito text-m wordpress-content'>
                        <div dangerouslySetInnerHTML={{ __html: selectedModule?.moduloAcf?.descrizioneModulo ?? ''}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
)}