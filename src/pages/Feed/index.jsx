import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import BarraDePesquisa from '../../componentes/BarraDePesquisa';
import Card from '../../componentes/Card';
import Filtro from '../../componentes/Filtro';
import Ordenacao from '../../componentes/Ordenacao';
import Sidebar from '../../componentes/sidebar';
import './styles.css';

export default function Feed() {
  const [dados, setDados] = useState([]);



useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        tags,
        image_url,
        create_at,
        profiles (
          name,
          avatar_url
        )
      `)
      .order('create_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar publicações:', error);
    } else {
      setDados(data);
    }
  };

  fetchPosts();
}, []);



  return (
    <div className='container'>
      <Sidebar />
      <div>
        <BarraDePesquisa />
        <Filtro />
        <Ordenacao />
       <ul className='lista-cards'>
  {dados.map((item, index) => (
    <li key={index}>
      <Card
        id={item.id}
        imagemUrl={item.image_url}
        titulo={item.title}
        resumo={item.content}
        linhasDeCodigo={item.tags?.split(',').length || 0}
        compartilhamentos={0}
        comentarios={0}
        usuario={{
          nome: item.profiles?.name,
          imagem: item.profiles?.avatar_url
        }}
      />
    </li>
  ))}
</ul>

      </div>
    </div>
  );
}
