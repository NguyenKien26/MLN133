import React from 'react';

interface GameState {
  currentStep: 'quiz' | 'complete';
  quizScore: number;
  currentQuestion: number;
  timeSpent?: number;
  completedPuzzlePieces: number;
  totalPuzzlePieces: number;
}

interface GameContextType {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  startQuiz: () => void;
  completeGame: () => void;
  updateQuizScore: (score: number) => void;
  updatePuzzleProgress: (progress: number) => void;
  resetGame: () => void;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = React.useState<GameState>({
    currentStep: 'quiz',
    quizScore: 0,
    currentQuestion: 0,
    completedPuzzlePieces: 0,
    totalPuzzlePieces: 8, // 8 mảnh puzzle cho Công nghiệp 4.0
  });

  const startQuiz = React.useCallback(() => {
    setGameState(prev => ({ ...prev, currentStep: 'quiz', currentQuestion: 0 }));
  }, []);

  const completeGame = React.useCallback(() => {
    setGameState(prev => ({ ...prev, currentStep: 'complete' }));
  }, []);

  const updateQuizScore = React.useCallback((score: number) => {
    setGameState(prev => ({ ...prev, quizScore: score }));
  }, []);

  const updatePuzzleProgress = React.useCallback((progress: number) => {
    setGameState(prev => ({ ...prev, completedPuzzlePieces: progress }));
  }, []);

  const resetGame = React.useCallback(() => {
    setGameState({
      currentStep: 'quiz',
      quizScore: 0,
      currentQuestion: 0,
      completedPuzzlePieces: 0,
      totalPuzzlePieces: 8,
    });
  }, []);

  const value = React.useMemo(() => ({
    gameState,
    setGameState,
    startQuiz,
    completeGame,
    updateQuizScore,
    updatePuzzleProgress,
    resetGame,
  }), [gameState, startQuiz, completeGame, updateQuizScore, updatePuzzleProgress, resetGame]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};