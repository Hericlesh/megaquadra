import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/resultados">Resultados</Link></li>
          <li><Link to="/regulamento">Regulamento</Link></li>
          <li><Link to="/contato">Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 