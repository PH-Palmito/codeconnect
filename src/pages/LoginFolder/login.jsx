import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ClipboardText } from "@phosphor-icons/react";

import { useAuth } from "../../context/AuthContext";

import Titulo from "../../componentes/login/Titulo";
import Subtitulo from "../../componentes/login/Subtitulo";
import CampoDeDigitacao from "../../componentes/login/CampoDeDigitacao";
import Botao from "../../componentes/login/Botao";
import Checkbox from "../../componentes/login/Checkbox";
import Texto from "../../componentes/login/Texto";
import ItemRedesSociais from "../../componentes/login/ItemRedesSociais";

import imagemLogin from "../../../src/assets/imagens/imagem-login.png";

export default function PaginaDeLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate("/feed"); // Redireciona após login
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="container-login">
        <img src={imagemLogin} alt="Mulher negra com computador" />

        <section>
          <form onSubmit={handleSubmit}>
            <Titulo>Login</Titulo>
            <Subtitulo>Boas-vindas! Faça o seu login</Subtitulo>

            <CampoDeDigitacao
              label="E-mail ou usuário"
              tipo="email"
              placeholder="Digite o seu e-mail ou usuário"
              value={email}
              setValor={setEmail}
            />

            <CampoDeDigitacao
              label="Senha"
              tipo="password"
              placeholder="Digite sua senha"
              value={senha}
              setValor={setSenha}
            />

            <fieldset className="form__opcoes">
              <Checkbox />
              <p><a href="#">Esqueci a senha</a></p>
            </fieldset>

            <Botao>Login</Botao>
          </form>

          <div className="container-links">
            <Texto classe="container-links__titulo">ou entre com outras contas</Texto>
            <ul>
              <ItemRedesSociais link="https://www.github.com" nome="Github" />
              <ItemRedesSociais link="https://www.google.com" nome="Google" />
            </ul>

            <Texto classe="container-links__texto">Ainda não tem conta?</Texto>
            <Link to="/cadastro" className="container-links__link">
              Crie seu cadastro!
              <ClipboardText
                size={22}
                weight="duotone"
                style={{ marginLeft: "6px", position: "relative", top: "5px" }}
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
