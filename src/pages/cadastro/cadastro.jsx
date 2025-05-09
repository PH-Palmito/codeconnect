import { useNavigate } from "react-router-dom";

import './LoginCadastro.css';
import Titulo from '../../componentes/login/Titulo';
import Subtitulo from '../../componentes/login/Subtitulo';
import CampoDeDigitacao from '../../componentes/login/CampoDeDigitacao';
import Botao from '../../componentes/login/Botao';
import Checkbox from '../../componentes/login/Checkbox';
import Texto from '../../componentes/login/Texto';
import ItemRedesSociais from '../../componentes/login/ItemRedesSociais';
import ContainerLink from '../../componentes/login/ContainerLink';
import { Link } from 'react-router-dom';

import imagemcadastro from '../../../src/assets/imagens/imagem-cadastro.png';

import { useState } from 'react';
import { ArrowRight, SignIn } from "@phosphor-icons/react";

export default function PaginaDeLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();  // <-- useNavigate() aqui

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email', email);
    console.log('senha', senha);
    console.log('Name', name);
    // Aqui você pode adicionar qualquer lógica para verificar o login, como uma API

    // Redireciona para o Feed
    navigate("/codeconnect/feed");  // <-- Redirecionamento para o feed
  };

  return (
    <div className="login-page">
      <div className="container-login">
        <section>
          <form onSubmit={handleSubmit}>
            <Titulo>Cadastro</Titulo>
            <Subtitulo>Boas-vindas! Preencha seus dados</Subtitulo>


            <CampoDeDigitacao
              label="Nome completo"
              tipo="text"
              placeholder="Digite seu nome"
              value={name}
              setValor={setName}
            />

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
            </fieldset>

            <Botao>Cadastrar<ArrowRight size={20} weight="bold" style={{ marginLeft: '6px', position: 'relative', top: '2px' }} /></Botao>
          </form>

          <div className="container-links">
            <Texto classe="container-links__titulo">ou entre com outras contas</Texto>
            <ul>
              <ItemRedesSociais link="https://www.github.com" nome="Github" />
              <ItemRedesSociais link="https://www.google.com" nome="Google" />
            </ul>
            <Texto classe="container-links__texto">Ja tem uma conta? <Link to="/codeconnect/"className="container-links__link">Faça seu login!<SignIn size={20} weight="bold" style={{ marginLeft: '6px', position: 'relative', top: '5px' }} /></Link></Texto>

          </div>
        </section>
      <img src={imagemcadastro} alt="mulher negra com computador" />
      </div>
    </div>
  );
}
