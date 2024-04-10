import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import './globals.scss'
import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className="flex flex-col min-h-screen mx-auto ">
          <Head>
            <link rel="icon" href="/web/favicon.ico" sizes="any" />
            <link rel="apple-touch-icon" href="/web/apple-touch-icon.png"/>
            <meta name="theme-color" content="#005080"/>
          </Head>
          <Header/>
          <div className="h-20"></div> {/* This is the spacing div */}
          <main className={`secular flex-grow bg-light-gray`}>
            {children}
          </main>
          <Footer />
        </div>
    </>
  )
}