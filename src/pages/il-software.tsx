import Link from 'next/link'
import Layout from '../app/layout'
import '../app/globals.css'
import '../app/globals.scss'


export default function IlSoftware() {


return (
    <>
    <Layout>
        <>
            {/* First Section - Scopri il software */}
            {/* 3 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[400px] bg-black'>
                <div className='w-full max-w-[1106px]'>
                    <div className='flex flex-col items-start w-1/2'>
                    <h2 className='text-h2'>Scopri il software Gesiqa</h2>
                    <p className='nunito'>GeSiQA è un prodotto integrato, un’applicazione software per la gestione documentale, 
                        operativa e di controllo della Sicurezza, della Qualità e dell’ Ambiente in tutti i settori 
                        produttivi, con particolare predisposizione per il settore delle Costruzioni
                    </p>
                    <Link href=''>
                        <button className="px-8 py-1.5 bg-yellow-3 
                        uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                        scegli Gesiqa
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Second Section - i vantaggi di Gesiqa */}
            {/* 3 Elementi in verticale. L'ultimo ha una griglia a 4 colonne che diventa 
            a 2 colonne in mobile*/}
            <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-gs-white'>
                <div className='max-w-[1106px]'>
                    <div className='grid grid-cols-1 gap-6'>
                    <div className='flex flex-col items-start justify-center gap-2'>
                        <div className='flex flex-col pl-28'>
                        <h1 className='text-h1 text-gs-black'>i vantaggi di Gesiqa</h1>
                        <p className='nunito text-gs-black'>Gesiqa gestisce tutto ciò di cui hai bisogno per gestire la Sicurezza, la Qualità e l'Ambiente 
                            nei cantieri.
                            Potrai ottimizzare e semplificare le attività di routine, risparmiare risorse, ridurre i tempi e 
                            gli errori. Inoltre, avrai la completa digitalizzazione dei processi che girano attorno all’attività 
                            di cantiere e l'immediata disponibilità in caso di ispezioni.
                        </p>
                        </div>
                    </div>
                    <div className='absolute'>{/* elemento decorativo a dx */}</div>
                    <div className='grid grid-cols-4 gap-6'>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl'>
                        <div className='h-24 w-24 bg-slate-600'></div>
                        <h4 className=' text-gs-black'>titolo 1</h4>
                        <p className='nunito text-gs-black'>testo 1</p>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl'>
                        <div className='h-24 w-24 bg-slate-600'></div>
                        <h4 className=' text-gs-black'>titolo 2</h4>
                        <p className='nunito text-gs-black'>testo 2</p>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white drop-shadow-xl'>
                        <div className='h-24 w-24 bg-slate-600'></div>
                        <h4 className=' text-gs-black'>titolo 3</h4>
                        <p className='nunito text-gs-black'>testo 3</p>
                        </div>
                        <div className='flex flex-col gap-4 p-8 bg-white mt-10 -mb-10 drop-shadow-xl'>
                        <div className='h-24 w-24 bg-slate-600'></div>
                        <h4 className=' text-gs-black'>titolo 4</h4>
                        <p className='nunito text-gs-black'>testo 4</p>
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
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className='nunito text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className='nunito text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className='nunito text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className='nunito text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className='nunito text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                        <div className='flex gap-4'>
                            <div className='h-10 w-10 bg-slate-600'></div>
                            <p className=' text-gs-black'>testo elemento</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fourth Section - vuoi approfondire */}
            {/* 2 Elementi in verticale */}
            <div className='flex w-full items-center justify-center min-h-[400px] bg-black pt-20'>
                <div className='w-full max-w-[1106px] items-center'>
                    <div className='flex flex-col items-start'>
                    <h2 className='text-h2'>Vuoi saperne di più su tutte le funzioni di Gesiqa?</h2>
                    <Link href=''>
                        <button className="px-8 py-1.5 bg-yellow-3 
                        uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                        Contattaci
                        </button>
                    </Link>
                    </div>
                </div>
            </div>

            {/* Fifth Section - scopri i moduli */}
            <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-gs-white'>
                <div className='max-w-[1106px]'>
                    <div className='mb-8'>
                        <h1 className='text-h1 text-gs-black'>scopri i moduli</h1>
                        <p className='nunito text-gs-black'>Gesiqa è strutturato per “moduli”. La licenza base comprende i seguenti moduli: anagrafiche, 
                            gestione documentazione primo accesso in cantiere (I.T.P. - POS e relativa documentazione), 
                            gestione lavoratori, mezzi e scadenzario adempimenti. Alla licenza base è possibile 
                            aggiungere ulteriori moduli secondo necessità.</p>
                    </div>
                    <div className='grid grid-cols-4 gap-6'>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4 className='nunito'>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 border-2 text-yellow-3
                                text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                        <div className='text-gs-black bg-white shadow-lg px-8 py-6'>
                            <div className='h-14 w-14 bg-slate-600 mb-4'></div>
                            <h4>Verifica idoneità tecnico professionale</h4>
                            <Link href=''>
                                <button className="px-8 py-1.5 border-yellow-3 
                                uppercase text-regular text-base cursor-pointer min-w-40 min-h-10 mt-3">
                                Dettagli
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    </Layout>
    </>
)}