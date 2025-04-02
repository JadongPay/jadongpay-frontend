// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { Web3Provider } from './contexts/Web3Context';
import { ContractProvider } from './contexts/ContractContext';
import ScrollToTop from './utils/ScrollToTop';

// Import styles
import './styles/globals.css';
import './styles/enhancements.css';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Web3Provider>
        <ContractProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </ContractProvider>
      </Web3Provider>
    </Router>
  );
};

export default App;