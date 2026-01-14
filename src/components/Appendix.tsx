

export default function Appendix() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Phụ lục
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Video minh họa giúp hiểu rõ hơn về Công nhân trong thời đại Công nghiệp 4.0
          </p>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Công nghiệp 4.0 và Công nhân"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-6 sm:p-8">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Video tham khảo
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Công nhân 4.0 – Thách thức và Giải pháp
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Video cung cấp cái nhìn tổng quan về tác động của Cách mạng Công nghiệp 4.0
              đến người lao động, những thách thức đang đặt ra và hướng thích nghi
              trong tương lai.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

