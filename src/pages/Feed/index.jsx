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
      .select('*')
      .order('create_at', { ascending: false });


    if (error) {
      console.error('Erro ao buscar publicações:', error);
    } else {
      console.log('Posts recebidos:', data); // <= Aqui
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
                linhasDeCodigo={0} // Pode ajustar isso no futuro
                compartilhamentos={0}
                comentarios={0}
                usuario="Você" // Troque quando tiver sistema de login
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
