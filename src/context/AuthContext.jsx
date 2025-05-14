import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

const updateUserProfile = async (updates) => {
  try {
    const { data, error } = await supabase.auth.updateUser({ data: updates });
    if (error) throw error;
    setUsuario((prev) => ({ ...prev, user_metadata: { ...prev.user_metadata, ...updates } }));
    return data;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error.message);
    throw error;
  }
};


export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  async function login(email, senha) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    const user = data?.user;
    if (user) {
      setUsuario(user);
      localStorage.setItem('usuarioLogado', JSON.stringify(user));
    }

    return user;
  }

  function logout() {
    supabase.auth.signOut();
    setUsuario(null);
    localStorage.removeItem('usuarioLogado');
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
