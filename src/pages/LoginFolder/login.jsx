import { useNavigate } from "react-router-dom";

import './Login.css';
import Titulo from '../../componentes/login/Titulo';
import Subtitulo from '../../componentes/login/Subtitulo';
import CampoDeDigitacao from '../../componentes/login/CampoDeDigitacao';
import Botao from '../../componentes/login/Botao';
import Checkbox from '../../componentes/login/Checkbox';
import Texto from '../../componentes/login/Texto';
import ItemRedesSociais from '../../componentes/login/ItemRedesSociais';
import Link from '../../componentes/login/Link';

import imagemLogin from '../../../src/assets/imagens/imagem-login.png';

import { useState } from 'react';

export default function PaginaDeLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();  // <-- useNavigate() aqui

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email', email);
    console.log('senha', senha);
    // Aqui você pode adicionar qualquer lógica para verificar o login, como uma API

    // Redireciona para o Feed
    navigate("/codeconnect/feed");  // <-- Redirecionamento para o feed
  };

  return (
    <div className="login-page">
      <div className="container-login">
        <img src={imagemLogin} alt="mulher negra com computador" />
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
              <p>
                <a href="#">Esqueci a senha</a>
              </p>
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
            <Link>Crie seu cadastro!</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
