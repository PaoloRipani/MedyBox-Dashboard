import fetch from 'isomorphic-unfetch';

export async function getAllProjects() {
  console.log("API CALL: getAllProjects");
  const res = await fetch('https:///www.aloisiprogetti.com/wp-json/wp/v2/progetto');
  const projects = await res.json();
  return projects;
}

export async function getAllCategories() {
  console.log("API CALL: getAllCategories");
  try {
    const res = await fetch('https://www.aloisiprogetti.com/wp-json/wp/v2/progetto_category/');
    const categories = await res.json();
    //console.log("categories res:", categories); // Log the response text
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return null;
  }
}

export async function getAllProjectSlugs() {
  console.log("API CALL: getAllProjectSlugs");
  const res = await fetch('https:///www.aloisiprogetti.com/wp-json/wp/v2/progetto');
  const projects = await res.json();
  return projects.map((project: any) => project.slug);
}

export async function getProject(slug: any) {
  console.log("API CALL: getProject");
  const res = await fetch(`https:///www.aloisiprogetti.com/wp-json/wp/v2/progetto?slug=${slug}&_embed`);
  const [project] = await res.json();
  return project;
}

export async function getProjectById(projectId: any) {
  console.log("API CALL: getProjectById");
  const res = await fetch(`https:///www.aloisiprogetti.com/wp-json/wp/v2/progetto/${projectId}`);
  const project = await res.json();
  return project;
}

export async function getChiSiamoPage() {
  console.log("API CALL: getChiSiamoPage");
  const res = await fetch('https:///www.aloisiprogetti.com/wp-json/wp/v2/pages?slug=chi-siamo');
  const [page] = await res.json();
  return page;
}

export async function getPage(name : string) {
  console.log("API CALL: getPage");
  const res = await fetch(`https:///www.aloisiprogetti.com/wp-json/wp/v2/pages?slug=${name}`);
  const [page] = await res.json();
  return page;
}

export async function fetchImage(id: any) {
  console.log("API CALL: fetchImage");
  const response = await fetch(`https://www.aloisiprogetti.com/wp-json/wp/v2/media/${id}`)
  const data = await response.json()

  if (!data.guid) {
    throw new Error('Image not found');
  }

  return {
    src: data.guid.rendered,
    width: data.media_details.width,
    height: data.media_details.height
  }
}

export async function fetchLatest4News() {
  console.log("API CALL: fetchLatest4News");
  const response = await fetch('https://www.aloisiprogetti.com/wp-json/wp/v2/news?per_page=4&order=desc&orderby=date')
  const data = await response.json()
  return Promise.all(data.map(async (item: any) => ({
    title: item.acf.titolo_news,
    text: item.acf.testo_news,
    image: await fetchImage(item.acf.immagine_news),
    year: new Date(item.date).getFullYear(),
    text_link: item.acf.testo_link_news,
    url_link: item.acf.url_link_news
  })))
}

export async function fetchCiHannoSceltoLogos(element: string){
  console.log("API CALL: fetchCiHannoSceltoLogos");
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(element, 'text/html')
  const images = htmlDoc.getElementsByTagName('img')
  const srcs = Array.from(images).map(img => img.src)
  return srcs;
}