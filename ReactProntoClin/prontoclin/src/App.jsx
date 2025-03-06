import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import TelaPaciente from "./pages/pagina-paciente/TelaPaciente";
import TelaMedico from "./pages/pagina-medico/TelaMedico";

import "./App.css";
import { MEDIC_ROUTE, PATIENT_ROUTE } from "./constants/routes";
import Cadmed from "./pages/login/Cadmed";
import Cadpac from "./pages/login/Cadpac";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={PATIENT_ROUTE} element={<TelaPaciente />} />
        <Route path={MEDIC_ROUTE} element={<TelaMedico />} />
        <Route path="/cadastro-medico" element={<Cadmed />} />
        <Route path="/cadastro-paciente" element={<Cadpac />} />
      </Routes>
    </Router>
  );
}

export default App;
