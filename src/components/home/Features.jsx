import React from 'react';
import rewardsIcon from '../../assets/images/rewards-icon.png';
import securityIcon from '../../assets/images/security-icon.png';
import tokenomicsIcon from '../../assets/images/tokenomics-icon.png';
import vestingIcon from '../../assets/images/vesting-icon.png';

const Features = () => {
  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <h2>Caractéristiques Principales</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="section-content">
        <div className="features-grid">
          <div className="feature-card">
          <img src={rewardsIcon} alt="Système de Récompenses USDT" className="feature-icon" />
          <h3>Système de Récompenses USDT</h3>
            <ul>
              <li>Distribution automatique en stablecoin</li>
              <li>Conversion des taxes en récompenses durables</li>
              <li>Réserve BNB intelligente (10% pour les opérations)</li>
              <li>Mécanisme entièrement automatisé</li>
            </ul>
          </div>
          
          <div className="feature-card">
          <img src={vestingIcon} alt="Vesting Stratégique" className="feature-icon" />
          <h3>Vesting Stratégique</h3>
            <ul>
              <li>Contributeurs: 10% initial, 90% sur 12 mois</li>
              <li>Équipe: 5% initial, 95% sur 24 mois</li>
              <li>Marketing & Réserve: 10% initial, 90% sur 12 mois</li>
              <li>Libération linéaire garantissant la stabilité</li>
            </ul>
          </div>
          
          <div className="feature-card">
          <img src={securityIcon} alt="Sécurité Multicouche" className="feature-icon" />
          <h3>Sécurité Multicouche</h3>
            <ul>
              <li>Protection anti-front-running</li>
              <li>Défenses anti-bot avancées</li>
              <li>Protection anti-flash loan</li>
              <li>Audit de sécurité complet</li>
            </ul>
          </div>
          
          <div className="feature-card">
          <img src={tokenomicsIcon} alt="Tokenomique Équilibrée" className="feature-icon" />
          <h3>Tokenomique Équilibrée</h3>
            <ul>
              <li>Distribution stratégique et équitable</li>
              <li>Burning efficace réduisant l'offre progressivement</li>
              <li>Taxes uniquement sur les ventes (15%)</li>
              <li>Limites de transaction et de portefeuille</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;