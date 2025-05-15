import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Sidebar from '../../componentes/sidebar';
import Card from '../../componentes/Card';
import { Pencil } from '@phosphor-icons/react';
import './perfil.css';

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      console.error('Erro ao obter usuário:', userError.message);
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
      console.error('Erro ao buscar perfil:', error.message);
    } else {
      setProfile(data);
      setNewName(data.name);
      setImageUrl(data.avatar_url);
    }

    setLoading(false);
  }

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleAvatarChange = (e) => setNewAvatar(e.target.files[0]);

  const handleSaveChanges = async () => {
    if (!profile?.id) {
      console.error('ID do perfil não encontrado!');
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
        console.error('Erro ao fazer upload da imagem:', uploadError.message);
        return;
      }

      const { publicURL, error: publicUrlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (publicUrlError) {
        console.error('Erro ao obter URL da imagem:', publicUrlError.message);
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
      });

    if (error) {
      console.error('Erro ao salvar alterações:', error.message);
    } else {
      setProfile(data[0]);
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

        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

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
            <button onClick={handleSaveChanges}>Salvar</button>
            <button onClick={() => setEditMode(false)}>Cancelar</button>
          </div>
        ) : (
          <div>
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
