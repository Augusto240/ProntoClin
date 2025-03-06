import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LOGIN_URL } from "../../constants/service";
import {
  ADMIN_TYPE,
  MEDIC_TYPE,
  PATIENT_TYPE,
} from "../../constants/userTypes";
import {
  ADMIN_ROUTE,
  MEDIC_ROUTE,
  PATIENT_ROUTE,
} from "../../constants/routes";
import { STORAGE_KEYS } from "../../constants/storage";

const DEFAULT_TEXT = "";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState(DEFAULT_TEXT);
  const [password, setPassword] = useState(DEFAULT_TEXT);
  const [error, setError] = useState(DEFAULT_TEXT);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const credenciais = { email, senha: password };

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciais),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok && data.token) {
        console.log("Login bem-sucedido!", data);

        // Armazena o token e tipo de usuário no localStorage
        localStorage.setItem(STORAGE_KEYS.token, data.token);
        localStorage.setItem(STORAGE_KEYS.userType, data.userType);

        // Redireciona baseado no tipo de usuário
        if (data.userType === MEDIC_TYPE) {
          navigate(MEDIC_ROUTE);
        } else if (data.userType === PATIENT_TYPE) {
          navigate(PATIENT_ROUTE);
        } else if (data.userType === ADMIN_TYPE) {
          navigate(ADMIN_ROUTE);
        } else {
          setError("Tipo de usuário desconhecido.");
        }
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao autenticar. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="login-section">
        <h2>Entrar na conta</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="**********"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </div>

      <div className="signup-section">
        <h2>Novo usuário?</h2>
        <p>Escolha uma das opções abaixo para se cadastrar em nosso sistema</p>
        <div className="signup-buttons">
          <button
            className="btn-outline"
            onClick={() => navigate("/cadastro-paciente")}
          >
            Paciente
          </button>
          <button
            className="btn-outline"
            onClick={() => navigate("/cadastro-medico")}
          >
            Médico
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
