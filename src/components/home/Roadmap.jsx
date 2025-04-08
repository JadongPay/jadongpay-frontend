import React from 'react';
import phase1Icon from '../../assets/images/phase1-icon.png';
import phase2Icon from '../../assets/images/phase2-icon.png';
import phase3Icon from '../../assets/images/phase3-icon.png';
import phase4Icon from '../../assets/images/phase4-icon.png';

const Roadmap = () => {
  return (
    <section className="roadmap-section" id="roadmap">
      <div className="section-header">
        <h2>Feuille de Route</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="section-content">
        <div className="roadmap-timeline">
          <div className="timeline-phase">
          <img src={phase1Icon} alt="Phase 1" className="phase-icon" />
            <div className="phase-header">
              <h3>Phase 1: Lancement</h3>
              <div className="phase-period">T1-T2 2025</div>
            </div>
            <div className="phase-content">
              <ul>
                <li className="completed">Développement et audit du contrat intelligent</li>
                <li className="completed">Site web, plateforme de presale et dashboards</li>
                <li className="in-progress">Presale publique</li>
                <li>Listing sur PancakeSwap</li>
                <li>Campagne marketing de lancement</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-phase">
          <img src={phase2Icon} alt="Phase 2" className="phase-icon" />
            <div className="phase-header">
              <h3>Phase 2: Croissance</h3>
              <div className="phase-period">T2-T3 2025</div>
            </div>
            <div className="phase-content">
              <ul>
                <li>Intégration avec des plateformes d'analyse DeFi</li>
                <li>Listings sur des CEX de tier 2</li>
                <li>Expansion des partenariats stratégiques</li>
                <li>Implémentation du programme d'ambassadeurs</li>
                <li>Campagnes d'acquisition d'utilisateurs</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-phase">
          <img src={phase3Icon} alt="Phase 3" className="phase-icon" />
            <div className="phase-header">
              <h3>Phase 3: Expansion</h3>
              <div className="phase-period">T3-T4 2025</div>
            </div>
            <div className="phase-content">
              <ul>
                <li>Lancement d'applications complémentaires</li>
                <li>Intégration cross-chain (Ethereum, Avalanche)</li>
                <li>Listings sur des CEX majeurs</li>
                <li>Développement de l'écosystème JadongPay</li>
                <li>Expansion des cas d'utilisation du token JPAY</li>
              </ul>
            </div>
          </div>
          
          <div className="timeline-phase">
          <img src={phase4Icon} alt="Phase 4" className="phase-icon" />
            <div className="phase-header">
              <h3>Phase 4: Maturité</h3>
              <div className="phase-period">2026+</div>
            </div>
            <div className="phase-content">
              <ul>
                <li>Gouvernance communautaire progressive</li>
                <li>Innovations tokenomiques avancées</li>
                <li>Intégrations dans l'écosystème DeFi élargi</li>
                <li>Expansion mondiale et adoption institutionnelle</li>
                <li>Solutions Web3 complémentaires</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;