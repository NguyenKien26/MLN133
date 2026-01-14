import { Gamepad2, Brain, Target, Award } from 'lucide-react';
import { useState } from 'react';

export default function GamesQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const quizzes = [
    {
      id: 'basic',
      title: 'Quiz Cơ bản: Công nghiệp 4.0 là gì?',
      icon: Brain,
      questions: [
        {
          id: 1,
          question: 'Công nghiệp 4.0 kết hợp những công nghệ nào?',
          options: [
            'AI, IoT, Big Data, Robot',
            'Máy in, Fax, Điện thoại',
            'Chỉ lập trình máy tính',
            'Không có công nghệ đặc biệt',
          ],
          correct: 0,
        },
        {
          id: 2,
          question: 'Kỹ năng quan trọng nhất cho công nhân 4.0 là gì?',
          options: [
            'Chỉ kỹ năng thủ công',
            'Kỹ năng số, tư duy phân tích và kỹ năng mềm',
            'Chỉ tiếng Anh',
            'Không cần kỹ năng gì',
          ],
          correct: 1,
        },
        {
          id: 3,
          question: 'Tự động hóa ảnh hưởng đến thị trường lao động như thế nào?',
          options: [
            'Không ảnh hưởng gì',
            'Tạo ra nhiều việc làm chất lượng cao hơn',
            'Chỉ loại bỏ hết tất cả công việc',
            'Chỉ ảnh hưởng đến nước ngoài',
          ],
          correct: 1,
        },
      ],
    },
    {
      id: 'intermediate',
      title: 'Quiz Nâng cao: Kỹ năng & Thực hành',
      icon: Target,
      questions: [
        {
          id: 1,
          question: 'Làm thế nào để thích ứng với những thay đổi công nghệ?',
          options: [
            'Chờ đợi và xem điều gì xảy ra',
            'Học tập suốt đời và cập nhật kỹ năng liên tục',
            'Từ chối sử dụng công nghệ mới',
            'Chỉ tuân theo những gì quản lý yêu cầu',
          ],
          correct: 1,
        },
        {
          id: 2,
          question: 'Đâu là lợi ích chính của Công nghiệp 4.0 cho công nhân?',
          options: [
            'Làm việc nặng hơn',
            'Thu nhập cao hơn, công việc ít nặng nhọc, cơ hội phát triển',
            'Chỉ có lợi cho chủ doanh nghiệp',
            'Không có lợi ích gì',
          ],
          correct: 1,
        },
        {
          id: 3,
          question: 'Vai trò của AI trong tương lai là gì?',
          options: [
            'Thay thế hoàn toàn con người',
            'Hỗ trợ và tăng năng suất của con người',
            'Chỉ dùng cho các công ty lớn',
            'Không có tác dụng gì',
          ],
          correct: 1,
        },
      ],
    },
  ];

  const games = [
    {
      id: 'skill-match',
      title: 'Ghép kỹ năng phù hợp',
      description: 'Ghép các kỹ năng với các công việc phù hợp trong thời đại Công nghiệp 4.0',
      icon: Gamepad2,
    },
    {
      id: 'tech-timeline',
      title: 'Dòng thời gian công nghệ',
      description: 'Sắp xếp các công nghệ theo thứ tự phát triển từ quá khứ đến hiện tại',
      icon: Gamepad2,
    },
    {
      id: 'challenge-solver',
      title: 'Giải quyết thách thức',
      description: 'Tìm giải pháp phù hợp cho các thách thức của công nhân 4.0',
      icon: Gamepad2,
    },
  ];

  const currentQuiz = quizzes.find((q) => q.id === selectedQuiz);

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleResetQuiz = () => {
    setSelectedQuiz(null);
    setQuizAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!currentQuiz) return 0;
    let correct = 0;
    currentQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) {
        correct++;
      }
    });
    return (correct / currentQuiz.questions.length) * 100;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Trò chơi & Quiz
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kiểm tra kiến thức của bạn và học hỏi thêm qua các trò chơi tương tác
            và câu hỏi trắc nghiệm thú vị.
          </p>
        </div>

        {selectedQuiz && currentQuiz ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">{currentQuiz.title}</h3>
              <button
                onClick={handleResetQuiz}
                className="text-gray-500 hover:text-gray-700 font-semibold"
              >
                ✕
              </button>
            </div>

            {!showResults ? (
              <>
                {currentQuiz.questions.map((question, idx) => (
                  <div key={question.id} className="mb-8 pb-8 border-b border-gray-200 last:border-b-0">
                    <p className="font-bold text-lg text-gray-900 mb-4">
                      {idx + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIdx) => (
                        <label
                          key={optionIdx}
                          className="flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-500 transition-all"
                        >
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={optionIdx}
                            checked={quizAnswers[question.id] === optionIdx}
                            onChange={() => handleAnswerChange(question.id, optionIdx)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitQuiz}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-lg transition-all duration-300 mt-8"
                >
                  Kiểm tra kết quả
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-12 mb-8 border border-green-200">
                  <Award className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-5xl font-bold text-blue-600 mb-2">{calculateScore().toFixed(0)}%</p>
                  <p className="text-xl text-gray-600 mb-4">
                    Bạn trả lời đúng {Object.values(quizAnswers).filter((ans, idx) => ans === currentQuiz.questions[idx]?.correct).length} /{' '}
                    {currentQuiz.questions.length} câu
                  </p>
                  {calculateScore() >= 80 ? (
                    <p className="text-lg text-green-600 font-semibold">Xuất sắc! Bạn hiểu rõ chủ đề này!</p>
                  ) : calculateScore() >= 60 ? (
                    <p className="text-lg text-blue-600 font-semibold">Tốt! Nhưng hãy ôn lại một số phần.</p>
                  ) : (
                    <p className="text-lg text-orange-600 font-semibold">Hãy ôn lại kiến thức trước khi làm lại!</p>
                  )}
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Làm lại
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Trò chơi tương tác</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {games.map((game) => {
                  const Icon = game.icon;
                  return (
                    <div
                      key={game.id}
                      className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-4 rounded-lg shadow-lg mb-4 w-fit group-hover:shadow-xl transition-all">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{game.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{game.description}</p>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition-all">
                        Chơi ngay
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quiz kiểm tra kiến thức</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {quizzes.map((quiz) => {
                  const Icon = quiz.icon;
                  return (
                    <div
                      key={quiz.id}
                      className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => setSelectedQuiz(quiz.id)}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 rounded-lg shadow-lg">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">{quiz.questions.length} câu hỏi</p>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">{quiz.title}</h4>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all">
                        Làm quiz
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
