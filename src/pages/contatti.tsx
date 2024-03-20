import React from 'react'
import { getPage, fetchImage } from '../lib/api'
import Layout from '../app/layout'
import ContactForm from '@/components/contactus'
import { useState, useEffect } from 'react'

import '../app/globals.scss'
import LinkedinIcon from '../../public/Linkedin Icon.svg'
import TelefonoIcon from '../../public/Telefono Contatti Icon.svg'
import PosizioneIcon from '../../public/Posizione Contatti Icon.svg'
import MailIcon from '../../public/Mail Contatti Icon.svg'
import Link from 'next/link'

import Decoration from '../../public/decorative element contatti desk 1.svg'

export default function Contatti() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | Error>(null);
    type PageData = {
            acf?: {
                contatti_header_image?: string;
                contatti_telefono_text?: string;
                contatti_mail_text?: string;
                contatti_posizione_text?: string;
                contatti_linkedin_url_link?: string;
            };
        };
        
    const [page, setPage] = useState<PageData>({});
    const [pageLoaded, setPageLoaded] = useState(false)

    type ImageData = {
        src: string;
        width: number;
        height: number;
      };
      
      type Images = {
        header_image?: ImageData;
      };
      
      const [images, setImages] = useState<Images>({});

    useEffect(() => {
            const fetchData = async () => {
                try {
                    const pageData = await getPage('contatti');
                    setPage(pageData);
                    setIsLoading(false);
                } catch (err) {
                    setError(err as Error);
                    setIsLoading(false);
                }
            };
    
           fetchData().then(() => {
                    setPageLoaded(true);
                    console.log("page contatti: ",page)
                    console.log("page contatti acf: ",page.acf)
            })
        }, []);

    const fetchImages = async () => {
        if (!page.acf) return;

        const imageNames: Record<string, any> = {
            
            'header_image': (page as PageData).acf?.contatti_header_image,
        };
        const fetchedImages: Record<string, { src: string; width: number; height: number }> = {};
  
        for (const [name, id] of Object.entries(imageNames)) {
            //console.log("fetching image: ", name, id)
          const imageData = await fetchImage(id)
          fetchedImages[name] = {
            src: imageData?.src,
            width: imageData?.width,
            height: imageData?.height
          }
        }

        setImages(fetchedImages)
    }
    
    const fetchData = async () => {
        fetchImages()
    }

    useEffect(() => {
        //console.log('page acf: ', page.acf)
        fetchData()
    }, [page.acf])

    return (
<Layout>
    
        {/* Hero Section */}
        <div className="flex flex-col align-center justify-center items-center text-center bg-cover overflow-hidden" style={{ 
                backgroundImage: images?.header_image ? `url(${images?.header_image.src})` : `linear-gradient(rgba(0, 51, 76), rgba(0, 51, 76) )`  
                }}>
                <div className="flex flex-col align-center text-center max-w-[916px] py-16">
                    <h1 className="text-h1 text-white">Aloisi srl</h1>
                    <h4 className="text-h4 text-white max-w-96">ingegneria industriale</h4>
                </div>
                <div className='flex items-end justify-end content-end h-14 w-full max-w-[1106px] vertical-line-contatti-1'></div>
            </div>

        {/* Split Section */}
        <section className="flex flex-col justify-center items-center text-dark-blue bg-light-gray sm:pt-28 pt-14 overflow-hidden">
            <div className='flex max-w-[916px] w-full'>
                <div className='flex-grow'></div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:justify-center w-full max-w-[916px] gap-24 px-6 z-10">
                    <div className="flex flex-col flex-grow  gap-6 sm:pr-8 pr-0 min-w-full">
                        <div className="text-left min-w-full">
                            <h3 className="text-h3">I nostri contatti</h3>
                        </div>
                        <div className="p-2 flex flex-row flex-grow gap-5 bg-off-white w-full">
                            <img className='w-16 h-16 bg-medium-blue p-4' src={TelefonoIcon.src}/>
                            <div className='flex flex-col grow min-w-full'>
                                <a className='text-caption text-light-blue'>TELEFONO</a>
                                <p className='w-full'>{page?.acf?.contatti_telefono_text}</p>
                            </div>
                        </div>
                        <div className="p-2 flex flex-row gap-5 bg-off-white">
                            <img className='w-16 h-16 bg-medium-blue p-4' src={MailIcon.src}/>
                            <div className='flex flex-col grow w-full'>
                                <a className='text-caption text-light-blue'>MAIL</a>
                                <p>{page?.acf?.contatti_mail_text}</p>
                            </div>
                        </div>
                        <div className="p-2 flex flex-row gap-5 bg-off-white">
                            <img className='w-16 h-16 bg-medium-blue p-4' src={PosizioneIcon.src}/>
                            <div className='flex flex-col grow w-full'>
                                <a className='text-caption text-light-blue'>POSIZIONE</a>
                                <p>{page?.acf?.contatti_posizione_text}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-row gap-5">
                                <Link className='p-2 bg-off-white' href={page.acf?.contatti_linkedin_url_link ?? ""}>
                                    <img src={LinkedinIcon.src} className='w-16 h-16 bg-medium-blue p-4'/>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Side with Contact Form */}
                    <div className="flex flex-col gap-6">
                            <div className="text-left">
                                <h3 className="text-h3">Contattaci</h3>
                            </div>
                        <ContactForm/>
                    </div>
                </div>
                <div className='flex-grow border-r-2 border-r-[#BDC9D3] -translate-y-28 translate-x-24'></div>
            </div>
            <div className='h-28 w-full flex items-end'>
                <div className='left-0 z-0'>
                         <img src={Decoration.src} alt="decorative"/>
                </div>
            </div>
        </section>
        
</Layout>
    )
}