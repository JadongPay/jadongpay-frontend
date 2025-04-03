// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-container">
              <img src={logo} alt="JadongPay Logo" className="logo-image" />
              <div className="logo-text">JadongPay</div>
          </div>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Accueil</Link></li>
                <li><a href="/#about">À propos</a></li>
                <li><a href="/#tokenomics">Tokenomics</a></li>
                <li><a href="/#presale">Presale</a></li>
                <li><a href="/#roadmap">Roadmap</a></li>
                <li><a href="/#faq">FAQ</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Ressources</h3>
              <ul>
                <li><a href="https://bscscan.com/address/0x033C974b195A59696408261382C4aBF273Fdb733" target="_blank" rel="noopener noreferrer">Contrat</a></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Whitepaper</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer">Audit</a></li>
              </ul>
            </div>
            
            <div className="link-column">
              <h3>Social</h3>
              <ul className="social-links">
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="social-icon twitter">Twitter</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="social-icon telegram">Telegram</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="social-icon discord">Discord</a></li>
                <li><a href="#" target="_blank" rel="noopener noreferrer" className="social-icon medium">Medium</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} JadongPay. Tous droits réservés.
          </div>
          
          <div className="footer-legal">
            <a href="#">Mentions Légales</a>
            <a href="#">Politique de Confidentialité</a>
            <a href="#">Conditions d'Utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;