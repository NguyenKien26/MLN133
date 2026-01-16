import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Share2, RotateCcw, Home, Clock, Target, BarChart3, Puzzle } from 'lucide-react';
import { useGameContext } from '../contexts/GameContext';

interface CompletionComponentProps {
  onRestart: () => void;
  onGoHome: () => void;
}

const CompletionComponent: React.FC<CompletionComponentProps> = ({
  onRestart,
  onGoHome
}) => {
  const { gameState, resetGame } = useGameContext();
  const [showPuzzle, setShowPuzzle] = React.useState(false);
  const [showReveal, setShowReveal] = React.useState(false);
  const [revealProgress, setRevealProgress] = React.useState(0);

  const percentage = (gameState.quizScore / 12) * 100;
  const minutes = Math.floor((gameState.timeSpent || 0) / 60);
  const seconds = (gameState.timeSpent || 0) % 60;

  const handleRestart = () => {
    resetGame();
    onRestart();
  };

  const handleRevealImage = () => {
    setShowReveal(true);
    // Animate reveal progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setRevealProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 14) return "Xuất sắc! Bạn đã nắm vững kiến thức về Công nghiệp 4.0!";
    if (score >= 12) return "Tốt! Bạn có kiến thức vững về kỷ nguyên số!";
    if (score >= 10) return "Khá! Bạn đã hiểu được những khái niệm cơ bản!";
    if (score >= 8) return "Cố gắng hơn nữa nhé! Hãy đọc lại nội dung!";
    return "Hãy ôn tập thêm để hiểu rõ hơn về Công nghiệp 4.0!";
  };

  const getScoreColor = (score: number) => {
    if (score >= 14) return "from-green-500 to-green-600";
    if (score >= 12) return "from-blue-500 to-blue-600";
    if (score >= 10) return "from-yellow-500 to-yellow-600";
    if (score >= 8) return "from-orange-500 to-orange-600";
    return "from-red-500 to-red-600";
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 14) return "Chuyên gia 4.0";
    if (score >= 12) return "Người làm số";
    if (score >= 10) return "Người học số";
    if (score >= 8) return "Người mới bắt đầu";
    return "Cần học thêm";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient-dark animate-pulse-slow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Completion Card */}
            <div className="story-card">
              {/* Header */}
              <div className="text-center mb-8">
                <div className={`w-24 h-24 bg-gradient-to-r ${getScoreColor(gameState.quizScore)} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                <h1 className="text-4xl font-bold text-gradient mb-4 font-academic">
                  Chúc mừng bạn đã hoàn thành!
                </h1>
                <p className="text-xl text-gray-300 mb-4 font-ui">
                  {getScoreMessage(gameState.quizScore)}
                </p>
              </div>



              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-blue-800 mb-2 font-academic">
                      {gameState.quizScore}/12
                    </h3>
                    <p className="text-blue-600 font-ui">Điểm số</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 1, duration: 1 }}
                        style={{ backgroundColor: '#2563eb', height: '8px', borderRadius: '9999px' }}
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <Puzzle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2 font-academic">
                      {gameState.completedPuzzlePieces}/12
                    </h3>
                    <p className="text-green-600 font-ui">Mảnh puzzle</p>
                  </motion.div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-purple-800 mb-2 font-academic">
                      {minutes}:{seconds.toString().padStart(2, '0')}
                    </h3>
                    <p className="text-purple-600 font-ui">Thời gian</p>
                  </motion.div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-yellow-800 mb-2 font-academic">
                      {Math.round(percentage)}%
                    </h3>
                    <p className="text-yellow-600 font-ui">Hoàn thành</p>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button
                  onClick={onGoHome}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 text-lg"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <Home className="w-6 h-6" />
                    Về trang chủ
                  </motion.div>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Puzzle Modal */}
      {showPuzzle && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 font-academic">
                Kim Tự Tháp Công Nghiệp 4.0
              </h2>
              <button
                onClick={() => setShowPuzzle(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="text-center">
              <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto mb-6">
                {[
                  'AI', 'IoT', 'Big Data', 'Robot',
                  'Cloud', '5G', 'AR/VR', 'Blockchain',
                  'Quantum', 'Edge Computing', 'Digital Twin', 'Cybersecurity',
                  '3D Printing', 'Autonomous Systems', 'Smart Sensors', 'Data Analytics'
                ].map((tech, index) => (
                  <div key={tech} className={`p-3 rounded-lg text-sm font-bold transition-all duration-500 ${
                    gameState.completedPuzzlePieces > index
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {tech}
                  </div>
                ))}
              </div>

              <p className="text-gray-600 font-ui text-lg leading-relaxed">
                Công nghiệp 4.0 là sự kết hợp của nhiều công nghệ số hóa để tạo ra
                các nhà máy thông minh, quy trình sản xuất hiệu quả và sản phẩm chất lượng cao.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Reveal Modal */}
      {showReveal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl shadow-3xl max-w-4xl w-full p-8 relative overflow-hidden"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-academic mb-2">
                    🎭 Hình Ảnh Cuối Cùng
                  </h2>
                  <p className="text-gray-600 font-ui text-lg">
                    Bí mật của Công nghiệp 4.0 đã được tiết lộ!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowReveal(false);
                    setRevealProgress(0);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center transition-all"
                >
                  ×
                </button>
              </div>

              {/* Reveal Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 font-ui">Đang reveal...</span>
                  <span className="text-sm font-medium text-gray-600 font-ui">{revealProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${revealProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Main Reveal Image */}
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="relative mb-8"
                >
                  {/* Reveal Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl transition-all duration-1000"
                    style={{
                      clipPath: revealProgress < 100 ? `inset(0 ${100 - revealProgress}% 0 0)` : 'none'
                    }}
                  />

                  {/* Final Image */}
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-12 shadow-2xl border-4 border-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: revealProgress >= 30 ? 1 : 0, y: revealProgress >= 30 ? 0 : 20 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      {/* Industry 4.0 Visualization */}
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: revealProgress >= 50 ? 1 : 0 }}
                          transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
                          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
                        >
                          <span className="text-4xl">🤖</span>
                        </motion.div>

                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={{ opacity: revealProgress >= 70 ? 1 : 0 }}
                          transition={{ delay: 2, duration: 0.8 }}
                          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-academic mb-4"
                        >
                          CÔNG NGHIỆP 4.0
                        </motion.h3>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: revealProgress >= 90 ? 1 : 0, y: revealProgress >= 90 ? 0 : 20 }}
                          transition={{ delay: 2.5, duration: 0.8 }}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
                        >
                          {[
                            { icon: '🤖', label: 'AI & Robot' },
                            { icon: '📡', label: 'IoT & 5G' },
                            { icon: '☁️', label: 'Cloud Computing' },
                            { icon: '📊', label: 'Big Data' },
                            { icon: '🔒', label: 'Cybersecurity' },
                            { icon: '🏭', label: 'Smart Factory' },
                            { icon: '👥', label: 'Digital Workforce' },
                            { icon: '🚀', label: 'Innovation' }
                          ].map((item, index) => (
                            <motion.div
                              key={item.label}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: revealProgress >= 100 ? 1 : 0, scale: revealProgress >= 100 ? 1 : 0.8 }}
                              transition={{ delay: 3 + index * 0.1, duration: 0.5 }}
                              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50"
                            >
                              <div className="text-2xl mb-2">{item.icon}</div>
                              <div className="text-sm font-bold text-gray-800 font-academic">{item.label}</div>
                            </motion.div>
                          ))}
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: revealProgress >= 100 ? 1 : 0 }}
                          transition={{ delay: 4, duration: 1 }}
                          className="text-gray-700 font-ui text-lg leading-relaxed mt-8 max-w-3xl mx-auto"
                        >
                          <strong className="text-blue-600">Công nghiệp 4.0</strong> là sự kết hợp hoàn hảo giữa công nghệ số hóa và sản xuất thông minh,
                          tạo ra một hệ sinh thái nơi con người và máy móc hợp tác để tạo ra giá trị tối đa.
                          Đây là tương lai của ngành công nghiệp thế giới!
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Success Badge */}
                  {revealProgress >= 100 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 4.5, duration: 0.8, type: "spring" }}
                      className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-xl"
                    >
                      🎉 HOÀN THÀNH!
                    </motion.div>
                  )}
                </motion.div>

                {/* Congratulation Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: revealProgress >= 100 ? 1 : 0, y: revealProgress >= 100 ? 0 : 20 }}
                  transition={{ delay: 5, duration: 0.8 }}
                  className="text-center"
                >
                  <p className="text-xl text-gray-700 font-ui mb-4">
                    Chúc mừng bạn đã khám phá thành công bí mật của Công nghiệp 4.0! 🎊✨
                  </p>
                  <p className="text-gray-600 font-ui">
                    Bạn đã hoàn thành hành trình với <strong className="text-blue-600">{gameState.quizScore}/16 điểm</strong>
                    và mở khóa <strong className="text-purple-600">{gameState.completedPuzzlePieces}/16</strong> công nghệ!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CompletionComponent;