import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Challenges from './components/Challenges';
import Opportunities from './components/Opportunities';
import Solutions from './components/Solutions';
import Skills from './components/Skills';
import Impact from './components/Impact';
import GamesQuiz from './components/GameQuiz';
import Appendix from './components/Appendix';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'content' && (
        <>
          <Hero />
          <About />
          <Challenges />
          <Opportunities />
          <Solutions />
          <Skills />
          <Impact />
        </>
      )}

      {activeTab === 'games' && <GamesQuiz onTabChange={setActiveTab} />}

      {activeTab === 'appendix' && <Appendix />}

      <Footer />
    </div>
  );
}

export default App;
