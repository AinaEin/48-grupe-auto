import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

export function Header() {
  const { loginStatus, updateLoginStatus, totalSumToPay } =
    useContext(GlobalContext);

  function handleLogoutClick() {
    updateLoginStatus(false);
  }

  const guestActions = (
    <div className="col-md-3 text-end">
      <Link to="/login" className="btn btn-outline-primary me-2">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary">
        Register
      </Link>
    </div>
  );

  const userActions = (
    <div className="col-md-3 text-end">
      <span>Cart value: {totalSumToPay} Eur</span>
      <span>Hello, user!</span>
      <button onClick={handleLogoutClick} className="btn btn-primary">
        Logout
      </button>
    </div>
  );

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img src={logo} alt="Logo" width="40" height="32" />
          </Link>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <Link to="/" className="nav-link px-2 link-secondary">
            Home
          </Link>
          <Link to="/auto-list" className="nav-link px-2">
            Car listings
          </Link>
          <Link to="/about" className="nav-link px-2">
            About
          </Link>
        </ul>

        {loginStatus ? userActions : guestActions}
      </header>
    </div>
  );
}
