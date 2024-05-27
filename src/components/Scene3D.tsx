import React, { useEffect, useRef, useState } from 'react';
import sceneData from '../lib/sceneData.json';

export default function Scene3D({ language, medyBox, medyLocker, 
  onSceneDataUpdate, 
  onAnnotationDataUpdate}) {

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const key = `${medyBox}-${medyLocker}`;
  const scene = sceneData[key] || { sketchfabUrl: 'eeabd20748ea44fe919c6cac88d1e4b0', texts: 'defaultTexts' };

  const [annotations, setAnnotations] = useState([]);
  const [apiInstance, setApiInstance] = useState(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    const client = new window.Sketchfab(iframeRef.current);

    const error = () => {
      console.error('Error initializing Sketchfab API');
    };

    const config = {
      success: function onSuccess(api) {
        setApiInstance(api);
        api.start();

        api.addEventListener('viewerready', function () {
          console.debug("viewer ready");

          api.getAnnotationList((err, annotationsList) => {
            if (err) {
              console.error('Failed to retrieve annotations:', err);
              return;
            }
            if (!err) {
              console.debug(annotationsList);
            }
            setAnnotations(annotationsList);
            console.debug('Annotations retrieved:', annotationsList);
            runAnnotationLoop(api, annotationsList);
          });

          // Update scene data
          onSceneDataUpdate(scene.texts[language]);
        });
        
        api.addEventListener('annotationFocus', function (event) {
          const annotationIndex = event.annotationIndex;
          if (scene.annotations && scene.annotations[`annotation${annotationIndex + 1}`] && scene.annotations[`annotation${annotationIndex + 1}`][language]) {
            const annotation = scene.annotations[`annotation${annotationIndex + 1}`][language];
            onAnnotationDataUpdate({ [annotationIndex]: annotation });
          } else {
            console.error(`Annotation ${annotationIndex + 1} or language ${language} not found in scene data.`);
          }
        });
      },
      autostart: 1,
      annotation: 1,
      annotations_visible: 1,
      ui_annotations: 1,
      ui_controls: 0,
      ui_watermark: 0,
      ui_infos: 0,
      ui_hint: 0,
      ui_start: 0,
      ui_stop: 0,
      error: error
    };

    client.init(scene.sketchfabUrl, config);
  }, [scene.sketchfabUrl, language]);

  const runAnnotationLoop = (api, annotationsList) => {
    const updateAnnotations = () => {
      const updatedAnnotations = [];
      let completed = 0;

      annotationsList.forEach((annotation, index) => {
        api.getWorldToScreenCoordinates(annotation.position, (coord) => {
          const updatedAnnotation = { ...annotation, position: coord.canvasCoord };
          updatedAnnotations[index] = updatedAnnotation;

          completed += 1;

          if (completed === annotationsList.length) {
            setAnnotations(updatedAnnotations);
            requestAnimationFrame(updateAnnotations);
          }
        });
      });
    };

    updateAnnotations();
  };

  return (
    <div className='relative w-full min-h-screen flex'>
      <iframe className='w-full  min-h-screen'
      ref={iframeRef} title="3D Scene" allowFullScreen></iframe>
    </div>
  );
};