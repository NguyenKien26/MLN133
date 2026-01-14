import { Brain, Cpu, Globe, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'Trí tuệ Nhân tạo',
      description: 'AI và Machine Learning đang thay đổi cách thức làm việc',
    },
    {
      icon: Cpu,
      title: 'Tự động hóa',
      description: 'Robot và hệ thống tự động đảm nhận nhiều công việc',
    },
    {
      icon: Globe,
      title: 'Kết nối toàn cầu',
      description: 'IoT và Internet kết nối mọi thứ với nhau',
    },
    {
      icon: Zap,
      title: 'Tốc độ cao',
      description: 'Mọi thứ diễn ra nhanh hơn bao giờ hết',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Công nhân 4.0 là gì?
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Công nhân 4.0 là thế hệ lao động mới, làm việc trong môi trường được định hình bởi
            các công nghệ tiên tiến như AI, IoT, Big Data, và Robotics. Họ cần có kỹ năng số,
            khả năng thích ứng và học hỏi liên tục.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
              >
                <div className="bg-blue-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
