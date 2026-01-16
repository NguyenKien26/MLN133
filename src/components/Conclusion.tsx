import { CheckCircle2, Lightbulb, Users } from 'lucide-react';

export default function Conclusion() {
  const keyTakeaways = [
    {
      icon: CheckCircle2,
      title: 'Thay đổi là tất yếu',
      description:
        'Công nghiệp 4.0 đang diễn ra ngay trong nhà máy, xưởng sản xuất và công việc hằng ngày của công nhân.',
    },
    {
      icon: Lightbulb,
      title: 'Kỹ năng thực tế là quan trọng nhất',
      description:
        'Biết sử dụng máy móc hiện đại, công nghệ số và làm việc linh hoạt sẽ giúp công nhân đứng vững.',
    },
    {
      icon: Users,
      title: 'Cơ hội cho người sẵn sàng',
      description:
        'Công nhân chủ động học hỏi và thích nghi sẽ có thu nhập ổn định hơn và cơ hội thăng tiến.',
    },
  ];

  return (
    <section
      id="conclusion"
      className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Tóm lược & Kết luận
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Công nhân 4.0 không chỉ là công nghệ, mà là sự thay đổi trong cách làm
            việc, tư duy và kỹ năng của người lao động.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {keyTakeaways.map((takeaway, index) => {
            const Icon = takeaway.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <div className="bg-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{takeaway.title}</h3>
                <p className="text-blue-100">{takeaway.description}</p>
              </div>
            );
          })}
        </div>

        {/* Hành động cụ thể */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20 mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Việc làm cụ thể cho Công nhân 4.0
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-orange-400 mb-6">
                Ngay hôm nay
              </h4>
              <ul className="space-y-3 text-blue-100">
                <li>• Làm quen với máy móc, thiết bị mới tại nơi làm việc</li>
                <li>• Hỏi và học kinh nghiệm từ tổ trưởng, kỹ thuật viên</li>
                <li>• Tuân thủ an toàn lao động và quy trình sản xuất</li>
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-orange-400 mb-6">
                Trong thời gian tới
              </h4>
              <ul className="space-y-3 text-blue-100">
                <li>• Nâng cao tay nghề để vận hành nhiều loại máy hơn</li>
                <li>• Sẵn sàng tiếp nhận công nghệ mới trong nhà máy</li>
                <li>• Giữ tinh thần kỷ luật, hợp tác và trách nhiệm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lời kêu gọi */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 sm:p-12 mb-16 shadow-2xl text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-6">
            Thông điệp dành cho Công nhân 4.0
          </h3>
          <p className="text-lg text-white/90 mb-6">
            Công nghệ không lấy đi việc làm của công nhân, mà sẽ thay đổi cách
            chúng ta làm việc. Người chủ động thích nghi sẽ là người đi trước.
          </p>
          <p className="text-2xl font-bold">
            Làm tốt hôm nay – Vững vàng cho ngày mai.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 rounded-xl p-8 border border-white/20">
            <h4 className="text-2xl font-bold mb-6">💡 Tương lai phía trước</h4>
            <ul className="space-y-3 text-blue-100">
              <li>✓ Công việc an toàn và hiệu quả hơn</li>
              <li>✓ Thu nhập gắn với kỹ năng và tay nghề</li>
              <li>✓ Công nhân có vai trò quan trọng hơn trong sản xuất</li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-8 border border-white/20">
            <h4 className="text-2xl font-bold mb-6">🚀 Bước tiếp theo</h4>
            <ul className="space-y-3 text-blue-100">
              <li>→ Khám phá phần kiến thức & câu hỏi ôn tập</li>
              <li>→ Chia sẻ thông tin hữu ích cho đồng nghiệp</li>
              <li>→ Áp dụng vào công việc hằng ngày</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 rounded-full p-1">
            <div className="bg-blue-900 rounded-full px-8 py-4">
              <p className="font-bold text-lg">
                Bạn đã sẵn sàng trở thành Công nhân 4.0 chưa?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
