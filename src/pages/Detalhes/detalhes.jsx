import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import Code from '../../assets/icons/code.svg';

import Sidebar from "../../componentes/sidebar";


import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Detalhes() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    async function carregarPost() {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          content,
          codigo,
          tags,
          image_url,
          profiles (
            name,
            avatar_url,
            bio
          ),
          likes (
            user_id
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Erro ao buscar post:", error);
      } else {
        setPost(data);
      }
    }

    carregarPost();
    }, [id, usuario]);


  if (!post) return <p>Carregando post...</p>;

  const userId = usuario?.id || null;
  const jaCurtiu = post.likes.some(like => like.user_id === userId);

  async function toggleLike() {
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

        setPost(prev => ({
          ...prev,
          likes: prev.likes.filter(like => like.user_id !== userId)
        }));
      } else {
        await supabase
          .from("likes")
          .insert([{ post_id: id, user_id: userId }]);

        setPost(prev => ({
          ...prev,
          likes: [...prev.likes, { user_id: userId }]
        }));
      }
    } catch (error) {
      console.error("Erro ao curtir post:", error);
    }
  }

 return (
<div className="page">
  <Sidebar />

  <div className="detalhes">
    <div className="conteudo-detalhes">
    <img
      src={post.image_url}
      alt="imagem do post"
      className="imagem-projeto"
    />

    <h1 className="titulo">{post.title}</h1>
    <p className="descricao">{post.content}</p>
    <p className="tags"><strong>Tags:</strong> {post.tags}</p>

    <hr />

    {post.codigo && (
      <div className="codigo">
        <h2>Código do Projeto:</h2>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {post.codigo}
        </SyntaxHighlighter>
      </div>
    )}

    <div className="autor">
      <img
        src={post.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${post.profiles?.name}`}
        alt="avatar"
        className="avatar"
      />
      <p><strong>Nome:</strong> {post.profiles?.name}</p>
    </div>

    <hr />

    <div className="like-container">
      <button
        onClick={toggleLike}
        style={{
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none"
        }}
      >
        <img
          src={Code}
          alt="Curtir"
          style={{
            width: 28,
            height: 28,
            filter: jaCurtiu
              ? 'invert(37%) sepia(100%) saturate(2693%) hue-rotate(93deg) brightness(94%) contrast(92%)'
              : 'none'
          }}
        />
        <span style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
          {post.likes.length}
        </span>
      </button>
      </div>
    </div>
  </div>
</div>

);

}
