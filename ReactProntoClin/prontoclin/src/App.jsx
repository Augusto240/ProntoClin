import './App.css'
import Cadmed from './pages/Cadmed/Cadmed';
import Cadpac from './pages/Cadpac/Cadpac';
import Login from './pages/login/Login';
import Header from './componement/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TelaPaciente from './pages/pagina-paciente/TelaPaciente';
import TelaMedico from './pages/pagina-medico/TelaMedico';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/tela-paciente" element={<TelaPaciente />}/>
        <Route path="/tela-medico" element={<TelaMedico />}/>
        <Route path="/cadastro-medico" element={<Cadmed />}/>
        <Route path="/cadastro-paciente" element={<Cadpac />}/>
      </Routes>
    </Router>
  );
}

export default App;
