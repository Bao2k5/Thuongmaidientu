import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

// Fetch partners từ API
const fetchPartners = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/partners`);
  if (!response.ok) throw new Error('Lỗi tải partners');
  return response.json();
};

const PartnerBanner = () => {
  const { data, isLoading, error } = useQuery('partners', fetchPartners, {
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    refetchInterval: 10 * 60 * 1000, // Refetch mỗi 10 phút
  });

  const partners = data?.data || [];

  if (isLoading) return null;
  if (error || partners.length === 0) return null;

  return (
    <section className="py-12 bg-luxury-ivory">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-light text-luxury-charcoal mb-2">
            Đối Tác Tin Cậy
          </h2>
          <p className="text-luxury-brown text-sm">
            Những thương hiệu hàng đầu tin tưởng HM Jewelry
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <a
              key={partner._id}
              href={partner.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-luxury-cream rounded-lg border border-luxury-sand hover:border-luxury-taupe hover:shadow-md transition-all duration-300 group"
              title={partner.name}
            >
              <img
                src={`/images/partners/${partner.logo}`}
                alt={partner.name}
                className="max-w-full max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  // Fallback nếu ảnh không load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback text */}
              <span className="hidden text-center text-xs text-luxury-brown font-medium">
                {partner.name}
              </span>
            </a>
          ))}
        </div>

        {/* Optional: Display date info */}
        {partners.length > 0 && (
          <div className="text-center mt-8 text-xs text-luxury-taupe">
            💡 Đối tác được cập nhật theo ngày lễ và sự kiện đặc biệt
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerBanner;
