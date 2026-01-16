import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Brain, Target, Award, Sparkles } from 'lucide-react';
import { GameProvider, useGameContext } from '../contexts/GameContext';
import IntegratedQuizPuzzle from './IntegratedQuizPuzzle';
import CompletionComponent from './CompletionComponent';

const GameContent: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const { gameState, resetGame, setGameState, updateQuizScore } = useGameContext();

  const handleQuizPuzzleComplete = (score: number, timeSpent: number) => {
    updateQuizScore(score);
    setGameState(prev => ({
      ...prev,
      quizScore: score,
      timeSpent,
      currentStep: 'complete',
    }));
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleGoHome = () => {
    // Chuyển sang tab "content"
    onTabChange('content');
    
    // Scroll tới hero section sau khi chuyển tab
    setTimeout(() => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  switch (gameState.currentStep) {
    case 'quiz':
      return (
        <IntegratedQuizPuzzle
          onComplete={handleQuizPuzzleComplete}
          onGoHome={handleGoHome}
        />
      );
    case 'complete':
      return (
        <CompletionComponent
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      );
    default:
      return (
        <IntegratedQuizPuzzle
          onComplete={handleQuizPuzzleComplete}
          onGoHome={handleGoHome}
        />
      );
  }
};

const GameLauncher: React.FC<{ onTabChange: (tab: string) => void }> = ({ onTabChange }) => {
  const [showGame, setShowGame] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  if (showGame) {
    return (
      <GameProvider>
        <GameContent onTabChange={onTabChange} />
      </GameProvider>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Quiz & Puzzle - Công nghiệp 4.0
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>

          <div className="max-w-md mx-auto mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu để chơi"
              className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-center"
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </div>

          <motion.button
            onClick={() => {
              if (password.trim().toLowerCase() === 'zxcvbnm') {
                setShowGame(true);
                setError('');
              } else {
                setError('Mật khẩu chưa đúng.');
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!password.trim()}
          >
            <Gamepad2 className="w-6 h-6" />
            Bắt đầu hành trình
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-gray-50 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">12 câu hỏi quiz</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">12 mảnh puzzle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function GamesQuiz({ onTabChange }: { onTabChange: (tab: string) => void }) {
  return <GameLauncher onTabChange={onTabChange} />;
}
