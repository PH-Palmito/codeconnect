import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginFolder/login";
import Feed from "./pages/Feed";
import Publish from "./pages/Publicar/publish";
import Cadastro from "./pages/cadastro/cadastro";
import Sobre_nos from "./pages/about_us/sobre_nos";

export default function App() {
  return (
    <BrowserRouter>
   <Routes>
  <Route path="/codeconnect" element={<Login />} />
  <Route path="/codeconnect/feed" element={<Feed />} />
  <Route path="/codeconnect/publish" element={<Publish />} />
  <Route path="/codeconnect/cadastro" element={<Cadastro />} />
  <Route path="/codeconnect/Sobre_nos" element={<Sobre_nos />} />
</Routes>

    </BrowserRouter>
  );
}
