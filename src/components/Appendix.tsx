

export default function Appendix() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Video ca nhạc
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/D7SHfa_taVg"
              title="Công nghiệp 4.0 và Công nhân"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-6 sm:p-8">
          </div>
        </div>

      </div>
    </section>
  );
}

