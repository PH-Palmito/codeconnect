// src/context/LikeContext.jsx
import { createContext, useContext, useState } from "react";

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likesPorPost, setLikesPorPost] = useState({});

  function atualizarLikes(postId, novoArrayDeLikes) {
    setLikesPorPost(prev => ({
      ...prev,
      [postId]: novoArrayDeLikes
    }));
  }

  return (
    <LikeContext.Provider value={{ likesPorPost, atualizarLikes }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLikes() {
  return useContext(LikeContext);
}
