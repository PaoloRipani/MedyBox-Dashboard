import './globals.css'
import './globals.scss'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

function Layout({ children }: any ) {
  

  return (
    <>
        <div className="flex flex-col min-h-screen mx-auto ">
          <Head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
            <script  type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js" async></script>
            <link href="../../introjs.css" rel="stylesheet"/>
            <link href="../../themes/introjs-modern.css" rel="stylesheet"/>
            <meta name="theme-color" content="#005080"/>
            <title>MedyBox Experience</title>
          </Head>
          <main className={`secular flex-grow relative h-full bg-light-gray`}>
            {children}
          </main>
        </div>
    </>
  )
}

export default Layout;