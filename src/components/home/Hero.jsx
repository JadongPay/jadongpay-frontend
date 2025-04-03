// src/components/home/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import heroLogo from '../../assets/images/hero-logo.png';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>JadongPay (JPAY)</h1>
          <h2>Révolutionner le paysage financier à travers un écosystème de récompenses innovant</h2>
          <p>Un modèle tokenomique révolutionnaire conçu pour récompenser stratégiquement ses détenteurs tout en maintenant une croissance durable.</p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="primary-button">Accéder au Dashboard</Link>
            <a href="https://bscscan.com/address/0x033C974b195A59696408261382C4aBF273Fdb733" target="_blank" rel="noopener noreferrer" className="secondary-button">Voir le Contrat</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroLogo} alt="JPAY Token" className="token-image" />
        </div>
      </div>
      
      <div className="key-features">
        <div className="feature">
          <div className="feature-icon rewards-icon"></div>
          <h3>Récompenses USDT</h3>
          <p>Distribution automatique en stablecoin</p>
        </div>
        <div className="feature">
          <div className="feature-icon security-icon"></div>
          <h3>Sécurité Multi-couches</h3>
          <p>Protection anti-manipulation avancée</p>
        </div>
        <div className="feature">
          <div className="feature-icon tokenomics-icon"></div>
          <h3>Tokenomique Équilibrée</h3>
          <p>Modèle durable et transparent</p>
        </div>
        <div className="feature">
          <div className="feature-icon vesting-icon"></div>
          <h3>Vesting Stratégique</h3>
          <p>Stabilité et croissance à long terme</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;