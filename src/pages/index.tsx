import Link from 'next/link'
import { fetchHomepageACF } from '../lib/api'
import '../app/globals.css'
import '../app/globals.scss'

import AOS from 'aos'
import 'aos/dist/aos.css';
import { parse } from 'node-html-parser';


import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState, createContext } from 'react'

import linkedinIcon from '../../public/ri_linkedin-fill.svg'
import locationIcon from '../../public/material-symbols_location-on-outline.svg'
import emailIcon from '../../public/material-symbols_alternate-email.svg'
import nameIcon from '../../public/material-symbols_domain.svg'
import phoneIcon from '../../public/material-symbols_phone-in-talk-outline.svg'
import toggleIcon from '../../public/material-symbols_chevron-right.svg'
import decorazione1 from '../../public/elemento-decorativo-home-1.svg'
import ContactForm from '@/components/contactus'

export default function Home() {

  useEffect(() => {
    AOS.init({
      delay: 100,
    });
  }, []);

  type AcfData = {
    [key: string]: any;
  };

  const [acf, setAcf] = useState<AcfData>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [isFormVisible, setFormVisible] = useState(true);
  const [isIconFlipped, setIconFlipped] = useState(false);

  const handleButtonClick = () => {
    setFormVisible(!isFormVisible);
    setIconFlipped(!isIconFlipped);
  };

  function applyColorToApostrophes(text: string) {
    return text.replace(/'([^']*)'/g, "<span style='color: #F59D21;'>$1</span>");
  }

  function extractHighResUrls(htmlString : any) {
    const regex = /srcset="([^"]*)"/g;
    let match;
    const highResUrls = [];

    while ((match = regex.exec(htmlString)) !== null) {
        const srcset = match[1];
        const urls = srcset.split(', ');
        const highResUrl = urls[urls.length - 1].split(' ')[0];
        highResUrls.push(highResUrl);
    }

    return highResUrls;
}

  useEffect(() => {
    if(!acf.heroImageSlider) return;
    const root = parse(acf.heroImageSlider);
    const imgTags = root.querySelectorAll('img');
    const urls = imgTags.map(img => img.getAttribute('src'));

    console.log(extractHighResUrls(acf.heroImageSlider));
    setImageUrls(extractHighResUrls(acf.heroImageSlider));
  }, [acf.heroImageSlider]);

  useEffect(() => {
    //console.log("A: home contexts projects2 :", projects2)
    //console.log("A: home contexts categories2 :", categories2)
    const fetchData = async () => {
      //console.log("B: home contexts projects2 :", projects2)
      //console.log("B: home contexts categories2 :", categories2)
      try {
        const resFetchHomepageACF = await fetchHomepageACF()
        console.log("resF: ",resFetchHomepageACF);
        resFetchHomepageACF.heroTitle = applyColorToApostrophes(resFetchHomepageACF?.heroTitle);
        resFetchHomepageACF.chiSiamoTitle = applyColorToApostrophes(resFetchHomepageACF?.chiSiamoTitle);
        resFetchHomepageACF.percheSceglierciTitle = applyColorToApostrophes(resFetchHomepageACF.percheSceglierciTitle);
        resFetchHomepageACF.ilNostroTargetTitle = applyColorToApostrophes(resFetchHomepageACF.ilNostroTargetTitle);
        resFetchHomepageACF.scopriIlSoftwareTitle = applyColorToApostrophes(resFetchHomepageACF.scopriIlSoftwareTitle);
        resFetchHomepageACF.vantaggiTitle = applyColorToApostrophes(resFetchHomepageACF.vantaggiTitle);
        resFetchHomepageACF.vuoiSaperneDiPiuTitle = applyColorToApostrophes(resFetchHomepageACF.vuoiSaperneDiPiuTitle);
        resFetchHomepageACF.contattiTitle = applyColorToApostrophes(resFetchHomepageACF.contattiTitle);
        setAcf(resFetchHomepageACF);

      } catch (err) {
        console.error(err);
      }
    }

    fetchData().then(() => {
      console.log("loaded")
    })
  }, [])


  useEffect(() => {
    //console.log("2 fetched images: " , images)
    //console.log("2 fetched progetti images: " , progettiImages)
    if(!acf) return
    console.log("acf: ",acf)
  }, [acf])

  return (
      <div>
        <Layout> 
          <div>

        {/* First Section */}
        {/* 2 colonne, quella di sinistra con 3 elementi verticali, quella di destra con immagine.
          quando mobile la colonna di sinistra va sopra quella di destra. */}
          <div className='flex w-full min-h-[640px] lg:min-h-[calc(100vh-80px)] bg-gs-white section'>
          <div className='anchor' id="home"></div>
            <div className='w-full lg:h-full'>
              <div className="lg:grid flex flex-col lg:grid-cols-2 lg:grid-rows-3 grid-rows-2 items-stretch lg:h-full lg:max-h-[calc(100vh-80px)]">
                <div className='flex lg:justify-end lg:items-end flex-grow row-span-1 lg:row-start-2 row-start-1 lg:max-h-[auto] relative'>
                  <div className="flex flex-col items-start content-start justify-start gap-3 text-left z-20 lg:max-w-[553px] w-full px-6 lg:py-4 py-12">
                    <h2 className="lg:text-h1 text-h1m text-gs-black" dangerouslySetInnerHTML={{ __html: acf.heroTitle }}></h2>
                    <p className="nunito text-l font-light lg:pr-16 text-grey-4" dangerouslySetInnerHTML={{ __html: acf.heroDescription }}> 
                      </p>
                      {acf.heroButtonText && (
                        <Link href='/#contattaci'>
                        <div className="border-0 text-white flex justify-start
                        h-10 relative mt-6">
                          <button type="submit" className='w-40 pr-2 flex items-center justify-center cursor-pointer '>
                              <svg width="164" height="40" className='absolute z-0 left-0'>
                                <path d="M0,0 h148 l16,20 l-16,20 h-148z" fill="#ef7923" />
                              </svg>
                              <span className='z-20 leading-button secular' dangerouslySetInnerHTML={{ __html: acf.heroButtonText }}>
                              </span>
                          </button>
                        </div>
                        </Link>
                      )}
                  </div>
                </div>
                <div className='flex-grow lg:row-span-full !relative lg:row-start-1 max-h-96 lg:max-h-[100vh] h-96 lg:h-full'>
                  {/* immagine */}
                  <Slider
                    dots={true}
                    dotsClass='slick-dots !bottom-2'
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={2000}
                    arrows={false}
                    className='lg:h-full h-96 relative'
                  >
                    {imageUrls.map((url, index) => (
                      <div key={index} className='h-full object-cover'>
                        <img src={url} alt={`Image ${index + 1}`} className='object-cover h-full w-full'/>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

        {/* Second Section - chi siamo */}
        {/*  unico contenitore, elemento grafico allineato a sinistra, 2 elementi verticali */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-grey-1 section px-6 relative'>
        <div className='anchor' id='chi-siamo'></div>
          {/* decorazione a sinistra */}
          <div className='absolute left-0 bottom-0 z-0'>
            <img src={decorazione1.src} alt="decorazione1" />
          </div>
          <div className='max-w-[1106px] z-10'>
            <div className='flex flex-col max-w-[730px]'>
              <h1 className="lg:text-h1 text-h1m text-gs-black" dangerouslySetInnerHTML={{ __html: acf.chiSiamoTitle }}></h1>
              <p className='nunito  text-grey-4 lg:text-h4 text-category font-semibold' dangerouslySetInnerHTML={{ __html: acf.chiSiamoDescription }}>
              </p>
            </div>
          </div>
        </div>

        {/* Third Section - perché sceglierci */}
        {/* contenitore con griglia su 3 colonne in desktop e 1 colonna in mobile.
        ogni elemento della graiglia ha 3 elementi in verticale */}

        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white section lg:px-6 lg:py-0 px-6 py-16'>
        <div className='anchor' id='perche-sceglierci'></div>
          <div className='max-w-[1106px] flex flex-col gap-8 items-center'>
            <h2 className='lg:text-h1 text-h1m text-gs-black' dangerouslySetInnerHTML={{ __html: acf.percheSceglierciTitle }}></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className='flex flex-col gap-4 p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20'>
                {acf.percheSceglierci1stItemIcon && (<img src={acf.percheSceglierci1stItemIcon?.node?.link} alt="1sticon" />)}
                </div>
                <div className='flex flex-col gap-1'>
                  <h4 className='lg:text-h4 text-l text-gs-black' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci1stItemTitle }}></h4>
                  <p className='nunito text-grey-4 text-m' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci1stItemDescription }}></p>
                </div>
              </div>
              <div className='flex flex-col gap-4 p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20'>
                {acf.percheSceglierci2ndItemIcon && (<img src={acf.percheSceglierci2ndItemIcon?.node?.link} alt="2ndicon" />)}
                </div>
                <div className='flex flex-col gap-1'>
                  <h4 className='lg:text-h4 text-l text-gs-black' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci2ndItemTitle }}></h4>
                  <p className='nunito text-grey-4 text-m' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci2ndItemDescription }}></p>
                </div>
              </div> 
              <div className='flex flex-col gap-4 p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20'>
                {acf.percheSceglierci3rdItemIcon && (<img src={acf.percheSceglierci3rdItemIcon?.node?.link} alt="3rdicon" />)}
                </div>
                <div className='flex flex-col gap-1'>
                  <h4 className='lg:text-h4 text-l text-gs-black' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci3rdItemTitle }}></h4>
                  <p className='nunito text-grey-4 text-m' dangerouslySetInnerHTML={{ __html: acf.percheSceglierci3rdItemDescription }}></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Section - scopri il software */}
        {/*  unico contenitore, 3 elementi verticali */}
        <div className='flex w-full lg:items-center items-end justify-center min-h-[400px] bg-black relative p-6'>
          <div className='absolute inset-0 object-cover overflow-hidden flex items-center justify-center'>
              <img className='object-cover h-full w-full' src={acf.scopriIlSoftwareImage?.node?.link} alt="scopriIlSoftwareImage" />
              <div className='absolute inset-0 bg-black bg-opacity-30'></div>
              <div className='absolute inset-0 lg:bg-gradient-to-r bg-gradient-to-t from-[#000000b6] to-transparent from-30% '></div>
          </div>
          <div className='w-full max-w-[1106px] z-10'>
            <div className='flex flex-col items-start lg:w-1/2 gap-4'>
              <h2 className='text-h2 lg:pt-0 pt-24' dangerouslySetInnerHTML={{ __html: acf.scopriIlSoftwareTitle }}></h2>
              <p className='nunito text-h4 text-grey-1' dangerouslySetInnerHTML={{ __html: acf.scopriIlSoftwareDescriptionText }}>
              </p>
              <Link href='/il-software'>
                <div className="border-0 text-white flex justify-start
                h-10 relative">
                  <button type="submit" className='w-44 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="184" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h168 l16,20 l-16,20 h-168z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular' dangerouslySetInnerHTML={{ __html: acf.scopriIlSoftwareButtonText }}></span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Fifth Section - i vantaggi */}
        {/* 2 colonne che in mobile si dispongono al contrario con la destra che va sopra e la sinistra che va sotto
            nella colonna di sinistra una griglia sfasata che in mobile rimane su 2 colonne.
            sulla destra 2 elementi in verticale. */}
        <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-gs-white px-6'>
          <div className='max-w-[1106px]'>
            <div className='lg:grid lg:grid-cols-2 flex flex-col-reverse lg:gap-0 gap-12'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-4 lg:px-8 lg:py-8 px-4 py-5 bg-white shadow-lg rounded'>
                  <div className='h-16 w-16'>
                    <img src={acf.vantaggi1stElementIcon?.node?.link} alt="1sticon" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h4 className='lg:text-h4 text-l text-gs-black' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementTitle }}></h4>
                    <p className='nunito text-grey-4 lg:text-m text-s' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi1stElementDescription }}></p>
                  </div>
                </div>
                <div className='flex flex-col gap-4 lg:px-8 lg:py-8 px-4 py-5 bg-white shadow-lg rounded -mt-6 mb-6'>
                  <div className='h-16 w-16'>
                    <img src={acf.vantaggi2ndElementIcon?.node?.link} alt="2ndicon" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h4 className='lg:text-h4 text-l text-gs-black' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementTitle }}></h4>
                    <p className='nunito text-grey-4 lg:text-m text-s' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi2ndElementDescription }}></p>
                  </div>
                </div>
                <div className='flex flex-col gap-4 lg:px-8 lg:py-8 px-4 py-5 bg-white shadow-lg rounded'>
                  <div className='h-16 w-16'>
                    <img src={acf.vantaggi3rdElementIcon?.node?.link} alt="3rdicon" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h4 className='lg:text-h4 text-l text-gs-black' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementTitle }}></h4>
                    <p className='nunito text-grey-4 lg:text-m text-s' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi3rdElementDescription }}></p>
                  </div>
                </div>
                <div className='flex flex-col gap-4 lg:px-8 lg:py-8 px-4 py-5 bg-white shadow-lg rounded -mt-6 mb-6'>
                  <div className='h-16 w-16'>
                    <img src={acf.vantaggi4thElementIcon?.node?.link} alt="4thicon" />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h4 className='lg:text-h4 text-l text-gs-black' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementTitle }}></h4>
                    <p className='nunito text-grey-4 lg:text-m text-s' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggi4thElementDescription }}></p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex flex-col lg:pl-28 gap-2'>
                  <h1 className='lg:text-h1 text-h1m text-gs-black' 
                    dangerouslySetInnerHTML={{ __html: acf.vantaggiTitle }}>
                  </h1>
                  <p className='nunito text-grey-4 lg:text-l text-category'
                    dangerouslySetInnerHTML={{ __html: acf.vantaggiDescription }}>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sixth Section - vuoi saperne di più */}
        {/* unico contenitore con 2 elementi in verticale */}
        
        <div className='flex w-full lg:items-center items-end justify-center min-h-[400px] bg-black relative p-6'>
          <div className='absolute inset-0 object-cover overflow-hidden flex lg:items-center items-end lg:justify-center justify-end'>
              <img className='object-cover h-full w-full' src={acf.vuoiSaperneDiPiuImage?.node?.link} alt="vuoiSaperneDiPiuImage" />
              <div className='absolute inset-0 bg-black bg-opacity-30'></div>
              <div className='absolute inset-0 lg:bg-gradient-to-r bg-gradient-to-t from-[#000000b6] to-transparent from-30% '></div>
          </div>
          <div className='w-full max-w-[1106px] z-10'>
            <div className='flex flex-col items-start lg:w-1/2'>
              <h2 className='text-h2 lg:pt-0 pt-24' dangerouslySetInnerHTML={{ __html: acf.vuoiSaperneDiPiuTitle }}></h2>
              {acf?.vuoiSaperneDiPiuLink && (
              <Link href={acf?.vuoiSaperneDiPiuLink } target='_blank'>
                <div className="border-0 text-white flex justify-start
                h-10 relative mt-6">
                  <button type="submit" className='w-64 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="256" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h240 l16,20 l-16,20 h-240z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular' 
                      dangerouslySetInnerHTML={{ __html: acf.vuoiSaperneDiPiuButtonText }}></span>
                  </button>
                </div>
              </Link>
              )}
            </div>
          </div>
        </div>

        {/* Seventh Section - il nostro target */}
        {/* due colonne che in mobile si allineano una sopra l'altra.
        a sinistra 3 elementi in verticale e a destra 3 elementi in verticale da 2 elementi orizzontali ciascuno */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white section lg:px-6 lg:py-0 px-6 py-16'>
        <div className='anchor' id='target'></div>
          <div className='max-w-[1106px]'>
            <div className='grid lg:grid-cols-2 grid-cols-1 items-center lg:gap-0 gap-12'>
              <div className='flex flex-col items-start lg:pr-28'>
                <h1 className='lg:text-h1 text-h1m text-gs-black mb-2' dangerouslySetInnerHTML={{ __html: acf.ilNostroTargetTitle }}></h1>
                <p className='nunito text-grey-4 lg:text-l text-m'
                 dangerouslySetInnerHTML={{ __html: acf.ilNostroTargetDescription }}>
                </p>
                <Link href='/#contattaci'>
                <div className="border-0 text-white flex justify-start
                h-10 relative mt-6">
                  <button type="submit" className='w-36 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="144" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h128 l16,20 l-16,20 h-128z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular'
                        dangerouslySetInnerHTML={{ __html: acf.ilNostroTargetButtonText }}>
                      </span>
                  </button>
                </div>
                </Link>
              </div>
              <div className='flex flex-col lg:gap-16 gap-5 xl:pl-24 lg:pl-12'>
                <div className='flex flex-col lg:gap-16 gap-5 w-full lg:items-start items-center'>
                <div className='flex gap-6 bg-white justify-center items-center lg:mr-28 mr-12 max-w-96 overflow-hidden shadow-lg rounded'>
                  <div className='h-28 w-28 bg-yellow-1 flex items-center justify-center'>
                    <img src={acf.ilNostroTarget1stElementIcon?.node?.link} alt="1sticon" />
                  </div>
                  <h3 className='lg:text-h3 text-h4 text-gs-black pr-6 w-[calc(100%-136px)] break-words'
                  dangerouslySetInnerHTML={{ __html: acf.ilNostroTarget1stElementText }}>
                  </h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center lg:ml-28 ml-12 max-w-96 overflow-hidden shadow-lg rounded'>
                  <div className='h-28 w-28 bg-yellow-2 flex items-center justify-center'>
                    <img src={acf.ilNostroTarget2ndElementIcon?.node?.link} alt="2ndicon" />
                  </div>
                  <h3 className='lg:text-h3 text-h4 text-gs-black pr-6 w-[calc(100%-136px)] break-words'
                  dangerouslySetInnerHTML={{ __html: acf.ilNostroTarget2ndElementText }}>
                  </h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center lg:ml-0 lg:mr-28 ml-4 mr-8 max-w-96 overflow-hidden shadow-lg rounded'>
                  <div className='h-28 w-28 bg-yellow-3 flex items-center justify-center'>
                    <img src={acf.ilNostroTarget3rdElementIcon?.node?.link} alt="3rdicon" />
                  </div>
                  <h3 className='lg:text-h3 text-h4 text-gs-black pr-6 w-[calc(100%-136px)] break-words'
                  dangerouslySetInnerHTML={{ __html: acf.ilNostroTarget3rdElementText }}>
                  </h3>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eight Section - contatti */}
        {/* 2 elementi in orizzontale. a sinistra ci sono 6 elementi in verticale.
        a destra ci sono 2 elementi di cui uno è contact form. 
        in mobile si dispongono al contrario. */}
        <div className='flex w-full items-stretch justify-center min-h-[640px] py-16 bg-gs-white section px-6'>
        <div className='anchor' id='contattaci'></div>
          <div className='w-full max-w-[1106px] relative flex flex-col-reverse lg:flex-col'>
            <div className='lg:absolute z-10 top-0 left-0 lg:w-2/6 w-full flex flex-col justify-center 
              items-center gap-8 p-8 lg:my-8 bg-yellow-3 lg:max-w-96 shadow-lg lg:rounded h-[calc(100%-64px)]'>
              <h3 className='text-contact-title text-center border-b-2 border-yellow-2 h-12 w-full'>contatti</h3>
              <div className='flex flex-col gap-5 items-center justify-center'>
                <div className='flex flex-col items-center gap-1'>
                  <div className='h-6 w-6'>
                    <Image src={nameIcon} alt='name' />
                  </div>
                  <p className='nunito text-contact'>{acf.contattiNomeSocieta}</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <div className='h-6 w-6'>
                    <Image src={locationIcon} alt='address' />
                  </div>
                  <p className='nunito text-contact text-center'>{acf.contattiIndirizzo}</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <div className='h-6 w-6'>
                    <Image src={phoneIcon} alt='telephone' />
                  </div>
                  <p className='nunito text-contact'>{acf.contattiTelefono}</p>
                </div>
                <div className='flex flex-col items-center gap-1'>
                  <div className='h-6 w-6'>
                    <Image src={emailIcon} alt='email' />
                  </div>
                  <p className='nunito text-contact underline'>{acf.contattiEmail}</p>
                </div>
                {/* Linkedin */}
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6'>
                    {acf?.contattiLinkedinUrl && (
                    <Link href={acf.contattiLinkedinUrl}>
                      <Image src={linkedinIcon} alt='linkedin'/>
                    </Link>)}
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:ml-[16.66%] lg:pl-[16.66%] lg:w-5/6 w-full z-1 h-full flex flex-col flex-grow gap-4 p-6 bg-white shadow-lg rounded'>
              <div className='lg:px-16'>
                <div className='flex justify-between'>
                  <h2 className='xl:text-h2 lg:text-h3 text-h4 text-gs-black lg:mt-8' dangerouslySetInnerHTML={{ __html: acf.contattiTitle }}></h2>
                  <button className='block lg:hidden w-12' onClick={handleButtonClick}>
                    <img className={isIconFlipped ? 'rotate-180' : ''} src={toggleIcon.src} alt='showContactForm'/>
                  </button>
                </div>
                <div className={`flex flex-grow lg:mt-6 mt-2 transition-transform origin-top ${isFormVisible ? 'scale-y-100' : 'scale-y-0'}`}>
                {isFormVisible && <ContactForm/>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
    )
}