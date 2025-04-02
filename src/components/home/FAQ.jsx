import React, { useState } from 'react';

const FAQ = () => {
  // State to track which questions are open
  const [openQuestions, setOpenQuestions] = useState({});
  
  // Toggle question open/closed
  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // FAQ data
  const faqItems = [
    {
      id: 1,
      question: "Qu'est-ce qui différencie JadongPay des autres tokens de récompenses?",
      answer: "JadongPay se distingue par son système de récompenses en USDT, sa réserve BNB intelligente, ses mécanismes de protection anti-manipulation avancés et son vesting transparent."
    },
    {
      id: 2,
      question: "Quel problème JadongPay résout-il?",
      answer: "JadongPay résout les problèmes de volatilité excessive, de récompenses non durables, de manipulations de marché et de manque de transparence dans l'écosystème DeFi actuel."
    },
    {
      id: 3,
      question: "Comment participer à la presale?",
      answer: "La presale se déroule sur notre plateforme officielle. Les participants peuvent contribuer en BNB et recevoir des tokens JPAY selon le taux de 7,000 JPAY par BNB."
    },
    {
      id: 4,
      question: "Pourquoi la presale a-t-elle un délai de finalisation de 24h?",
      answer: "Ce délai est une mesure de sécurité pour prévenir le front-running et assurer une finalisation équitable pour tous les participants."
    },
    {
      id: 5,
      question: "Comment fonctionnent les récompenses en USDT?",
      answer: "10% des taxes prélevées sur les ventes sont convertis en USDT via BNB et distribués proportionnellement à tous les détenteurs possédant au moins 1000 JPAY."
    },
    {
      id: 6,
      question: "Faut-il réclamer manuellement les récompenses?",
      answer: "Non. Les récompenses sont distribuées automatiquement, bien qu'une fonction de réclamation manuelle soit disponible pour ceux qui le souhaitent."
    },
    {
      id: 7,
      question: "Pourquoi y a-t-il des limites de transaction et de portefeuille?",
      answer: "Ces limites protègent contre la manipulation du marché et les accumulations excessives qui pourraient déstabiliser l'écosystème."
    },
    {
      id: 8,
      question: "Le contrat a-t-il été audité?",
      answer: "Oui, le contrat a subi un audit complet qui a confirmé sa sécurité, avec un score global de 94/100."
    }
  ];
  
  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <h2>Questions Fréquemment Posées</h2>
        <div className="section-divider"></div>
      </div>
      
      <div className="section-content">
        <div className="faq-container">
          {faqItems.map((item) => (
            <div 
              key={item.id} 
              className={`faq-item ${openQuestions[item.id] ? 'open' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleQuestion(item.id)}
              >
                <h3>{item.question}</h3>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;