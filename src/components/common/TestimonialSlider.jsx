import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TestimonialSlider = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="bg-light rounded-2xl p-10 md:p-12">
      <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
        What My Students Say
      </h2>

      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }}
        }
        className="relative"
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.id} className="h-full py-10">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition h-42 flex flex-col justify-between">
              <p className="text-muted italic mb-6">“{t.review}”</p>
              <h4 className="text-dark font-semibold mt-auto text-right">
                - {t.name}
              </h4>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Styling for Pagination */}
        <style jsx>{`
          /* Pagination bullets */
          .swiper-pagination-bullet {
            background: #d1d5db; /* light gray bullets */
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: #5945D3; /* dark primary bullet */
          }
        `}</style>
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
