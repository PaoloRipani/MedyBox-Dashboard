import Link from 'next/link'
import { getAllProjectSlugs, getProject, getPage, fetchCiHannoSceltoLogos, fetchImage, fetchLatest4News, getAllCategories } from '../lib/api'
import '../app/globals.css'
import '../app/globals.scss'

import AOS from 'aos'
import 'aos/dist/aos.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState, createContext } from 'react'

import { useProjects } from '../contexts/ProjectsContext';
import { useCategories } from '../contexts/CategoriesContext';

import ImageTest from '../../public/Home Heading Image 1.png'

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
    progetti_in_evidenza_progetto_1?: string;
    progetti_in_evidenza_progetto_2?: string;
    progetti_in_evidenza_progetto_3?: string;
    progetti_in_evidenza_progetto_4?: string;
    progetti_in_evidenza_home_title?: string;
    progetti_in_evidenza_home_button_text?: string;
    header_background_image?: string;
    header_logo_image?: string;
    header_home_text?: string;
    servizi_elemento_1_image?: string;
    servizi_elemento_1_text?: string;
    servizi_elemento_2_image?: string;
    servizi_elemento_2_text?: string;
    servizi_elemento_3_image?: string;
    servizi_elemento_3_text?: string;
    ci_hanno_scelto_home_image_logos?: string;
    chi_siamo_home_image?: string;
    chi_siamo_home_text?: string;
    chi_siamo_home_button_text?: string;
    servizi_home_text?: string;
    servizi_home_button_text?: string;
    // Add other acf properties as needed
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

  useEffect(() => {
    console.log("Projects contexts while loading: ", projects2);
    if (!loading2) {
      console.log("Projects contexts: ", projects2);
    }
  }, [projects2, loading2]);

  useEffect(() => {
    //console.log("A: home contexts projects2 :", projects2)
    //console.log("A: home contexts categories2 :", categories2)
    const fetchData = async () => {
      //console.log("B: home contexts projects2 :", projects2)
      //console.log("B: home contexts categories2 :", categories2)
      try {
        const homePage = await getPage('home')
        setAcf(homePage.acf)
        const slugs: string[] = await getAllProjectSlugs()
        const projects: any[] = await Promise.all(slugs.map((slug: string) => getProject(slug)))

        setProjects(projects)
        fetchNews()

        const categoriestemp = await getAllCategories()

        setCategories(categoriestemp)
      } catch (err) {
        setIsLoading(true)
      }
    }

    fetchData().then(() => {
      setProjectsLoaded(true)
      setPageLoaded(true)
      setCategoriesLoaded(true)
      //console.log("2 projects: ",projects)
      //console.log("2 homePage.acf: ",acf)
      //console.log("2 news: ",news)
      //console.log("2 categories: ",categories)
    })
  }, [])

  //console.log("homepage acf:" , acf)
  //console.log("projects:" , projects)

  useEffect(() => {
    if (!progetti) return

    //console.log("2B progetti: ",progetti)
    //console.log("progetti images: ",progettiImages)
    
  }, [progetti])

  useEffect(() => {
    if (!pageLoaded) return 

    
    const fetchHeroImage = async () => {
      if (!(acf as any)) {
        return
      }
      const imageData = await fetchImage((acf as any).header_background_image)
      setHeroImage(imageData)
      setHeroImageLoaded(true)
    }
    
    const fetchImages = async () => {
      if (!(acf as any)) {
          return
      }

      const imageNames: Record<string, any> = {
          'chi_siamo_home_image': (acf as any).chi_siamo_home_image,
          //'header_background_image': (acf as any).header_background_image,
          'header_logo_image': (acf as any).header_logo_image,
          'servizi_elemento_1_image': (acf as any).servizi_elemento_1_image,
          'servizi_elemento_2_image': (acf as any).servizi_elemento_2_image,
          'servizi_elemento_3_image': (acf as any).servizi_elemento_3_image,
      };
      const fetchedImages: Record<string, { src: string; width: number; height: number }> = {};

      for (const [name, id] of Object.entries(imageNames)) {
        const imageData = await fetchImage(id)
        fetchedImages[name] = {
          src: imageData.src,
          width: imageData.width,
          height: imageData.height
        }
      }
      setImages(fetchedImages);
    }

    fetchHeroImage();

    fetchImages().then(() => {
      setPageImagesLoaded(true),
      console.log('fetched images: ', images)
      //,console.log('fetched progetti images: ', progettiImages)
      }) 
    // Set pageImagesLoaded to true after fetching images
  }, [pageLoaded])

  useEffect(() => {
    if (!pageLoaded) return // Don't fetch images until page data is loaded

    // Extract the project IDs from homePage.acf
    const projectIds = [
        acf.progetti_in_evidenza_progetto_1,
        acf.progetti_in_evidenza_progetto_2,
        acf.progetti_in_evidenza_progetto_3,
        acf.progetti_in_evidenza_progetto_4,
    ]

    // Find the corresponding projects in `projects`
    const progetti = projectIds.map(id => projects.find(project => project.id === id))

    // Fetch the images for each project
    const fetchProgettiImages = async () => {
        const images = await Promise.all(
            progetti.map(progetto => fetchImage(progetto?.acf.progetto_header_background_image))
        )

        const projectsWithDetails = await Promise.all(progetti.map(async (proj) => {
            const categoryNames = proj?.acf.progetto_categoria.map(categoryId => {
                const category = categories.find(cat => cat.id === categoryId);
                return category ? category.name : 'No category';
            });

            return {
                ...proj,
                categoryName: categoryNames
            }
        }))

        const validProjectsWithDetails = projectsWithDetails.filter(proj => proj !== undefined) as SimilarProjectData[];
        setProgetti(validProjectsWithDetails)
        setProgettiImages(images) // Store the images in state
    }

    fetchProgettiImages().then(() => setProgettiImagesLoaded(true))
}, [pageLoaded, projects, categories])

  const fetchProgettoCategoria = async (id : any) => { 
    const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/progetto_category/${id}`)
    const data = await response.json()
    //console.log("data fetchProgettoCategoria" , data)
    return {name : data.name}
  }

  const fetchProgettoImage = async (id : any) => {
    const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/media/${id}`)
    const data = await response.json()
    
    return {
      src: data.guid.rendered,
      width: data.media_details.width,
      height: data.media_details.height
    }
  }

  const fetchNews = async () => {
    const res = await fetchLatest4News();
    setNews(res);
    setNewsLoaded(true);
  }
  
  const  fetchCiHannoScelto = async (element : any) =>{
    const srcs = await fetchCiHannoSceltoLogos(element)
    setImageSrcs(srcs as any)
    setLogosLoaded(true)
  }

  useEffect(() => {
    fetchCiHannoScelto(acf.ci_hanno_scelto_home_image_logos)
  }, [acf])

  useEffect(() => {
    //console.log("2 fetched images: " , images)
    //console.log("2 fetched progetti images: " , progettiImages)
  }, [pageImagesLoaded])

  return (
      <div>
        <Layout> 
          <div>

        {/* First Section */}
        {/* 2 colonne, quella di sinistra con 3 elementi verticali, quella di destra con immagine.
          quando mobile la colonna di sinistra va sopra quella di destra. */}
          <div className='flex w-full min-h-[640px] bg-gs-white'>
            <div className='w-full h-full'>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 items-stretch h-full">
                <div className='flex justify-end items-end flex-grow row-span-1 row-start-2'>
                  <div className="flex flex-col gap-3 text-left z-20 max-w-[553px] ">
                    <h2 className="text-h1 text-gs-black">Designed for builders</h2>
                    <p className="nunito space-p-l font-light pr-16 text-gs-black">
                      Un software all'avanguardia per la gestione integrata di qualità, ambiente e sicurezza nei cantieri. Massimizza l'efficienza con un'interfaccia intuitiva, prestazioni ottimali e convenienza immediata. Facile da adottare, potenzia la produttività e la conformità normativa. 
                      Un investimento imprescindibile per chi punta alla massima sicurezza e efficienza.
                    </p>
                    <Link href="/chi-siamo">
                      <button className="px-8 py-1.5 bg-yellow-3 
                      uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                        Contattaci
                      </button>
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
                    <div className='h-full'>
                      <img src={ImageTest.src} alt="Image 1" className='object-cover h-full'/>
                    </div>
                    <div className='h-full'>
                      <img src={ImageTest.src} alt="Image 2"  className='object-cover h-full'/>
                    </div>
                    <div className='h-full'>
                      <img src={ImageTest.src} alt="Image 3"  className='object-cover h-full'/>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>

        {/* Second Section - chi siamo */}
        {/*  unico contenitore, elemento grafico allineato a sinistra, 2 elementi verticali */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-grey-1'>
          <div className='max-w-[1106px]'>
            {/* decorazione a sinistra */}
            <div className='flex flex-col max-w-[730px]'>
              <h1 className="text-h1 text-gs-black">chi siamo</h1>
              <p className='nunito  text-gs-black'>Siamo Gesiqa Technology e offriamo soluzioni informatiche innovative per organizzare le attività 
                e gestire la sicurezza sul lavoro, la qualità e l’ambiente nel settore edile.
                Abbiamo sviluppato il software Gesiqa: un prodotto all’avanguardia, intuitivo e facilmente 
                fruibile on-line, realizzato su misura per gestire e tenere sotto controllo ogni processo 
                interno alle imprese di costruzione.
              </p>
            </div>
          </div>
        </div>

        {/* Third Section - perché sceglierci */}
        {/* contenitore con griglia su 3 colonne in desktop e 1 colonna in mobile.
        ogni elemento della graiglia ha 3 elementi in verticale */}

        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white'>
          <div className='max-w-[1106px] flex flex-col gap-8 items-center'>
            <h2 className='text-h1 text-gs-black'>perché sceglierci</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg'>
                <div className='h-20 w-20 bg-slate-600'></div>
                <h4>titolo 1</h4>
                <p className='nunito '>testo 1</p>
              </div>
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg'>
                <div className='h-20 w-20 bg-slate-600'></div>
                <h4>titolo 2</h4>
                <p className='nunito '>testo 2</p>
              </div> 
              <div className='flex flex-col p-8 bg-white text-gs-black shadow-lg'>
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
              <h2 className='text-h2'>Scopri il software Gesiqa</h2>
              <p className='nunito'>Gesiqa è un prodotto integrato, un’applicazione software per la gestione documentale, 
                operativa e di controllo della Sicurezza, della Qualità e dell’ Ambiente in 
                tutti i settori produttivi, con particolare predisposizione per il settore delle 
                Costruzioni
              </p>
              <Link href=''>
                <button className="px-8 py-1.5 bg-yellow-3 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                  Approfondisci
                </button>
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
                <div className='flex flex-col gap-4 p-8 bg-white'>
                  <div className='h-24 w-24 bg-slate-600'></div>
                  <h4 className=' text-gs-black'>titolo 1</h4>
                  <p className='nunito text-gs-black'>testo 1</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 -mt-10 p-8 bg-white'>  
                    <div className='h-24 w-24 bg-slate-600'></div>
                    <h4 className=' text-gs-black'>titolo 2</h4>
                    <p className='nunito text-gs-black'>testo 2</p>
                  </div>
                </div>
                <div className='flex flex-col gap-4 p-8 bg-white'>
                  <div className='h-24 w-24 bg-slate-600'></div>
                  <h4 className=' text-gs-black'>titolo 3</h4>
                  <p className='nunito text-gs-black'>testo 3</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <div className='flex flex-col gap-4 -mt-10 p-8 bg-white'>  
                    <div className='h-24 w-24 bg-slate-600'></div>
                    <h4 className=' text-gs-black'>titolo 4</h4>
                    <p className='nunito text-gs-black'>testo 4</p>
                    </div>
                </div>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <div className='flex flex-col pl-28'>
                  <h1 className='text-h1 text-gs-black'>i vantaggi</h1>
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
              <h2 className='text-h2'>Vuoi saperne di più su tutte le funzioni di Gesiqa?</h2>
              <Link href=''>
                <button className="px-8 py-1.5 bg-yellow-3 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                  scarica la brochure
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Seventh Section - il nostro target */}
        {/* due colonne che in mobile si allineano una sopra l'altra.
        a sinistra 3 elementi in verticale e a destra 3 elementi in verticale da 2 elementi orizzontali ciascuno */}
        
        <div className='flex w-full items-center justify-center min-h-[640px] bg-gs-white'>
          <div className='max-w-[1106px]'>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col pr-28'>
                <h1 className='text-h1 text-gs-black'>il nostro target</h1>
                <p className='nunito text-grey-4'>Ci rivolgiamo ad imprese di costruzioni che gestiscono appalti di lavori 
                  pubblici e privati e che vogliono semplificare la gestione della sicurezza, 
                  della qualità e dell’ambiente nei cantieri.
                  Offriamo una soluzione personalizzata anche per i liberi professionisti 
                  operanti nel settore delle costruzioni (Società di consulenza, Direttori 
                  dei lavori e Coordinatori per la sicurezza)
                </p>
                <Link href=''>
                <button className="px-8 py-1.5 bg-yellow-3 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                  contattaci
                </button>
                </Link>
              </div>
              <div className='flex flex-col gap-16 pl-28'>
                <div className='flex gap-6 bg-white justify-center items-center'>
                  <div className='h-28 w-28 bg-yellow-1'></div>
                  <h3 className='text-h3 text-gs-black flex-grow'>imprese di costruzione</h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center'>
                  <div className='h-28 w-28 bg-yellow-2'></div>
                  <h3 className='text-h3 text-gs-black flex-grow'>Professionisti</h3>
                </div>
                <div className='flex gap-6 bg-white justify-center items-center'>
                  <div className='h-28 w-28 bg-yellow-3'></div>
                  <h3 className='text-h3 text-gs-black flex-grow'>Aziende di consulenza</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Eight Section - contatti */}
        {/* 2 elementi in orizzontale. a sinistra ci sono 6 elementi in verticale.
        a destra ci sono 2 elementi di cui uno è contact form. 
        in mobile si dispongono al contrario. */}
        <div className='flex w-full items-center justify-center min-h-[640px]'>
          <div className='w-full max-w-[1106px]'>
            <div className='grid grid-cols-2'>
              <div className='flex flex-col justify-center items-center gap-8 p-8 bg-yellow-3 max-w-96'>
                <h2 className='text-h2'>contatti</h2>
                <div className='flex flex-col gap-5 items-center justify-center'>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 bg-white'></div>
                    <p className='nunito'>Gesiqa Technology Srl</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 bg-white'></div>
                    <p className='nunito'>Via Vittorio Metz, 45 <br/> 00173 Roma, Italia</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 bg-white'></div>
                    <p className='nunito'>+39 06 79811702</p>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 bg-white'></div>
                    <p className='nunito'>info@gesiqa.it</p>
                  </div>
                  {/* Linkedin */}
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 bg-white'></div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col flex-grow gap-4 p-6 bg-gs-white'>
                <h2 className='text-h2 text-gs-black'>hai qualcosa da chiederci? scrivici!</h2>
                <div className='flex flex-grow bg-orange-200'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
    )
}