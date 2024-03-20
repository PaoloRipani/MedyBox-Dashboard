import { getPage } from '../lib/api'
import Layout from '../app/layout'
import { useState, useEffect } from 'react'

import ContactForm from '@/components/contactformattach'

import Decoration1 from '../../public/decorative element chi siamo desk 1.svg'
import Decoration2 from '../../public/decorative element chi siamo desk 2.svg'
import Decoration3 from '../../public/decorative element chi siamo desk 3.svg'
import Decoration4 from '../../public/decorative element chi-siamo mobile 1.svg'

import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ChiSiamo() {

    type PosizioneData = {
        date: string;
        acf: {
            titolo_posizione_aperta?: string;
            luogo_posizione_aperta?: string;
            esperienza_posizione_aperta?: string;
            tempo_posizione_aperta?: string;
            url_linkedin_posizione_aperta?: string;
            // Add other acf properties as needed
        };
        // Add other posizione properties as needed
    };

    const [posizioniAperte, setPosizioniAperte] = useState<PosizioneData[]>([]);
    
    const [imageSrcs, setImageSrcs] = useState<string[]>([])

    type PageData = {
        acf?: {
          chi_siamo_header_text?: string;
          chi_siamo_elemento_1_text?: string;
          chi_siamo_elemento_2_text?: string;
          chi_siamo_lavora_con_noi_header_text?: string;
          // Add other acf properties as needed
        };
        // Add other page properties as needed
      };
      
      const [page, setPage] = useState<PageData>({});

    type ImageData = {
        src: string;
        width: number;
        height: number;
      };
      
      type Images = {
        header_image?: ImageData;
        elemento_1_image?: ImageData;
        elemento_2_image?: ImageData;
      };
      
      const [images, setImages] = useState<Images>({});

      useEffect(() => {
        const fetchData = async () => {
            const pageData = await getPage('chi-siamo')
    
            // Replace &nbsp; with <br /> in chi_siamo_elemento_1_text and chi_siamo_elemento_2_text
            if (pageData.acf) {
                if (pageData.acf.chi_siamo_elemento_1_text) {
                    pageData.acf.chi_siamo_elemento_1_text = pageData.acf.chi_siamo_elemento_1_text.replace(/&nbsp;/g, '<br />');
                }
                if (pageData.acf.chi_siamo_elemento_2_text) {
                    pageData.acf.chi_siamo_elemento_2_text = pageData.acf.chi_siamo_elemento_2_text.replace(/&nbsp;/g, '<br />');
                }
            }
    
            setPage(pageData)
        }
        //console.log("1")
        fetchData()
    }, [])
    // console.log("page chisiamo:", page)


    const fetchImage = async (id: any) => {
        if (!(page as any).acf) {
            return
        }
        const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/media/${id}`)
        const data = await response.json()

        return {
          src: data?.guid?.rendered,
          width: data?.media_details?.width,
          height: data?.media_details?.height
        }
    }

    const fetchImages = async () => {
        if (!(page as any).acf) {
            return
        }

        const imageNames: Record<string, any> = {
            'elemento_1_image': (page as any).acf.chi_siamo_elemento_1_image,
            'elemento_2_image': (page as any).acf.chi_siamo_elemento_2_image,
            'header_image': (page as any).acf.chi_siamo_header_image,
        };
        const fetchedImages: Record<string, { src: string; width: number; height: number }> = {};

        for (const [name, id] of Object.entries(imageNames)) {
            const imageData = await fetchImage(id);
            fetchedImages[name] = {
                src: imageData?.src ?? '',
                width: imageData?.width ?? 0,
                height: imageData?.height ?? 0,
            };
        }

        setImages(fetchedImages);
    };

    const fetchPosizioniAperte = async () => {
        const response = await fetch('https://www.aloisiprogetti.com/wp-json/wp/v2/posizione_aperta');
        const data = await response.json();
        console.log("posizioni aperte:", data);

        return data;
    };

    const fetchData = async () => {
        // Fetch posizioni aperte data
        const posizioniAperte = await fetchPosizioniAperte();

        //console.log("3");
        fetchImages();
        setPosizioniAperte(posizioniAperte);
    };

    // Scroll to the Lavora con noi section if the URL hash is #lavora-con-noi
    useEffect(() => {
        if (window.location.hash === '#lavora-con-noi') {
            const element = document.getElementById('lavora-con-noi');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        //console.log("2");
        fetchData();
        //console.log("4");
    }, [(page as any).acf]);

    useEffect(() => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString((page as any)?.acf?.chi_siamo_ci_hanno_scelto_image_logos, 'text/html');
        const images = htmlDoc.getElementsByTagName('img');
        const srcs = Array.from(images).map(img => img.src);
        setImageSrcs(srcs);
    }, [(page as any)?.acf?.chi_siamo_ci_hanno_scelto_image_logos]);

    useEffect(() => {
        AOS.init();
      }, []);

    return (
        <Layout>
            {/* Hero Section */}
            <div className="flex align-center justify-center text-center bg-cover min-h-80" 
            style={{ 
                backgroundImage: images?.header_image?.src ? `linear-gradient(
                rgba(0, 51, 76, 0.4), 
                rgba(0, 51, 76, 0.4)
                ),url(${images?.header_image?.src})` : `linear-gradient(
                    rgba(0, 51, 76), 
                    rgba(0, 51, 76)
                    )`
            }}
            >
                <div className="flex flex-col align-center text-center max-w-[1106px] py-16">
                    <h1 className="text-h1 text-white">Chi siamo</h1>
                    <p className="xl space-p-xl text-xl text-white max-w-96">{page?.acf?.chi_siamo_header_text || ''}</p>
                </div>
            </div>

            {/* La Nostra Storia Section */}
            <section className="flex justify-center text-dark-blue bg-off-white min-h-[580px]">
                <div className='absolute left-0 sm:block hidden z-10'>
                    <img src={Decoration1.src} alt="decorative"/>
                </div>
                <div className='absolute bottom-0 right-0 -ml-6 z-10 -mb-1 sm:block hidden'>
                    <img src={Decoration2.src} alt="decorative"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 sm:pt-28 pt-12 max-w-[1106px]">
                    <div className='flex flex-col gap-4 sm:pr-28 p-6' data-aos="fade-right">
                        <h3 className='text-h3 z-20'>{page?.acf?.chi_siamo_elemento_1_text ? 'La nostra storia': ''}</h3>
                        {/*<p className="l space-p-l text-l">{page?.acf?.chi_siamo_elemento_1_text}</p>*/}
                    <div className='l space-p-l text-l font-light wordpress-content-short z-20'
                        dangerouslySetInnerHTML={{ __html: page?.acf?.chi_siamo_elemento_1_text || '' }}></div>
                    </div>
                    <div data-aos="fade-up">
                        {images.elemento_1_image && <img src={images?.elemento_1_image?.src} className="p-0 sm:pl-3" alt="Chi Siamo" />}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="flex justify-center text-dark-blue bg-off-white">
                <div className='sm:hidden block absolute left-0'>
                    <img src={Decoration4.src} alt="decorative"/>
                </div>
                <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:pt-24 pt-12 md:pb-28 pb-0 max-w-[1106px] z-10">
                    <div className="w-full md:w-1/2" data-aos="fade-right">
                        {images.elemento_2_image && <img src={images?.elemento_2_image?.src} className="p-0 md:pr-3" alt="Mission" />}
                    </div>
                    <div className='flex flex-col gap-4 md:pl-28 p-6 w-full md:w-1/2' data-aos="fade-up" data-aos-offset="200">
                        <h3 className='text-h3 z-20'>{page?.acf?.chi_siamo_elemento_2_text ? 'Valori, visione, missione': ''}</h3>
                        {/*<p className="l space-p-l text-l">{page?.acf?.chi_siamo_elemento_2_text}</p>*/}
                        <div className='l space-p-l text-l font-light wordpress-content-short z-20' data-aos="fade-up" data-aos-offset="200"
                            dangerouslySetInnerHTML={{ __html: page?.acf?.chi_siamo_elemento_2_text || '' }}></div>
                    </div>
                </div>
            </section>

            {/* Ci Hanno Scelto Section */}
            <section className="flex flex-col items-center justify-center bg-dark-blue">
                <div className="max-w-[1106px] text-center mb-16">
                    <div className="mt-16 md:mt-14 mb-8">
                        <a className="text-caption text-light-green">
                            CI HANNO SCELTO
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-14 gap-y-5 md:gap-y-8 ml-6 mr-6 sm:mb-2 mb-0 max-w-[1106px] mx-auto">
                        {imageSrcs && imageSrcs.map((src, index) => (
                            <div key={index} className="opacity-60 mix-blend-screen ">
                                <img src={src} alt="Logo" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lavora Con Noi Section */}
            <section id="lavora-con-noi" className="flex flex-col items-center justify-center sm:px-0 px-6 text-dark-blue bg-light-gray">
                <div className='h-20 w-full'></div>
                <div className="flex flex-col text-center items-center justify-center w-full max-w-[967px] mx-auto box-border">
                    <div className='pb-14 text-center max-w-96'>
                        <h2 className='text-h2'>Lavora con noi</h2>
                        <p className='xl text-xl space-p-xl'>{page?.acf?.chi_siamo_lavora_con_noi_header_text}</p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 w-full justify-between items-stretch gap-8 md:py-0 py-8 sm:px-6 sm:gap-0 box-border'>
                        <div className='flex flex-col gap-6 flex-grow md:pr-14 p-0 md:border-r border-r-0 border-[#BDC9D3]' data-aos="fade-up">
                            <h3 className='text-h3 text-left'>Posizioni Aperte</h3>
                            <div className="grid grid-cols-1 gap-6 max-h-96 overflow-y-auto scrollbar-hide z-10"  data-aos="fade-up" data-aos-offset="200">
                                {posizioniAperte && posizioniAperte.length > 0 ? ( 
                                    posizioniAperte.map((posizione, index) => (
                                    <a
                                        key={index}
                                        className='flex flex-col py-4 px-6 gap-4 bg-off-white hover:bg-medium-white border-off-white border-[1px] hover:border-stroke-blue cursor-pointer'
                                        href={posizione.acf.url_linkedin_posizione_aperta}
                                        target='_blank'
                                    >
                                        <div className='flex flex-col items-start gap-1.5 text-left'>
                                            <a className='text-xs leading-3 text-light-blue h-3'>{new Date(posizione.date).toLocaleDateString()}</a>
                                            <h4 className='text-h4 '>{posizione.acf.titolo_posizione_aperta ? posizione.acf.titolo_posizione_aperta : ''}</h4>
                                        </div>
                                        <div className='flex flex-row flex-wrap gap-2'>
                                            <div className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green">{posizione.acf.luogo_posizione_aperta}</div>
                                            <div className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green">{posizione.acf.esperienza_posizione_aperta}</div>
                                            <div className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green">{posizione.acf.tempo_posizione_aperta}</div>
                                        </div>
                                    </a>
                                ))
                                    ) : (
                                <p>Attualmente non ci sono posizioni aperte</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow md:pl-14 p-0 md:border-l border-l-0 border-[#BDC9D3] md:mt-0 mt-6" data-aos="fade-up" data-aos-offset="200">
                            <h3 className='text-h3 text-left'>Contattaci</h3>
                            <ContactForm />
                        </div>
                    </div>
                </div>
                <div className='h-20 w-full flex items-end'>
                     <div className='md:block hidden'>
                         <img src={Decoration3.src} alt="decorative"/>
                     </div>
                </div>
            </section>

        </Layout>
    );
}