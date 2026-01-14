import { Code, Brain, Users, Zap, BarChart3, Shield } from 'lucide-react';

export default function Skills() {
  const skills = [
    {
      icon: Code,
      title: 'Kỹ năng số',
      description: 'Sử dụng công cụ phần mềm, lập trình cơ bản, ứng dụng di động',
      level: 'Nền tảng',
    },
    {
      icon: Brain,
      title: 'Tư duy phân tích',
      description: 'Giải quyết vấn đề phức tạp, xử lý dữ liệu, ra quyết định dựa trên dữ liệu',
      level: 'Nâng cao',
    },
    {
      icon: Users,
      title: 'Kỹ năng mềm',
      description: 'Làm việc nhóm, giao tiếp hiệu quả, lãnh đạo và quản lý',
      level: 'Quan trọng',
    },
    {
      icon: Zap,
      title: 'Sáng tạo và đổi mới',
      description: 'Tư duy sáng tạo, đề xuất giải pháp mới, tinh thần khởi nghiệp',
      level: 'Cần thiết',
    },
    {
      icon: BarChart3,
      title: 'Phân tích dữ liệu',
      description: 'Thu thập, xử lý và diễn giải dữ liệu, tìm kiếm xu hướng',
      level: 'Chuyên sâu',
    },
    {
      icon: Shield,
      title: 'An toàn thông tin',
      description: 'Bảo vệ dữ liệu cá nhân, hiểu rủi ro mạng, tuân thủ quy định',
      level: 'Bắt buộc',
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Kỹ năng cần thiết
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Để thành công trong thế giới Công nghiệp 4.0, công nhân cần phát triển
            một bộ kỹ năng đa dạng và liên tục cập nhật.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:border-blue-600"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-lg shadow-lg group-hover:shadow-xl transition-all">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    {skill.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 sm:p-12 border border-blue-200">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Hành trình học tập
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                1
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Nền tảng</h4>
              <p className="text-gray-600 text-sm">Học kỹ năng số cơ bản và máy tính</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                2
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Chuyên sâu</h4>
              <p className="text-gray-600 text-sm">Phát triển kỹ năng chuyên ngành</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                3
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Thực hành</h4>
              <p className="text-gray-600 text-sm">Áp dụng vào các dự án thực tế</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                4
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Nâng cao</h4>
              <p className="text-gray-600 text-sm">Học tập suốt đời và thích ứng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
