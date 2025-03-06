import { useState } from "react";

import Header from "../../componement/Header/index";
import Card from "../../componement/Card/Card";
import Modal from "../../componement/Modal/Modal";

import "./TelaPaciente.css";

const TelaPaciente = () => {
  const [consultas, setConsultas] = useState([
    {
      medico: "Dr. Samuel Marques",
      horario: "07hrs",
      sala: "lab 6",
      orientacoes: "lorem isto oloem",
    },
    {
      medico: "Dr. Ana Costa",
      horario: "09hrs",
      sala: "lab 8",
      orientacoes: "exemplo orientação",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novaConsulta, setNovaConsulta] = useState({
    medico: "",
    horario: "",
    sala: "",
    orientacoes: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaConsulta({
      ...novaConsulta,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConsultas([...consultas, novaConsulta]);
    setNovaConsulta({ medico: "", horario: "", sala: "", orientacoes: "" });
    setIsModalOpen(false);
  };

  // Função para deletar uma consulta
  const handleDeleteConsulta = (index) => {
    const novasConsultas = consultas.filter((_, i) => i !== index);
    setConsultas(novasConsultas);
  };

  return (
    <div>
      <Header />
      <div className="main">
        <div className="actions">
          <button className="new-consult" onClick={() => setIsModalOpen(true)}>
            Nova Consulta
          </button>
          <button className="filter"></button>
        </div>
        <hr />
        <div className="cards-container">
          {consultas.map((consulta, index) => (
            <Card
              key={index}
              medico={consulta.medico}
              horario={consulta.horario}
              sala={consulta.sala}
              orientacoes={consulta.orientacoes}
              onDelete={() => handleDeleteConsulta(index)} // Passando a função de deletar
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Médico:</label>
            <input
              type="text"
              name="medico"
              value={novaConsulta.medico}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Horário:</label>
            <input
              type="text"
              name="horario"
              value={novaConsulta.horario}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Sala:</label>
            <input
              type="text"
              name="sala"
              value={novaConsulta.sala}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Orientações:</label>
            <textarea
              name="orientacoes"
              value={novaConsulta.orientacoes}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Salvar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default TelaPaciente;
