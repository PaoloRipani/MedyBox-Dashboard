import React, { useEffect, useRef, useState } from 'react';
import sceneData from '../lib/sceneData.json';


export default function Scene3D({ language, medyBox, medyLocker, 
  onSceneDataUpdate, 
  onAnnotationDataUpdate,
  onAnnotationClick,
  onInteractionChange} : any) {

  interface Dimensions {
    width: string;
    depth: string;
    height: string;
  }
  
  interface Texts {
    text1: string;
    text2: string;
  }
  
  interface Annotation {
    position?: [number, number]; // Assuming position is an optional tuple of two numbers
    eye?: any; // Replace `any` with a more specific type if known
    target?: any; // Replace `any` with a more specific type if known
  }
  
  interface Scene {
    sketchfabUrl: string;
    previewImage: string;
    name: {
      en: string;
      it: string;
      fr?: string;
      de?: string;
      es?: string;
    };
    dimensions: Dimensions;
    texts: {
      en: {
        text1: string;
        text2: string;
      };
      it: {
        text1: string;
        text2: string;
      };
      // Add other languages as needed
    };
    annotations: {
      // Define the structure of annotations
    };
  }
  const typedSceneData: SceneData = sceneData;

  type SceneData = Record<string, Scene>;
  const [sceneDataState, setSceneData] = useState<SceneData>(typedSceneData);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const key : any = `${medyBox}-${medyLocker}`;
  const scene : any = sceneDataState[key] || { sketchfabUrl: 'eeabd20748ea44fe919c6cac88d1e4b0', texts: 'defaultTexts' };

  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [apiInstance, setApiInstance] = useState(null);
  const [isCameraMoving, setIsCameraMoving] = useState(false);

  useEffect(() => {
    console.log('sceneDataupdate: ', scene);
    onSceneDataUpdate(scene);
    onAnnotationDataUpdate(scene.annotations);
  }, [scene, onSceneDataUpdate, onAnnotationDataUpdate]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const client = new window.Sketchfab(iframeRef.current);

    const error = () => {
      console.error('Error initializing Sketchfab API');
    };

    const config = {
      success: function onSuccess(api : any) {
        setApiInstance(api);
        api.start();

        api.addEventListener('viewerready', function () {
          console.debug("viewer ready");

          api.getAnnotationList((err : any, annotationsList : any) => {
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
        
        api.addEventListener('annotationSelect', function (index : number) {
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
          setIsCameraMoving(true);
          onInteractionChange(true);
          window.console.log('Camera is moving');
        });
        api.addEventListener('camerastop', function() {
          setIsCameraMoving(false);
          onInteractionChange(false);
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

  const runAnnotationLoop = (apiInstance : any, annotationsList : any) => {
    const updateAnnotations = () => {
      const updatedAnnotations:any = [];
      let completed = 0;

      annotationsList.forEach((annotation : any, index : number) => {
        apiInstance.getWorldToScreenCoordinates(annotation.position, (coord : any) => {
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

  const onAnnotationPlaceholderClick = (eye : any, target : any) => {
    if (apiInstance) {
      (apiInstance as any).lookat(
        eye,
        target,
        0.5,  // duration, 0 for instant
        () => { console.log('Camera moved to annotation position'); }
      );
    }
  };

  return (
    <div className='relative w-full min-h-screen flex'>
      <iframe className='w-full  min-h-screen'
      ref={iframeRef} title="3D Scene" allowFullScreen></iframe>
      {annotations.map((annotation, index) => (
        <div className={`w-7 rounded-3xl bg-green-3 leading-5 text-center cursor-pointer 
          justify-center items-center lato-light border-4 border-opacity-35 border-green-3
           ${isCameraMoving ? 'opacity-50' : ''}`} 
            onClick={isCameraMoving ? undefined : () => {
              onAnnotationPlaceholderClick(annotation.eye, annotation.target); 
              onAnnotationClick(index)}}
            key={index}
            style={{
            position: "absolute",
            transform: `translate(${(annotation.position && annotation.position[0]) || 0}px, 
                      ${(annotation.position && (annotation.position[1]-32)) || 0}px)`,
            pointerEvents: isCameraMoving ? 'none' : 'auto',
            // ...other styles
          }}
        >
          {index+1}
        </div>
      ))}
    </div>
  );
};