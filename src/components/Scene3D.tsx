import React, { useEffect, useRef } from 'react';
import sceneData from '../lib/sceneData.json';
import ARModal from './ARModal';

export default function Scene3D({ language, medyBox, medyLocker }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const key = `${medyBox}-${medyLocker}`;
  const scene = sceneData[key] || { sketchfabUrl: 'defaultUrl', texts: 'defaultTexts' };
  const arUrl = sceneData['arUrl'] || '';

  useEffect(() => {
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
  }, [scene.sketchfabUrl]);

  return (
    <div>
      <ARModal arUrl={arUrl} />
      <div>
        {/* annotation bar */}
        {/* fullscreen modal for images and videos */}
      </div>      
      <iframe ref={iframeRef} title="3D Scene" allowFullScreen></iframe>
      <div>{scene.texts[language]}</div>
    </div>
  );
};