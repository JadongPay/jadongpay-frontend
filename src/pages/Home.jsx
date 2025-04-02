// src/pages/Home.jsx
import React from 'react';

// Import Home Components
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Tokenomics from '../components/home/Tokenomics';
import Presale from '../components/home/Presale';
import Features from '../components/home/Features';
import Roadmap from '../components/home/Roadmap';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <div className="home-container">
      <Hero />
      <About />
      <Tokenomics />
      <Presale />
      <Features />
      <Roadmap />
      <FAQ />
    </div>
  );
};

export default Home;