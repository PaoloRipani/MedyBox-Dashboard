import React, { useEffect, useRef } from 'react';
import sceneData from '../lib/sceneData.json';
import ARModal from './ARModal';
import { useTranslation } from 'next-i18next';

export default function Scene3D({ language, medyBox, medyLocker }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const key = `${medyBox}-${medyLocker}`;
  const scene = sceneData[key] || { sketchfabUrl: 'defaultUrl', texts: 'defaultTexts' };
  const arUrl = sceneData['arUrl'] || '';

  useEffect(() => {
    if (window.Sketchfab) {
      const client = new window.Sketchfab(iframeRef.current);

      client.init(scene.sketchfabUrl, {
        success: function onSuccess(api) {
          api.start();
          api.addEventListener('annotationFocus', function (event) {
            console.log('Annotation clicked: ', event);
          });
        },
        error: function onError() {
          console.log('Viewer error');
        },
      });
    }
  }, [scene.sketchfabUrl]);

  return (
    <div>
      <h1>{scene.name[lang]}</h1>
      <p>{scene.texts[lang].text1}</p>
      <p>{scene.texts[lang].text2}</p>
      <ARModal arUrl={arUrl} />
      <div>
        {Object.keys(scene.annotations).map((key) => (
          <div key={key}>
            <h2>{scene.annotations[key][lang].title}</h2>
            <p>{scene.annotations[key][lang].text}</p>
          </div>
        ))}
      </div>
      <iframe ref={iframeRef} title="3D Scene" allowFullScreen></iframe>
    </div>
  );
};