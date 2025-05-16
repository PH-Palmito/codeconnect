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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

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

  const totalPages = Math.ceil(dados.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const dadosVisiveis = dados.slice(startIndex, endIndex);

  function irParaPagina(pagina) {
    if (pagina >= 1 && pagina <= totalPages) {
      setCurrentPage(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // rolar pro topo da página
    }
  }

  return (
    <div className='container'>
      <Sidebar />
      <div>
        <BarraDePesquisa />
        <Filtro />
        <Ordenacao />
        <ul className='lista-cards'>
          {dadosVisiveis.map((item, index) => (
            <li key={item.id}>
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

        <div className="paginacao">
          <button
            onClick={() => irParaPagina(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => irParaPagina(i + 1)}
              className={i + 1 === currentPage ? 'ativo' : ''}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => irParaPagina(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
}
