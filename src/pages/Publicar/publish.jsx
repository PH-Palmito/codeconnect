import React, { useState, useRef } from 'react';
import './publish.css';
import Sidebar from '../../componentes/sidebar';
import { NotePencil, PencilSimple, Tag, Trash, UploadSimple } from '@phosphor-icons/react';
import { supabase } from '../../lib/supabaseClient';

export default function Publish() {
  const [imagePreview, setImagePreview] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };


const handlePublicar = async () => {
  try {
    if (!nome.trim() || !descricao.trim() || !categoria.trim()|| !imagePreview) {
  alert('Por favor, preencha todos os campos antes de publicar.');
  return;
}



    let imageUrl = null;

    if (fileInputRef.current.files.length > 0) {
      const file = fileInputRef.current.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Iniciando upload da imagem:', file);

      // Upload da imagem para o bucket 'images'
      let { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;
      console.log('Imagem enviada com sucesso!');

      // Gerar URL pública
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      imageUrl = data.publicUrl;
      console.log('URL da imagem:', imageUrl);
    }

    // Inserir dados no Supabase
    console.log('Inserindo dados no banco de dados...');
 // Buscar o usuário autenticado
const {
  data: { user },
  error: userError
} = await supabase.auth.getUser();

if (userError || !user) {
  throw new Error("Usuário não autenticado.");
}

// Inserir post com author_id
const { error: insertError } = await supabase
  .from('posts')
  .insert([{
    title: nome,
    content: descricao,
    tags: categoria,
    image_url: imageUrl,
    profile_id: user.id // <- agora está certo!
  }]);


    if (insertError) throw insertError;
    console.log('Post publicado com sucesso!');

    alert('Post publicado com sucesso!');
    // Resetar campos se quiser
    setNome('');
    setDescricao('');
    setCategoria('');
    setImagePreview(null);
  } catch (error) {
    console.error('Erro ao publicar:', error.message);
    alert('Erro ao publicar post.');
  }
};


  return (
    <div className="page">
      <Sidebar />
      <main>
        <div className="container-upload-imagem">
          <div className="container-imagem">
            <img src={imagePreview || "src/assets/imagens/card_code_editor.png"} alt="preview" className="main-imagem" />
          </div>

          <button className="button-upload" onClick={handleUploadClick}>
            Carregar imagem
            <UploadSimple size={18} weight="bold" style={{ marginLeft: '8px', position: 'relative', top: '2px' }} />
          </button>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <div className="container-imagem-nome">
            <p>{imagePreview ? imagePreview.split('/').pop() : 'image_projeto.png'}</p>
          </div>
        </div>
      </main>

      <main>
        <div className="container-descricao">
          <h2>Nova Publicação</h2>
          <form>
            <div>
              <label htmlFor="nome">
                Nome do projeto
                <NotePencil size={24} color='#81FE88' weight='fill' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} />
              </label>
              <input type="text" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <label htmlFor="descricao">
                Descrição
                <PencilSimple size={24} color='#81FE88' weight='regular' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} />
              </label>
              <textarea id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
            </div>
            <div>
              <label htmlFor="categoria">
                Tags
                <Tag size={24} color='#81FE88' weight='fill' style={{ marginLeft: '4px', position: 'relative', top: '5px' }} />
              </label>
              <input type="text" id="input-tags" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </div>
            <ul className="lista-tags" id="lista-tags">
              {/* tags futuras aqui */}
            </ul>
            <div className="container-botoes">
              <button type="button" className="botao-descartar">
                Descartar
                <Trash size={24} weight="duotone" style={{ marginLeft: '8px', position: 'relative', top: '4px' }} />
              </button>
              <button type="button" className="botao-publicar" onClick={handlePublicar}>
                Publicar
                <UploadSimple size={20} weight="bold" style={{ marginLeft: '8px', position: 'relative', top: '4px' }} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
