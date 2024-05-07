import './globals.css'
import './globals.scss'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactNode }) {
  
  const router = useRouter();

  useEffect(() => {
    // Check if the page was loaded with a path, and if so, navigate to that path
    if (window.location.pathname !== '/') {
      router.push(window.location.pathname);
    }
  }, []);

  return (
    <>
        <div className="flex flex-col min-h-screen mx-auto ">
          <Head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <meta name="theme-color" content="#005080"/>
            <title>Gesiqa</title>
          </Head>
          <div className="h-20"></div> {/* This is the spacing div */}
          <main className={`secular flex-grow bg-light-gray`}>
            {children}
          </main>
        </div>
    </>
  )
}