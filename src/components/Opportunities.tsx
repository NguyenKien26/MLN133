import { Rocket, TrendingUp, Lightbulb, Star, Target, Award } from 'lucide-react';

export default function Opportunities() {
  const opportunities = [
    {
      icon: Rocket,
      title: 'Việc làm chất lượng cao',
      description: 'Tạo ra nhiều công việc mới với thu nhập cao hơn, đòi hỏi kỹ năng chuyên môn và sáng tạo thay vì lao động thủ công đơn giản.',
      benefit: 'Thu nhập tăng 30-50%',
    },
    {
      icon: TrendingUp,
      title: 'Tăng năng suất lao động',
      description: 'Công nghệ giúp người lao động làm việc hiệu quả hơn, giảm công việc nặng nhọc, tập trung vào giá trị cao hơn.',
      benefit: 'Năng suất tăng x2-x3',
    },
    {
      icon: Lightbulb,
      title: 'Phát triển kỹ năng mới',
      description: 'Cơ hội học hỏi và phát triển các kỹ năng số, tư duy phản biện, sáng tạo và giải quyết vấn đề phức tạp.',
      benefit: 'Kỹ năng đa dạng',
    },
    {
      icon: Star,
      title: 'Môi trường làm việc linh hoạt',
      description: 'Làm việc từ xa, thời gian linh hoạt, cân bằng công việc và cuộc sống tốt hơn nhờ công nghệ số.',
      benefit: 'Work-life balance',
    },
    {
      icon: Target,
      title: 'Cơ hội khởi nghiệp',
      description: 'Chi phí khởi nghiệp giảm nhờ công nghệ. Nhiều cơ hội kinh doanh mới xuất hiện trong các lĩnh vực công nghệ.',
      benefit: 'Startup dễ dàng hơn',
    },
    {
      icon: Award,
      title: 'Nâng cao giá trị bản thân',
      description: 'Người lao động có thể nâng cao giá trị, tăng khả năng cạnh tranh và phát triển sự nghiệp bền vững.',
      benefit: 'Giá trị tăng cao',
    },
  ];

  return (
    <section id="opportunities" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Những cơ hội
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Bên cạnh thách thức, Công nghiệp 4.0 mở ra vô vàn cơ hội cho những ai
            sẵn sàng thích ứng và phát triển.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 border border-white/20 shadow-xl"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-orange-500 p-3 rounded-lg shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-blue-100 mb-4 leading-relaxed">
                  {opportunity.description}
                </p>
                <div className="inline-block bg-orange-500/20 border border-orange-400 rounded-full px-4 py-1 text-sm font-semibold text-orange-300">
                  {opportunity.benefit}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
