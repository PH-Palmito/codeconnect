import React from 'react';
import './styles.css';

export default function UploadImagem({ imagePreview, onImageChange, onRemoveImage }) {
  return (
    <div className="container-upload-imagem">
      <div className="container-imagem">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="main-imagem" />
        ) : (
          <p>Escolha uma imagem</p>
        )}
      </div>
      <button onClick={() => document.getElementById('image-upload').click()}>
        Enviar projeto
      </button>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={onImageChange}
        style={{ display: 'none' }}
      />
      {imagePreview && (
        <div className="container-imagem-nome">
          <p>nome_do_seu_projeto.png</p>
          <img
            src="/img/close.svg"
            alt="Remover"
            onClick={onRemoveImage}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}
    </div>
  );
}
