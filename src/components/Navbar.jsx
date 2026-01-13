import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Tenta A Sorte Logo" className="navbar-logo-img" />
        </Link>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/#cartela" onClick={closeMenu}>Cartela</Link>
          <Link to="/#premios" onClick={closeMenu}>Prêmios</Link>
          <Link to="/#ganhadores" onClick={closeMenu}>Ganhadores</Link>
          <Link to="/regulamento" onClick={closeMenu}>Regulamento</Link>
          <Link to="/contato" onClick={closeMenu}>Contato</Link>
        </div>

        <div className="navbar-mobile-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 