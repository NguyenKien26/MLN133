import { Factory, ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 p-4 rounded-2xl shadow-lg animate-pulse">
              <Factory className="w-16 h-16" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Công nhân 4.0
          </h1>

          <p className="text-2xl sm:text-3xl lg:text-4xl font-light mb-8 text-blue-100">
            Thách thức và Cơ hội
          </p>

          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Trong kỷ nguyên Cách mạng Công nghiệp 4.0, người lao động đang đối mặt với những thay đổi chưa từng có.
            Hãy cùng khám phá những thách thức và cơ hội mà họ đang trải qua.
          </p>

          <button
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Khám phá ngay
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
