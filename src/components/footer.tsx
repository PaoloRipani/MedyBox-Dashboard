'use client'
import Link from 'next/link'
import { getPage } from '@/lib/api'
import { useState, useEffect } from 'react'
import Logo from '../../public/Footer Logo 1.svg'
import LinkedIn from '../../public/Linkedin Icon.svg'

export default function Footer() {
    type AcfData = {
        footer_cookie_link?: string,
        footer_indirizzo?: string,
        footer_linkedin?: string,
        footer_email?: string,
        footer_p_iva?: string,
        footer_privacy_link?: string
    }

    const [acf, setAcf] = useState<AcfData>({});
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const page = await getPage('footer')
                //console.log("res page: ", page)
                setAcf(page.acf)

            } catch {
                console.log("Error fetching data")
            }
        }

    fetchData().then(() => {
      setPageLoaded(true)
      //console.log("footer acf:",acf)
    })
  }, [])

    return (
        <footer className="bg-dark-blue text-off-white py-12 px-10">
            <div className="container mx-auto max-w-[1106px] flex flex-col font-light md:flex-row gap-6">
                {/* First div */}
                <div className="flex flex-col grid-area-1">
                    <div>
                        <img src={Logo.src} alt="Aloisi Progetti"/>
                    </div>
                    <div className="flex flex-row mt-6">
                        <div className="flex flex-col pl-4 gap-4 border-l-2 border-light-blue">
                            <p className='m'>P.IVA: {acf?.footer_p_iva}</p>
                            <p className='m'>{acf?.footer_indirizzo}</p>
                            <p className='m'>{acf?.footer_email}</p>
                        </div>
                    </div>
                </div>
                {/* Second div */}
                <div className='flex flex-row grow justify-between ml-0 md:ml-[120px]'>
                    <div className="flex flex-col justify-end grid-area-2">
                        <div>
                            <p className='text-caption text-light-green mb-3'>SITEMAP</p>
                        </div>
                        <div className="flex">
                            <div className="border-l border-r border-light-blue h-full"></div>
                            <div className="flex flex-col pl-4 gap-4">
                                <Link className='m' href="/">Home</Link>
                                <Link className='m' href="/chi-siamo">Chi siamo</Link>
                                <Link className='m' href="/chi-siamo#lavora-con-noi">Lavora con noi</Link>
                                <Link className='m' href="/progetti">Progetti</Link>
                                <Link className='m' href="/contatti">Contatti</Link>
                            </div>
                        </div>
                    </div>
                    {/* Third div */}
                    <div className="flex flex-col justify-end items-end gap-4 grid-area-3">
                        <Link href={acf?.footer_linkedin ?? ''}>
                            <div>
                                <img src={LinkedIn.src} alt='LinkedIn'/>
                            </div>
                        </Link>
                        <div>
                            <a href={acf?.footer_privacy_link ?? ''} className='m' target='_blank'>Privacy Policy</a>
                        </div>
                        <div>
                            <a href={acf?.footer_cookie_link ?? ''} className='m' target='_blank'>Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}