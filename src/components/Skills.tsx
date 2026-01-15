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
      </div>
    </section>
  );
}
