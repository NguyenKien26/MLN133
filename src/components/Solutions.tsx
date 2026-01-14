import { GraduationCap, Users, Building2, Handshake } from 'lucide-react';

export default function Solutions() {
  const solutions = [
    {
      icon: GraduationCap,
      title: 'Đào tạo và Giáo dục',
      points: [
        'Xây dựng hệ thống đào tạo liên tục, học tập suốt đời',
        'Tích hợp kỹ năng số vào chương trình giáo dục',
        'Phát triển các khóa học trực tuyến, dễ tiếp cận',
        'Hợp tác với doanh nghiệp để đào tạo sát thực tế',
      ],
    },
    {
      icon: Building2,
      title: 'Vai trò Doanh nghiệp',
      points: [
        'Đầu tư vào đào tạo và phát triển nhân viên',
        'Tạo môi trường làm việc thân thiện với công nghệ',
        'Xây dựng văn hóa học hỏi và đổi mới',
        'Hỗ trợ chuyển đổi số cho người lao động',
      ],
    },
    {
      icon: Users,
      title: 'Chính sách Nhà nước',
      points: [
        'Ban hành chính sách hỗ trợ đào tạo nghề nghiệp',
        'Xây dựng hạ tầng công nghệ và kết nối Internet',
        'Tạo mạng lưới an sinh xã hội cho người thất nghiệp',
        'Khuyến khích doanh nghiệp đầu tư vào nguồn nhân lực',
      ],
    },
    {
      icon: Handshake,
      title: 'Hợp tác Đa phương',
      points: [
        'Liên kết giữa nhà trường, doanh nghiệp và chính phủ',
        'Chia sẻ nguồn lực và kinh nghiệm quốc tế',
        'Xây dựng chuẩn mực kỹ năng chung',
        'Tạo nền tảng hợp tác và phát triển bền vững',
      ],
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Giải pháp và Hướng đi
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Để vượt qua thách thức và tận dụng cơ hội, cần sự phối hợp của nhiều bên
            với các giải pháp toàn diện và bền vững.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-xl shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 ml-4">
                    {solution.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {solution.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="bg-orange-500 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Hành động ngay hôm nay
            </h3>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              Tương lai thuộc về những người chủ động thích ứng. Đừng chờ đợi,
              hãy bắt đầu học hỏi và phát triển kỹ năng mới ngay bây giờ!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <span className="bg-white/20 px-4 py-2 rounded-full border border-white/30">
                Học tập liên tục
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full border border-white/30">
                Thích ứng nhanh
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full border border-white/30">
                Tư duy đổi mới
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full border border-white/30">
                Hợp tác hiệu quả
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
