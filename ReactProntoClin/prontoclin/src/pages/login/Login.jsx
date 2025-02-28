import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const Credenciais = { email, senha: password };
      console.log(Credenciais);
      
      try {
        const response = await fetch("http://localhost:8081/auth/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Credenciais), // Aqui estava vazio antes
        });
  
        const data = await response.json();
        console.log(data);
  
        if (data.success) {  // Aqui estava 'response.success', mas deveria ser 'data.success'
          console.log('Login bem-sucedido!', data);
          navigate('/tela-paciente'); // Redireciona após login bem-sucedido
        } else {
          setError('Credenciais inválidas');
        }
        
      } catch (error) {
        console.error('Erro na requisição', error);
        throw new Error('Erro ao autenticar');
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
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="**********" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} />
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
