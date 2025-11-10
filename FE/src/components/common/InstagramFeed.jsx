import { motion } from 'framer-motion';

const InstagramFeed = () => {
  // Placeholder images - replace with actual Instagram feed API
  const instagramPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400', likes: 234, comments: 12 },
    { id: 2, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400', likes: 189, comments: 8 },
    { id: 3, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', likes: 312, comments: 15 },
    { id: 4, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400', likes: 276, comments: 20 },
    { id: 5, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400', likes: 198, comments: 9 },
    { id: 6, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400', likes: 245, comments: 11 },
  ];

  return (
    <section className="section-luxury bg-luxury-white">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-light text-luxury-charcoal tracking-wide mb-4">
            #HMJewelry
          </h2>
          <div className="w-16 h-px bg-luxury-sage mx-auto mb-6"></div>
          <p className="text-luxury-brown text-base font-light mb-6">
            Theo dõi chúng tôi trên Instagram để cập nhật những mẫu mã mới nhất
          </p>
          <a
            href="https://www.instagram.com/hmjewelry" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-luxury-charcoal hover:text-luxury-sage transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-sm tracking-wide">@hmjewelry</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/hmjewelry"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-luxury-charcoal/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-4 text-luxury-white">
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span className="text-sm">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
