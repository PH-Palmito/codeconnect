import { useEffect, useState } from 'react';
import { Pencil } from '@phosphor-icons/react';

import { supabase } from '../../lib/supabaseClient';
import Sidebar from '../../componentes/sidebar';
import Card from '../../componentes/Card';
import Mensagem from '../../componentes/mensagem/mensagem';

import './perfil.css';

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [newBio, setNewBio] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setErrorMessage('Erro ao obter usuário: ' + userError.message);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        id,
        name,
        avatar_url,
        bio,
        posts (
          id,
          title,
          content,
          image_url,
          create_at,
          tags
        )
      `)
      .eq('id', user.id)
      .single();

    if (error) {
      setErrorMessage('Erro ao buscar perfil: ' + error.message);
    } else {
      setProfile(data);
      setNewName(data.name || '');
      setNewBio(data.bio || '');
      setImageUrl(data.avatar_url || '');
    }

    setLoading(false);
  }

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleBioChange = (e) => setNewBio(e.target.value);
  const handleAvatarChange = (e) => setNewAvatar(e.target.files[0]);

  const handleSaveChanges = async () => {
    if (!profile?.id) {
      setErrorMessage('ID do perfil não encontrado!');
      return;
    }

    let finalImageUrl = profile.avatar_url;

    if (newAvatar) {
      const fileExt = newAvatar.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, newAvatar);

      if (uploadError) {
        setErrorMessage('Erro ao fazer upload da imagem: ' + uploadError.message);
        return;
      }

      const { publicURL, error: publicUrlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrlError) {
        setErrorMessage('Erro ao obter URL da imagem: ' + publicUrlError.message);
        return;
      }

      finalImageUrl = publicURL;
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: profile.id,
        name: newName,
        avatar_url: finalImageUrl,
        bio: newBio,
      });

    if (error) {
      setErrorMessage('Erro ao salvar alterações: ' + error.message);
    } else {
      setProfile({
        ...profile,
        name: newName,
        avatar_url: finalImageUrl,
        bio: newBio,
      });
      setImageUrl(finalImageUrl);
      setEditMode(false);
      setSuccessMessage('Alterações salvas com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (loading) return <p>Carregando perfil...</p>;
  if (!profile) return <p>Perfil não encontrado.</p>;

  return (
    <div className="perfil-container">
      <Sidebar />

      <div className="perfil-content">
        <h1>Perfil de {profile.name}</h1>

        <Mensagem tipo="sucesso" texto={successMessage} />
        <Mensagem tipo="erro" texto={errorMessage} />

        <div className="avatar-container">
          <img src={imageUrl} alt="Avatar" className="avatar" />
          <button onClick={() => setEditMode(!editMode)} className="edit-icon">
            <Pencil size={20} color="#81FE88" weight="fill" style={{ marginTop: '30px' }} />
          </button>
        </div>

        {editMode ? (
          <div className="edit-profile">
            <div>
              <label>Nome:</label>
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
              />
            </div>

            <div>
              <label>Imagem de Perfil:</label>
              <input
                type="file"
                onChange={handleAvatarChange}
              />
            </div>

            <div>
              <label>Biografia:</label>
              <textarea
                value={newBio}
                onChange={handleBioChange}
                rows={4}
              />
            </div>

            <button onClick={handleSaveChanges}>Atualizar</button>
            <button onClick={() => setEditMode(false)}>Cancelar</button>
          </div>
        ) : (
          <div>
            <div className="bio-section">
              <p className="bio">
                {profile.bio || 'Este usuário ainda não escreveu uma biografia.'}
              </p>
            </div>

            <h2>Posts</h2>
            <div className="lista-cards">
              {profile.posts && profile.posts.length > 0 ? (
                profile.posts.map((post) => (
                  <Card
                    key={post.id}
                    id={post.id}
                    imagemUrl={post.image_url}
                    titulo={post.title}
                    resumo={post.content}
                    linhasDeCodigo={post.tags?.split(',').length || 0}
                    compartilhamentos={0}
                    comentarios={0}
                    usuario={{
                      nome: profile.name,
                      imagem: profile.avatar_url,
                    }}
                  />
                ))
              ) : (
                <p>Este usuário ainda não tem posts.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
