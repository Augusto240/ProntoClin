import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Cadmed = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeProfissionalSaude: '',
    cpfProfissionalSaude: '',
    especialidadeMedica: '',
    telefoneProfissionalSaude: '',
    CRM: '',
    status: 'ATIVO',
    email: '',
    senha: '',
    userrole: 'PROFSAUDE'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/auth/register/prosaude", {
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
        setMessage(data.message || "Erro ao cadastrar médico.");
      }
    } catch (error) {
      setMessage("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Cadastro Médico</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nomeProfissionalSaude" placeholder="Nome" className="input-field" onChange={handleChange} required />
          <input type="text" name="cpfProfissionalSaude" placeholder="CPF" className="input-field" onChange={handleChange} required />
          <input type="text" name="especialidadeMedica" placeholder="Especialidade" className="input-field" onChange={handleChange} required />
          <input type="text" name="telefoneProfissionalSaude" placeholder="Telefone" className="input-field" onChange={handleChange} required />
          <input type="text" name="CRM" placeholder="CRM" className="input-field" onChange={handleChange} required />
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

export default Cadmed;
