import { TrendingUp, Users, Briefcase, Globe } from 'lucide-react';

export default function Impact() {
  const impacts = [
    {
      icon: TrendingUp,
      number: '40%',
      title: 'Tăng trưởng việc làm',
      description: 'Các công việc mới trong lĩnh vực công nghệ và dịch vụ số dự kiến tăng 40% trong 5 năm tới',
    },
    {
      icon: Users,
      number: '1.2B',
      title: 'Người cần đào tạo',
      description: 'Khoảng 1.2 tỷ người toàn cầu cần được đào tạo kỹ năng số để thích ứng với Công nghiệp 4.0',
    },
    {
      icon: Briefcase,
      number: '50%',
      title: 'Công việc sẽ thay đổi',
      description: 'Một nửa tất cả các công việc sẽ thay đổi đáng kể trong 10 năm tới do tự động hóa',
    },
    {
      icon: Globe,
      number: '82%',
      title: 'Cơ hội toàn cầu',
      description: '82% doanh nghiệp trên toàn thế giới đang tìm kiếm nhân lực có kỹ năng số',
    },
  ];

  const realExamples = [
    {
      title: 'Từ Thợ Cơ khí thành Kỹ sư IoT',
      description: 'Một công nhân cơ khí ở Đài Loan học kỹ năng lập trình IoT và hiện quản lý hệ thống tự động hóa công xưởng. Thu nhập tăng gấp 2.5 lần.',
      region: 'Đài Loan',
    },
    {
      title: 'Từ Công nhân dệt thành Chuyên gia dữ liệu',
      description: 'Một công nhân dệt ở Việt Nam được đào tạo phân tích dữ liệu sản xuất, giúp giảm lỗi sản phẩm 35% và được thăng chức quản lý chất lượng.',
      region: 'Việt Nam',
    },
    {
      title: 'Từ Lắp ráp điện tử thành Lập trình robot',
      description: 'Một công nhân lắp ráp ở Thái Lan học lập trình robot công nghiệp, trở thành huấn luyện viên cho 50 công nhân khác.',
      region: 'Thái Lan',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Tác động thực tế
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Những con số và ví dụ thực tế cho thấy sự ảnh hưởng của Công nghiệp 4.0
            đến thị trường lao động toàn cầu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impacts.map((impact, index) => {
            const Icon = impact.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold text-blue-600">
                    {impact.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {impact.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 sm:p-12 text-white mb-16">
          <h3 className="text-3xl font-bold mb-4 text-center">Câu chuyện thành công</h3>
          <p className="text-center text-blue-100 mb-12 max-w-2xl mx-auto">
            Những ví dụ từ các công nhân đã thành công trong việc chuyển đổi kỹ năng
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {realExamples.map((example, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">
                    {example.title}
                  </h4>
                  <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    {example.region}
                  </span>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Xu hướng toàn cầu
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span>Tăng cường đầu tư vào đào tạo kỹ năng số</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span>Học tập suốt đời trở thành chuẩn mực</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span>Hợp tác doanh nghiệp-trường học tăng mạnh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold text-lg">•</span>
                <span>Nhu cầu kỹ năng mềm vượt kỹ năng kỹ thuật</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Thách thức chính
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">!</span>
                <span>Tốc độ thay đổi công nghệ quá nhanh</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">!</span>
                <span>Chênh lệch giữa hộ giàu và hộ nghèo</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">!</span>
                <span>Chất lượng đào tạo không đồng nhất</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 font-bold text-lg">!</span>
                <span>Thiếu các chương trình đào tạo chất lượng cao</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-8 shadow-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Hy vọng trong tương lai
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span>AI hỗ trợ học tập cá nhân hóa</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span>Nền tảng giáo dục mở và miễn phí</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span>Chứng chỉ kỹ năng được công nhận toàn cầu</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold text-lg">✓</span>
                <span>Cộng đồng hỗ trợ học tập phát triển</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
