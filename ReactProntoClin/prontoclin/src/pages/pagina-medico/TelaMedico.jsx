import React from "react";
import Header from '../../componement/Header';
import "./TelaMedico.css";

const TelaMedico = () => {
  return (
    <div>
        <Header />
        <div className="main">
          <h3>Consultas do dia</h3>
          <hr/>
          <div className="cards-container">
              <div className="card">
                  <h2>Paciente Davi Oliveira</h2>
                  <p>Horário: 07hrs</p>
                  <p>Sala: lab 6</p>
                  <button className="details">Detalhes</button>
                  <button className="cancel">Cancelar</button>
              </div>
          </div>
      </div>    
    </div>
  );
};

export default TelaMedico;
