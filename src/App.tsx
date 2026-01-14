import Hero from './components/Hero';
import About from './components/About';
import Challenges from './components/Challenges';
import Opportunities from './components/Opportunities';
import Solutions from './components/Solutions';
import Skills from './components/Skills';
import Impact from './components/Impact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Challenges />
      <Opportunities />
      <Solutions />
      <Skills />
      <Impact />
      <Footer />
    </div>
  );
}

export default App;
