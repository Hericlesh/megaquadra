import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa'; // Import icons
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Define social links data
  const socialLinks = [
    { icon: <FaFacebook />, url: 'https://facebook.com/tentasortebrasil', label: 'Facebook' },
    { icon: <FaInstagram />, url: 'https://instagram.com/tentasortebrasil', label: 'Instagram' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/yourphonenumber', label: 'WhatsApp' }, // Replace with your WhatsApp link/number
    { icon: <FaTiktok />, url: 'https://tiktok.com/@tentasortebrasil', label: 'TikTok' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content"> {/* Container for layout */}
        {/* Social Media Icons */}
        <div className="social-icons">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank" // Open in new tab
              rel="noopener noreferrer" // Security best practice
              className="social-icon"
              aria-label={social.label} // Accessibility
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright Text */}
        <div className="copyright">
          <p>&copy; {currentYear} Tenta A Sorte. Todos os direitos reservados.</p>
        </div>

        {/* Optional: Add other links if needed */}
        {/* 
        <nav className="footer-nav">
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </nav>
        */}
      </div>
    </footer>
  );
};

export default Footer; 