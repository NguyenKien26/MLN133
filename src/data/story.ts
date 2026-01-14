export interface StoryScene {
  id: number;
  title: string;
  content: string;
  character: string;
  characterRole: string;
  location: string;
  backgroundImage?: string;
  characterImage?: string;
  dialogue: string;
  nextScene?: string;
}

export const storyScenes: StoryScene[] = [
  {
    id: 1,
    title: "Khởi đầu hành trình",
    content: "Ngày xửa ngày xưa, có một chàng thanh niên tên là Minh đang học đại học ngành kỹ thuật. Minh luôn tò mò về tương lai của ngành công nghiệp và nghe nhiều về khái niệm 'Công nghiệp 4.0'. Quyết tâm tìm hiểu, Minh bắt đầu hành trình khám phá thế giới công nghệ số hóa và tự động hóa.",
    character: "Minh",
    characterRole: "Sinh viên ngành kỹ thuật",
    location: "Phòng học đại học",
    dialogue: "Tôi phải tìm hiểu Công nghiệp 4.0 là gì và nó ảnh hưởng thế nào đến tương lai của mình!",
    nextScene: "Gặp chuyên gia AI"
  },
  {
    id: 2,
    title: "Gặp chuyên gia AI",
    content: "Minh gặp một chuyên gia về trí tuệ nhân tạo tại một hội thảo công nghệ. Chuyên gia giải thích: 'AI không phải là để thay thế con người mà là để hỗ trợ con người làm việc hiệu quả hơn. Trong Công nghiệp 4.0, AI giúp phân tích dữ liệu lớn, dự đoán sự cố và tối ưu hóa quy trình sản xuất.'",
    character: "TS. Nguyễn",
    characterRole: "Chuyên gia AI",
    location: "Hội thảo công nghệ",
    dialogue: "AI là công cụ, con người mới là người sử dụng và điều khiển công cụ đó!",
    nextScene: "Nhà máy thông minh"
  },
  {
    id: 3,
    title: "Khám phá nhà máy thông minh",
    content: "Minh tham quan một nhà máy ứng dụng Công nghiệp 4.0. Ông giám đốc nhà máy cho biết: 'Chúng tôi sử dụng IoT để kết nối tất cả thiết bị, Big Data để phân tích hiệu suất, và robot để thực hiện các công việc nguy hiểm. Kết quả là năng suất tăng 40% và chất lượng sản phẩm được cải thiện đáng kể.'",
    character: "Ông Minh",
    characterRole: "Giám đốc nhà máy",
    location: "Nhà máy sản xuất",
    dialogue: "Công nghiệp 4.0 không chỉ là máy móc, mà là cách chúng ta suy nghĩ và làm việc!",
    nextScene: "Thách thức chuyển đổi"
  },
  {
    id: 4,
    title: "Thách thức của chuyển đổi số",
    content: "Trong một buổi thảo luận với các kỹ sư, Minh được nghe về những khó khăn khi chuyển đổi sang Công nghiệp 4.0: 'Chúng ta cần đào tạo lại nhân lực, đầu tư công nghệ mới, và thay đổi văn hóa doanh nghiệp. Nhưng lợi ích thu được sẽ lớn hơn nhiều so với chi phí bỏ ra.'",
    character: "Chị Lan",
    characterRole: "Kỹ sư chuyển đổi số",
    location: "Phòng họp công ty",
    dialogue: "Chuyển đổi số không dễ dàng, nhưng không chuyển đổi thì chúng ta sẽ bị bỏ lại phía sau!",
    nextScene: "Tương lai ngành nghề"
  },
  {
    id: 5,
    title: "Tương lai của các ngành nghề",
    content: "Minh gặp một nhà tuyển dụng và hỏi về xu hướng việc làm tương lai. 'Công việc thủ công sẽ giảm, nhưng các vị trí đòi hỏi kỹ năng số, tư duy sáng tạo và khả năng thích ứng sẽ tăng lên. AI sẽ thay thế những công việc lặp lại, nhưng tạo ra nhiều cơ hội mới trong lĩnh vực công nghệ.'",
    character: "Anh Tuấn",
    characterRole: "Nhà tuyển dụng",
    location: "Trung tâm hội chợ việc làm",
    dialogue: "Học tập suốt đời là chìa khóa để thành công trong kỷ nguyên số!",
    nextScene: "Kết luận hành trình"
  },
  {
    id: 6,
    title: "Kết luận hành trình",
    content: "Sau khi trải qua nhiều cuộc gặp gỡ và trải nghiệm, Minh đã hiểu rõ Công nghiệp 4.0 không chỉ là công nghệ, mà là một cuộc cách mạng toàn diện trong cách chúng ta sống, làm việc và tương tác. Minh nhận ra rằng để thành công trong kỷ nguyên mới này, cần phải không ngừng học hỏi, thích ứng và đổi mới.",
    character: "Minh",
    characterRole: "Người đã trưởng thành",
    location: "Công viên thành phố",
    dialogue: "Công nghiệp 4.0 là cơ hội để chúng ta phát triển, nhưng cũng là thách thức để thay đổi bản thân!",
    nextScene: "Bắt đầu thử thách"
  }
];