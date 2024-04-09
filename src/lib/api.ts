import fetch from 'isomorphic-unfetch';

const footerquery = `
query {
  page(id: "footer", idType: URI) {
    title
    footerAcf {
      piva
      indirizzo
      email
      linkedinUrl
      privacyPolicy
      cookiePolicy
      terminiECondizioni
    }
  }
}
`;

const homepagequery = `query homepageAcf {
  page(id: "homepage", idType: URI) {
    title
    homepageAcf {
      chiSiamoDescription
      chiSiamoTitle
      contattiEmail
      contattiIndirizzo
      contattiLinkedinUrl
      contattiNomeSocieta
      contattiTelefono
      contattiTitle
      heroButtonText
      heroDescription
      heroImageSlider
      heroTitle
      ilNostroTarget1stElementText
      ilNostroTarget2ndElementText
      ilNostroTarget3rdElementText
      ilNostroTargetDescription
      ilNostroTargetTitle
      percheSceglierci1stItemDescription
      percheSceglierci1stItemTitle
      percheSceglierci2ndItemDescription
      percheSceglierci2ndItemTitle
      percheSceglierci3rdItemDescription
      percheSceglierci3rdItemTitle
      percheSceglierciTitle
      scopriIlSoftwareButtonText
      scopriIlSoftwareDescriptionText
      scopriIlSoftwareTitle
      vantaggi1stElementDescription
      vantaggi1stElementTitle
      vantaggi2ndElementDescription
      vantaggi2ndElementTitle
      vantaggi3rdElementDescription
      vantaggi3rdElementTitle
      vantaggi4thElementDescription
      vantaggi4thElementTitle
      vantaggiDescription
      vantaggiTitle
      vuoiSaperneDiPiuButtonText
      vuoiSaperneDiPiuTitle
      vantaggi4thElementIcon {
        node {
          link
        }
      }
      vantaggi3rdElementIcon {
        node {
          link
        }
      }
      vantaggi2ndElementIcon {
        node {
          link
        }
      }
      vantaggi1stElementIcon {
        node {
          link
        }
      }
      percheSceglierci3rdItemIcon {
        node {
          link
        }
      }
      percheSceglierci2ndItemIcon {
        node {
          link
        }
      }
      percheSceglierci1stItemIcon {
        node {
          link
        }
      }
      ilNostroTarget3rdElementIcon {
        node {
          link
        }
      }
      ilNostroTarget2ndElementIcon {
        node {
          link
        }
      }
      ilNostroTarget1stElementIcon {
        node {
          link
        }
      }
    }
  }
}`;

const ilsoftwarequery = `
query ilsoftwarequery {
  page(id: "il-software", idType: URI) {
    title
    ilSoftwareAcf {
      funzionalitaPrincipaliTitle
      heroButtonText
      heroDescription
      heroImage {
        node {
          link
        }
      }
      heroTitle
      scopriIModuliDescription
      scopriIModuliTitle
      vantaggi1stElementDescription
      vantaggi1stElementIcon {
        node {
          link
        }
      }
      vantaggi1stElementTitle
      vantaggi2ndElementDescription
      vantaggi2ndElementTitle
      vantaggi3rdElementDescription
      vantaggi3rdElementTitle
      vantaggi4thElementDescription
      vantaggi4thElementTitle
      vantaggiDescription
      vantaggiTitle
      vuoiApprofondireButtonText
      vuoiApprofondireTitle
      vantaggi2ndElementIcon {
        node {
          link
        }
      }
      vantaggi3rdElementIcon {
        node {
          link
        }
      }
      vantaggi4thElementIcon {
        node {
          link
        }
      }
      vuoiApprofondireImage {
        node {
          link
        }
      }
    }
  }
}`;

const moduliquery = `query moduliquery {
  moduli {
    nodes {
      moduloAcf {
        descrizioneModulo
        fieldGroupName
        icon {
          node {
            link
          }
        }
        immagine {
          node {
            link
          }
        }
        immagineOVideo
        titolo
        video {
          node {
            link
          }
        }
      }
    }
  }
}`;

const funzionalitaprincipaliquery = `query queryunzionalitaprincipali {
  funzionalitPrincipali {
    nodes {
      funzionalitaPrincipaliAcf {
        name
        icon {
          node {
            link
          }
        }
      }
    }
  }
}`;


export async function fetchFooterACF() {
  console.log("API CALL footerACF: ");
  try{
  const res = await fetch('https://www.gesiqa.it/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  query: footerquery }),
  })
    const footerACF = await res.json();
    console.log("footerACF: ", footerACF.data?.page?.footerAcf);
    return footerACF.data?.page?.footerAcf;
  } catch (err) {
    console.error("Error fetching footerACF: ", err);
    return null;
  }
}

export async function fetchHomepageACF() {
  console.log("API CALL homepageAcf: ");
  try{
  const res = await fetch('https://www.gesiqa.it/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  query: homepagequery }),
  })
    const footerACF = await res.json();
    console.log("homepageAcf: ", footerACF.data?.page?.homepageAcf);
    return footerACF.data?.page?.homepageAcf;
  } catch (err) {
    console.error("Error fetching homepageAcf: ", err);
    return null;
  }
}


export async function fetchIlSoftwareACF() {
  console.log("API CALL ilSoftwareAcf: ");
  try{
  const res = await fetch('https://www.gesiqa.it/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  query: ilsoftwarequery }),
  })
    const footerACF = await res.json();
    console.log("ilSoftwareAcf: ", footerACF.data?.page?.ilSoftwareAcf);
    return footerACF.data?.page?.ilSoftwareAcf;
  } catch (err) {
    console.error("Error fetching ilSoftwareAcf: ", err);
    return null;
  }
}

export async function fetchModuliACF() {
  console.log("API CALL ModuliAcf: ");
  try{
  const res = await fetch('https://www.gesiqa.it/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  query: moduliquery }),
  })
    const ModuliAcf = await res.json();
    console.log("ModuliAcf: ", ModuliAcf.data?.moduli?.nodes);
    return ModuliAcf.data?.moduli?.nodes;
  } catch (err) {
    console.error("Error fetching ModuliAcf: ", err);
    return null;
  }
}

export async function fetchFunzionalitaPrincipaliACF() {
  console.log("API CALL FunzionalitaPrincipaliAcf: ");
  try{
  const res = await fetch('https://www.gesiqa.it/wordpress/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  query: funzionalitaprincipaliquery }),
  })
    const FunzionalitaPrincipaliAcf = await res.json();
    console.log("FunzionalitaPrincipaliAcf: ", FunzionalitaPrincipaliAcf.data?.funzionalitPrincipali?.nodes);
    return FunzionalitaPrincipaliAcf.data?.funzionalitPrincipali?.nodes;
  } catch (err) {
    console.error("Error fetching FunzionalitaPrincipaliAcf: ", err);
    return null;
  }
}


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