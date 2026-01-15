export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  keyword?: string; // Từ khóa để đoán (9-10 chữ cái)
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Công nghiệp 4.0 kết hợp những công nghệ chính nào?",
    options: [
      "Chỉ máy tính và internet",
      "AI, IoT, Big Data, Robot và công nghệ số",
      "Chỉ điện thoại thông minh",
      "Máy in và máy fax"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 4.0 là sự kết hợp của AI (trí tuệ nhân tạo), IoT (Internet vạn vật), Big Data, Robot và các công nghệ số khác.",
    keyword: "MACHINE" // 10 chữ cái
  },
  {
    id: 2,
    question: "IoT trong Công nghiệp 4.0 có nghĩa là gì?",
    options: [
      "Internet of Things - kết nối các thiết bị",
      "Internet of Technology - công nghệ internet",
      "Internet of Tools - công cụ internet",
      "Internet of Time - thời gian internet"
    ],
    correctAnswer: 0,
    explanation: "IoT (Internet of Things) là mạng lưới các thiết bị vật lý được kết nối internet, cho phép thu thập và trao đổi dữ liệu.",
    keyword: "CHAINED" // 10 chữ cái
  },
  {
    id: 3,
    question: "Công nghệ nào giúp dự đoán sự cố và bảo trì thiết bị trước khi hỏng?",
    options: [
      "Predictive Maintenance",
      "Reactive Maintenance",
      "Preventive Maintenance",
      "Corrective Maintenance"
    ],
    correctAnswer: 0,
    explanation: "Predictive Maintenance sử dụng AI và dữ liệu cảm biến để dự đoán khi nào thiết bị có thể hỏng, cho phép bảo trì chủ động.",
    keyword: "AHEAD" // 10 chữ cái
  },
  {
    id: 3,
    question: "Big Data giúp ích gì trong sản xuất?",
    options: [
      "Chỉ lưu trữ nhiều dữ liệu",
      "Phân tích xu hướng, dự đoán sự cố và tối ưu hóa quy trình",
      "Vẽ biểu đồ đẹp",
      "Gửi email tự động"
    ],
    correctAnswer: 1,
    explanation: "Big Data giúp phân tích dữ liệu lớn để dự đoán sự cố, tối ưu hóa hiệu suất và đưa ra quyết định thông minh.",
    keyword: "IDEA" // 10 chữ cái
  },
  {
    id: 4,
    question: "Robot trong Công nghiệp 4.0 chủ yếu dùng để làm gì?",
    options: [
      "Thay thế hoàn toàn con người",
      "Hỗ trợ con người trong các công việc nguy hiểm, lặp lại hoặc đòi hỏi độ chính xác cao",
      "Chỉ để giải trí",
      "Thay thế tất cả máy móc cũ"
    ],
    correctAnswer: 1,
    explanation: "Robot trong Công nghiệp 4.0 là công cụ hỗ trợ con người, đặc biệt trong các công việc đòi hỏi độ chính xác cao hoặc môi trường nguy hiểm.",
    keyword: "HAND"
  },
  {
    id: 5,
    question: "Công nghiệp 4.0 ảnh hưởng như thế nào đến thị trường lao động?",
    options: [
      "Loại bỏ hoàn toàn công việc thủ công",
      "Tạo ra nhiều việc làm mới trong lĩnh vực công nghệ và giảm công việc lặp lại",
      "Không ảnh hưởng gì",
      "Chỉ tăng lương cho mọi người"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 4.0 tạo ra nhu cầu về kỹ năng mới như lập trình, phân tích dữ liệu, đồng thời giảm nhu cầu về công việc lặp lại.",
    keyword: "IDEAL"
  },
  {
    id: 6,
    question: "Kỹ năng nào quan trọng nhất cho người lao động trong kỷ nguyên số?",
    options: [
      "Chỉ biết sử dụng máy tính cơ bản",
      "Học tập suốt đời và khả năng thích ứng với công nghệ mới",
      "Nhớ nhiều công thức toán",
      "Gõ phím nhanh"
    ],
    correctAnswer: 1,
    explanation: "Trong kỷ nguyên số, khả năng học tập suốt đời và thích ứng với thay đổi là quan trọng nhất vì công nghệ phát triển rất nhanh.",
    keyword: "LEAD"
  },
  {
    id: 7,
    question: "Digital Twin là gì?",
    options: [
      "Một loại robot mới",
      "Bản sao kỹ thuật số của một vật thể hoặc hệ thống thực tế",
      "Máy tính bảng",
      "Ứng dụng di động"
    ],
    correctAnswer: 1,
    explanation: "Digital Twin là mô hình kỹ thuật số mô phỏng chính xác một vật thể, hệ thống hoặc quy trình trong thế giới thực.",
    keyword: "CHIEF"
  },
  {
    id: 8,
    question: "Công nghệ nào giúp các thiết bị 'giao tiếp' với nhau?",
    options: [
      "WiFi",
      "IoT và mạng lưới kết nối",
      "Bluetooth",
      "USB"
    ],
    correctAnswer: 1,
    explanation: "IoT và các mạng lưới kết nối cho phép các thiết bị trao đổi dữ liệu với nhau một cách tự động.",
    keyword: "ONLINE"
  },
  {
    id: 9,
    question: "Lợi ích chính của Công nghiệp 4.0 đối với doanh nghiệp là gì?",
    options: [
      "Chi phí thấp hơn",
      "Năng suất cao hơn, chất lượng tốt hơn, thời gian đưa ra thị trường ngắn hơn",
      "Chỉ tiết kiệm điện",
      "Tăng số lượng nhân viên"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 4.0 mang lại hiệu quả toàn diện: tăng năng suất, cải thiện chất lượng và rút ngắn thời gian sản xuất."
  },
  {
    id: 10,
    question: "AI có thể giúp gì trong quản lý chuỗi cung ứng?",
    options: [
      "Vẽ bản đồ logistics",
      "Dự đoán nhu cầu, tối ưu hóa kho bãi và giảm lãng phí",
      "Chỉ tính toán đường đi",
      "Đếm số lượng hàng hóa"
    ],
    correctAnswer: 1,
    explanation: "AI có thể phân tích xu hướng để dự đoán nhu cầu, tối ưu hóa vị trí kho bãi và giảm thiểu lãng phí trong chuỗi cung ứng."
  },
  {
    id: 11,
    question: "Công nghệ nào giúp bảo trì thiết bị trước khi hỏng?",
    options: [
      "Predictive Maintenance sử dụng AI và cảm biến",
      "Kiểm tra bằng mắt thường",
      "Thay thế định kỳ theo lịch",
      "Sửa chữa khi đã hỏng"
    ],
    correctAnswer: 0,
    explanation: "Predictive Maintenance sử dụng AI và dữ liệu cảm biến để dự đoán khi nào thiết bị có thể hỏng, cho phép bảo trì chủ động."
  },
  {
    id: 12,
    question: "Công nghiệp 4.0 ảnh hưởng đến môi trường như thế nào?",
    options: [
      "Tăng ô nhiễm",
      "Giảm lãng phí, tối ưu hóa tài nguyên và giảm phát thải",
      "Không ảnh hưởng",
      "Tăng tiêu thụ năng lượng"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 4.0 giúp tối ưu hóa quy trình sản xuất, giảm lãng phí và sử dụng tài nguyên hiệu quả hơn, góp phần bảo vệ môi trường."
  },
  {
    id: 13,
    question: "Khái niệm 'Smart Factory' nghĩa là gì?",
    options: [
      "Nhà máy chỉ có máy thông minh",
      "Nhà máy kết nối kỹ thuật số với khả năng tự tối ưu hóa",
      "Nhà máy chỉ có đèn LED",
      "Nhà máy chỉ sản xuất điện thoại"
    ],
    correctAnswer: 1,
    explanation: "Smart Factory là nhà máy thông minh có thể tự thu thập dữ liệu, phân tích và tối ưu hóa quy trình sản xuất."
  },
  {
    id: 14,
    question: "Công nghệ nào giúp con người và máy móc hợp tác?",
    options: [
      "Cobots (Collaborative Robots)",
      "Máy móc thay thế hoàn toàn",
      "Chỉ máy tính",
      "Điện thoại"
    ],
    correctAnswer: 0,
    explanation: "Cobots là robot hợp tác được thiết kế để làm việc cùng với con người một cách an toàn và hiệu quả."
  },
  {
    id: 15,
    question: "Công nghiệp 4.0 đòi hỏi thay đổi gì ở cấp độ doanh nghiệp?",
    options: [
      "Chỉ mua máy móc mới",
      "Thay đổi văn hóa, đào tạo nhân lực và chuyển đổi quy trình",
      "Chỉ thay đổi logo",
      "Chỉ tăng lương"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 4.0 đòi hỏi thay đổi toàn diện từ văn hóa doanh nghiệp, đào tạo nhân lực đến quy trình làm việc."
  },
  {
    id: 16,
    question: "Xu hướng tương lai của Công nghiệp 4.0 là gì?",
    options: [
      "Dừng phát triển",
      "Tích hợp với Công nghiệp 5.0, tập trung vào con người và tính bền vững",
      "Quay trở lại công nghiệp truyền thống",
      "Chỉ tập trung vào lợi nhuận"
    ],
    correctAnswer: 1,
    explanation: "Công nghiệp 5.0 sẽ tập trung vào sự hợp tác giữa con người và công nghệ, chú trọng đến tính bền vững và giá trị con người."
  }
];