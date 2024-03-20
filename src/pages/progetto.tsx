import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllProjectSlugs, getProject, getAllProjects, getAllCategories, getPage } from '../lib/api'
import Layout from '@/app/layout'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Modal from 'react-modal';

import AOS from 'aos'
import 'aos/dist/aos.css';

import '../app/style.min.css';
import '../app/theme.min.css';
import '../app/common.min.css';

import AnnoIcon from '../../public/Anno Progetto Icon.svg'
import CommittenteIcon from '../../public/Committente Progetto Icon.svg'
import PosizioneIcon from '../../public/Posizione Progetto Icon.svg'
import RuoloIcon from '../../public/Ruolo Progetto Icon.svg'

export default function SingleProject() {
    useEffect(() => {
      AOS.init();
    }, []);

    type ProjectData = {
        id: string;
        slug: string;
        acf: {
          progetto_header_background_image: string;
          progetto_categoria: string[];
          progetto_title: string;
          progetti_simili: string[];
          progetto_header_text: string;
          progetto_committente_text: string;
          progetto_posizione_text: string;
          progetto_ruolo_text: string;
          progetto_anno_text: string;
          //progetto_description_area: string;
          // Add other acf properties as needed
        };
        content: {
            rendered: string;
        };
        // Add other project properties as needed
      };

    type SimilarProjectData = ProjectData & {
        imageSrc: string;
        categoryName: string[];
    };

    type ImageData = {
        src: string;
        width: number;
        height: number;
    };

    type ImagesData = {
        header_image?: ImageData;
        // Add other image properties as needed
      };
    
    type CategoryData = {
        id: string;
        name: string;
        // Add other category properties as needed
    };

    const [project, setProject] = useState<ProjectData>();
    const [projectLoaded, setProjectLoaded] = useState(false)
    const [projects, setProjects] = useState<(ProjectData | undefined)[]>([]);
    const [projectsLoaded, setProjectsLoaded] = useState(false)
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false)
    const [page, setPage] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false)
    const [similarProjects, setSimilarProjects] = useState<(SimilarProjectData | undefined)[]>([]);
    const [similarProjectsLoaded, setSimilarProjectsLoaded] = useState(false)
    const [images, setImages] = useState<ImagesData>({});
    const [pageImagesLoaded, setPageImagesLoaded] = useState(false)
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');
    const contentRef = useRef<HTMLDivElement | null>(null);

    const openModal = (imageSrc: string) => {
        setModalImageSrc(imageSrc);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
    setIsModalOpen(false);
    };

    useEffect(() => {
        const handleImageClick = (event : any) => {
          if (event.target.tagName === 'IMG') {
            console.log('Image clicked:', event.target.src);
            openModal(event.target.src);
          }
        };
      
        const contentEl = contentRef.current;
        if (contentEl) {
            contentEl.addEventListener('click', handleImageClick);
        
            // Clean up the event listener when the component unmounts
            return () => {
            contentEl.removeEventListener('click', handleImageClick);
            };
        }
    }, [project]);

    useEffect(() => {
        // Get the hash from the URL (without the '#')
        const hash = router.asPath.split('#')[1]

        // If there's a hash, find the corresponding project
        if (hash) {
            const matchingProject = projects.find(project => project?.slug === hash)
            console.log("matchingProject: " ,matchingProject)

            // If a matching project is found, set it
            if (matchingProject) {
                
                const setProjectData = async () => {
                    // Create a new DOMParser
                    const parser = new DOMParser();
                    // Parse the HTML string into a DOM
                    const doc = parser.parseFromString(matchingProject.content.rendered, 'text/html');
                    // Add classes to p and h2 elements
                    doc.querySelectorAll('p').forEach(p => p.classList.add('text-l','space-p-l','l','mt-3'));
                    doc.querySelectorAll('h1').forEach(h1 => h1.classList.add('h1','text-h1','mt-3'));
                    doc.querySelectorAll('h2').forEach(h2 => h2.classList.add('h2','text-h2','mt-3'));
                    doc.querySelectorAll('h3').forEach(h3 => h3.classList.add('h3','text-h3','mt-3'));
                    doc.querySelectorAll('h4').forEach(h4 => h4.classList.add('h4','text-h4','mt-3'));
                    doc.querySelectorAll('img').forEach(img => img.classList.add('cursor-pointer'));
                    // Add onClick event to img elements
                    doc.querySelectorAll('img').forEach(img => {
                        img.addEventListener('click', () => openModal(img.src));
                    });
                    // Serialize the DOM back into a string
                    matchingProject.content.rendered = doc.body.innerHTML;
                    setProject(matchingProject)
                    console.log('Setting project: ' + matchingProject)
                }

                setProjectData().then(() => setProjectLoaded(true))
            }
        } else {
            // If there's no hash, clear the selected project
            console.log("router.asPath else: ",router.asPath)
            //router.push("/progetti")
        }
      }, [router.asPath, projects])

    useEffect(() => {

        //if (!router.query.slug) {return}

        /*
        const fetchProjectData = async () => {
            console.log("router query slug: ", router.query.slug);
            const project = await getProject(router.query.slug);
            const categories = await getAllCategories();
            const page = await getPage("progetti");

            setProject(project);
            setCategories(categories);
            setPage(page);
        };
        */

        const fetchPageData = async () => {
            const categories = await getAllCategories();
            const page = await getPage("progetti");
            setCategories(categories);
            setPage(page);
        }
        
        const fetchProjectsData = async () => {            
            const projects = await getAllProjects();
            setProjects(projects);
        };
        
        /*
        fetchProjectData().then(() => {
            setProjectLoaded(true)
            setPageLoaded(true)
            setCategoriesLoaded(true)
        });
        */

        fetchPageData().then(() => {
            setPageLoaded(true)
            setCategoriesLoaded(true)
        });
        
        fetchProjectsData().then(() => {
            setProjectsLoaded(true)
        });
    }, [router.query.slug]);

    const fetchImage = async (id : any) => {
        const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/media/${id}`)
        const data = await response.json()
        //console.log("data" , data)

        return {
          src: data.guid.rendered,
          width: data.media_details.width,
          height: data.media_details.height
        }
    }

    const fetchImages = async () => {
        
        if (!(project as any)) {
            return
        }

        const imageNames: Record<string, any> = {
            'header_image': (project as any).acf.progetto_header_background_image,
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

        setImages(fetchedImages)
    }

    useEffect(() => {
        console.log("loaded project data: ", project)
        fetchImages().then(() => { 
            setPageImagesLoaded(true) 
        })
        const fetchSimilarProjects = async () => {
            if (project?.acf.progetti_simili && project?.acf.progetti_simili.length > 0) {

                const similarProjectsData = project.acf.progetti_simili
                .map(id => projects.find(proj => proj?.id === id))
                .filter(proj => proj !== undefined);

                const projectsWithDetails = await Promise.all(similarProjectsData.map(async (proj) => {
                    const image = await fetchImage(proj?.acf.progetto_header_background_image)
                    const categoryNames = proj?.acf.progetto_categoria.map(categoryId => {
                        const category = categories.find(cat => cat.id === categoryId);
                        return category ? category.name : 'No category';
                    });

                    return {
                        id: proj?.id || '',
                        slug: proj?.slug || '',
                        acf: proj?.acf || {
                            progetto_header_background_image: '',
                            progetto_categoria: '',
                            progetto_title: '',
                            progetti_simili: [],
                            progetto_header_text: '',
                            progetto_committente_text: '',
                            progetto_posizione_text: '',
                            progetto_ruolo_text: '',
                            progetto_anno_text: '',
                            //progetto_description_area: '',
                            // Add other acf properties as needed
                        },
                        imageSrc: image.src,
                        categoryName: categoryNames
                    }
                }))

                const validProjectsWithDetails = projectsWithDetails.filter(proj => proj !== undefined) as SimilarProjectData[];
                setSimilarProjects(validProjectsWithDetails);
                console.log("Projects with details: ", validProjectsWithDetails)
            }
        }

        fetchSimilarProjects()
    }, [project, categories])

    useEffect(() => {
        console.log("loaded projects data: ", projects)
        /*fetchImages().then(() => { 
            setPageImagesLoaded(true) 
        })*/
    }, [projectsLoaded])

    return (
<Layout>
    {/* Hero Section */}
    <div 
        className="flex align-center justify-center text-center bg-cover bg-medium-blue min-h-80" 
        style={{ 
            backgroundImage: images?.header_image?.src ? `linear-gradient(
            rgba(0, 51, 76, 0.4), 
            rgba(0, 51, 76, 0.4)
            ),url(${images?.header_image?.src})` : `linear-gradient(rgba(0, 51, 76), rgba(0, 51, 76) )`  
        }}>
    <div className="flex flex-col align-center items-center text-center w-full max-w-[918px] py-16 px-4">
        <h1 className="text-h1 text-white">{project?.acf?.progetto_title}</h1>
        <p className="xl space-p-xl text-xl pb-60 md:pb-14 text-white max-w-96">{project?.acf?.progetto_header_text}</p>
    </div>
    </div>
    <section className="flex flex-col items-center justify-center bg-light-gray">
        <div className='flex flex-col w-full max-w-[918px] px-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 -mt-60 md:-mt-[88px] gap-6'>
                    <div className='flex flex-col p-6 gap-5 justify-start items-start bg-off-white'
                    data-aos="fade-up" data-aos-delay="50" >
                        <img className='w-16 h-16 bg-medium-blue p-4' src={CommittenteIcon.src} alt="Committente Icon" />
                        <div className='flex flex-col items-start justify-start w-full gap-2'>
                            <a className="text-caption leading-[8px] text-light-blue">COMMITTENTE</a>
                            <p className="m text-m text-dark-blue">{project?.acf?.progetto_committente_text}</p>
                        </div>
                    </div>
                    <div className='flex flex-col p-6 gap-5 justify-start items-start bg-off-white'
                    data-aos="fade-up" data-aos-delay="100" >
                        <img className='w-16 h-16 bg-medium-blue p-4' src={PosizioneIcon.src} alt="Luogo Icon" />
                        <div className='flex flex-col items-start justify-start w-full gap-2'>
                            <a className="text-caption leading-[8px] text-light-blue">LUOGO</a>
                            <p className="m text-m text-dark-blue">{project?.acf?.progetto_posizione_text}</p>
                        </div>
                    </div>
                    <div className='flex flex-col p-6 gap-5 justify-start items-start bg-off-white'
                        data-aos="fade-up" data-aos-delay="150" >
                        <img className='w-16 h-16 bg-medium-blue p-4' src={RuoloIcon.src} alt="Ruolo Icon" />
                        <div className='flex flex-col items-start justify-start w-full gap-2'>
                            <p className="text-caption leading-[8px] text-light-blue">RUOLO</p>
                            <p className="m text-m text-dark-blue">{project?.acf?.progetto_ruolo_text}</p>
                        </div>
                    </div>
                    <div className='flex flex-col p-6 gap-5 justify-start items-start bg-off-white'
                        data-aos="fade-up" data-aos-delay="200" >
                        <img className='w-16 h-16 bg-medium-blue p-4' src={AnnoIcon.src} alt="Anno Icon" />
                        <div className='flex flex-col items-start justify-start w-full gap-2'>
                            <p className="text-caption leading-[8px] text-light-blue">ANNO</p>
                            <p className="m text-m text-dark-blue">{project?.acf?.progetto_anno_text}</p>
                        </div>
                    </div>
                </div>
        {project?.content.rendered && (<>
            <div ref={contentRef}
                className="wordpress-content text-dark-blue entry-content alignfull 
                wp-block-post-content has-global-padding is-layout-constrained 
                wp-block-post-content-is-layout-constrained mt-14" 
                dangerouslySetInnerHTML={{ __html: project.content.rendered || '' }}
            />
        </>)}
        </div>
    </section>
    {/* Progetti Simili Section */}
    {similarProjects.length > 0 && (
    <section className="flex flex-col items-center justify-center bg-off-white">
        <div className="flex flex-col align-start items-start text-center w-full max-w-[1106px] py-16 px-6">
            <h3 className="text-h3 mb-10 text-dark-blue" data-aos="fade-right">Progetti Simili</h3>
            <div className='container mx-auto items-center justify-center max-w-[1106px]'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {similarProjects && similarProjects.map((similarProject,index) => (
                <a href={`/web/progetto#${similarProject?.slug}`} key={index} 
                data-aos="fade-up"  data-aos-delay={`${50 * index}`} 
                data-aos-anchor-placement="top-bottom"
                className="relative flex h-80 bg-cover bg-center cursor-pointer"  style={{
                        backgroundImage: similarProject?.imageSrc ? `linear-gradient(rgba(0,51,76,0.40),rgba(0,51,76,0.40)), url(${similarProject?.imageSrc})` : undefined 
                    }}>
                    <div className="hover:bg-light-blue/[.24] flex-grow">
                        <div className="text-left absolute bottom-0 p-6 w-full">
                        <div className="flex flex-wrap pb-2 text-medium-blue items-start gap-2 justify-start">
                            <div className="flex justify-center items-center min-w-14 h-5 px-3 uppercase bg-gray-200 text-center rounded-2xl text-tag-small">{similarProject?.acf.progetto_anno_text}</div>
                            {similarProject?.categoryName.map((name, index) => (
                                <div key={index} className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    <div className="w-full overflow-hidden overflow-ellipsis">
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className='m text-off-white'>{similarProject?.acf.progetto_title}</p>
                        </div> 
                    </div>
                </a>
            ))}
            </div>
            </div>
        </div>
    </section>
    )}

<Modal 
  ariaHideApp={false} 
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Image Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Black with 75% opacity
      top: '80px',
    },
    content: {
      background: 'transparent',
      border: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      gap: '16px',
      maxHeight: 'calc(100vh - 160px)',
    },
  }}
>
  <button onClick={closeModal}>Close</button>
  <img 
    src={modalImageSrc} 
    alt="Enlarged" 
    style={{
      maxHeight: 'calc(100vh - 240px)',
      maxWidth: '100%',
      objectFit: 'contain',
      objectPosition: 'center'
    }}
  />
</Modal>
    
</Layout>
    )
}