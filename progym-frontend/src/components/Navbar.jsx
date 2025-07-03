import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/NavbarFooter.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo section that links to homepage */}
      <div className="logo">
        <Link to="/" className="logoLink" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/images/icons/ProGYMLogo.png"
            alt="ProGYM Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className="logoText">ProGYM</span>
        </Link>
      </div>

      {/* Navigation links based on login and role */}
      <ul className="navLinks">
        {!user ? (
          <>
            <li><Link to="/register" className="link">Register</Link></li>
            <li><Link to="/login" className="link">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" className="link">Profile</Link></li>
            {user.role === "premium" && (
              <li><Link to="/premium" className="link">Premium</Link></li>
            )}
            {user.role === "admin" && (
              <li><Link to="/admin" className="link">Admin</Link></li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="link"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
