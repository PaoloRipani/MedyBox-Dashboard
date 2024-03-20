import Link from 'next/link'
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Layout from '../app/layout'
import { getAllProjects, getAllCategories, getPage , fetchLatest4News } from '../lib/api'

import AOS from 'aos'
import 'aos/dist/aos.css';

import LinkShare from '../../public/link-share-svg.svg'

export default function Progetti() {
    
  useEffect(() => {
    AOS.init();
  }, []);

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
                        progetto_categoria: Array<string>;
                        progetto_title: string;
                        // Add other acf properties as needed
                };
                // Add other project properties as needed
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

        type PageData = {
                acf?: {
                    progetti_header_text?: string;
                    progetti_header_image?: string;
                    // Add other acf properties as needed
                };
                // Add other page properties as needed
            };

        type CategoryData = {
                id: string;
                name: string;
                slug: string;
                // Add other category properties as needed
        };

        const [projects, setProjects] = useState<ProjectData[]>([]);
        const [categories, setCategories] = useState<CategoryData[]>([]);
        const [page, setPage] = useState<PageData>({});
        const [news, setNews] = useState<NewsData[]>([]);
        const [newsLoaded, setNewsLoaded] = useState(false)
        const [projectImages, setProjectImages] = useState<Record<string, string>>({});    
        const [categoryLoaded, setCategoryLoaded] = useState(false)
        const [projectsLoaded, setProjectsLoaded] = useState(false)
        const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
        const [images, setImages] = useState<ImagesData>({})
        console.log("progetti projects: ", projects)
        console.log("progetti categories: ", categories)
        console.log("progetti page: ", page)
        const router = useRouter()

        const fetchImage = async (id : any) => {
                if (id === undefined) return
                
                const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/media/${id}`)
                const data = await response.json()

                return {
                    src: data.guid.rendered,
                    width: data.media_details.width,
                    height: data.media_details.height
                }
        }

        useEffect(() => {
                const fetchProgettiImages = async () => {
                        const uniqueImageIds = Array.from(new Set(projects.map((project: ProjectData) => project.acf.progetto_header_background_image)));
        
                        const images = await Promise.all(
                                uniqueImageIds
                                        .filter(id => id !== undefined) // Filter out undefined ids
                                        .map(id => fetchImage(id))
                        );
        
                        const imagesMap = images.reduce<Record<string, string>>((acc, image, index) => {
                                acc[uniqueImageIds[index]] = image?.src;
                                return acc;
                        }, {});
                
                        setProjectImages(imagesMap)
                }
        
                fetchProgettiImages()
            }, [projects])

        const fetchImages = async () => {
                if (!(page as any)) {
                        return
                }
    
                const imageNames: Record<string, any> = {
                        'header_image': (page as any).acf?.progetti_header_image,
                };
                const fetchedImages: Record<string, { src: string; width: number; height: number }> = {};
    
                for (const [name, id] of Object.entries(imageNames)) {
                    const imageData = await fetchImage(id)
                    fetchedImages[name] = {
                        src: imageData?.src,
                        width: imageData?.width,
                        height: imageData?.height
                    }
                }
                console.log("fetchedImages", fetchedImages)
                setImages(fetchedImages)
        }

        const fetchNews = async () => {
                const res = await fetchLatest4News();
                console.log("res news:", res)
                setNews(res);
            }

        useEffect(() => {
                // Get the hash from the URL (without the '#')
                const hash = router.asPath.split('#')[1]
        
                // If there's a hash, find the corresponding category
                if (hash) {
                        const matchingCategory = categories.find(category => category.slug === hash)
        
                        // If a matching category is found, select it
                        if (matchingCategory) {
                                setSelectedCategory(matchingCategory.id)
                        }
                } else {
                        // If there's no hash, clear the selected category
                        setSelectedCategory(null)
                }
        }, [router.asPath, categories])

        useEffect(() => {
                fetchImages()
        }, [page])

        useEffect(() => {
            const fetchData = async () => {

            const projects = await getAllProjects();
            const fetchedCategories = await getAllCategories();
            const page = await getPage("progetti");

            // Create a flatMap of all category IDs that are used in the projects
            const usedCategoryIds = new Set(projects.flatMap((project: ProjectData) => project.acf.progetto_categoria));

            // Filter out categories that are not used
            const filteredCategories = fetchedCategories.filter((category: CategoryData ) => usedCategoryIds.has(category.id));
    
            setProjects(projects); 
            setCategories(filteredCategories);
            setPage(page);
        };

        fetchNews().then(() => { setNewsLoaded(true)})
        fetchData().then(() => {
            setCategoryLoaded(true) 
            setProjectsLoaded(true)
        });
    }, []);

    // Filter projects based on the selected category
    const filteredProjects = selectedCategory 
    ? projects.filter(project => project.acf.progetto_categoria.includes(selectedCategory))
    : projects;

    return (
        <Layout>
            {/* Hero section */}
            
            <div className="flex align-center justify-center text-center bg-cover min-h-80"          
            style={{ 
            backgroundImage: images.header_image?.src ? `url(${images.header_image?.src})` : 
            `linear-gradient(rgba(0, 51, 76), rgba(0, 51, 76) )` 
          }}>
                <div className="flex flex-col align-center text-center max-w-[1106px] py-16 px-6 gap-3">
                    <h1 className="text-h1 text-white">Progetti</h1>
                    <p className="xl space-p-xl text-xl text-white max-w-96">{page?.acf?.progetti_header_text || ''}</p>
                </div>
            </div>

            {/* Category buttons */}
            <section className='bg-light-gray sm:px-4 px-6'>
                <div className='flex flex-col gap-4 container mx-auto w-full max-w-[1106px] sm:pt-16 pt-8'>
                    <h2 className='text-tag text-medium-blue'>CATEGORIA</h2>
                    <div className='flex flew-row flex-wrap gap-4'>
                    {categoryLoaded ? (categories.map(category => (
                        <button className='flex items-center justify-center cursor-pointer h-10'
                            key={category.id} 
                            onClick={() => {
                                setSelectedCategory(selectedCategory === category.id ? null : category.id);
                                //router.push(`/web/progetti#${category.slug}`, `/web/progetti#${category.slug}`, { shallow: true });
                            }}>                  
                            <div className={`min-w-14 w-fit py-2 px-6 justify-center uppercase text-category text-center rounded-3xl overflow-hidden overflow-ellipsis whitespace-nowrap ${category.id === selectedCategory ? 'bg-medium-blue text-off-white' : 'bg-off-white  text-light-blue'}`}>
                                {category.name}
                            </div>
                        </button>
                    ))) : (<>
                    
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex items-center justify-center cursor-pointer h-10">
                            <div className="min-w-32 w-fit h-10 px-6 justify-center uppercase text-category text-center rounded-3xl overflow-hidden overflow-ellipsis whitespace-nowrap bg-light-gray  text-light-blue">
                            </div>
                        </div>
                    ))}
                        
                    </>)}
                    </div>
                </div>
            </section>

            {/* Projects preview */}
            <section className='bg-light-gray pb-16 px-4'>
                <div className='container mx-auto max-w-[1106px] pt-14'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectsLoaded ? (filteredProjects.map((project,index) => {
                //const projectCategory = categories.find(category => category.id === project.acf.progetto_categoria)
                const projectCategories = project.acf.progetto_categoria.map(categoryId => 
                    categories.find(category => category.id === categoryId)
                  );

                return (
                    <a key={project.id}
                    //onClick={() => router.push(`#${project.slug}`)}
                    data-aos="fade-up"  data-aos-delay={`${50 * index}`} 
                    data-aos-anchor-placement="top-bottom"
                    href={`/web/progetto#${project.slug}`} 
                    className="relative flex h-80 bg-cover bg-center cursor-pointer"  
                    style={{
                    backgroundImage: projectImages[project.acf.progetto_header_background_image] ? `linear-gradient(rgba(0,51,76,0.40),rgba(0,51,76,0.40)),url(${projectImages[project.acf.progetto_header_background_image]})` : undefined 
                    }}>
                    <div className="hover:bg-light-blue/[.24] flex-grow">
                        <div className="absolute bottom-0 p-6 w-full">
                        <div className="flex flex-wrap md:flex-row flex-col md:items-center items-start gap-2 justify-start pb-2 text-medium-blue">
                            <div className="flex justify-center items-center min-w-14 h-5 px-3 uppercase bg-gray-200 text-center rounded-2xl text-tag-small">{project?.acf.progetto_anno_text}</div>
                                {projectCategories.map(category => 
                                  category && (
                                    <div key={category.id} className="flex min-w-14 h-5 px-3 uppercase text-center items-center rounded-2xl text-caption bg-light-green overflow-hidden overflow-ellipsis whitespace-nowrap">
                                        <div className="w-full overflow-hidden overflow-ellipsis">
                                            {category ? category.name : 'No category'}
                                        </div>
                                    </div>
                                    )
                                )}
                        </div>
                        <p className='m text-off-white'>{project?.acf.progetto_title}</p>
                        </div> 
                    </div>
                    </a>
                )
            })) : (<>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="relative flex h-80 bg-light-gray">
                    <div className="flex-grow">
                        <div className="absolute bottom-0 p-6">
                        <div className="flex flex-wrap gap-2 justify-start pb-2">
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </>)}
                </div>
            </div>
            </section>

            {/* News Section */}
            <div className="bg-light-gray">
                <section className="relative md:flex md:items-center pt-12 pb-24 px-6 text-dark-blue">
                <div className="flex flex-col container mx-auto gap-10 max-w-[1106px]">
                    <h3 className="text-h3">News</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* Grid items */}
                    {newsLoaded ? (news.map((item, index) => (
                        <div key={index} className="flex bg-off-white max-w-[640px]"
                        data-aos="fade-in" data-aos-offset={`${100 * index}`} >
                        <img className="object-cover min-h-[152px] max-w-[152px]" src={item.image.src} alt={item.image.alt} />
                        <div className="flex flex-grow flex-col justify-center px-6 py-3 min-h-[152px] overflow-hidden">
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
                    ))) : (
                    <>
                        {[...Array(4)].map((_, i) => (
                            <>
                                <div  key={i} className="flex h-36 bg-off-white max-w-[640px]">
                                </div>
                            </>
                        ))}
                    </>)}
                    </div>
                </div>
                </section>
            </div>
        </Layout>
    )
}