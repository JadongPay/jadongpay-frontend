// src/components/home/Tokenomics.jsx
import React from 'react';
import rewardsThresholdIcon from '../../assets/images/rewards-threshold-icon.png';
import poolThresholdIcon from '../../assets/images/pool-threshold-icon.png';
import txLimitIcon from '../../assets/images/tx-limit-icon.png';
import walletLimitIcon from '../../assets/images/wallet-limit-icon.png';

const Tokenomics = () => {
  return (
    <section className="tokenomics-section" id="tokenomics">
      <div className="section-header">
        <h2>Tokenomics</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="supply-info">
        <h3>Offre et Distribution</h3>
        <div className="supply-card">
          <div className="supply-value">5,000,000</div>
          <div className="supply-label">Offre Maximale de JPAY</div>
        </div>
      </div>
      
      <div className="distribution-chart">
        <div className="chart-container">
          {/* This would be replaced with an actual chart in implementation */}
          <div className="placeholder-chart">
            <div className="chart-segment presale" style={{ width: '50%' }}>50%</div>
            <div className="chart-segment liquidity" style={{ width: '15%' }}>15%</div>
            <div className="chart-segment marketing" style={{ width: '10%' }}>10%</div>
            <div className="chart-segment reserve" style={{ width: '10%' }}>10%</div>
            <div className="chart-segment team" style={{ width: '15%' }}>15%</div>
          </div>
        </div>
        
        <div className="distribution-table">
          <table>
            <thead>
              <tr>
                <th>Allocation</th>
                <th>Pourcentage</th>
                <th>Montant JPAY</th>
                <th>Vesting</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Presale</td>
                <td>50%</td>
                <td>2,500,000</td>
                <td>10% initial, 90% sur 12 mois</td>
              </tr>
              <tr>
                <td>Liquidité</td>
                <td>15%</td>
                <td>750,000</td>
                <td>Verrouillée</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>10%</td>
                <td>500,000</td>
                <td>10% initial, 90% sur 12 mois</td>
              </tr>
              <tr>
                <td>Réserve</td>
                <td>10%</td>
                <td>500,000</td>
                <td>10% initial, 90% sur 12 mois</td>
              </tr>
              <tr>
                <td>Équipe</td>
                <td>15%</td>
                <td>750,000</td>
                <td>5% initial, 95% sur 24 mois</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="tax-section">
        <h3>Mécanisme de Taxation (15% sur les ventes)</h3>
        <div className="tax-cards">
          <div className="tax-card">
            <div className="tax-value">10%</div>
            <div className="tax-label">Récompenses</div>
            <div className="tax-description">Convertis en USDT et distribués aux détenteurs</div>
          </div>
          <div className="tax-card">
            <div className="tax-value">2%</div>
            <div className="tax-label">Burn</div>
            <div className="tax-description">Brûlés définitivement, réduisant l'offre</div>
          </div>
          <div className="tax-card">
            <div className="tax-value">2%</div>
            <div className="tax-label">Réserve</div>
            <div className="tax-description">Transférés au portefeuille de réserve</div>
          </div>
          <div className="tax-card">
            <div className="tax-value">1%</div>
            <div className="tax-label">Marketing</div>
            <div className="tax-description">Alloués aux efforts marketing</div>
          </div>
        </div>
      </div>
      
      <div className="limits-section">
        <h3>Seuils et Limites</h3>
        <div className="limit-items">
          <div className="limit-item">
          <img src={rewardsThresholdIcon} alt="Seuil minimum de récompenses" className="limit-icon" />
          <div className="limit-info">
            <h4>Seuil minimum de récompenses</h4>
            <p>1000 JPAY (détention minimale)</p>
          </div>
        </div>
        <div className="limit-item">
          <img src={poolThresholdIcon} alt="Seuil de traitement du pool" className="limit-icon" />
          <div className="limit-info">
            <h4>Seuil de traitement du pool</h4>
            <p>500 JPAY (montant minimal)</p>
          </div>
        </div>
        <div className="limit-item">
          <img src={txLimitIcon} alt="Limite de transaction" className="limit-icon" />
          <div className="limit-info">
            <h4>Limite de transaction</h4>
            <p>0.5% de l'offre totale</p>
          </div>
        </div>
        <div className="limit-item">
          <img src={walletLimitIcon} alt="Limite de portefeuille" className="limit-icon" />
          <div className="limit-info">
            <h4>Limite de portefeuille</h4>
            <p>2% de l'offre totale</p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Tokenomics;
