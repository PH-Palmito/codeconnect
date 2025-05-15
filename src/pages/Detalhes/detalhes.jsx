import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import Code from '../../assets/icons/code.svg'; // importe o ícone do jeito que você já faz

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
  }, [id]);

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
    <div style={{ padding: "2rem" }}>
      <img
        src={post.image_url}
        alt="imagem do post"
        style={{ maxWidth: "100%", borderRadius: "1rem", marginBottom: "1rem" }}
      />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><strong>Tags:</strong> {post.tags}</p>

      <hr />
       {post.codigo && (
          <div className="codigo">
            <h2>Código do Projeto:</h2>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
              {post.codigo}
            </SyntaxHighlighter>
          </div>
        )}

      <div style={{ marginTop: "1rem" }}>
        <h3>Autor</h3>
        <img
          src={post.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${post.profiles?.name}`}
          alt="avatar"
          style={{ width: 50, borderRadius: "50%" }}
        />
        <p><strong>Nome:</strong> {post.profiles?.name}</p>
      </div>

      <hr />

      <div>
        <button
          onClick={toggleLike}
          style={{
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            userSelect: "none"
          }}
          aria-label="Curtir post"
        >
          <img
            src={Code}
            alt="Curtir"
            style={{
              width: 24,
              height: 24,
              filter: jaCurtiu ? 'invert(37%) sepia(100%) saturate(2693%) hue-rotate(93deg) brightness(94%) contrast(92%)' : 'none',
              marginRight: 8
            }}
          />
          {post.likes.length}
        </button>
      </div>
    </div>
  );
}
