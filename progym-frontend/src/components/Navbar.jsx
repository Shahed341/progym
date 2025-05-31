// File: src/components/Navbar.jsx

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/NavbarFooter.css";

function Navbar() {
  const { user, setUser } = useContext(UserContext); // Get current user and method to update it
  const navigate = useNavigate(); // Programmatically redirect the user

  // Handle logout: clear user context and localStorage, then redirect to home
  const handleLogout = () => {
    setUser(null); // Triggers useEffect in UserContext to remove from localStorage
    navigate("/"); // Go back to homepage
  };

  return (
    <nav className="navbar">
      {/* Logo section that links to homepage */}
      <div className="logo">
        <Link to="/" className="logoText">ProGYM</Link>
      </div>

      {/* Navigation links based on login and role */}
      <ul className="navLinks">
        {!user ? (
          // If not logged in, show Register and Login
          <>
            <li><Link to="/register" className="link">Register</Link></li>
            <li><Link to="/login" className="link">Login</Link></li>
          </>
        ) : (
          // If logged in, show Profile and conditional links
          <>
            <li><Link to="/profile" className="link">Profile</Link></li>

            {/* Show Premium link only if user has 'premium' role */}
            {user.role === "premium" && (
              <li><Link to="/premium" className="link">Premium</Link></li>
            )}

            {/* Show Admin link only if user is admin */}
            {user.role === "admin" && (
              <li><Link to="/admin" className="link">Admin</Link></li>
            )}

            {/* Always show logout if user is logged in */}
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
