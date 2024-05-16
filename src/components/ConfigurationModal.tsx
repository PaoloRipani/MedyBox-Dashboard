import { useState } from 'react';
import sceneData from '../lib/sceneData.json';

export default function ConfigurationModal({ onProductChange, onClose }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState('None');

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedModel('None');
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  const handleConfirm = () => {
    onProductChange(selectedProduct, selectedModel);
  };

  const products = Object.keys(sceneData);
  const models = selectedProduct ? ['None', ...Object.keys(sceneData[selectedProduct])] : [];

  const key = `${selectedProduct}-${selectedModel}`;
  const previewUrl = sceneData[selectedProduct]?.[selectedModel]?.previewUrl || '/path/to/defaultPreview.png';
  const dimensions = sceneData[selectedProduct]?.[selectedModel]?.dimensions || 'No dimensions available';

  return (
    <div>
      <div>
        <button onClick={onClose}>Close Modal</button>
        {!selectedProduct ? (
          <>
            <h1>Title</h1>
            <p>Description</p>
            {products.map((product) => (
              <div key={product} onClick={() => handleProductChange(product)}>
                {product}
              </div>
            ))}
          </>
        ) : (
          <>
            {models.map((model) => (
              <div key={model} onClick={() => handleModelChange(model)}>
                {model}
              </div>
            ))}
            <button onClick={handleConfirm}>Confirm</button>
          </>
        )}
      </div>
      <div>
        {selectedProduct && (
          <>
            <h1>{selectedModel}</h1>
            <p>{dimensions}</p>
            <img src={previewUrl} alt="Preview" />
          </>
        )}
      </div>
    </div>
  );
}