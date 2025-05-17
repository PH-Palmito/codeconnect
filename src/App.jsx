import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Páginas
import Login from "./pages/LoginFolder/login";
import Feed from "./pages/Feed";
import Publish from "./pages/Publicar/publish";
import Cadastro from "./pages/cadastro/cadastro";
import SobreNos from "./pages/about_us/sobre_nos";
import PaginaPerfil from "./pages/perfil/perfil";
import Detalhes from "./pages/Detalhes/detalhes";


// Componentes
import RotaPrivada from "./componentes/RotaPrivada";

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/detalhes/:id" element={<Detalhes />} />

        <Route
          path="/perfil"
          element={
            <RotaPrivada>
              <PaginaPerfil />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
