import { AlertCircle, TrendingDown, BookOpen, Clock, Users, Briefcase } from 'lucide-react';

export default function Challenges() {
  const challenges = [
    {
      icon: TrendingDown,
      title: 'Mất việc làm do tự động hóa',
      description: 'Nhiều công việc truyền thống đang bị thay thế bởi máy móc và AI. Người lao động phải đối mặt với nguy cơ thất nghiệp nếu không cập nhật kỹ năng.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: BookOpen,
      title: 'Khoảng cách kỹ năng',
      description: 'Sự chênh lệch lớn giữa kỹ năng hiện tại và kỹ năng cần thiết trong môi trường công nghiệp 4.0. Cần đào tạo lại và nâng cao trình độ.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Clock,
      title: 'Áp lực thích ứng nhanh',
      description: 'Công nghệ thay đổi liên tục, đòi hỏi người lao động phải học hỏi không ngừng và thích ứng với tốc độ chóng mặt.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Users,
      title: 'Bất bình đẳng xã hội',
      description: 'Chênh lệch giữa những người tiếp cận được công nghệ và những người không thể. Tạo ra khoảng cách lớn trong xã hội.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Briefcase,
      title: 'Thay đổi bản chất công việc',
      description: 'Công việc trở nên phức tạp hơn, yêu cầu kỹ năng cao hơn. Nhiều vai trò mới xuất hiện cần đào tạo chuyên sâu.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: AlertCircle,
      title: 'Thiếu nguồn lực đào tạo',
      description: 'Không phải doanh nghiệp nào cũng có nguồn lực để đào tạo lại nhân viên. Đây là thách thức lớn cho các công ty vừa và nhỏ.',
      color: 'from-teal-500 to-teal-600',
    },
  ];

  return (
    <section id="challenges" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Những thách thức
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cuộc Cách mạng Công nghiệp 4.0 mang đến nhiều thách thức nghiêm trọng
            cho người lao động và xã hội.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-r ${challenge.color} p-6 text-white`}>
                  <Icon className="w-12 h-12 mb-3" />
                  <h3 className="text-xl font-bold">
                    {challenge.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
