import './globals.css'
import './globals.scss'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next';

function Layout({ children }: any ) {
  
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
            <script type="text/javascript" src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"></script>
            <meta name="theme-color" content="#005080"/>
            <title>Gesiqa</title>
          </Head>
          <main className={`secular flex-grow bg-light-gray`}>
            {children}
          </main>
        </div>
    </>
  )
}

export default appWithTranslation(Layout);

/*
Based on your requirements, here's a suggested structure for your Next.js project:

Components: Break down your UI into reusable components. Here are some suggested components and their responsibilities:

Layout: This component will be responsible for the overall layout of your application. It will include the 3D scene and the HUD. It's implemented in src/app/layout.tsx.

BackgroundVideo: This component will handle the background video on the landing page.

StartButton: This component will handle the start experience button on the landing page.

Onboarding: This component will handle the onboarding experience. It will use either the introjs or tourguidejs libraries.

LanguageModal: This component will handle the language selection modal. It will be responsible for changing the language of the application.

ConfigurationModal: This component will handle the configuration modal. It will allow the user to select different elements to be displayed in the 3D scene.

Pages: In Next.js, each page is associated with a route based on its file name. You mentioned that this will be a one-page website, so most of your code will live in src/pages/index.tsx.

API: The src/lib/api.ts file will handle all the API calls to the Sketchfab Viewer API. This will include functions to load the 3D scene, change the displayed elements, etc.

Localization: For handling multiple languages, consider using a library like next-i18next. You can create a locales directory at the root level of your project, with a subdirectory for each language (e.g., en, it, es, de). Each subdirectory will contain a JSON file with the translated text.

State Management: For managing state across components (like the selected language or the selected 3D elements), consider using React's Context API or a state management library like Redux or Zustand.

Styling: For styling your components, you can use CSS modules, styled-components, or a CSS-in-JS solution like Emotion. You're already using Tailwind CSS, which is a great choice for utility-first CSS.

Performance: To ensure smooth performance, consider using React.memo for functional components and shouldComponentUpdate for class components to prevent unnecessary re-renders. Also, use the useEffect hook wisely to avoid unnecessary side effects.

Development: Use ESLint for linting and Prettier for code formatting to keep your code clean and consistent. You already have a .eslintrc.json file in your project, which is great.

Remember, this is just a suggested structure. Feel free to adjust it based on your specific needs and preferences.
*/