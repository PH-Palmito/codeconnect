import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient';

import Code from './assets/code.svg';
import Chat from './assets/chat.svg';
import Share from './assets/share.svg';
import './styles.css';

export default function Card({ id, imagemUrl, titulo, resumo, linhasDeCodigo, compartilhamentos, comentarios, usuario, likes = [] }) {
  const { usuario: user } = useAuth();
  const userId = user?.id;
  const [curtidas, setCurtidas] = useState(likes);
  const navigate = useNavigate();



  const jaCurtiu = userId && curtidas.some(like => like.user_id === userId);
useEffect(() => {
  async function buscarCurtidas() {
    const { data, error } = await supabase
      .from("likes")
      .select("user_id")
      .eq("post_id", id);

    if (error) {
      console.error("Erro ao buscar curtidas:", error.message);
    } else {
      setCurtidas(data);
    }
  }

  if (id) {
    buscarCurtidas();
  }
}, [id, userId]);
  async function toggleLike(e) {
    e.preventDefault(); // Impede navegação pelo Link
    e.stopPropagation();

    if (!userId) {
      alert("Você precisa estar logado para curtir.");
      return;
    }

    try {
      if (jaCurtiu) {
        await supabase
          .from("likes")
          .delete()
          .match({ post_id: id, user_id: userId });

        setCurtidas(prev => prev.filter(like => like.user_id !== userId));
      } else {
        await supabase
          .from("likes")
          .insert([{ post_id: id, user_id: userId }]);

        setCurtidas(prev => [...prev, { user_id: userId }]);
      }
    } catch (error) {
      console.error("Erro ao curtir:", error.message);
    }
  }

  return (
    <Link to={`/codeconnect/detalhes/${id}`} className="card__link">
      <article className="card">
        <div className="card__imagem">
          {imagemUrl ? <img src={imagemUrl} alt="imagem do post" /> : <p>Imagem não disponível</p>}
        </div>

        <div className='card__conteudo'>
          <div className='conteudo__texto'>
            <h3>{titulo}</h3>
            <p>
              {resumo.length > 50 ? (
                <>
                  {resumo.slice(0, 50)} <span className="leia-mais">leia mais...</span>
                </>
              ) : resumo}
            </p>
          </div>

          <div className='conteudo__rodape'>
            <ul>
              <li>
            <button
            onClick={toggleLike}
            className={`botao-curtida ${jaCurtiu ? 'curtido' : ''}`}
            aria-label="Curtir post"
            >
            <img src={Code} alt="códigos" />
            <span>{curtidas.length}</span>
            </button>

              </li>
              <li>
                <img src={Share} alt='compartilhamentos' />
                {compartilhamentos}
              </li>
              <li>
                <img src={Chat} alt='comentários' />
                {comentarios}
              </li>
            </ul>

            <div className='rodape__usuario'>
              {usuario ? (
                <>
                  <img src={usuario.imagem || `https://ui-avatars.com/api/?name=${usuario.nome}`} alt='imagem do usuário' />
                  <span>{usuario.nome || 'Nome não disponível'}</span>
                </>
              ) : (
                <p>Usuário não encontrado</p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
