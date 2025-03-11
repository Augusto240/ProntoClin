import { useNavigate } from "react-router-dom";

import { STORAGE_KEYS } from "../../constants/storage";
import { LOGIN_ROUTE } from "../../constants/routes";

import "./style.css";

const Header = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.userType);

    navigate(LOGIN_ROUTE);
  };

  return (
    <div className="header">
      <h1>ProntoClin</h1>
      <button onClick={handleClick}>Sair</button>
    </div>
  );
};

export default Header;
