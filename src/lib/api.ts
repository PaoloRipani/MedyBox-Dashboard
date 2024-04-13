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
      ilNostroTargetButtonText
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
      scopriIlSoftwareImage{
        node {
          link
        }
      }
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
      vuoiSaperneDiPiuLink
      vuoiSaperneDiPiuImage{
        node {
          link
        }
      }
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
  moduli(first: 100) {
    nodes {
      moduloAcf {
        descrizioneModulo
        fieldGroupName
        popupIcon {
          node {
            link
          }
        }
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
  funzionalitPrincipali(first: 100) {
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