import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Target, Brain, Award, Home, Clock, Puzzle } from 'lucide-react';
import { questions, Question } from '../data/questions';
import { useGameContext } from '../contexts/GameContext';

interface IntegratedQuizPuzzleProps {
  onComplete: (score: number, timeSpent: number) => void;
  onGoHome: () => void;
}

const IntegratedQuizPuzzle: React.FC<IntegratedQuizPuzzleProps> = ({
  onComplete,
  onGoHome
}) => {
  const MAX_QUESTIONS = 12;
  const { gameState, updateQuizScore, updatePuzzleProgress } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answeredQuestions, setAnsweredQuestions] = React.useState<boolean[]>(
    new Array(MAX_QUESTIONS).fill(false)
  );
  const [timeSpent, setTimeSpent] = React.useState(0);

  // Puzzle state - 12 pieces for Industry 4.0
  const [puzzlePieces, setPuzzlePieces] = React.useState<boolean[]>(
    new Array(12).fill(false)
  );
  const [showPuzzle, setShowPuzzle] = React.useState(false);
  const [gamePhase, setGamePhase] = React.useState<'quiz' | 'keyword' | 'summary'>('quiz');
  const [guessInput, setGuessInput] = React.useState('');
  const [guessResult, setGuessResult] = React.useState<'correct' | 'wrong' | null>(null);
  const [keywordInput, setKeywordInput] = React.useState('');
  const [keywordResult, setKeywordResult] = React.useState<'correct' | 'wrong' | null>(null);
  const [keywordQuestion, setKeywordQuestion] = React.useState<Question | null>(null);
  const [wordGuess, setWordGuess] = React.useState('');
  const [guessedLetters, setGuessedLetters] = React.useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = React.useState(0);
  const MAX_WRONG_GUESSES = 6;

  // Random answers state
  const [shuffledAnswers, setShuffledAnswers] = React.useState<{
    options: string[];
    correctIndex: number;
    originalCorrectIndex: number;
  }[]>([]);

  // Ref để theo dõi việc submit đang trong quá trình
  const isSubmittingRef = React.useRef(false);

  // Function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get current question
  const currentQ = questions[currentQuestion];

  // Timer effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const revealRandomPiece = () => {
    const availablePieces = puzzlePieces
      .map((revealed, index) => ({ revealed, index }))
      .filter(item => !item.revealed);

    if (availablePieces.length > 0) {
      const randomIndex = Math.floor(Math.random() * availablePieces.length);
      const pieceIndex = availablePieces[randomIndex].index;

      setPuzzlePieces(prev => {
        const newPieces = [...prev];
        newPieces[pieceIndex] = true;
        return newPieces;
      });

      updatePuzzleProgress(puzzlePieces.filter(Boolean).length + 1);
      setShowPuzzle(true);
    }
  };

  // Hangman logic - Fixed 15 letters A-O
  const FIXED_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'];
  
  const getAvailableLetters = () => {
    return FIXED_LETTERS.filter(letter => !guessedLetters.has(letter));
  };

  const getHangmanEmoji = () => {
    const stages = ['😊', '😐', '😕', '😟'];
    return stages[Math.min(wrongGuesses, stages.length - 1)];
  };

  const getDisplayWord = () => {
    if (!currentQ.keyword) return '';
    const keyword = currentQ.keyword.toUpperCase();
    let revealed = '';
    
    // Mỗi lần sai hiện ra wrongGuesses chữ đầu tiên
    if (wrongGuesses > 0) {
      revealed = keyword.substring(0, Math.min(wrongGuesses, keyword.length));
    }
    
    return keyword.split('').map((char, index) => {
      if (guessedLetters.has(char) || index < revealed.length) {
        return char;
      }
      return char === ' ' ? ' ' : '_';
    }).join('');
  };

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.has(letter) || answeredQuestions[currentQuestion]) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    // Check if letter is in keyword
    if (!currentQ.keyword?.toUpperCase().includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
    }
  };

  const handleKeywordSubmit = () => {
    if (!wordGuess.trim() || answeredQuestions[currentQuestion]) return;

    const userGuess = wordGuess.trim().toLowerCase();
    const correctKeyword = currentQ.keywordVi?.toLowerCase() || '';

    if (userGuess === correctKeyword) {
      setGuessResult('correct');
      setScore(score + 1);
      revealRandomPiece();

      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestion] = true;
      setAnsweredQuestions(newAnsweredQuestions);
      setShowExplanation(true);
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      setWordGuess('');

      if (newWrongGuesses >= 3) {
        // Sai 3 lần - hiện toàn bộ đáp án
        setGuessResult('wrong');
        setShowExplanation(true);
        const newAnsweredQuestions = [...answeredQuestions];
        newAnsweredQuestions[currentQuestion] = true;
        setAnsweredQuestions(newAnsweredQuestions);
      }
    }
  };

  const resetHangman = () => {
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  };

  const handleWordGuess = () => {
    if (!wordGuess.trim() || !currentQ.keyword || answeredQuestions[currentQuestion]) return;

    const lowerGuess = wordGuess.toUpperCase().trim();
    const correctKeyword = currentQ.keyword.toUpperCase();

    if (lowerGuess === correctKeyword) {
      setGuessResult('correct');
      setScore(score + 1);
      revealRandomPiece();

      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[currentQuestion] = true;
      setAnsweredQuestions(newAnsweredQuestions);
      setShowExplanation(true);
    } else {
      setGuessResult('wrong');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion] || isSubmittingRef.current) return;

    setSelectedAnswer(answerIndex);
    isSubmittingRef.current = true;

    // Auto-submit ngay khi chọn đáp án
    setTimeout(() => {
      if (!answeredQuestions[currentQuestion]) {
        handleSubmitAnswer(answerIndex);
      }
      isSubmittingRef.current = false;
    }, 500);
  };

  const handleSubmitAnswer = (answerIndex?: number) => {
    const selectedAnswerIndex = answerIndex !== undefined ? answerIndex : selectedAnswer;
    if (selectedAnswerIndex === null) return;

    const isCorrect = selectedAnswerIndex === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      // Mở mảnh puzzle ngay lập tức
      revealRandomPiece();
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < MAX_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setWordGuess('');
      setGuessResult(null);
      setShowExplanation(false);
      setShowPuzzle(false);
      isSubmittingRef.current = false;
      resetHangman();
    } else {
      // Chuyển sang phase summary khi hoàn thành 12 câu
      setGamePhase('summary');
      updateQuizScore(score);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setWordGuess('');
      setGuessResult(null);
      setShowExplanation(false);
      setShowPuzzle(false);
      isSubmittingRef.current = false;
      resetHangman();
    }
  };

  const getAnswerClass = (index: number) => {
    if (!answeredQuestions[currentQuestion]) {
      // Highlight đáp án được chọn
      if (index === selectedAnswer) {
        return 'quiz-option selected';
      }
      return 'quiz-option';
    }

    if (index === currentQ.correctAnswer) {
      return 'quiz-option correct';
    }

    if (index === selectedAnswer && index !== currentQ.correctAnswer) {
      return 'quiz-option wrong';
    }

    return 'quiz-option';
  };

  const getAnswerIcon = (index: number) => {
    if (!answeredQuestions[currentQuestion]) return null;

    if (index === currentQ.correctAnswer) {
      return <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />;
    }

    if (index === selectedAnswer && index !== currentQ.correctAnswer) {
      return <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />;
    }

    return null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 14) return 'from-green-500 to-green-600';
    if (score >= 12) return 'from-blue-500 to-blue-600';
    if (score >= 10) return 'from-yellow-500 to-yellow-600';
    if (score >= 8) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const handleGuessSubmit = () => {
    if (!guessInput.trim()) return;
    
    const lowerGuess = guessInput.toLowerCase().trim();
    const correctAnswers = [
      'công nghiệp 4.0',
      'cnv4',
      'industry 4.0',
      'digital transformation',
      'cách mạng công nghiệp 4.0',
      'cách mạng số',
      'smart industry',
      'fourth industrial revolution',
      'industry 4'
    ];
    
    if (correctAnswers.some(ans => lowerGuess.includes(ans) || ans.includes(lowerGuess))) {
      setGuessResult('correct');
    } else {
      setGuessResult('wrong');
    }
  };

  const handleFinishGame = () => {
    onComplete(score, timeSpent);
  };



  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const completedPieces = puzzlePieces.filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient-dark animate-pulse-slow opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-green-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl animate-float" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl w-full"
        >
          <div className="story-card">
            {/* Phase Quiz */}
            {gamePhase === 'quiz' && (
              <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gradient mb-2 font-academic">
                  Quiz & Puzzle Công nghiệp 4.0
                </h1>
                <p className="text-gray-600 font-ui">
                  Trả lời câu hỏi để mở khóa mảnh puzzle Công nghiệp 4.0
                </p>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Target className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-800 font-academic">
                    {score}/12
                  </div>
                  <div className="text-sm text-blue-600 font-ui">Điểm</div>
                </div>

                <div className="text-center">
                  <Puzzle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-800 font-academic">
                    {completedPieces}/8
                  </div>
                  <div className="text-sm text-green-600 font-ui">Mảnh</div>
                </div>

                <div className="text-center">
                  <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-purple-800 font-academic">
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </div>
                  <div className="text-sm text-purple-600 font-ui">Thời gian</div>
                </div>
              </div>
            </div>

            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 font-ui">Tiến độ Quiz</span>
                  <span className="text-sm font-medium text-gray-600 font-ui">
                    {currentQuestion + 1}/8
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / 8) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 font-ui">Tiến độ Puzzle</span>
                  <span className="text-sm font-medium text-gray-600 font-ui">
                    {completedPieces}/8
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedPieces / 8) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quiz Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-academic">
                  Câu hỏi {currentQuestion + 1}
                </h2>

                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold text-academic mb-6 leading-relaxed">
                    {currentQ.question}
                  </h3>

                  {/* Word Guessing Section - Vietnamese Keyword Game */}
                  <div className="space-y-6">
                    {/* Display keyword hint */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                      <p className="text-sm text-gray-600 font-ui mb-3">🎮 Đoán từ khoá - Đáp án sẽ dần hiện ra khi bạn trả lời sai:</p>
                      
                      {/* Keyword display */}
                      <div className="flex flex-col items-center justify-center mb-6">
                        {/* Wrong attempts counter */}
                        <div className="text-center mb-4">
                          <div className="text-4xl font-bold mb-2">
                            {getHangmanEmoji()}
                          </div>
                          <p className="text-sm text-gray-600 font-ui font-bold">
                            Sai: {wrongGuesses}/3
                          </p>
                        </div>

                        {/* Keyword hint display */}
                        <div className="bg-white rounded-lg p-6 w-full text-center">
                          {wrongGuesses === 0 ? (
                            <p className="text-2xl text-gray-400 font-academic whitespace-nowrap">
                              ●●●●●●●●●●●●●●●●●●●●
                            </p>
                          ) : (
                            <motion.div
                              key={wrongGuesses}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-2xl font-bold text-blue-600 font-academic whitespace-nowrap"
                            >
                              {currentQ.keywordVi?.substring(0, Math.min(wrongGuesses, currentQ.keywordVi?.length || 0))}
                            </motion.div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 font-ui mt-2">
                          {currentQ.keywordVi?.length} ký tự
                        </p>
                      </div>

                      {/* Keyword input */}
                      {!answeredQuestions[currentQuestion] && wrongGuesses < 3 ? (
                        <div className="space-y-3 border-t pt-4">
                          <p className="text-sm text-gray-600 font-ui">Nhập từ khoá tiếng Việt khi bạn tự tin:</p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={wordGuess}
                              onChange={(e) => setWordGuess(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && handleKeywordSubmit()}
                              placeholder="Ví dụ: Làm chủ công nghệ"
                              className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-300 focus:border-blue-600 focus:outline-none font-ui text-lg"
                              autoFocus
                            />
                            <button
                              onClick={handleKeywordSubmit}
                              disabled={!wordGuess.trim()}
                              className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Trả lời
                            </button>
                          </div>

                          {/* Wrong attempts feedback */}
                          {wrongGuesses > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-700 text-sm font-ui text-center"
                            >
                              Sai {wrongGuesses} lần {wrongGuesses === 3 ? '- Đáp án: ' + currentQ.keywordVi : 'rồi'}
                            </motion.div>
                          )}
                        </div>
                      ) : guessResult === 'correct' && answeredQuestions[currentQuestion] ? (
                        <div className="bg-green-100 border border-green-400 rounded-lg p-4 text-center">
                          <p className="text-green-700 font-semibold font-ui">✓ Chính xác! Từ khoá: {currentQ.keywordVi}</p>
                        </div>
                      ) : (
                        <div className="bg-red-100 border border-red-400 rounded-lg p-4 text-center">
                          <p className="text-red-700 font-semibold font-ui mb-2">💀 Game Over! Từ khoá là: {currentQ.keywordVi}</p>
                          <button
                            onClick={() => {
                              resetHangman();
                              const newAnsweredQuestions = [...answeredQuestions];
                              newAnsweredQuestions[currentQuestion] = true;
                              setAnsweredQuestions(newAnsweredQuestions);
                              setShowExplanation(true);
                            }}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-ui"
                          >
                            Tiếp tục
                          </button>
                        </div>
                      )}

                      {/* Feedback */}
                      {guessResult === 'wrong' && wrongGuesses >= MAX_WRONG_GUESSES && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm font-ui text-center"
                        >
                          Hết lần rồi! 😢
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Explanation */}
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200"
                  >
                    <h3 className="font-semibold text-blue-800 mb-2 text-lg font-academic flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Giải thích:
                    </h3>
                    <p className="text-blue-700 leading-relaxed font-ui">{currentQ.explanation}</p>
                  </motion.div>
                )}

                {/* Quiz Navigation */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className={`btn-outline flex items-center gap-2 ${
                      currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Trước
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    disabled={!answeredQuestions[currentQuestion]}
                    className={`btn-primary flex items-center gap-2 ${
                      !answeredQuestions[currentQuestion] ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {answeredQuestions[currentQuestion] ? 'Tiếp theo' : 'Đoán đúng từ khoá để tiếp tục'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Puzzle Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-academic">
                  Puzzle Công nghiệp 4.0
                </h2>

                {/* Puzzle Preview */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 shadow-lg mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 text-center font-academic">
                    Công Nghiệp 4.0
                  </h3>

                  {/* Mini puzzle grid */}
                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {Array.from({ length: 12 }, (_, index) => (
                      <motion.div
                        key={index}
                        className={`aspect-square flex items-center justify-center overflow-hidden transition-all duration-300 rounded ${
                          puzzlePieces[index]
                            ? 'border-2 border-green-500'
                            : 'bg-gray-300 border-2 border-gray-400'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        {puzzlePieces[index] ? (
                          <img 
                            src={`/images/pieces/image_part_${String(index + 1).padStart(3, '0')}.jpg`}
                            alt={`Puzzle piece ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-600">{index + 1}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-center text-gray-600 font-ui text-sm">
                    {completedPieces}/12 mảnh đã được mở khóa
                  </p>
                </div>

                {/* Success Animation */}
                <AnimatePresence>
                  {showPuzzle && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      <p className="text-green-800 font-ui font-semibold">
                        Chúc mừng! Một mảnh puzzle đã được mở khóa!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={onGoHome}
                className="btn-outline flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Về trang chủ
              </button>
            </div>
              </>
            )}

            {/* Phase Summary - Guessing the puzzle image */}
            {gamePhase === 'summary' && (
              <div>
              {/* Header */}
              <div className="text-center mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-gradient mb-2 font-academic"
                >
                  Bí Ẩn Được Hé Lộ! 🎉
                </motion.h1>
                <p className="text-gray-600 font-ui text-lg">
                  Bạn đã hoàn thành tất cả 12 câu hỏi! Đoán xem bức ảnh puzzle này là gì?
                </p>
              </div>

              {/* Completed Puzzle Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto mb-8"
              >
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 shadow-2xl border-4 border-blue-300">
                  {/* Display completed full image */}
                  <div className="mb-6 bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src="/images/robotarm.jpg" 
                      alt="Công nghệ Robot Arm - Công nghiệp 4.0"
                      className="w-full h-auto rounded"
                    />
                  </div>
                  
                  <p className="text-center text-gray-600 font-ui mb-4">
                    Tất cả 12/12 mảnh puzzle đã được mở khóa!
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 font-academic">{score}/12</div>
                      <div className="text-sm text-gray-600 font-ui">Điểm Quiz</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 font-academic">100%</div>
                      <div className="text-sm text-gray-600 font-ui">Puzzle Hoàn Thành</div>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 font-academic">
                        {minutes}:{seconds.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm text-gray-600 font-ui">Thời Gian</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Guessing Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-academic flex items-center gap-2">
                  <Brain className="w-6 h-6 text-orange-500" />
                  Đoán Xem Đây Là Gì?
                </h2>

                {guessResult === null ? (
                  <div className="space-y-4">
                    <p className="text-gray-600 font-ui">
                      Bức ảnh puzzle hoàn chỉnh biểu tượng cho thế giới số hóa. Đoán xem đây là gì hoặc nó đại diện cho khái niệm nào?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={guessInput}
                        onChange={(e) => setGuessInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleGuessSubmit()}
                        placeholder="Nhập câu trả lời của bạn..."
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-orange-500 focus:outline-none font-ui"
                      />
                      <button
                        onClick={handleGuessSubmit}
                        disabled={!guessInput.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Gửi Đáp Án
                      </button>
                    </div>
                  </div>
                ) : guessResult === 'correct' ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-6 border-2 border-green-500 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3"
                      >
                        <CheckCircle className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-green-700 font-academic mb-2">
                        Tuyệt Vời! ✨
                      </h3>
                      <p className="text-green-600 font-ui mb-4">
                        Bạn đúng rồi! Đây chính là biểu tượng của Công nghiệp 4.0 - kỷ nguyên của chuyển đổi số, tự động hóa và kết nối toàn cầu.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 border-2 border-blue-400 text-center">
                      <p className="text-blue-700 font-ui mb-4">
                        Không hoàn toàn chính xác, nhưng cũng gần lắm! Đây là biểu tượng của <strong>Công nghiệp 4.0</strong> - kỷ nguyên của chuyển đổi số, tự động hóa và kết nối toàn cầu.
                      </p>
                      <button
                        onClick={() => {
                          setGuessInput('');
                          setGuessResult(null);
                        }}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300"
                      >
                        Thử Lại
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Completion Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex justify-center gap-4 mt-8"
              >
                <button
                  onClick={handleFinishGame}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  Hoàn Thành Trò Chơi
                </button>
                <button
                  onClick={onGoHome}
                  className="btn-outline flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Về Trang Chủ
                </button>
              </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegratedQuizPuzzle;