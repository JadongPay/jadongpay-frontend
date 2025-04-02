// src/components/home/About.jsx
import React from 'react';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <h2>Vision & Mission</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="about-content">
        <div className="about-card vision">
          <h3>Notre Vision</h3>
          <p>Transformer l'expérience des investisseurs DeFi en créant un écosystème financier où la détention passive génère des récompenses constantes, dans un environnement sécurisé et transparent favorisant une croissance organique et durable.</p>
        </div>
        
        <div className="about-card mission">
          <h3>Notre Mission</h3>
          <ul>
            <li>Démocratiser l'accès aux rendements passifs dans l'environnement crypto</li>
            <li>Élever les standards de sécurité et d'équité dans l'écosystème DeFi</li>
            <li>Créer un token dont la valeur est soutenue par des mécanismes économiques solides et durables</li>
            <li>Bâtir une communauté engagée et récompensée pour sa loyauté</li>
          </ul>
        </div>
      </div>
      
      <div className="problem-solution">
        <div className="problem">
          <h3>Le Problème du Marché Actuel</h3>
          <ul>
            <li><strong>Volatilité excessive</strong> - Tokenomiques mal conçues et absence de stabilisateurs</li>
            <li><strong>Récompenses inefficaces</strong> - Distributions manuelles coûteuses</li>
            <li><strong>Vulnérabilité aux manipulations</strong> - Attaques de bots et front-running</li>
            <li><strong>Manque de transparence</strong> - Distribution opaque et mécanismes de vesting incertains</li>
            <li><strong>Récompenses non durables</strong> - Rendements insoutenables à court terme</li>
          </ul>
        </div>
        
        <div className="solution">
          <h3>La Solution JadongPay</h3>
          <ul>
            <li><strong>Récompenses USDT</strong> - Distribution automatique en stablecoin avec réserve BNB</li>
            <li><strong>Sécurité multi-couche</strong> - Protection anti-front-running et défenses anti-bot</li>
            <li><strong>Modèle équilibré</strong> - Distribution stratégique et vesting transparent</li>
            <li><strong>Écosystème évolutif</strong> - Gouvernance flexible adaptée aux conditions du marché</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;