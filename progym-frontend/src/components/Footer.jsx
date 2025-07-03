// File: src/components/Footer.jsx

import "../styles/NavbarFooter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>Locations</h4>
          <ul>
            <li><a href="#">Change City</a></li>
            <li><a href="#">Virtual Tour</a></li>
            <li><a href="#">Saskatoon Locations</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Facility Feedback</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Memberships</h4>
          <ul>
            <li><a href="#">Sign Up</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Personal Training</a></li>
            <li><a href="#">Resources</a></li>
            <li><a href="#">Corporate Memberships</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Become an Ambassador</a></li>
            <li><a href="#">Child Care</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <p className="footerText">© 2025 ProGYM. All rights reserved.</p>
    </footer>
  );
}

export default Footer;