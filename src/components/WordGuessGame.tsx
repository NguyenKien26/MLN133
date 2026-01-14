import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Lightbulb } from 'lucide-react';

interface WordGuessGameProps {
  keyword: string;
  onComplete: (success: boolean) => void;
  onSkip: () => void;
}

const WordGuessGame: React.FC<WordGuessGameProps> = ({
  keyword,
  onComplete,
  onSkip
}) => {
  const [guessedLetters, setGuessedLetters] = React.useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [won, setWon] = React.useState(false);
  const [showHint, setShowHint] = React.useState(false);

  const maxWrongGuesses = 6;
  const keywordUpper = keyword.toUpperCase();

  // Tạo alphabet
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Kiểm tra xem từ đã được đoán đúng chưa
  const isWordGuessed = React.useMemo(() => {
    return keywordUpper.split('').every(letter => guessedLetters.has(letter));
  }, [keywordUpper, guessedLetters]);

  // Xử lý khi đoán chữ cái
  const handleGuess = (letter: string) => {
    if (gameOver || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    // Kiểm tra xem chữ cái có trong từ không
    if (!keywordUpper.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= maxWrongGuesses) {
        setGameOver(true);
        setWon(false);
      }
    } else if (isWordGuessed) {
      // Kiểm tra lại sau khi thêm chữ cái mới
      const finalWordGuessed = keywordUpper.split('').every(l => newGuessedLetters.has(l));
      if (finalWordGuessed) {
        setGameOver(true);
        setWon(true);
      }
    }
  };

  // Hiển thị từ với các chữ cái đã đoán
  const displayWord = keywordUpper.split('').map((letter, index) => (
    <motion.span
      key={index}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`inline-block w-8 h-8 mx-1 border-2 border-blue-300 rounded-lg flex items-center justify-center font-bold text-lg ${
        guessedLetters.has(letter)
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-white text-transparent'
      }`}
    >
      {guessedLetters.has(letter) ? letter : ''}
    </motion.span>
  ));

  // Vẽ hình người treo cổ đơn giản
  const drawHangman = () => {
    const parts = [
      // Head
      wrongGuesses >= 1 && (
        <circle key="head" cx="100" cy="50" r="15" stroke="#dc2626" strokeWidth="3" fill="none" />
      ),
      // Body
      wrongGuesses >= 2 && (
        <line key="body" x1="100" y1="65" x2="100" y2="95" stroke="#dc2626" strokeWidth="3" />
      ),
      // Left arm
      wrongGuesses >= 3 && (
        <line key="left-arm" x1="100" y1="75" x2="85" y2="85" stroke="#dc2626" strokeWidth="3" />
      ),
      // Right arm
      wrongGuesses >= 4 && (
        <line key="right-arm" x1="100" y1="75" x2="115" y2="85" stroke="#dc2626" strokeWidth="3" />
      ),
      // Left leg
      wrongGuesses >= 5 && (
        <line key="left-leg" x1="100" y1="95" x2="85" y2="110" stroke="#dc2626" strokeWidth="3" />
      ),
      // Right leg
      wrongGuesses >= 6 && (
        <line key="right-leg" x1="100" y1="95" x2="115" y2="110" stroke="#dc2626" strokeWidth="3" />
      )
    ];

    return (
      <svg width="200" height="150" className="border-2 border-gray-300 rounded-lg bg-gray-50">
        {/* Gallows */}
        <line x1="20" y1="130" x2="180" y2="130" stroke="#8b5cf6" strokeWidth="4" />
        <line x1="50" y1="130" x2="50" y2="20" stroke="#8b5cf6" strokeWidth="4" />
        <line x1="50" y1="20" x2="100" y2="20" stroke="#8b5cf6" strokeWidth="4" />
        <line x1="100" y1="20" x2="100" y2="35" stroke="#8b5cf6" strokeWidth="4" />
        {parts}
      </svg>
    );
  };

  const handleComplete = () => {
    onComplete(won);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient-dark animate-pulse-slow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="story-card"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lightbulb className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gradient mb-2 font-academic">
              🎯 Đoán Từ Khóa
            </h1>
            <p className="text-gray-600 font-ui">
              Đoán các chữ cái để tìm từ khóa của câu hỏi!
            </p>
          </div>

          {/* Game Status */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {wrongGuesses}/{maxWrongGuesses}
              </div>
              <div className="text-sm text-gray-600 font-ui">Lỗi đoán</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {guessedLetters.size}
              </div>
              <div className="text-sm text-gray-600 font-ui">Đã đoán</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {keyword.length}
              </div>
              <div className="text-sm text-gray-600 font-ui">Chữ cái</div>
            </div>
          </div>

          {/* Hangman Drawing */}
          <div className="flex justify-center mb-8">
            {drawHangman()}
          </div>

          {/* Word Display */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              {displayWord}
            </div>
            <p className="text-gray-600 font-ui text-sm">
              Từ khóa có {keyword.length} chữ cái
            </p>
          </div>

          {/* Hint */}
          {!showHint && (
            <div className="text-center mb-6">
              <button
                onClick={() => setShowHint(true)}
                className="text-blue-600 hover:text-blue-700 font-ui text-sm underline"
              >
                💡 Cần gợi ý?
              </button>
            </div>
          )}

          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            >
              <p className="text-blue-800 font-ui text-sm">
                <strong>Gợi ý:</strong> Đây là một thuật ngữ liên quan đến Công nghiệp 4.0
              </p>
            </motion.div>
          )}

          {/* Alphabet Buttons */}
          {!gameOver && (
            <div className="mb-8">
              <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-w-2xl mx-auto">
                {alphabet.map((letter) => (
                  <motion.button
                    key={letter}
                    onClick={() => handleGuess(letter)}
                    disabled={guessedLetters.has(letter)}
                    className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200 ${
                      guessedLetters.has(letter)
                        ? keywordUpper.includes(letter)
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-red-500 text-white cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
                    }`}
                    whileHover={!guessedLetters.has(letter) ? { scale: 1.05 } : {}}
                    whileTap={!guessedLetters.has(letter) ? { scale: 0.95 } : {}}
                  >
                    {letter}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center mb-8"
              >
                <div className={`p-8 rounded-2xl border-4 ${
                  won
                    ? 'bg-green-50 border-green-300'
                    : 'bg-red-50 border-red-300'
                }`}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="mb-4"
                  >
                    {won ? (
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                    ) : (
                      <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                    )}
                  </motion.div>

                  <h2 className={`text-2xl font-bold mb-4 font-academic ${
                    won ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {won ? '🎉 Chúc mừng!' : '😞 Thua rồi!'}
                  </h2>

                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      Từ khóa là: <span className="text-blue-600">{keywordUpper}</span>
                    </p>
                    <p className={`font-ui ${won ? 'text-green-600' : 'text-red-600'}`}>
                      {won
                        ? 'Bạn đã đoán đúng từ khóa!'
                        : `Bạn đã đoán sai ${wrongGuesses} lần. Từ khóa sẽ được tiết lộ trong phần giải thích câu hỏi.`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {!gameOver ? (
              <button
                onClick={onSkip}
                className="btn-outline flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Bỏ qua
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className={`btn-primary flex items-center gap-2 ${
                  won ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                <Trophy className="w-5 h-5" />
                {won ? 'Tiếp tục với điểm thưởng' : 'Tiếp tục'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WordGuessGame;