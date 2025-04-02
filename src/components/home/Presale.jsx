import React from 'react';
import { Link } from 'react-router-dom';

const Presale = () => {
  return (
    <section className="presale-section" id="presale">
      <div className="section-header">
        <h2>Presale</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="section-content">
        <div className="presale-info">
          <div className="presale-parameters">
          <h3 className="section-subtitle">Paramètres Clés</h3>
            <div className="parameters-grid">
              <div className="parameter">
                <div className="parameter-label">Softcap</div>
                <div className="parameter-value">500,000 JPAY</div>
              </div>
              <div className="parameter">
                <div className="parameter-label">Hardcap</div>
                <div className="parameter-value">2,500,000 JPAY</div>
              </div>
              <div className="parameter">
                <div className="parameter-label">Taux</div>
                <div className="parameter-value">7,000 JPAY par BNB</div>
              </div>
              <div className="parameter">
                <div className="parameter-label">Contribution Max</div>
                <div className="parameter-value">10 BNB par adresse</div>
              </div>
            </div>
          </div>
          
          <div className="presale-phases">
          <h3 className="section-subtitle">Processus en Deux Phases</h3>
            <div className="phases-container">
              <div className="phase">
                <div className="phase-number">1</div>
                <div className="phase-content">
                  <h4>Phase de Contribution</h4>
                  <ul>
                    <li>Les participants envoient du BNB au contrat</li>
                    <li>Chaque contribution est tracée et validée</li>
                    <li>Une liste whitelist des contributeurs est constituée</li>
                  </ul>
                </div>
              </div>
              <div className="phase">
                <div className="phase-number">2</div>
                <div className="phase-content">
                  <h4>Phase de Finalisation Sécurisée</h4>
                  <ul>
                    <li>Initiation de la finalisation par l'équipe</li>
                    <li>Délai de sécurité de 24 heures pour prévenir le front-running</li>
                    <li>Finalisation définitive avec distribution des allocations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          
          <div className="fund-distribution">
              <h3 className="section-subtitle">Distribution des Fonds Levés</h3>
              <div className="pie-chart-container">
              <div className="pie-chart">
                <div className="pie-slice" style={{ "--start": "0", "--end": "270" }}>
                  <div className="pie-fill liquidity"></div>
                </div>
                <div className="pie-slice" style={{ "--start": "270", "--end": "320.4" }}>
                  <div className="pie-fill team"></div>
                </div>
                <div className="pie-slice" style={{ "--start": "320.4", "--end": "338.4" }}>
                  <div className="pie-fill marketing"></div>
                </div>
                <div className="pie-slice" style={{ "--start": "338.4", "--end": "356.4" }}>
                  <div className="pie-fill reserve"></div>
                </div>
                <div className="pie-slice" style={{ "--start": "356.4", "--end": "360" }}>
                  <div className="pie-fill gas"></div>
                </div>
              </div>
              <div className="pie-legend">
                <div className="legend-item">
                  <div className="legend-color liquidity"></div>
                  <div className="legend-text">
                    <span className="legend-label">Liquidité</span>
                    <span className="legend-percentage">75%</span>
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-color team"></div>
                  <div className="legend-text">
                    <span className="legend-label">Équipe</span>
                    <span className="legend-percentage">14%</span>
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-color marketing"></div>
                  <div className="legend-text">
                    <span className="legend-label">Marketing</span>
                    <span className="legend-percentage">5%</span>
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-color reserve"></div>
                  <div className="legend-text">
                    <span className="legend-label">Réserve</span>
                    <span className="legend-percentage">5%</span>
                  </div>
                </div>
                <div className="legend-item">
                  <div className="legend-color gas"></div>
                  <div className="legend-text">
                    <span className="legend-label">Gas</span>
                    <span className="legend-percentage">1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="presale-cta">
          <div className="info-card">
            <h3>Participez à la Presale</h3>
            <p>Rejoignez-nous dès maintenant et soyez parmi les premiers à participer à la révolution JadongPay.</p>
            <Link to="/dashboard" className="cta-button">Accéder au Dashboard</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Presale;