import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Target, Brain, Award, Home, Clock, Puzzle } from 'lucide-react';
import { questions, Question } from '../data/questions';
import { useGameContext } from '../contexts/GameContext';
import WordGuessGame from './WordGuessGame';

interface IntegratedQuizPuzzleProps {
  onComplete: (score: number, timeSpent: number) => void;
  onGoHome: () => void;
}

const IntegratedQuizPuzzle: React.FC<IntegratedQuizPuzzleProps> = ({
  onComplete,
  onGoHome
}) => {
  const { gameState, updateQuizScore, updatePuzzleProgress } = useGameContext();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showExplanation, setShowExplanation] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answeredQuestions, setAnsweredQuestions] = React.useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [timeSpent, setTimeSpent] = React.useState(0);

  // Puzzle state - 16 pieces for Industry 4.0
  const [puzzlePieces, setPuzzlePieces] = React.useState<boolean[]>(
    new Array(16).fill(false)
  );
  const [showPuzzle, setShowPuzzle] = React.useState(false);

  // Random answers state
  const [shuffledAnswers, setShuffledAnswers] = React.useState<{
    options: string[];
    correctIndex: number;
    originalCorrectIndex: number;
  }[]>([]);

  // Word Guess Game state
  const [showWordGuess, setShowWordGuess] = React.useState(false);
  const [currentKeyword, setCurrentKeyword] = React.useState('');

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

  // Initialize shuffled answers for all questions
  React.useEffect(() => {
    const shuffled = questions.map(question => {
      const shuffledOptions = shuffleArray(question.options);
      const correctAnswer = question.options[question.correctAnswer];
      const newCorrectIndex = shuffledOptions.findIndex(option => option === correctAnswer);

      return {
        options: shuffledOptions,
        correctIndex: newCorrectIndex,
        originalCorrectIndex: question.correctAnswer
      };
    });

    setShuffledAnswers(shuffled);
  }, []);

  // Get current question with shuffled answers
  const currentQ = shuffledAnswers[currentQuestion] ? {
    ...questions[currentQuestion],
    options: shuffledAnswers[currentQuestion].options,
    correctAnswer: shuffledAnswers[currentQuestion].correctIndex
  } : questions[currentQuestion];

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

      // Kiểm tra xem có keyword để đoán không
      if (currentQ.keyword) {
        setCurrentKeyword(currentQ.keyword);
        setShowWordGuess(true);
        return; // Đừng hiển thị explanation ngay, chờ game đoán từ xong
      } else {
        // Mở mảnh puzzle ngay lập tức nếu không có keyword
        revealRandomPiece();
        setShowPuzzle(true);
      }
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowPuzzle(false);
      isSubmittingRef.current = false;
    } else {
      updateQuizScore(score);
      onComplete(score, timeSpent);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowPuzzle(false);
      isSubmittingRef.current = false;
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

  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const completedPieces = puzzlePieces.filter(Boolean).length;

  const handleWordGuessComplete = (success: boolean) => {
    setShowWordGuess(false);

    if (success) {
      // Thưởng thêm điểm nếu đoán đúng từ khóa
      setScore(score + 1);
    }

    // Mở mảnh puzzle sau khi hoàn thành game đoán từ
    revealRandomPiece();
    setShowPuzzle(true);

    // Đánh dấu câu hỏi đã trả lời và hiển thị explanation
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    setShowExplanation(true);
  };

  const handleSkipWordGuess = () => {
    setShowWordGuess(false);

    // Mở mảnh puzzle khi bỏ qua
    revealRandomPiece();
    setShowPuzzle(true);

    // Đánh dấu câu hỏi đã trả lời và hiển thị explanation
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    setShowExplanation(true);
  };

  // Hiển thị WordGuessGame nếu đang chơi
  if (showWordGuess && currentKeyword) {
    return (
      <WordGuessGame
        keyword={currentKeyword}
        onComplete={handleWordGuessComplete}
        onSkip={handleSkipWordGuess}
      />
    );
  }

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
                    {score}/16
                  </div>
                  <div className="text-sm text-blue-600 font-ui">Điểm</div>
                </div>

                <div className="text-center">
                  <Puzzle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-800 font-academic">
                    {completedPieces}/16
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
                    {currentQuestion + 1}/16
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / 16) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 font-ui">Tiến độ Puzzle</span>
                  <span className="text-sm font-medium text-gray-600 font-ui">
                    {completedPieces}/16
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedPieces / 16) * 100}%` }}
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

                  {/* Answer Options */}
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={answeredQuestions[currentQuestion]}
                        className={`w-full ${getAnswerClass(index)}`}
                        whileHover={!answeredQuestions[currentQuestion] ? { scale: 1.02 } : {}}
                        whileTap={!answeredQuestions[currentQuestion] ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold font-ui bg-white">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div className="flex-1">
                            <p className="text-academic leading-relaxed text-left">{option}</p>
                          </div>
                          {getAnswerIcon(index)}
                        </div>
                      </motion.button>
                    ))}
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
                    {answeredQuestions[currentQuestion] ? 'Tiếp theo' : 'Chọn đáp án để tiếp tục'}
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
                    {Array.from({ length: 16 }, (_, index) => (
                      <motion.div
                        key={index}
                        className={`aspect-square flex items-center justify-center text-xs font-bold transition-all duration-300 rounded ${
                          puzzlePieces[index]
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                      >
                        {puzzlePieces[index] ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          index + 1
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-center text-gray-600 font-ui text-sm">
                    {completedPieces}/16 mảnh đã được mở khóa
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default IntegratedQuizPuzzle;