import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credenciais = { email, senha: password };

      const response = await fetch("http://localhost:8081/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciais),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        console.log('Login bem-sucedido!', data);
        
        // Armazena o token e tipo de usuário no localStorage
        localStorage.setItem("token", data.token);
      
        // 🔹 Como o backend não retorna o userType, precisa ser ajustado:
        const userType = "MÉDICO"; // ⚠️ Troque isso para uma lógica real
        
        localStorage.setItem("userType", userType);
      
        // Redireciona baseado no tipo de usuário
        if (userType === "MÉDICO") {
          navigate("/tela-medico");
        } else if (userType === "PACIENTE") {
          navigate("/tela-paciente");
        } else {
          setError("Tipo de usuário desconhecido.");
        }
      } else {
        setError('Credenciais inválidas');
      }      
    } catch (err) {
      setError('Erro ao autenticar. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Entrar na conta</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="**********" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <button type="submit" className="btn">Entrar</button>
        </form>
      </div>

      <div className="signup-section">
        <h2>Novo usuário?</h2>
        <p>Escolha uma das opções abaixo para se cadastrar em nosso sistema</p>
        <div className="signup-buttons">
          <button className="btn-outline" onClick={() => navigate("/cadastro-paciente")}>Paciente</button>
          <button className="btn-outline" onClick={() => navigate("/cadastro-medico")}>Médico</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
