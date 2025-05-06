import React from 'react';
import './styles.css';

const FormularioProjeto = ({
  tags,
  tagInput,
  onAddTag,
  onRemoveTag,
  onInputChange,
}) => {
  return (
    <div>
      <div>
        <label htmlFor="nome">📌 Nome do Projeto:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          placeholder="Digite o nome do seu projeto"
        />
      </div>

      <div>
        <p>📝 Descrição do Projeto:</p>
        <textarea
          id="descricao"
          name="descricao"
          rows="4"
          cols="25"
          placeholder="Descreva brevemente seu projeto"
        ></textarea>
      </div>

      <div>
        <label htmlFor="categoria">🏷️ Tags:</label>
        <input
          type="text"
          name="categoria"
          placeholder="Ex: Front-end, React, API"
          id="input-tags"
          value={tagInput}
          onChange={onInputChange}
          onKeyDown={onAddTag}
        />
      </div>

      <ul className="lista-tags">
        {tags.map((tag, index) => (
          <li key={index}>
            {tag} <button onClick={() => onRemoveTag(tag)}>X</button>
          </li>
        ))}
      </ul>

      <div className="container-botoes">
        <button className="botao-descartar">Descartar</button>
        <button className="botao-adicionar">Publicar</button>
      </div>
    </div>
  );
};

export default FormularioProjeto;
