"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchFooterACF, fetchIlSoftwareACF, fetchModuliACF, fetchFunzionalitaPrincipaliACF } from '@/lib/api'
import Image from 'next/image'
import Logo from '../../public/Logo Big.svg'
import HamburgerIcon from '../../public/Hamburger Menu Icon.svg'
import MenuPointer from '../../public/Menu Pointer.svg'

export default function Header() {
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    //fetchFooterACF();
    //fetchIlSoftwareACF();
    //fetchModuliACF();
    //fetchFunzionalitaPrincipaliACF();
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Calculate position with offset
          const yOffset = -80; // Adjust as needed

          requestAnimationFrame(() => {
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          });

        }
      }
    };
  
    // Run once on mount for direct URL access (e.g., user enters "/#target" in the address bar)
    setTimeout(handleHashChange, 200);
  
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false);
  
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
    

  }, []);

  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-center items-center px-6 h-20 z-30 bg-white">
      <div className="w-11/12 mx-auto max-w-1106 h-full flex justify-between items-center ">
        <Link href="/#home" passHref className='w-52'>
          <Image src={Logo} alt="Logo" />
        </Link>
        <nav className="flex items-center justify-end h-full">
          <div className={`lg:flex-row flex-grow md:space-x-4 lg:gap-0 gap-4
            absolute top-20 w-screen z-50 h-screen p-0 lg:w-auto
            lg:h-full lg:relative lg:flex flex-col lg:top-0 lg:p-0 lg:items-center
            transition-all lg:left-0 text-gs-black
            ${isMenuOpen ? 'left-0 flex bg-white items-center justify-start' : 'left-full hidden'}`}>
            <div className="flex flex-col items-center lg:w-auto w-full h-fit justify-center">
              <Link href='/#home' className={`flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto
              ${pathname === '/' ? 'text-yellow-3 font-extrabold' : 'text-grey-3'}`}>Home
              {pathname === '/' && <img src={MenuPointer.src} alt="Home icon" className='absolute bottom-0' />}
              </Link>
            </div>
            <div className="flex flex-col items-center lg:w-auto w-full h-fit justify-center">
              <Link href='/#chi-siamo' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Chi siamo</Link>
            </div>
            <div className="flex flex-col items-center lg:w-auto w-full h-fit justify-center">
              <Link href='/#perche-sceglierci' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Perché sceglierci</Link>
            </div>
            <div className="flex flex-col items-center lg:w-auto w-full h-fit justify-center">
              <Link href='/#target' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>A chi ci rivolgiamo</Link>
            </div>
            <div className="flex flex-col items-center lg:w-auto w-full h-fit">
              <Link href='/#contattaci' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Contattaci</Link>
            </div>
            <div className="flex flex-col items-center lg:w-auto w-full lg:pl-4 lg:border-l-2 lg:border-l-grey-2 h-fit">
              <Link href='/il-software' className={`flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto font-bold'>
                ${pathname === '/il-software' ? 'text-yellow-3 font-extrabold' : 'text-grey-3 font-bold'}`}>Il Software
                {pathname === '/il-software' && <img src={MenuPointer.src} alt="Home icon" className='absolute bottom-0' />}
              </Link>
            </div>
          </div>
          <ul className="lg:hidden flex md:space-x-4 h-full">
            <li className="flex items-center h-full">
              <button onClick={toggleMenu}>
                <Image src={HamburgerIcon.src} width="22" height="22" alt="Menu" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
