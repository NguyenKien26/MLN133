import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, BookOpen, Cpu, Factory, Users, Lightbulb, ArrowRight, MessageCircle } from 'lucide-react';
import { StoryScene, storyScenes } from '../data/story';

interface InteractiveStoryProps {
  onComplete: () => void;
}

const InteractiveStory: React.FC<InteractiveStoryProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [showDialogue, setShowDialogue] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const currentSceneData = storyScenes[currentScene];

  const handleNext = () => {
    if (currentScene < storyScenes.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(currentScene + 1);
        setShowDialogue(false);
        setIsTransitioning(false);
      }, 500);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentScene > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(currentScene - 1);
        setShowDialogue(false);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleDialogueClick = () => {
    setShowDialogue(true);
  };

  const getSceneIcon = (sceneId: number) => {
    switch (sceneId) {
      case 1: return <BookOpen className="w-6 h-6" />;
      case 2: return <Cpu className="w-6 h-6" />;
      case 3: return <Factory className="w-6 h-6" />;
      case 4: return <Users className="w-6 h-6" />;
      case 5: return <Lightbulb className="w-6 h-6" />;
      case 6: return <Lightbulb className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  const getSceneColor = (sceneId: number) => {
    switch (sceneId) {
      case 1: return "from-blue-500 to-blue-600";
      case 2: return "from-purple-500 to-purple-600";
      case 3: return "from-green-500 to-green-600";
      case 4: return "from-orange-500 to-orange-600";
      case 5: return "from-red-500 to-red-600";
      case 6: return "from-indigo-500 to-indigo-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-gradient-dark animate-pulse-slow opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 text-cyan-400 opacity-30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Cpu size={80} />
      </motion.div>
      <motion.div
        className="absolute bottom-10 right-10 text-purple-400 opacity-30"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lightbulb size={80} />
      </motion.div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl h-[90vh] flex flex-col bg-white/10 backdrop-blur-xl rounded-3xl shadow-3xl border border-white/20 overflow-hidden"
        >
          {/* Story Header */}
          <div className={`bg-gradient-to-r ${getSceneColor(currentSceneData.id)} text-white p-6 flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                {getSceneIcon(currentSceneData.id)}
              </div>
              <div>
                <h1 className="text-2xl font-bold font-academic">{currentSceneData.title}</h1>
                <p className="text-sm font-ui opacity-90">{currentSceneData.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-ui opacity-90">Chương {currentScene + 1}/{storyScenes.length}</p>
              <div className="w-32 bg-white/20 rounded-full h-2 mt-2">
                <motion.div
                  className="bg-white h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentScene + 1) / storyScenes.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Story Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Background Image/Illustration */}
            <div className="w-1/2 relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  {getSceneIcon(currentSceneData.id)}
                </motion.div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{currentSceneData.character}</h3>
                  <p className="text-sm text-gray-600">{currentSceneData.characterRole}</p>
                </div>
              </div>
            </div>

            {/* Story Text */}
            <div className="w-1/2 p-8 flex flex-col justify-between">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold text-gradient-dark mb-6 font-academic">
                      {currentSceneData.title}
                    </h2>
                    <p className="text-gray-200 text-lg leading-relaxed text-justify font-ui mb-6">
                      {currentSceneData.content}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Character Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-academic">
                      {currentSceneData.character.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-academic">
                      {currentSceneData.character}
                    </h3>
                    <p className="text-gray-300 text-sm font-ui">
                      {currentSceneData.characterRole}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleDialogueClick}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Nghe {currentSceneData.character} nói
                </button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white/10 backdrop-blur-sm border-t border-white/20 p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentScene === 0}
                className={`btn-outline flex items-center gap-2 ${
                  currentScene === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Trước
              </button>

              <div className="text-center">
                <p className="text-gray-300 text-sm font-ui mb-2">
                  {currentSceneData.nextScene}
                </p>
                <div className="flex gap-2">
                  {storyScenes.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentScene
                          ? 'bg-white'
                          : index < currentScene
                          ? 'bg-white/60'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                {currentScene === storyScenes.length - 1 ? (
                  <>
                    <Play className="w-5 h-5" />
                    Bắt đầu thử thách
                  </>
                ) : (
                  <>
                    Tiếp theo
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Dialogue Modal */}
      <AnimatePresence>
        {showDialogue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDialogue(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl font-academic">
                    {currentSceneData.character.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-academic">
                  {currentSceneData.character}
                </h3>
                <p className="text-gray-600 text-sm font-ui mb-4">
                  {currentSceneData.characterRole}
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 text-lg font-ui italic">
                    "{currentSceneData.dialogue}"
                  </p>
                </div>
                <button
                  onClick={() => setShowDialogue(false)}
                  className="btn-primary w-full"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveStory;