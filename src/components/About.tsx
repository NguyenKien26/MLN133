import {
  Brain,
  Cpu,
  Globe,
  Zap,
  Factory,
  Laptop,
  Truck,
  Leaf,
  Stethoscope,
} from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'Trí tuệ Nhân tạo',
      description: 'AI hỗ trợ con người trong sản xuất, phân tích và ra quyết định',
    },
    {
      icon: Cpu,
      title: 'Tự động hóa',
      description: 'Robot và hệ thống tự động thay thế các công việc lặp lại',
    },
    {
      icon: Globe,
      title: 'Kết nối số',
      description: 'Dữ liệu, máy móc và con người được kết nối liên tục',
    },
    {
      icon: Zap,
      title: 'Linh hoạt & Thích nghi',
      description: 'Công nhân cần học tập và cập nhật kỹ năng liên tục',
    },
  ];

  const industries = [
    {
      name: 'Sản xuất thông minh',
      icon: Factory,
      image:
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789',
    },
    {
      name: 'Công nghệ thông tin',
      icon: Laptop,
      image:
        'https://e-hou.edu.vn/wp-content/uploads/2024/11/gioi-thieu-ve-linh-vuc-cong-nghe-thong-tin.jpg',
    },
    {
      name: 'Logistics 4.0',
      icon: Truck,
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
    },
    {
      name: 'Nông nghiệp công nghệ cao',
      icon: Leaf,
      image:
        'https://t-tech.vn/data/uploads/2025/09/nong-nghiep-cong-nghe-cao-1.jpeg',
    },
    {
      name: 'Y tế số hóa',
      icon: Stethoscope,
      image:
        'https://benhvienmatninhbinh.com.vn/public/userfiles/chuyendoiso/cds-yte.jpg',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Công nhân 4.0 là gì?
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Công nhân 4.0 là người lao động làm việc trong các ngành nghề chịu tác động
            trực tiếp của Cách mạng Công nghiệp 4.0, nơi con người kết hợp với
            máy móc, dữ liệu và công nghệ thông minh.
          </p>
        </div>

        {/* Industries with Images */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Ngành nghề tiêu biểu của Công nhân 4.0
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative h-56 rounded-2xl overflow-hidden shadow-lg group"
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
                    <div className="bg-blue-600 p-3 rounded-lg mb-3 shadow-lg">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-lg leading-snug">
                      {item.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Cards */}
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
