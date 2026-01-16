import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Loader, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `
Bạn là trợ lý AI chuyên về "Công nhân 4.0: Thách thức và Cơ hội".

# PHẠM VI TRẢ LỜI
Chỉ trả lời các nội dung liên quan đến:
- Công nghiệp 4.0: AI, tự động hóa, IoT, Big Data
- Khái niệm Công nhân 4.0: người lao động làm việc trong môi trường số hóa, học tập suốt đời
- Thách thức: mất việc do tự động hóa, khoảng cách kỹ năng, bất bình đẳng
- Cơ hội: việc làm mới, tăng thu nhập (30–50%), tăng năng suất (x2–x3)
- Kỹ năng cần thiết: kỹ năng số, tư duy phân tích, kỹ năng mềm
- Giải pháp: đào tạo lại, chính sách nhà nước, hợp tác doanh nghiệp – trường học

# SỐ LIỆU THAM KHẢO
- 40% tăng trưởng việc làm công nghệ cao (WEF)
- 1.2 tỷ người cần đào tạo lại kỹ năng (WEF 2023)
- 50% công việc sẽ thay đổi đáng kể
- 82% doanh nghiệp thiếu nhân lực có kỹ năng số (McKinsey)

# QUY TẮC
- Trả lời ngắn gọn (2–4 câu), dễ hiểu
- Ưu tiên góc nhìn người lao động
- Luôn dẫn nguồn số liệu (WEF, ILO, McKinsey)
- Nếu câu hỏi không liên quan → từ chối lịch sự và gợi ý câu hỏi phù hợp
- Giọng điệu: thân thiện, chuyên nghiệp, khuyến khích
`;

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Lấy API key từ env
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Thêm welcome message khi mở chat lần đầu
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content:
          "👋 Xin chào! Tôi có thể giúp bạn tìm hiểu về:\n\n• Công nghiệp 4.0 là gì?\n• Thách thức của công nhân hiện đại\n• Cơ hội nghề nghiệp mới\n• Kỹ năng cần thiết\n• Giải pháp đào tạo\n\nBạn muốn biết điều gì?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  if (!apiKey) {
    return (
      <div className="fixed bottom-6 right-6 z-40 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-xs">
        <AlertCircle className="w-5 h-5 inline mr-2" />
        <span className="text-sm">
          Thiếu API Key. Vui lòng cấu hình VITE_GEMINI_API_KEY
        </span>
      </div>
    );
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    setError(null);

    try {
      // ✅ SỬ DỤNG MODEL MỚI - gemini-2.0-flash-exp
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              // ✅ Chỉ gửi 5 message gần nhất để tiết kiệm token
              ...messages.slice(-5).map((msg) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.content }],
              })),
              { role: "user", parts: [{ text: userMessage.content }] },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 500, // Giới hạn độ dài response
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        // ✅ Xử lý các loại lỗi cụ thể
        if (response.status === 429) {
          throw new Error("Quá nhiều yêu cầu. Vui lòng đợi 1 phút.");
        } else if (response.status === 403) {
          throw new Error("API Key không hợp lệ hoặc hết hạn.");
        } else {
          throw new Error(errorData.error?.message || `Lỗi ${response.status}`);
        }
      }

      const data = await response.json();

      // ✅ Kiểm tra safety ratings
      if (data.candidates?.[0]?.finishReason === "SAFETY") {
        throw new Error(
          "Nội dung bị chặn bởi bộ lọc an toàn. Vui lòng hỏi câu khác."
        );
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Xin lỗi, không thể xử lý câu hỏi. Vui lòng thử lại.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Lỗi không xác định";
      setError(errorMsg);

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: `⚠️ ${errorMsg}\n\nVui lòng thử lại hoặc hỏi câu khác.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Thêm nút xóa lịch sử chat
  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        title="Mở ChatBot Công nhân 4.0"
        aria-label="Mở chatbot"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        {/* Badge số tin nhắn mới (có thể thêm sau) */}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg flex items-center gap-2">
                ChatBot Công nhân 4.0
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">
                Hỏi về thách thức & cơ hội • Powered by Gemini 2.5
              </p>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 1 && (
                <button
                  onClick={clearChat}
                  className="hover:bg-blue-800 p-1.5 rounded transition-colors text-xs"
                  title="Xóa lịch sử chat"
                >
                  Xóa
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-800 p-1.5 rounded transition-colors"
                title="Đóng chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border-b border-red-200 p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">{error}</p>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </p>
                  <span className="text-[10px] opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 px-4 py-2.5 rounded-2xl rounded-bl-none border border-gray-200 flex items-center gap-2 shadow-sm">
                  <Loader className="animate-spin w-4 h-4 text-blue-600" />
                  <span className="text-sm">Đang suy nghĩ...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions - Câu hỏi gợi ý */}
          {messages.length === 1 && (
            <div className="border-t bg-white p-3">
              <p className="text-xs text-gray-500 mb-2">💡 Câu hỏi gợi ý:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Thách thức của công nhân hiện nay?",
                  "Kỹ năng nào cần học?",
                  "Cơ hội việc làm mới?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInputValue(q)}
                    className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t bg-white p-3">
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu hỏi về Công nhân 4.0..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm hover:shadow"
                title="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Chatbot có thể mắc lỗi. Kiểm tra thông tin quan trọng.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
