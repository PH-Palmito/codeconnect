import Sidebar from '../../componentes/sidebar';
import React from 'react';
import './About.css';
import brainImage from '../../assets/imagens/sobre-nos.png';
import NerdImage from '../../assets/imagens/nerd.png';
import Logo from '../../assets/imagens/a.png';

export default function About() {
  return (
    <div className="about-container">
<Sidebar />

      <div className="containerAbout">
        <img src={brainImage} alt="Tecnologia e conexão" className="image" />

        <div className="text-content">
          <h1 className="welcome">Bem-Vindo ao CodeConnect!</h1>
          <h2 className="subtitle">Onde a comunidade e o código se unem!</h2>
          <p className="paragraph">
            No coração da revolução digital está a colaboração. CodeConnect nasceu da visão de criar
            um espaço onde desenvolvedores, programadores e entusiastas da tecnologia podem se
            conectar, aprender e colaborar de maneira inigualável.
          </p>
          <p className="paragraph">
            Somos uma comunidade global apaixonada por código e estamos comprometidos em oferecer
            um ambiente inclusivo e inspirador para todos os níveis de habilidade.
            <div className="mission-section">
  <div className="mission-text">
    <h2 className="section-title">Nossa Missão</h2>
    <p className="paragraph">
      Na CodeConnect, acreditamos que a colaboração é a essência da inovação. Nossa missão é fornecer uma plataforma
      onde os mentes criativas podem se unir, compartilhar conhecimento, e desenvolver projetos extraordinários.
      Quer você seja um novato ansioso para aprender ou um veterano experiente, você encontrará aqui um lar para suas aspirações tecnológicas.
    </p>
  </div>
  <img src={NerdImage} alt="Pessoa programando" className="mission-image" />
</div>

<div className="join-section">
  <h2 className="section-title">Junte-se a Nós!</h2>
  <p className="paragraph">
    Estamos animados para ter você conosco nesta jornada empolgante. Junte-se à nossa comunidade vibrante e descubra
    o poder da colaboração no mundo do código.
  </p>

  <div className="final-message">
    <img src={Logo} alt="Logo CodeConnect" className="logo-icon" />
    <span>Juntos, vamos transformar ideias em inovações e moldar o futuro digital.</span>
  </div>
</div>

          </p>
        </div>
      </div>
    </div>
  );
}
