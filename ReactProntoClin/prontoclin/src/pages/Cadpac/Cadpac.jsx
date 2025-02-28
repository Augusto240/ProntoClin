import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Cadpac.css";

const Cadpac = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomePaciente: '',
    nomeSocial: '',
    telefonePaciente: '',
    cpfPaciente: '',
    dataNascimento: '',
    sexoPaciente: '',
    email: '',
    senha: '',
    userrole: 'PACIENTE'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/auth/register/paciente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/"), 2000); // Redireciona para login após 2 segundos
      } else {
        setMessage(data.message || "Erro ao cadastrar paciente.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Cadastro Paciente</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nomePaciente" placeholder="Nome" className="input-field" onChange={handleChange} required />
          <input type="text" name="nomeSocial" placeholder="Nome Social" className="input-field" onChange={handleChange} />
          <input type="text" name="telefonePaciente" placeholder="Telefone" className="input-field" onChange={handleChange} required />
          <input type="text" name="cpfPaciente" placeholder="CPF" className="input-field" onChange={handleChange} required />
          <input type="date" name="dataNascimento" className="input-field" onChange={handleChange} required />
          <input type="text" name="sexoPaciente" placeholder="Sexo (M/F)" className="input-field" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" className="input-field" onChange={handleChange} required />
          <br />
          <button type="submit" className="btn">Criar</button>
        </form>
      </div>

      <div className="signup-section">
        <h2>Já possui conta?</h2>
        <p>Clique abaixo para acessar a tela de login</p>
        <button className="btn-outline" onClick={() => navigate("/")}>Log in</button>
      </div>
    </div>
  );
};

export default Cadpac;
