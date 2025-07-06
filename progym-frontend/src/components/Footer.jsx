// File: src/components/Footer.jsx

import "../styles/NavbarFooter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>Locations</h4>
          <ul>
            <li><a href="/change-city">Change City</a></li>
            <li><a href="/virtual-tour">Virtual Tour</a></li>
            <li><a href="/saskatoon-locations">Saskatoon Locations</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/feedback">Facility Feedback</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Memberships</h4>
          <ul>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/personal-training">Personal Training</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/corporate">Corporate Memberships</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/ambassadors">Become an Ambassador</a></li>
            <li><a href="/child-care">Child Care</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <p className="footerText">© 2025 ProGYM. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
