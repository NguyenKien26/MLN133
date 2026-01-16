import { TrendingUp, Users, Briefcase, Globe } from "lucide-react";

export default function Impact() {
  const impacts = [
    {
      icon: TrendingUp,
      number: "40%",
      title: "Tăng trưởng việc làm",
      description:
        "Nhiều ngành nghề mới trong công nghệ, dữ liệu và dịch vụ số sẽ tiếp tục xuất hiện",
      sourceLabel: "WEF – Future of Jobs Report 2025",
      sourceUrl:
        "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/",
    },
    {
      icon: Users,
      number: "1.2B",
      title: "Nhân lực chuyển đổi",
      description:
        "Chuyển đổi số và tự động hóa tăng nhu cầu phát triển kỹ năng, đặc biệt với 1,2 tỷ người gia nhập lao động toàn cầu.",
      sourceLabel: "World Bank & WEF – Future of Jobs Report 2025",
      sourceUrl: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/1-drivers-of-labour-market-transformation/",
    },
    {
      icon: Briefcase,
      number: "50%",
      title: "Công việc sẽ thay đổi",
      description:
        "Tự động hóa và AI sẽ làm thay đổi bản chất của rất nhiều công việc hiện nay",
      sourceLabel: "Tạp chí Cộng sản",
      sourceUrl:
        "https://www.tapchicongsan.org.vn/van_hoa_xa_hoi/-/2018/52474/view_content",
    },
    {
      icon: Globe,
      number: "Việt Nam",
      title: "Tác động trong nước",
      description:
        "Cách mạng công nghiệp 4.0 tác động mạnh tới việc làm và cơ cấu lao động tại Việt Nam",
      sourceLabel: "Cơ cấu lao động ở Việt Nam – Tạp chí Quản lý Nhà nước",
      sourceUrl:
        "https://www.quanlynhanuoc.vn/2025/11/14/co-cau-lao-dong-o-viet-nam-trong-boi-canh-cuoc-cach-mang-cong-nghiep-lan-thu-tu/",
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
            Những con số và ví dụ thực tế cho thấy sự ảnh hưởng của Công nghiệp
            4.0 đến thị trường lao động toàn cầu.
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
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {impact.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {impact.description}
                </p>

                <a
                  href={impact.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  Nguồn: {impact.sourceLabel}
                  <span className="text-sm">↗</span>
                </a>
              </div>
            );
          })}
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
                <span>Khoảng cách giàu – nghèo</span>
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
