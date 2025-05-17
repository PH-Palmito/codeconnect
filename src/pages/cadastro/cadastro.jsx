import { useNavigate } from "react-router-dom";
import { supabase } from '../../lib/supabaseClient';

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

const handleSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: { name } // ainda útil para user_metadata
    }
  });

  if (error) {
    console.error('Erro ao cadastrar:', error.message);
    alert('Erro ao cadastrar');
    return;
  }

  const user = data.user;

  // Salvar no banco de dados (tabela profiles)
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    name: name,
    avatar_url: "https://i.pravatar.cc/150?u=" + email // exemplo de avatar aleatório
  });

  if (profileError) {
    console.error('Erro ao salvar perfil:', profileError.message);
    alert('Erro ao salvar perfil');
    return;
  }

  alert('Cadastro realizado com sucesso!');
  navigate("/");
};

  return (
    <div className="login-page">
      <div className="container-login">
        <section>
          <form onSubmit={handleSubmit}>
            <Titulo>Cadastro</Titulo>
            <Subtitulo>Boas-vindas! Preencha seus dados</Subtitulo>


            <CampoDeDigitacao
              label="Usuario"
              tipo="text"
              placeholder="Digite seu usuario"
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


            <Botao>Cadastrar<ArrowRight size={20} weight="bold" style={{ marginLeft: '6px', position: 'relative', top: '2px' }} /></Botao>
          </form>

          <div className="container-links">
            <Texto classe="container-links__titulo">ou entre com outras contas</Texto>
            <ul>
              <ItemRedesSociais link="https://www.github.com" nome="Github" />
              <ItemRedesSociais link="https://www.google.com" nome="Google" />
            </ul>
            <Texto classe="container-links__texto">Ja tem uma conta? <Link to="/"className="container-links__link">Faça seu login!<SignIn size={20} weight="bold" style={{ marginLeft: '6px', position: 'relative', top: '5px' }} /></Link></Texto>

          </div>
        </section>
      <img src={imagemcadastro} alt="mulher negra com computador" />
      </div>
    </div>
  );
}
