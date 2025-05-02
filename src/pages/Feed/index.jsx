// src/pages/Feed/index.jsx
import { useEffect, useState } from 'react'
import BarraDePesquisa from '../../componentes/BarraDePesquisa'
import Card from '../../componentes/Card'
import Filtro from '../../componentes/Filtro'
import Ordenacao from '../../componentes/Ordenacao'
import Sidebar from '../../componentes/Sidebar'
import './styles.css' 

export default function Feed() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/MonicaHillman/codeconnect-api/publicacoes')
      .then(resposta => resposta.json())
      .then(dados => setDados(dados))
  }, [])

  return (
    <div className='container'>
      <Sidebar />
      <div>
        <BarraDePesquisa />
        <Filtro />
        <Ordenacao />
        <ul className='lista-cards'>
          {dados.map((item, index) => (
            <li key={index}>
              <Card
                id={item.id}
                imagemUrl={item.imagem_capa}
                titulo={item.titulo}
                resumo={item.resumo}
                linhasDeCodigo={item.linhas_de_codigo}
                compartilhamentos={item.compartilhamentos}
                comentarios={item.comentarios}
                usuario={item.usuario}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
