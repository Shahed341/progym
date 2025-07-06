import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/NavbarFooter.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // prevent <Link> from navigating
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="logoLink">
          <img
            src="/images/icons/ProGYMLogo.png"
            alt="ProGYM Logo"
            className="logoImage"
          />
          <span className="logoText">ProGYM</span>
        </Link>
      </div>

      {/* Nav Links */}
      <ul className="navLinks">
        {!user ? (
          <>
            <li><Link to="/register" className="navItem">Register</Link></li>
            <li><Link to="/login" className="navItem">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" className="navItem">Profile</Link></li>
            {user.role === "premium" && (
              <li><Link to="/premium" className="navItem">Premium</Link></li>
            )}
            {user.role === "admin" && (
              <li><Link to="/admin" className="navItem">Admin</Link></li>
            )}
            <li>
              <Link to="/" onClick={handleLogout} className="navItem">
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
