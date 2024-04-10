import { useState, useEffect } from 'react';
import Link from 'next/link'
import { fetchIlSoftwareACF, fetchModuliACF, fetchFunzionalitaPrincipaliACF } from '../lib/api'
import Layout from '../app/layout'
import '../app/globals.css'
import '../app/globals.scss'

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
            <div className='flex w-full items-center justify-center min-h-[400px] bg-black'>
                <div className='w-full max-w-[1106px]'>
                    <div className='flex flex-col items-start'>
                    <h2 className='text-h1 text-white' 
                        dangerouslySetInnerHTML={{ __html: acf.heroTitle }}></h2>
                    <p className='nunito text-h4 text-grey-1' 
                        dangerouslySetInnerHTML={{ __html: acf.heroDescription }}></p>
                    <Link href=''>
                        <button className="px-8 py-1.5 bg-yellow-3 
                        uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3"
                            dangerouslySetInnerHTML={{ __html: acf.heroButtonText }}>
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Second Section - i vantaggi di Gesiqa */}
            {/* 3 Elementi in verticale. L'ultimo ha una griglia a 4 colonne che diventa 
            a 2 colonne in mobile*/}
            <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-grey-1'>
                <div className='max-w-[1106px]'>
                    <div className='grid grid-cols-1 gap-6'>
                    <div className='flex flex-col items-start justify-start gap-2'>
                        <div className='flex flex-col gap-2'>
                        <h1 className='text-h1 text-gs-black'
                            dangerouslySetInnerHTML={{ __html: acf.vantaggiTitle }}>
                        </h1>
                        <p className='nunito text-grey-4 text-l'
                            dangerouslySetInnerHTML={{ __html: acf.vantaggiDescription }}>
                        </p>
                        </div>
                    </div>
                    <div className='absolute'>{/* elemento decorativo a dx */}</div>
                    <div className='grid grid-cols-4 gap-6'>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl'>
                            <div className='h-16 w-16'>
                                <img src={acf.vantaggi1stElementIcon?.node?.link} alt="1sticon" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-S3' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl'>
                            <div className='h-16 w-16'>
                                <img src={acf.vantaggi2ndElementIcon?.node?.link} alt="2ndicon" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-S3' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl'>
                            <div className='h-16 w-16'>
                                <img src={acf.vantaggi3rdElementIcon?.node?.link} alt="3rdicon" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-S3' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementDescription }}></p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl'>
                            <div className='h-16 w-16'>
                                <img src={acf.vantaggi4thElementIcon?.node?.link} alt="4thicon" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <h4 className='text-h4 text-gs-black' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementTitle }}></h4>
                                <p className='nunito text-grey-4 text-S3' 
                                dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementDescription }}></p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Third Section - funzionalità principali */}
            {/* 3 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[400px] pt-20 bg-gs-white'>
                <div className='max-w-[1106px] w-full'>
                    <div className='flex flex-col items-start w-1/2'>
                        <h1 className='text-h1 text-gs-black mb-8'>funzionalità principali</h1>
                    </div>
                    <div className='grid grid-cols-2 w-full py-10 px-16 bg-white gap-x-6 gap-y-4 drop-shadow-xl -mb-20'>
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
            <div className='flex w-full items-center justify-center min-h-[400px] bg-black pt-20'>
                <div className='w-full max-w-[1106px] items-center'>
                    <div className='flex flex-col items-start'>
                    <h2 className='text-h2'
                    dangerouslySetInnerHTML={{ __html: acf.vuoiApprofondireTitle}}>
                    </h2>
                    <Link href=''>
                        <button className="px-8 py-1.5 bg-yellow-3 
                        uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3"
                        dangerouslySetInnerHTML={{ __html: acf.vuoiApprofondireButtonText}}>
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Fifth Section - scopri i moduli */}
            <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-gs-white'>
                <div className='max-w-[1106px]'>
                    <div className='mb-8'>
                        <h1 className='text-h1 text-gs-black'
                        dangerouslySetInnerHTML={{ __html: acf.scopriIModuliTitle}}>
                        </h1>
                        <p className='nunito text-gs-black'
                        dangerouslySetInnerHTML={{ __html: acf.scopriIModuliDescription}}>
                        </p>
                    </div>
                    <div className='grid grid-cols-4 gap-6 relative'>
                    { moduli && moduli.map((item : moduliData, index : number) => (
                        <div key={index} className='text-gs-black bg-white shadow-lg px-8 py-6 flex flex-col h-full'>
                            <div className='h-14 w-14 mb-4 flex items-center justify-center'>
                                <img src={item?.moduloAcf?.icon?.node?.link} alt="icon" />
                            </div>
                            <h4 className='nunito grow'
                            dangerouslySetInnerHTML={{ __html: item?.moduloAcf?.titolo}}>
                            </h4>
                            <div>
                                <button className="px-8 py-1.5 border-yellow-3 border-2 text-yellow-3
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' onClick={() => setSelectedModule(null)}>
        <div className='modal bg-white m-8 max-w-96 sm:max-w-[480px]' onClick={e => e.stopPropagation()}>
            <div className=''>
                <div className=''>
                    {selectedModule?.moduloAcf?.immagineOVideo[0] === 'Immagine' && <img src={selectedModule?.moduloAcf?.immagine?.node?.link ?? ''} alt='' />}
                    {selectedModule?.moduloAcf?.immagineOVideo[0] === 'Video' && <video src={selectedModule?.moduloAcf?.video?.node?.link} />}
                </div>
                <div className='flex flex-col p-8 pt-6 gap-4'>
                    <div className='flex items-center text-black gap-3'>
                        <img src={selectedModule?.moduloAcf?.popupIcon?.node?.link ?? ''} alt='icon'></img>
                        <h4 className='text-h4'>{selectedModule?.moduloAcf?.titolo}</h4>
                    </div>
                    <div className='flex text-grey-4 nunito text-S3'>
                        <div dangerouslySetInnerHTML={{ __html: selectedModule?.moduloAcf?.descrizioneModulo ?? ''}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
)}