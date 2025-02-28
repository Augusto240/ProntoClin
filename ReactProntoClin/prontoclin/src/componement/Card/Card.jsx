import React from "react";
import "./Card.css";

const Card = ({ medico, horario, sala, orientacoes, onDelete }) => {
    return (
      <div className="card">
        <h2>{medico}</h2>
        <p>Horário: {horario}</p>
        <p>Sala: {sala}</p>
        <p>Orientações: {orientacoes}</p>
        <div className="buttons">
          <button className="details">Detalhes</button>
          <button className="cancel" onClick={onDelete}>
            Cancelar
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;