// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll event to change header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-image"></div>
            <span className="logo-text">JadongPay</span>
          </Link>
        </div>
        
        <nav className={`main-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><a href="/#about">À propos</a></li>
            <li><a href="/#tokenomics">Tokenomics</a></li>
            <li><a href="/#presale">Presale</a></li>
            <li><a href="/#roadmap">Roadmap</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </nav>
        
        <div className="nav-buttons">
          <Link to="/dashboard" className="dashboard-button">Dashboard</Link>
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span className={`menu-icon ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
