import React from "react";
import Header from '../../componement/Header';
import "./TelaMedico.css";


const TelaMedico = () => {
  return (
    <div>

        <Header />

        <div className="main">
          <div className="actions">
              <h3> Consultas dia 22/04/2021</h3>
          </div>

          <hr/>
          <div className="cards-container">
              <div className="card">
                  <h2>Paciente Davi Oliveira</h2>
                  <p>Horário: 07hrs</p>
                  <p>Sala: lab 6</p>
                  <p>Orientações: lorem isto oloem</p>
                  <div class="buttons">
                      <button className="details">Detalhes</button>
                      <button className="cancel">Cancelar</button>
                  </div>
              </div>
              <div className="card">
                  <h2>Paciente José Augusto</h2>
                  <p>Horário: 09hrs</p>
                  <p>Sala: lab 8</p>
                  <p>Orientações: exemplo orientação</p>
                  <div className="buttons">
                      <button className="details">Detalhes</button>
                      <button className="cancel">Cancelar</button>
                  </div>
              </div>
          </div>
      </div>    
    </div>
    )
}
export default TelaMedico;