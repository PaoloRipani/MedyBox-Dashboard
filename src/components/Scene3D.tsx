import React from 'react';
import sceneData from '../lib/sceneData.json';
import ARModal from './ARModal';

interface Scene3DProps {
  language: string;
  medyBox: string;
  medyLocker: string;
}

const Scene3D: React.FC<Scene3DProps> = ({ language, medyBox, medyLocker }) => {
  const key = `${medyBox}-${medyLocker}`;
  const scene = sceneData[key] || { sketchfabUrl: 'defaultUrl', texts: 'defaultTexts' };
  const arUrl = sceneData['arUrl'] || '';

  return (
    <div>
      <ARModal arUrl={arUrl} />
      <iframe 
      title="3D Scene" src={scene.sketchfabUrl} allowFullScreen></iframe>
      <div>{scene.texts[language]}</div>
    </div>
  );
};

export default Scene3D;