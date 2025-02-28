import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadmed = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeProfissionalSaude: "",
    cpfProfissionalSaude: "",
    especialidadeMedica: "",
    telefoneProfissionalSaude: "",
    CRM: "",
    status: "ATIVO",
    email: "",
    senha: "",
    userrole: "PROFSAUDE",
    dataNascimento: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8081/auth/register/prosaude", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const errorMessage = contentType && contentType.includes("application/json") 
          ? (await response.json()).message 
          : "Erro ao realizar cadastro";
        throw new Error(errorMessage);
      }

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        setMessage(data.message);
        console.log("Cadastro realizado:", data);
      } else {
        setMessage("Cadastro realizado com sucesso.");
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao cadastrar profissional de saúde:", error);
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Cadastro Médico</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="nomeProfissionalSaude" placeholder="Nome" onChange={handleChange} required />
          <input type="text" name="cpfProfissionalSaude" placeholder="CPF" onChange={handleChange} required />
          <input type="text" name="especialidadeMedica" placeholder="Especialidade" onChange={handleChange} required />
          <input type="text" name="telefoneProfissionalSaude" placeholder="Telefone" onChange={handleChange} required />
          <input type="text" name="CRM" placeholder="CRM" onChange={handleChange} required />
          <input type="date" name="dataNascimento" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" onChange={handleChange} required />
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
