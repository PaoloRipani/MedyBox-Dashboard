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

import { useProjects } from '../contexts/ProjectsContext';
import { useCategories } from '../contexts/CategoriesContext';

import ImageTest from '../../public/Home Heading Image 1.png'
import ContactForm from '@/components/contactus'

export default function Home() {

  useEffect(() => {
    AOS.init({
      delay: 100,
    });
  }, []);
  
  type ImageData = {
    src: string;
    width: number;
    height: number;
  };

  type ImagesData = {
    header_background_image?: ImageData;
    chi_siamo_home_image?: ImageData;
    servizi_elemento_1_image?: ImageData;
    servizi_elemento_2_image?: ImageData;
    servizi_elemento_3_image?: ImageData;
    // Add other image properties as needed
  };
  
  type CategoryData = {
    id: string;
    name: string;
    // Add other category properties as needed
  };
    
  type NewsData = {
    image: {
      src: string;
      alt: string;
    };
    year: string;
    title: string;
    text: string;
    text_link?: string;
    url_link?: string;
    // Add other news properties as needed
  };

  type ProjectData = {
    id: string;
    slug: string;
    acf: {
      progetto_header_background_image: string;
      progetto_anno_text: string;
      progetto_categoria: string[];
      progetto_title: string;
      // Add other acf properties as needed
    };
    // Add other project properties as needed
  };

  type SimilarProjectData = ProjectData & {
    imageSrc: string;
    categoryName: string[];
};

  type AcfData = {
    [key: string]: any;
  };
  
  const [imageSrcs, setImageSrcs] = useState([])
  const [images, setImages] = useState<ImagesData>({});
  const [progettiImages, setProgettiImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [progetti, setProgetti] =  useState<(ProjectData | undefined)[]>([]);

  const [acf, setAcf] = useState<AcfData>({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [pageLoaded, setPageLoaded] = useState(false)
  const [pageImagesLoaded, setPageImagesLoaded] = useState(false)
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [progettiImagesLoaded, setProgettiImagesLoaded] = useState(false)
  const [categoriesLoaded, setCategoriesLoaded] = useState(false)
  const [logosLoaded, setLogosLoaded] = useState(false)
  const [newsLoaded, setNewsLoaded] = useState(false)
  const [isHeroImageLoaded, setHeroImageLoaded] = useState(false);
  const [heroImage, setHeroImage] = useState<ImageData>()

  const { projects2, loading2 } = useProjects();

  const categories2 = useCategories();

  function applyColorToApostrophes(text: string) {
    return text.replace(/'([^']*)'/g, "<span style='color: #F59D21;'>$1</span>");
  }

  useEffect(() => {
    console.log("Projects contexts while loading: ", projects2);
    if (!loading2) {
      console.log("Projects contexts: ", projects2);
    }
  }, [projects2, loading2]);

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
        resFetchHomepageACF.heroTitle = applyColorToApostrophes(resFetchHomepageACF.heroTitle);
        resFetchHomepageACF.chiSiamoTitle = applyColorToApostrophes(resFetchHomepageACF.chiSiamoTitle);
        resFetchHomepageACF.percheSceglierciTitle = applyColorToApostrophes(resFetchHomepageACF.percheSceglierciTitle);
        resFetchHomepageACF.ilNostroTargetTitle = applyColorToApostrophes(resFetchHomepageACF.ilNostroTargetTitle);
        resFetchHomepageACF.scopriIlSoftwareTitle = applyColorToApostrophes(resFetchHomepageACF.scopriIlSoftwareTitle);
        resFetchHomepageACF.vantaggiTitle = applyColorToApostrophes(resFetchHomepageACF.vantaggiTitle);
        resFetchHomepageACF.vuoiSaperneDiPiuTitle = applyColorToApostrophes(resFetchHomepageACF.vuoiSaperneDiPiuTitle);
        resFetchHomepageACF.contattiTitle = applyColorToApostrophes(resFetchHomepageACF.contattiTitle);
        setAcf(resFetchHomepageACF);

      } catch (err) {
        setIsLoading(true)
      }
    }

    fetchData().then(() => {
      setProjectsLoaded(true)
      setPageLoaded(true)
      setCategoriesLoaded(true)
      
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
          <div className='flex w-full h-[640px] bg-gs-white section'>
          <div className='anchor' id="home"></div>
            <div className='w-full h-full'>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 items-stretch h-full">
                <div className='flex justify-end items-end flex-grow row-span-1 row-start-2'>
                  <div className="flex flex-col items-start gap-3 text-left z-20 max-w-[553px] ">
                    <h2 className="text-h1 text-gs-black" dangerouslySetInnerHTML={{ __html: acf.heroTitle }}></h2>
                    <p className="nunito space-p-l font-light pr-16 text-gs-black">
                      Un software all'avanguardia per la gestione integrata di qualità, ambiente e sicurezza nei cantieri. Massimizza l'efficienza con un'interfaccia intuitiva, prestazioni ottimali e convenienza immediata. Facile da adottare, potenzia la produttività e la conformità normativa. 
                      Un investimento imprescindibile per chi punta alla massima sicurezza e efficienza.
                    </p>
                    <Link href='/#contattaci'>
                    <div className="border-0 text-white flex justify-start
                    h-10 relative mt-6">
                      <button type="submit" className='w-40 pr-2 flex items-center justify-center cursor-pointer '>
                          <svg width="164" height="40" className='absolute z-0 left-0'>
                            <path d="M0,0 h148 l16,20 l-16,20 h-148z" fill="#ef7923" />
                          </svg>
                          <span className='z-20 leading-button secular'>contattaci</span>
                      </button>
                    </div>
                    </Link>
                  </div>
                </div>
                <div className='bg-slate-400 flex-grow row-span-full relative'>
                  {/* immagine */}
                  <Slider
                    dots={true}
                    dotsClass='absolute inset-x-0 bottom-0'
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={2000}
                    arrows={false}
                    className='h-full object-cover relative'
                  >
                    {imageUrls.map((url, index) => (
                      <div key={index} className='h-full'>
                        <img src={url} alt={`Image ${index + 1}`} className='object-cover h-full'/>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

        {/* Second Section - chi siamo */}
        {/*  unico contenitore, elemento grafico allineato a sinistra, 2 elementi verticali */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-grey-1 section'>
        <div className='anchor' id='chi-siamo'></div>
          <div className='max-w-[1106px]'>
            {/* decorazione a sinistra */}
            <div className='flex flex-col max-w-[730px]'>
              <h1 className="text-h1 text-gs-black" dangerouslySetInnerHTML={{ __html: acf.chiSiamoTitle }}></h1>
              <p className='nunito  text-gs-black' dangerouslySetInnerHTML={{ __html: acf.chiSiamoDescription }}>
              </p>
            </div>
          </div>
        </div>

        {/* Third Section - perché sceglierci */}
        {/* contenitore con griglia su 3 colonne in desktop e 1 colonna in mobile.
        ogni elemento della graiglia ha 3 elementi in verticale */}

        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white section'>
        <div className='anchor' id='perche-sceglierci'></div>
          <div className='max-w-[1106px] flex flex-col gap-8 items-center'>
            <h2 className='text-h1 text-gs-black' dangerouslySetInnerHTML={{ __html: acf.percheSceglierciTitle }}></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20 bg-slate-600'></div>
                <h4>titolo 1</h4>
                <p className='nunito '>testo 1</p>
              </div>
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20 bg-slate-600'></div>
                <h4>titolo 2</h4>
                <p className='nunito '>testo 2</p>
              </div> 
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg rounded'>
                <div className='h-20 w-20 bg-slate-600'></div>
                <h4>titolo 3</h4>
                <p className='nunito '>testo 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fourth Section - scopri il software */}
        {/*  unico contenitore, 3 elementi verticali */}
        <div className='flex w-full items-center justify-center min-h-[400px] bg-black'>
          <div className='w-full max-w-[1106px]'>
            <div className='flex flex-col items-start w-1/2'>
              <h2 className='text-h2' dangerouslySetInnerHTML={{ __html: acf.scopriIlSoftwareTitle }}></h2>
              <p className='nunito'>Gesiqa è un prodotto integrato, un’applicazione software per la gestione documentale, 
                operativa e di controllo della Sicurezza, della Qualità e dell’ Ambiente in 
                tutti i settori produttivi, con particolare predisposizione per il settore delle 
                Costruzioni
              </p>
              <Link href='/il-software'>
                <div className="border-0 text-white flex justify-start
                h-10 relative mt-6">
                  <button type="submit" className='w-44 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="184" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h168 l16,20 l-16,20 h-168z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular'>approfondisci</span>
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
        <div className='flex w-full items-center justify-center min-h-[400px] py-20 bg-gs-white'>
          <div className='max-w-[1106px]'>
            <div className='grid grid-cols-2'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-4 p-8 bg-white shadow-lg rounded'>
                  <div className='h-24 w-24 bg-slate-600'></div>
                  <h4 className=' text-gs-black'>titolo 1</h4>
                  <p className='nunito text-gs-black'>testo 1</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 -mt-10 p-8 bg-white shadow-lg rounded'>  
                    <div className='h-24 w-24 bg-slate-600'></div>
                    <h4 className=' text-gs-black'>titolo 2</h4>
                    <p className='nunito text-gs-black'>testo 2</p>
                  </div>
                </div>
                <div className='flex flex-col gap-4 p-8 bg-white shadow-lg rounded'>
                  <div className='h-24 w-24 bg-slate-600'></div>
                  <h4 className=' text-gs-black'>titolo 3</h4>
                  <p className='nunito text-gs-black'>testo 3</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 -mt-10 p-8 bg-white shadow-lg rounded'>  
                    <div className='h-24 w-24 bg-slate-600'></div>
                    <h4 className=' text-gs-black'>titolo 4</h4>
                    <p className='nunito text-gs-black'>testo 4</p>
                    </div>
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex flex-col pl-28'>
                  <h1 className='text-h1 text-gs-black' dangerouslySetInnerHTML={{ __html: acf.vantaggiTitle }}></h1>
                  <p className='nunito text-gs-black'>Gesiqa gestisce tutto ciò di cui hai bisogno per gestire la Sicurezza, la Qualità e l'Ambiente 
                    nei cantieri.
                    Potrai ottimizzare e semplificare le attività di routine, risparmiare risorse, ridurre i tempi e 
                    gli errori. Inoltre, avrai la completa digitalizzazione dei processi che girano attorno all’attività 
                    di cantiere e l'immediata disponibilità in caso di ispezioni.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sixth Section - vuoi saperne di più */}
        {/* unico contenitore con 2 elementi in verticale */}
        
        <div className='flex w-full items-center justify-center min-h-[400px] bg-black'>
          <div className='w-full max-w-[1106px]'>
            <div className='flex flex-col items-start w-1/2'>
              <h2 className='text-h2' dangerouslySetInnerHTML={{ __html: acf.vuoiSaperneDiPiuTitle }}></h2>
              <Link href='/#contattaci'>
                <div className="border-0 text-white flex justify-start
                h-10 relative mt-6">
                  <button type="submit" className='w-64 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="256" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h240 l16,20 l-16,20 h-240z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular'>scarica la brochure</span>
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Seventh Section - il nostro target */}
        {/* due colonne che in mobile si allineano una sopra l'altra.
        a sinistra 3 elementi in verticale e a destra 3 elementi in verticale da 2 elementi orizzontali ciascuno */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white section'>
        <div className='anchor' id='target'></div>
          <div className='max-w-[1106px]'>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col items-start pr-28'>
                <h1 className='text-h1 text-gs-black mb-2' dangerouslySetInnerHTML={{ __html: acf.ilNostroTargetTitle }}></h1>
                <p className='nunito text-grey-4 text-l'>Ci rivolgiamo ad imprese di costruzioni che gestiscono appalti di lavori 
                  pubblici e privati e che vogliono semplificare la gestione della sicurezza, 
                  della qualità e dell’ambiente nei cantieri.
                  Offriamo una soluzione personalizzata anche per i liberi professionisti 
                  operanti nel settore delle costruzioni (Società di consulenza, Direttori 
                  dei lavori e Coordinatori per la sicurezza)
                </p>
                <Link href='/#contattaci'>
                <div className="border-0 text-white flex justify-start
                h-10 relative mt-6">
                  <button type="submit" className='w-36 pr-2 flex items-center justify-center cursor-pointer '>
                      <svg width="144" height="40" className='absolute z-0 left-0'>
                        <path d="M0,0 h128 l16,20 l-16,20 h-128z" fill="#ef7923" />
                      </svg>
                      <span className='z-20 leading-button secular'>contattaci</span>
                  </button>
                </div>
                </Link>
              </div>
              <div className='flex flex-col gap-16 pl-24'>
                <div className='flex gap-6 bg-white justify-center items-center mr-28 overflow-hidden shadow-lg rounded'>
                  <div className='min-h-28 min-w-28 bg-yellow-1'></div>
                  <h3 className='text-h3 text-gs-black flex-grow pr-6'>imprese di costruzione</h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center ml-28 overflow-hidden	shadow-lg rounded'>
                  <div className='min-h-28 min-w-28 bg-yellow-2'></div>
                  <h3 className='text-h3 text-gs-black flex-grow pr-6'>Professionisti</h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center mr-28 overflow-hidden	shadow-lg rounded'>
                  <div className='min-h-28 min-w-28 bg-yellow-3'></div>
                  <h3 className='text-h3 text-gs-black flex-grow pr-6'>Aziende di consulenza</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eight Section - contatti */}
        {/* 2 elementi in orizzontale. a sinistra ci sono 6 elementi in verticale.
        a destra ci sono 2 elementi di cui uno è contact form. 
        in mobile si dispongono al contrario. */}
        <div className='flex w-full items-stretch justify-center min-h-[640px] py-16 bg-gs-white section'>
        <div className='anchor' id='contattaci'></div>
          <div className='w-full max-w-[1106px] relative'>
            <div className='absolute z-10 top-0 left-0 w-2/6 flex flex-col justify-center items-center gap-8 p-8 my-8 bg-yellow-3 max-w-96 shadow-lg rounded h-[calc(100%-64px)]'>
              <h3 className='text-contact-title text-center border-b-2 border-yellow-2 h-12 w-full'>contatti</h3>
              <div className='flex flex-col gap-5 items-center justify-center'>
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6 bg-white'></div>
                  <p className='nunito text-contact'>Gesiqa Technology Srl</p>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6 bg-white'></div>
                  <p className='nunito text-contact'>Via Vittorio Metz, 45 <br/> 00173 Roma, Italia</p>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6 bg-white'></div>
                  <p className='nunito text-contact'>+39 06 79811702</p>
                </div>
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6 bg-white'></div>
                  <p className='nunito text-contact'>info@gesiqa.it</p>
                </div>
                {/* Linkedin */}
                <div className='flex flex-col items-center'>
                  <div className='h-6 w-6 bg-white'></div>
                </div>
              </div>
            </div>
            <div className='ml-[16.66%] pl-[16.66%] w-5/6 z-1 h-full flex flex-col flex-grow gap-4 p-6 bg-white shadow-lg rounded'>
              <div className='px-16'>
                <h2 className='text-h2 text-gs-black mt-8' dangerouslySetInnerHTML={{ __html: acf.contattiTitle }}></h2>
                <div className='flex flex-grow mt-6'>
                  <ContactForm></ContactForm>
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