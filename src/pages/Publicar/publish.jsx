import { Form } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '../../componentes/sidebar';
import UploadImage from '../../componentes/UploadImagem';
import FormularioProjeto from '../../componentes/FormularioProjeto';
import './publish.css';


export default function PublicarProjeto() {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    document.getElementById('image-upload').value = '';
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="app">
      <Sidebar />
      <main>
        <UploadImage
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
        />
        <div className="container-descricao">
          <h2>Novo projeto</h2>
          <FormularioProjeto
            tags={tags}
            tagInput={tagInput}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            onInputChange={(e) => setTagInput(e.target.value)}
          />
        </div>
      </main>
    </div>
  );
}
