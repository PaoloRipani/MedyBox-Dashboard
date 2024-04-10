"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchFooterACF, fetchIlSoftwareACF, fetchModuliACF, fetchFunzionalitaPrincipaliACF } from '@/lib/api'
import Image from 'next/image'
import Logo from '../../public/Logo Big.svg'
import HamburgerIcon from '../../public/Hamburger Menu Icon.svg'
import MenuPointer from '../../public/Menu Pointer.svg'

export default function Header() {
  const router = useRouter();

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
    handleHashChange();
  
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange, false);
  
    // Clean up
    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
    

  }, []);

  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-center items-center px-6 h-20 z-50 bg-white">
      <div className="w-11/12 mx-auto max-w-1106 h-full flex justify-between items-center ">
        <Link href="/#home" passHref className='w-52'>
          <Image src={Logo} alt="Logo" />
        </Link>
        <nav className="flex items-center justify-end h-full">
          <ul className={`sm:flex-row flex-grow space-x-4 sm:gap-0 gap-4
            absolute top-20 w-screen z-50 h-screen p-0 sm:w-auto
            sm:h-full sm:relative sm:flex flex-col sm:top-0 sm:p-0 sm:items-center
            transition-all sm:left-0 text-gs-black
            ${isMenuOpen ? 'left-0 flex' : 'left-full hidden'}`}>
            { /* categories?.length > 0 && ['Home', 'Chi siamo', 'Progetti', 'Contatti'].map((item) => {
              const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`
              const isCurrentPath = pathname === path || pathname === `${path}/`
              return (
                <li
                  key={item}
                  className="flex flex-col items-center sm:w-auto w-full ml-4"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={path}
                    passHref
                    className={`flex flex-col justify-center items-center px-0 sm:px-4 h-full w-auto ${
                      isCurrentPath ? 'text-light-green' : hoveredItem === item ? 'text-off-white' : 'text-light-blue'
                    }`}
                  >
                    {item}
                  </Link>
                  {item === 'Progetti' && hoveredItem === 'Progetti' && (
                    <div className="hidden sm:flex absolute mt-20 p-8 gap-4 flex-col">
                      <div className="hidden sm:flex text-tag text-light-green">CATEGORIA</div>
                      {categories.map((category: any) => (
                        <Link className="flex flex-row justify-left items-center gap-3" href={`/progetti#${category.slug}`} key={category.id}>
                          <div className="w-4 h-[1px] bg-light-green"></div>
                          <p className="m text-m space-p-m text-white">{category.name}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              )
            }) */}
            <li className="flex flex-col items-center sm:w-auto w-full h-fit">
              <Link href='/#home' className={`flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto
              ${router.pathname === '/' ? 'text-yellow-3 font-extrabold' : 'text-grey-3'}`}>Home
              {router.pathname === '/' && <img src={MenuPointer.src} alt="Home icon" className='absolute bottom-0' />}
              </Link>
            </li>
            <li className="flex flex-col items-center sm:w-auto w-full h-fit">
              <Link href='/#chi-siamo' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Chi siamo</Link>
            </li>
            <li className="flex flex-col items-center sm:w-auto w-full h-fit">
              <Link href='/#perche-sceglierci' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Perché sceglierci</Link>
            </li>
            <li className="flex flex-col items-center sm:w-auto w-full h-fit">
              <Link href='/#target' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>A chi ci rivolgiamo</Link>
            </li>
            <li className="flex flex-col items-center sm:w-auto w-full h-fit">
              <Link href='/#contattaci' className='flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto'>Contattaci</Link>
            </li>
            <li className="flex flex-col items-center sm:w-auto w-full pl-4 border-l-2 border-l-grey-2 h-fit">
              <Link href='/il-software' className={`flex flex-col nunito text-contact text-grey-3 justify-center items-center px-0 h-full w-auto font-bold'>
                ${router.pathname === '/il-software' ? 'text-yellow-3 font-extrabold' : 'text-grey-3'}`}>Il Software
                {router.pathname === '/il-software' && <img src={MenuPointer.src} alt="Home icon" className='absolute bottom-0' />}
              </Link>
            </li>
          </ul>
          <ul className="sm:hidden flex space-x-4 h-full">
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
