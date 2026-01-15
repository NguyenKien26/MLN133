export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  keyword?: string; // Từ khóa (tiếng Anh để xử lý)
  keywordVi?: string; // Từ khóa tiếng Việt để người dùng đoán
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Đây là trạng thái mà dữ liệu, máy móc và con người luôn duy trì tương tác không ngắt quãng trong môi trường 4.0?",
    options: [
      "Kết nối số",
      "Mạng lưới số",
      "Chuyển đổi số",
      "Nền tảng số"
    ],
    correctAnswer: 0,
    explanation: "Kết nối số là trạng thái mà mọi thành phần trong hệ thống luôn tương tác liên tục qua mạng Internet, tạo nền tảng cho Công nghiệp 4.0.",
    keyword: "KETNOIS",
    keywordVi: "Kết nối số"
  },
  {
    id: 2,
    question: "Hệ thống nào sử dụng Robot và phần mềm để thay thế con người thực hiện các công việc có tính chất lặp đi lặp lại?",
    options: [
      "Số hóa",
      "Tự động hóa",
      "Cơ khí hóa",
      "Điện khí hóa"
    ],
    correctAnswer: 1,
    explanation: "Tự động hóa là quá trình sử dụng robot và phần mềm để tự động thực hiện các công việc lặp lại, giúp tăng năng suất và giảm sai sót.",
    keyword: "TUDONGHOA",
    keywordVi: "Tự động hóa"
  },
  {
    id: 3,
    question: "Nguy cơ lớn nhất mà người lao động truyền thống phải đối mặt khi không kịp thời cập nhật kỹ năng mới là gì?",
    options: [
      "Giảm lương",
      "Thất nghiệp",
      "Chuyển công tác",
      "Làm thêm giờ"
    ],
    correctAnswer: 1,
    explanation: "Thất nghiệp là nguy cơ lớn nhất khi người lao động không cập nhật kỹ năng mới, vì công nghệ thay thế các công việc thủ công và lặp lại.",
    keyword: "THATNGHIEP",
    keywordVi: "Thất nghiệp"
  },
  {
    id: 4,
    question: "Thuật ngữ chỉ sự chênh lệch giữa trình độ hiện có của công nhân và yêu cầu khắt khe của công nghệ hiện đại?",
    options: [
      "Rào cản số",
      "Khoảng cách kỹ năng",
      "Thiếu hụt nguồn lực",
      "Lỗ hổng đào tạo"
    ],
    correctAnswer: 1,
    explanation: "Khoảng cách kỹ năng là khoảng cách giữa kỹ năng hiện có và kỹ năng cần thiết, đòi hỏi người lao động phải học tập và nâng cao trình độ liên tục.",
    keyword: "KYNANGH",
    keywordVi: "Khoảng cách kỹ năng"
  },
  {
    id: 5,
    question: "Đây là nhóm kỹ năng 'bắt buộc' để người lao động bảo vệ dữ liệu cá nhân và nhận diện rủi ro trên không gian mạng?",
    options: [
      "An ninh mạng",
      "Bảo mật dữ liệu",
      "An toàn thông tin",
      "Phòng chống virus"
    ],
    correctAnswer: 2,
    explanation: "An toàn thông tin là kỹ năng bắt buộc giúp người lao động bảo vệ dữ liệu cá nhân và nhận diện các rủi ro an ninh mạng trong môi trường số.",
    keyword: "ANTOATIN",
    keywordVi: "An toàn thông tin"
  },
  {
    id: 6,
    question: "Một lợi thế lớn giúp người lao động 4.0 có thể làm việc từ xa và điều chỉnh thời gian cá nhân một cách khoa học?",
    options: [
      "Công việc từ xa",
      "Cân bằng công việc",
      "Thời gian linh hoạt",
      "Du mục kỹ thuật số"
    ],
    correctAnswer: 1,
    explanation: "Cân bằng công việc là khả năng cân bằng giữa công việc và cuộc sống cá nhân, một lợi thế lớn của kỷ nguyên số nhờ công nghệ hỗ trợ.",
    keyword: "CANBANG",
    keywordVi: "Cân bằng công việc"
  },
  {
    id: 7,
    question: "Để tồn tại trong môi trường công nghệ thay đổi chóng mặt, người công nhân cần duy trì tinh thần học tập như thế nào?",
    options: [
      "Học tập định kỳ",
      "Học tập suốt đời",
      "Học khi cần",
      "Học theo yêu cầu"
    ],
    correctAnswer: 1,
    explanation: "Học tập suốt đời là tinh thần học không ngừng nghỉ, cần thiết để không bị đào thải trong môi trường công nghệ thay đổi liên tục.",
    keyword: "HOCTAPDOI",
    keywordVi: "Học tập suốt đời"
  },
  {
    id: 8,
    question: "Yếu tố giúp người lao động thoát khỏi các công việc thủ công đơn giản để tập trung vào những giá trị mới và độc đáo?",
    options: [
      "Tự động hóa",
      "Sáng tạo đổi mới",
      "Số hóa",
      "Tối ưu hóa"
    ],
    correctAnswer: 1,
    explanation: "Sáng tạo đổi mới giúp người lao động tập trung vào việc tạo ra giá trị cao hơn, thay vì các công việc tay chân nặng nhọc đã được tự động hóa.",
    keyword: "DOIMOI",
    keywordVi: "Sáng tạo đổi mới"
  },
  {
    id: 9,
    question: "Mô hình liên kết chiến lược giữa Nhà trường - Doanh nghiệp - Nhà nước để đào tạo nguồn nhân lực sát thực tế gọi là gì?",
    options: [
      "Hợp tác liên kết",
      "Hợp tác đa phương",
      "Liên minh chiến lược",
      "Đối tác ba bên"
    ],
    correctAnswer: 1,
    explanation: "Hợp tác đa phương là mô hình kết nối giữa Nhà trường - Doanh nghiệp - Nhà nước để xây dựng nguồn nhân lực chất lượng cao sát với thực tế.",
    keyword: "HOPTACDAP",
    keywordVi: "Hợp tác đa phương"
  },
  {
    id: 10,
    question: "Công nghệ then chốt đóng vai trò hỗ trợ con người trong việc phân tích dữ liệu và đưa ra các quyết định sản xuất chính xác?",
    options: [
      "Máy học",
      "Trí tuệ nhân tạo",
      "Dữ liệu lớn",
      "Phân tích dữ liệu"
    ],
    correctAnswer: 1,
    explanation: "Trí tuệ nhân tạo là công nghệ then chốt hỗ trợ con người phân tích dữ liệu khổng lồ và đưa ra quyết định chính xác trong sản xuất.",
    keyword: "TRITUENHAN",
    keywordVi: "Trí tuệ nhân tạo"
  },
  {
    id: 11,
    question: "Đây là lực lượng lao động kết hợp giữa con người, dữ liệu và công nghệ thông minh trong kỷ nguyên mới?",
    options: [
      "Công nhân số",
      "Công nhân 4.0",
      "Công nhân thông minh",
      "Công nhân công nghệ"
    ],
    correctAnswer: 1,
    explanation: "Công nhân 4.0 là lực lượng lao động kết hợp con người, dữ liệu và công nghệ thông minh, thích ứng với yêu cầu của Công nghiệp 4.0.",
    keyword: "CONGNHAN4",
    keywordVi: "Công nhân 4.0"
  },
  {
    id: 12,
    question: "Năng lực cốt lõi giúp người lao động chủ động kiểm soát và ứng dụng công nghệ vào công việc thay vì bị công nghệ chi phối?",
    options: [
      "Sử dụng công nghệ",
      "Làm chủ công nghệ",
      "Hiểu công nghệ",
      "Quản lý công nghệ"
    ],
    correctAnswer: 1,
    explanation: "Làm chủ công nghệ là năng lực cốt lõi giúp người lao động chủ động ứng dụng và kiểm soát công nghệ, thay vì bị nó chi phối.",
    keyword: "LAMCHUC",
    keywordVi: "Làm chủ công nghệ"
  }
];