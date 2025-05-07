import React, { useState, useRef } from 'react';
import './publish.css';
import Sidebar from '../../componentes/sidebar';
import { NotePencil, PencilSimple, Tag, Trash, Upload, UploadSimple } from '@phosphor-icons/react';

export default function Publish() {
  const [image, setImage] = useState(null); // Estado para armazenar a imagem carregada
  const fileInputRef = useRef(null);

  // Função para lidar com o clique e fazer o upload da imagem
  const handleUploadClick = () => {
    fileInputRef.current.click(); // Simula o clique no input file
  };

  // Função para atualizar o estado com a imagem carregada
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Cria um URL temporário para a imagem
      setImage(imageUrl); // Atualiza o estado com a URL da imagem
    }
  };

  return (
    <div className="page">
      <Sidebar />
      <main>
        <div className="container-upload-imagem">
          <div className="container-imagem">
            {/* Se houver uma imagem carregada, exibe ela, senão exibe uma imagem padrão */}
            <img src={image || "src/assets/imagens/card_code_editor.png"} alt="preview" className="main-imagem" />
          </div>

          <button className="button-upload" onClick={handleUploadClick}>
            Carregar imagem<UploadSimple size={18} weight="bold" style={{ marginLeft: '8px', position: 'relative', top: '2px' }} />
          </button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange} // Atualiza o estado com a nova imagem
          />

          {/* Nome da imagem carregada (se houver uma imagem carregada) */}
          <div className="container-imagem-nome">
            <p>{image ? image.split('/').pop() : 'image_projeto.png'}</p>

          </div>
        </div>
      </main>

      <main>
        <div className="container-descricao">
          <h2>Nova Publicação</h2>
          <form>
            <div>
              <label htmlFor="nome">Nome do projeto<NotePencil size={24} color='#81FE88' weight='fill' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} /></label>
              <input type="text" id="nome" name="nome" />
            </div>
            <div>
              <label htmlFor="descricao">Descrição<PencilSimple size={24} color='#81FE88' weight='regular' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} /></label>
              <textarea id="descricao" name="descricao"></textarea>
            </div>
            <div>
              <label htmlFor="categoria">Tags<Tag size={24} color='#81FE88' weight='fill' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} /></label>
              <input type="text" id="input-tags" name="categoria" />
            </div>
            <ul className="lista-tags" id="lista-tags">
              {/* tags renderizadas aqui via JavaScript futuramente */}
            </ul>
            <div className="container-botoes">

              <button type="button" className="botao-descartar" >   Descartar<Trash size={24} weight="duotone"style={{ marginLeft: '8px', position: 'relative', top: '4px' }}  /></button>
              <button className="botao-publicar">
  Publicar <UploadSimple size={20} weight="bold" style={{ marginLeft: '8px', position: 'relative', top: '4px' }} />

</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
