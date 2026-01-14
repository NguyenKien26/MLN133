import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Brain, Target, Award, Sparkles } from 'lucide-react';
import { GameProvider, useGameContext } from '../contexts/GameContext';
import InteractiveStory from './InteractiveStory';
import IntegratedQuizPuzzle from './IntegratedQuizPuzzle';
import CompletionComponent from './CompletionComponent';

const GameContent: React.FC = () => {
  const { gameState, resetGame, startQuiz } = useGameContext();

  const handleStoryComplete = () => {
    startQuiz();
  };

  const handleQuizPuzzleComplete = (score: number, timeSpent: number) => {
    // This will be handled by GameContext
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleGoHome = () => {
    // Navigate back to main content
    window.location.href = '#';
  };

  switch (gameState.currentStep) {
    case 'story':
      return <InteractiveStory onComplete={handleStoryComplete} />;
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
      return <InteractiveStory onComplete={handleStoryComplete} />;
  }
};

const GameLauncher: React.FC = () => {
  const [showGame, setShowGame] = React.useState(false);

  if (showGame) {
    return (
      <GameProvider>
        <GameContent />
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
            Trò chơi Tương tác Công nghiệp 4.0
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Khám phá thế giới Công nghiệp 4.0 thông qua câu chuyện tương tác,
            quiz thử thách và hệ thống puzzle đầy sáng tạo.
          </p>

          <motion.button
            onClick={() => setShowGame(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gamepad2 className="w-6 h-6" />
            Bắt đầu hành trình
          </motion.button>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Câu chuyện tương tác</h3>
            <p className="text-gray-600">Theo chân nhân vật khám phá hành trình chuyển đổi số</p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quiz & Puzzle</h3>
            <p className="text-gray-600">16 câu hỏi thử thách với hệ thống mở khóa puzzle</p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thống kê chi tiết</h3>
            <p className="text-gray-600">Theo dõi tiến độ và nhận đánh giá về kiến thức</p>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="text-center">
          <div className="inline-flex items-center gap-6 bg-gray-50 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">6 chương câu chuyện</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">16 câu hỏi quiz</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600">16 mảnh puzzle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function GamesQuiz() {
  return <GameLauncher />;
}
