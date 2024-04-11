'use client'
import Link from 'next/link'
import { fetchFooterACF } from '@/lib/api'
import { useState, useEffect } from 'react'
import Logo from '../../public/Logo Big BNW.svg'
import linkedinIcon from '../../public/ri_linkedin-fill.svg'

export default function Footer() {
    type AcfData = {
        [key: string]: any;
    }

    const [acf, setAcf] = useState<AcfData>({});
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const resFetchFooterACF = await fetchFooterACF()
                console.log("resF: ",resFetchFooterACF);
                setAcf(resFetchFooterACF);

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
        <footer className="bg-grey-4 text-off-white py-12 px-10">
            <div className="container mx-auto max-w-[1106px] flex flex-col font-light md:flex-row gap-6">
                {/* First div */}
                <div className="flex flex-col grid-area-1 justify-center">
                    <div>
                        <img src={Logo.src} alt="Aloisi Progetti"/>
                    </div>
                </div>
                {/* Second div */}
                <div className='flex flex-row grow justify-between ml-0 md:ml-[120px]'>
                    <div className="flex flex-col justify-end grid-area-2">
                        <div className="flex flex-row mt-6">
                        <div className="flex flex-col pl-4 gap-4 items-center nunito">
                            <p className='m'>P.IVA: {acf?.piva}</p>
                            <p className='m'>{acf?.indirizzo}</p>
                            <p className='m'>{acf?.email}</p>
                            <Link href={acf?.linkedinUrl ?? ''}>
                                <div>
                                    <img src={linkedinIcon.src} alt='LinkedIn' className='opacity-50 hover:opacity-100'/>
                                </div>
                            </Link>
                        </div>
                    </div>
                    </div>
                    {/* Third div */}
                    <div className="flex flex-col justify-center items-end gap-4 grid-area-3">
                        <div className='nunito'>
                            <a href={acf?.privacyPolicy ?? ''} className='m' target='_blank'>Privacy Policy</a>
                        </div>
                        <div className='nunito'>
                            <a href={acf?.cookiePolicy ?? ''} className='m' target='_blank'>Cookie Policy</a>
                        </div>
                        <div className='nunito'>
                            <a href={acf?.terminiECondizioni ?? ''} className='m' target='_blank'>Termini e Condizioni</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}