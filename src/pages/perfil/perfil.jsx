import { useEffect, useState } from 'react'; 
import { supabase } from '../../lib/supabaseClient';
import Sidebar from '../../componentes/sidebar'; // Importe o Sidebar
import Card from '../../componentes/Card'; // Importe o Card
import './perfil.css'; // Importe um arquivo de estilo para a tela

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        name,
        avatar_url,
        posts (
          id,
          title,
          content,
          image_url,
          create_at
        )
      `)
      .eq('id', user.id)
      .single(); // Como só vem 1 perfil

    if (error) {
      console.error('Erro ao buscar perfil:', error.message);
    } else {
      setProfile(data);
    }

    setLoading(false);
  }

  if (loading) return <p>Carregando perfil...</p>;

  if (!profile) return <p>Perfil não encontrado.</p>;

  return (
    <div className="perfil-container">
      <Sidebar /> {/* Sidebar importado e adicionado */}
      
      <div className="perfil-content">
        <h1>Perfil de {profile.name}</h1>
        <img src={profile.avatar_url} alt="Avatar" className="avatar" />

        <h2>Posts</h2>
        {profile.posts && profile.posts.length > 0 ? (
          profile.posts.map(post => (
            <Card key={post.id} className="post-card"> {/* Card importado para exibir posts */}
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              {post.image_url && <img src={post.image_url} alt="Imagem do post" className="post-image" />}
            </Card>
          ))
        ) : (
          <p>Este usuário ainda não tem posts.</p>
        )}
      </div>
    </div>
  );
}
