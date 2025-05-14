import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginFolder/login";
import Feed from "./pages/Feed";
import Publish from "./pages/Publicar/publish";
import Cadastro from "./pages/cadastro/cadastro";
import Sobre_nos from "./pages/about_us/sobre_nos";
import PaginaPerfil from './pages/perfil/perfil';
import RotaPrivada from './componentes/RotaPrivada';
import { useEffect, useState } from "react";

export default function App() {
   const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  return (
    <BrowserRouter>
   <Routes>
  <Route path="/codeconnect" element={<Login />} />
  <Route path="/codeconnect/feed" element={<Feed />} />
  <Route path="/codeconnect/publish" element={<Publish />} />
  <Route path="/codeconnect/cadastro" element={<Cadastro />} />
  <Route path="/codeconnect/Sobre_nos" element={<Sobre_nos />} />
  <Route path="/codeconnect/perfil" element={
  <RotaPrivada>
    <PaginaPerfil />
  </RotaPrivada>
  }/>
</Routes>

    </BrowserRouter>
  );
}
