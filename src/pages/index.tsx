import Link from 'next/link'
import { getAllProjectSlugs, getProject, getPage, fetchCiHannoSceltoLogos, fetchImage, fetchLatest4News, getAllCategories } from '../lib/api'
import '../app/globals.css'
import '../app/globals.scss'

import AOS from 'aos'
import 'aos/dist/aos.css';

import Image from 'next/image'
import Layout from '../app/layout'
import { useEffect, useState, createContext } from 'react'

import Logo from '../../public/Logo Hero.svg'
import LinkShare from '../../public/link-share-svg.svg'
import DecorativeHome1 from '../../public/decorative element home 1.svg'
import DecorativeHome2 from '../../public/Home Chi Siamo new 1.svg'

import { useProjects } from '../contexts/ProjectsContext';
import { useCategories } from '../contexts/CategoriesContext';

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
        {/* Hero Section */}
        <div 
          className="bg-cover h-[calc(100vh-104px)] sm:h-[612px] p-10 flex items-center justify-center bg-medium-blue"
          style={{ 
            backgroundImage: heroImage?.src ? `url(${heroImage?.src})` : 
            `linear-gradient(rgba(0, 51, 76), rgba(0, 51, 76) )` 
          }}
        >
          <div className="logo-container flex flex-grow h-[212px]"></div>
          <div className="max-w-[920px] flex flex-col w-full h-full px-4 sm:px-0">
            <div className="flex flex-grow"></div>   
            <div className='flex flex-col sm:flex-row sm:space-x-[112px] w-full gap-5'>       
              <div className="flex-1 flex justify-center sm:justify-start h-[212px]">
              {(Logo.src && acf?.header_home_text) ? ( <>
                <img src={Logo.src} alt="Header Logo Image"  data-aos="fade-right" data-aos-delay="50"/>
              </>) : (<></>)}
              </div>  
              <div className="flex flex-1 sm:items-center justify-items-end items-end mt-8 sm:mt-0">
                <div className="block sm:hidden border-l h-[220px] border-white mr-4"></div>
                <p className="text-xl space-p-xl xl text-white" data-aos="fade-down" data-aos-delay="50">{acf?.header_home_text}</p>
              </div>    
            </div>
            <div className="sm:flex hidden flex-grow items-start">
              <div className="w-[208px] h-full vertical-line-logo"></div>
            </div>
          </div>
          <div className="flex flex-grow"></div>
        </div>


      {/* Chi Siamo Section */}
      <section className="relative md:flex md:items-center justify-center bg-off-white pt-[140px] md:py-28 md:pl-0 min-h-[678px]">
        <div className='lg:flex hidden justify-end absolute w-full max-w-[1106px] h-full z-0'>
          <div className='h-full w-[2px] bg-[#BDC9D3] z-10'></div> 
        </div>
        <div className='absolute left-0 top-0'>
          <img src={DecorativeHome1.src} alt="decorative"/>
        </div>
        <div className='absolute bottom-0 md:right-auto right-0 md:-ml-6 z-10 -mb-[62px]'>
          <img src={DecorativeHome2.src} alt="decorative"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-end md:pl-6">
          {/* Left div */}
          <div className="md:pl-0 px-6 md:mt-0 md:flex md:flex-col md:mr-28 justify-center max-w-[447px] text-dark-blue"
           data-aos="fade-right" 
          >
            <div className="flex flex-col gap-3 text-left z-20">
              <h2 className="text-h2 leading-[58px]">{acf?.chi_siamo_home_text ? "Chi Siamo": ""}</h2>
              <p className="space-p-l font-light">{acf?.chi_siamo_home_text}</p>
              <Link href="/chi-siamo">
                {acf?.chi_siamo_home_text ? (<button className="px-8 py-1.5 border-2 border-medium-blue text-medium-blue 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 min-h-10 mt-3">
                  {acf?.chi_siamo_home_button_text}
                </button>) : (<></>)}
              </Link>
            </div>
          </div>

          {/* Right div */}
          <div className="block ml-0 md:ml-3 mt-9 md:mt-0"
           data-aos="fade-up" 
          >
            <img src={images.chi_siamo_home_image?.src} />
          </div>
        </div>
      </section>

      {/* Servizi Section */}
      <section className="relative md:flex flex-col md:items-center justify-center bg-light-gray text-dark-blue overflow-hidden sm:mx-4">
        {/*Primo DIV orizzontale da dividere in 3 elementi verticali*/}
        <div className='flex h-28 w-full justify-center'>
          <div className='h-full'></div>
          <div className='flex-grow h-full max-w-[1106px] border-r-light-blue md:border-r-2 border-r-0'></div>
          <div className='h-full horizontal-line-home-1 flex align-bottom items-end'></div>
        </div>
        <div className='flex items-center justify-center'>
        {/*Secondo DIV orizzontale da dividere in 3 elementi verticali e in cui quello di 
        mezzo deve contenere il resto del contenuto*/}
          <div className="md:pl-0 pl-6"></div>
          <div className="container grid mx-auto md:grid-cols-2 md:gap-x-30 max-w-[1106px] md:order-first">
            {/* Left cell */}
            <div className="grid gap-y-10 md:mr-4 order-2 md:order-1">
              {/* First div */}
              <div className="flex items-center justify-center" data-aos="fade-right" data-aos-offset="200">
                <div className='flex p-6 bg-off-white items-start gap-4'>
                  <div className='min-w-[72px] min-h-[72px] p-4 bg-medium-blue'>
                  {images.servizi_elemento_1_image && (
                    <img className=''
                      src={images?.servizi_elemento_1_image.src} alt="Progettazione" />
                  )}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <a className='text-S1'>Progettazione</a>
                    <div className='text-m font-light wordpress-content li-list-inside' dangerouslySetInnerHTML={{ __html: acf?.servizi_elemento_1_text || '' }} />
                  </div>
                </div>
              </div>

              {/* Second div */}
              <div className="flex items-center justify-center" data-aos="fade-right" data-aos-offset="200">
                <div className='flex p-6 bg-off-white items-start gap-4'>
                  <div className='min-w-[72px] min-h-[72px] p-4 bg-medium-blue'>
                  {images.servizi_elemento_2_image && (
                    <img className=''
                      src={images?.servizi_elemento_2_image.src} alt="Direzione lavori e cantiere" />
                  )}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <a className='text-S1'>Direzione lavori e cantiere</a>
                    <div className='text-m font-light wordpress-content li-list-inside' dangerouslySetInnerHTML={{ __html: acf?.servizi_elemento_2_text || '' }} />
                  </div>
                </div>
              </div>

              {/* Third div */}
              <div className="flex items-center justify-center" data-aos="fade-right" data-aos-offset="200" >
              <div className='flex p-6 bg-off-white items-start gap-4 w-full'>
                  <div className='min-w-[72px] min-h-[72px] p-4 bg-medium-blue'>
                  {images.servizi_elemento_3_image && (
                    <img className=''
                      src={images?.servizi_elemento_3_image.src} alt="Project Management" />
                  )}
                  </div>
                  <div className='flex flex-col gap-1'>
                    <a className='text-S1'>Project Management</a>
                    <div className='text-m font-light wordpress-content li-list-inside' dangerouslySetInnerHTML={{ __html: acf?.servizi_elemento_3_text || '' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right cell */}
            <div className="mb-16 flex flex-col justify-center text-dark-blue order-1 md:order-2">
              <div className="md:ml-16 lg:ml-32 flex flex-col gap-3 text-left items-start justify-start" data-aos="fade-up" data-aos-offset="200" >
                <h2 className="text-h2 leading-[58px]">Servizi</h2>
                <p className="space-p-l text-l font-light">{acf?.servizi_home_text}</p>
                <Link href="/contatti"><button className="px-8 py-1.5 border-2 border-medium-blue text-medium-blue 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40 mt-3">
                  {acf?.servizi_home_button_text}
                </button></Link>
              </div>
            </div>
          </div>
        <div className="pr-6"></div>
        </div>
        <div className='flex sm:h-28 h-10 w-full justify-center'>
          <div className='h-full'></div>
          <div className='flex-grow h-full max-w-[1106px] border-r-light-blue md:border-r-2 border-r-0'></div>
          <div className='h-full horizontal-line-home-2 flex align-top items-start'></div>
        </div>
        
        {/*Terzo DIV orizzontale da dividere in 3 elementi verticali*/}
      </section>

      {/* Progetti Section */}
      <div className="bg-off-white">
{ progettiImagesLoaded ?  
  <section className="relative flex flex-col md:items-center bg-off-white min-h-[677px] pb-[68px] px-6 text-dark-blue">
  {/*Primo DIV orizzontale da dividere in 3 elementi verticali*/}
  <div className='flex h-24 w-full justify-center'>
    <div className='h-full'></div>
    <div className='flex-grow h-full max-w-[1106px] border-l-light-blue border-l-2'></div>
    <div className='h-full'></div>
  </div>
    <div className="flex flex-col container mx-auto max-w-[1106px] pt-4">
      <h2 className="text-h2 mb-14" data-aos="fade-right" data-aos-offset="200">
        {acf?.progetti_in_evidenza_home_title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:mb-6 mb-10">
        {progettiImagesLoaded && progetti.map((progetto, index) => {
          // Find the category with the matching ID
          const categorie = progetto?.acf.progetto_categoria
          ? progetto.acf.progetto_categoria.map(categoryId => categories.find(cat => cat.id === categoryId))
          : [];
          return(
            <a href={`/web/progetto#${progetto?.slug}`}  key={index}  data-aos="fade-up" data-aos-offset={`${200 + 100 * index}`} 
            className="relative flex h-80 bg-cover bg-center cursor-pointer"  
            style={{
              backgroundImage: progettiImages[index]?.src ? `linear-gradient(rgba(0,51,76,0.40),rgba(0,51,76,0.40)), url(${progettiImages[index]?.src})` : undefined 
            }}>
            <div className="hover:bg-light-blue/[.24] flex-grow">
              <div className="absolute bottom-0 p-6 w-full">
                <div className="flex flex-wrap md:flex-row flex-col md:items-center items-start gap-2 justify-start pb-2">
                  <div className="flex justify-center items-center min-w-14 h-5 px-3 uppercase bg-gray-200 text-center rounded-2xl text-tag-small">{progetto?.acf.progetto_anno_text}</div>
                  {categorie.map((category, index) => (
                  <div key={index} className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <div className="w-full overflow-hidden overflow-ellipsis">
                      {category ? category.name : 'No category'}
                    </div>
                  </div>
                  ))}
                </div>
                <p className='m text-off-white'>{progetto?.acf?.progetto_title}</p>
              </div> 
            </div>
            </a>
          )
        })}
      </div>
      <div className="flex justify-center">
        <Link href="progetti">
          <button className="px-8 py-1.5 border-2 border-medium-blue text-medium-blue 
                uppercase text-regular text-base hover:bg-light-blue cursor-pointer min-w-40"
                data-aos="fade-in">
            {acf?.progetti_in_evidenza_home_button_text}
          </button>
        </Link>
      </div>
    </div>
  </section>
  : <>
  <section className="relative md:flex md:items-center bg-off-white pt-[108px] pb-[68px] px-6 text-dark-blue">
  <div className="flex flex-col container mx-auto max-w-[1106px]">
    <h2 className="text-h2 mb-14">{acf?.progetti_in_evidenza_home_title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:mb-6 mb-10">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="relative flex h-80 bg-light-gray">
          <div className="hover:bg-light-blue/[.24] flex-grow">
            <div className="absolute bottom-0 p-6">
              <div className="flex flex-wrap gap-2 justify-start pb-2">

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-center">
      <Link href="progetti">
        <button className="px-8 py-1.5 border-2 border-medium-blue text-medium-blue 
              uppercase text-regular text-base hover:bg-light-blue cursor-pointer">
          {acf?.progetti_in_evidenza_home_button_text}
        </button>
      </Link>
    </div>
  </div>
</section>
  </>}
      </div>

      {/* Ci Hanno Scelto Section */}
      
      <section className="flex flex-col items-center justify-center bg-dark-blue">
        <div className="max-w-[1106px] text-center mb-16">
          <div className="mt-16 md:mt-14 mb-8">
            <a className="text-caption text-light-green">
              CI HANNO SCELTO
              </a>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-14 gap-y-5 md:gap-y-8 ml-6 mr-6 sm:mb-2 mb-0 max-w-[1106px] mx-auto">
            {logosLoaded && imageSrcs.map((src, index) => (
              <div key={index} className="opacity-60 mix-blend-screen	">
                <img src={src} alt="Logo" />
              </div>
            ))}
          </div>
        </div> 
      </section>
      
      {/* News Section */}
      {news && news.length > 0 && (
        <div className="bg-light-gray">
        <section className="relative md:flex md:items-center pt-12 pb-24 px-6 text-dark-blue">
          <div className="flex flex-col container mx-auto gap-10 max-w-[1106px]">
            <h3 className="text-h3">News</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Grid items */}
              {newsLoaded && news.map((item, index) => (
                <div key={index} className="flex sm:flex-row flex-col bg-off-white max-w-[640px]" 
                data-aos="fade-in" data-aos-offset={`${200 + 100 * index}`} 
                >
                  <img className="object-cover min-h-[152px] sm:max-h-full max-h-[152px] sm:max-w-[152px] max-w-full" src={item.image.src} alt={item.image.alt} />
                  <div className="flex flex-grow flex-col justify-center sm:px-6 sm:py-3 p-4 sm:min-h-[152px] min-h-auto overflow-hidden">
                    <div className="flex space-x-2 mb-2">
                      <div className="w-14 h-5 bg-light-gray text-center rounded-2xl text-tag">{item.year}</div>
                      {index === 0 && <div className="w-14 h-5 text-center rounded-2xl text-tag bg-light-green">NEW</div>}
                    </div>
                    <h2 className="l mb-1 text-l overflow-ellipsis">{item.title}</h2>
                    <p className="m text-m text-light-blue overflow-ellipsis ellipsis-2-lines">{item.text}</p>
                    {item.url_link && (
                        <Link href={item.url_link} className='flex flex-row gap-1 items-center'>
                            <div className='text-s text-medium-blue uppercase font-bold	leading-5'>{item.text_link}</div>
                            <img src={LinkShare.src} alt="Link icon" className='p-[2px]'/>
                        </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      )}
      
      </div>
    </Layout>
    </div>
    )
}