import { Link } from 'react-router-dom';
import { mockCollections } from '../utils/mockData';

const Collections = () => {
  return (
    <div className="min-h-screen bg-luxury-white">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-br from-luxury-pearl to-luxury-ivory flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl font-light text-luxury-black tracking-wide mb-4">
            BỘ SƯU TẬP
          </h1>
          <div className="w-24 h-px bg-luxury-gray mx-auto mb-4"></div>
          <p className="text-luxury-gray text-lg font-light tracking-wide">
            Khám phá vẻ đẹp vượt thời gian
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="section-luxury">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockCollections.map((collection) => (
              <Link
                key={collection.id}
                to={`/products?collection=${collection.name}`}
                className="group"
              >
                <div className="card-luxury overflow-hidden">
                  <div className="aspect-square overflow-hidden bg-luxury-pearl">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-2xl text-luxury-black mb-2 tracking-wide">
                      {collection.name}
                    </h3>
                    <p className="text-luxury-gray text-sm font-light mb-4 leading-relaxed">
                      {collection.description}
                    </p>
                    <span className="text-luxury-darkGray text-xs uppercase tracking-widest font-medium border-b border-luxury-platinum pb-1 group-hover:border-luxury-darkGray transition-colors">
                      Khám Phá →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-luxury bg-luxury-pearl">
        <div className="container-luxury text-center">
          <h2 className="font-serif text-5xl font-light text-luxury-black tracking-wide mb-6">
            Tư Vấn Miễn Phí
          </h2>
          <p className="text-luxury-gray text-base font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn để bạn tìm được món trang sức hoàn hảo
          </p>
          <Link to="/contact" className="btn-luxury inline-block px-12">
            LIÊN HỆ NGAY
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;
