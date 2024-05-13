import { useState } from 'react';
import sceneData from '../lib/sceneData.json';

export default function ConfigurationModal({ onProductChange }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  const handleProductChange = (product) => {
    setSelectedProduct(product);
    setSelectedModel(null);
  };

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  const handleConfirm = () => {
    onProductChange(selectedProduct, selectedModel);
  };

  const products = Object.keys(sceneData);
  const models = selectedProduct ? Object.keys(sceneData[selectedProduct]) : [];

  const key = `${selectedProduct}-${selectedModel}`;
  const previewUrl = sceneData[selectedProduct]?.[selectedModel]?.previewUrl || '/path/to/defaultPreview.png';

  return (
    <div>
      <div>
        <button onClick={() => handleProductChange(null)}>Close Modal</button>
        {products.map((product) => (
          <button key={product} onClick={() => handleProductChange(product)}>
            {product}
          </button>
        ))}
      </div>
      <div>
        {selectedProduct ? (
          <>
            <button onClick={() => handleProductChange(null)}>Close Modal</button>
            {models.map((model) => (
              <div key={model} onClick={() => handleModelChange(model)}>
                {model}
              </div>
            ))}
            <button onClick={handleConfirm}>Confirm</button>
          </>
        ) : (
          <img src={previewUrl} alt="Preview" />
        )}
      </div>
    </div>
  );
}