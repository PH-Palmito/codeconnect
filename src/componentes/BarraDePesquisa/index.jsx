import { useState } from 'react';
import './styles.css';

export default function BarraDePesquisa({ onPesquisar }) {
  const [termo, setTermo] = useState('');

  const lidarComMudanca = (e) => {
    const valor = e.target.value;
    setTermo(valor);
    onPesquisar(valor); // comunica o valor para o Feed
  };

  return (
    <input
      type="search"
      placeholder="Digite o que você procura"
      className="barra-pesquisa"
      value={termo}
      onChange={lidarComMudanca}
    />
  );
}
