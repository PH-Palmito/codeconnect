import { supabase } from '../../lib/supabaseClient' // ou './lib/supabaseClient' dependendo do nome do seu arquivo


import Code from './assets/code.svg';
import Chat from './assets/chat.svg';
import Share from './assets/share.svg';
import './styles.css';

const { data: posts } = await supabase
  .from('posts')
  .select(`
    id,
    title,
    content,
    tags,
    image_url,
    profiles (
      name,
      avatar_url
    )
  `);
{posts.map(post => (
  <Card
    key={post.id}
    id={post.id}
    imagemUrl={post.image_url}
    titulo={post.title}
    resumo={post.content}
    linhasDeCodigo={post.tags?.split(',').length || 0}
    compartilhamentos={0} // ou do seu backend
    comentarios={0} // ou do seu backend
    usuario={{
      nome: post.profiles?.name,
      imagem: post.profiles?.avatar_url
    }}
  />
))}


export default function Card({ id, imagemUrl, titulo, resumo, linhasDeCodigo, compartilhamentos, comentarios, usuario }) {
    return (
        <article className="card">
           <div className="card__imagem">
  {imagemUrl ? <img src={imagemUrl} alt="imagem do post" /> : <p>Imagem não disponível</p>}
</div>

            <div className='card__conteudo'>
                <div className='conteudo__texto'>
                    <h3>{titulo}</h3>
                    <p>{resumo}</p>
                </div>

                <div className='conteudo__rodape'>
                    <ul>
                        <li>
                            <img src={Code} alt='códigos' />
                            {linhasDeCodigo}
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
    )
}