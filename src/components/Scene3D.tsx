import React, { useEffect, useRef, useState } from 'react';
import sceneData from '../lib/sceneData.json';

export default function Scene3D({ language, medyBox, medyLocker, 
  onSceneDataUpdate, 
  onAnnotationDataUpdate,
  onAnnotationClick}) {

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
          if (scene.texts[language]) {
            onSceneDataUpdate(scene.texts[language]);
          } else {
            console.error(`Texts for language ${language} not found in scene data.`);
          }
          
        });
        
        api.addEventListener('annotationSelect', function (index) {
          console.log('Selected annotation', index);
          onAnnotationClick(index);
          const annotationKey = `annotation${index + 1}`;
          if (scene.annotations[annotationKey] && scene.annotations[annotationKey][language]) {
            const annotation = scene.annotations[annotationKey][language];
            onAnnotationDataUpdate({ [index]: annotation });
          } else {
            console.error(`Annotation ${annotationKey} or language ${language} not found in scene data.`);
          }
        });
        api.addEventListener('camerastart', function() {
          window.console.log('Camera is moving');
        });
        api.addEventListener('camerastop', function() {
          window.console.log('Camera stopped');
        });
      },
      autostart: 1,
      annotation: 0,
      annotations_visible: 0,
      ui_annotations: 0,
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

  const runAnnotationLoop = (apiInstance, annotationsList) => {
    const updateAnnotations = () => {
      const updatedAnnotations = [];
      let completed = 0;

      annotationsList.forEach((annotation, index) => {
        apiInstance.getWorldToScreenCoordinates(annotation.position, (coord) => {
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

  const onAnnotationPlaceholderClick = (eye, target) => {
    apiInstance.lookat(
        eye,
        target,
        0.5,  // duration, 0 for instant
        () => { console.log('Camera moved to annotation position'); }
    );
  };

  return (
    <div className='relative w-full min-h-screen flex'>
      <iframe className='w-full  min-h-screen'
      ref={iframeRef} title="3D Scene" allowFullScreen></iframe>
      {annotations.map((annotation, index) => (
        <div className='w-5 h-5 rounded-xl bg-green-3 leading-none cursor-pointer text-center' 
            onClick={() => {onAnnotationPlaceholderClick(annotation.eye, annotation.target); 
                            onAnnotationClick(index)}}
            key={index}
            style={{
            position: "absolute",
            transform: `translate(${(annotation.position && annotation.position[0]) || 0}px, ${(annotation.position && (annotation.position[1]-32)) || 0}px)`,
            // ...other styles
          }}
        >
            <div>{index+1}</div>
        </div>
      ))}
    </div>
  );
};