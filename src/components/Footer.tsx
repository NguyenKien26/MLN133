import { Factory, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Factory className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Công nhân 4.0</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Nền tảng thông tin và đào tạo cho thế hệ công nhân trong kỷ nguyên
              Cách mạng Công nghiệp 4.0. Cùng nhau xây dựng tương lai bền vững.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-orange-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#challenges" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Thách thức
                </a>
              </li>
              <li>
                <a href="#opportunities" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Cơ hội
                </a>
              </li>
              <li>
                <a href="#solutions" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Giải pháp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">MLN131-Nhóm 1</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Nguyen Tran Khanh Kien
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Huynh Ngoc Ky
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Huynh Nguyen Que Tran
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Huynh Ngoc Khanh
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Che Gia Huy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2024 Công nhân 4.0. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
