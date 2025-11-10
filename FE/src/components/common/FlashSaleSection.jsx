import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import FlashSaleTimer from './FlashSaleTimer';

const FlashSaleSection = ({ products = [], isLoading = false }) => {
  // Mock flash sale end time (24 hours from now)
  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  // Prefer products in category 'Vòng Tay' first, then fill with other sale products
  const productsArr = products && products.length ? products : [];
  const saleProducts = productsArr.filter((p) => p && p.priceSale && p.priceSale < p.price);

  const normalize = (v) => (v ? String(v).toLowerCase().trim() : '');
  const preferred = saleProducts.filter((p) => normalize(p.category) === 'vòng tay' || normalize(p.category) === 'vòngtay' || normalize(p.category) === 'vong tay' || normalize(p.category).includes('vòng tay'));
  const remaining = saleProducts.filter((p) => !preferred.includes(p));
  const flashProducts = [...preferred.slice(0, 4), ...remaining.slice(0, Math.max(0, 4 - preferred.length))].slice(0, 4);

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!flashProducts || flashProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest">
              FLASH SALE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-wide text-luxury-black mb-8">
            Cơ Hội Vàng
          </h2>
          
          {/* Countdown Timer */}
          <FlashSaleTimer endTime={flashSaleEndTime} />
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {flashProducts.map((product, idx) => (
            <motion.div
              key={product?._id || product?.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a 
            href="/products?filter=sale"
            className="inline-block btn-luxury-large bg-red-500 hover:bg-red-600 text-white"
          >
            Xem Tất Cả Flash Sale →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FlashSaleSection;
