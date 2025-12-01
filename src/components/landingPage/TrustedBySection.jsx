import React from "react";

const TrustedBySection = () => {
  const logos = [
    { src: "images/partners/1.webp", alt: "The Economic Times" },
    { src: "images/partners/2.webp", alt: "The Hindu" },
    { src: "images/partners/3.webp", alt: "The Indian Express" },
    { src: "images/partners/4.webp", alt: "The Indian Express" },
    { src: "images/partners/5.webp", alt: "The Indian Express" },
    { src: "images/partners/6.webp", alt: "The Indian Express" },
    { src: "images/partners/7.webp", alt: "The Indian Express" },
    { src: "images/partners/8.webp", alt: "The Indian Express" },
  ];

  return (
    <div className="py-12 text-center md:py-16 bg-offwhite overflow-hidden">
      <div className="px-6 md:px-0 w-full">
        <h2 className="text-2xl md:text-4xl font-800 text-dark mb-2">
          Trusted by <span className="text-primary">Millions</span> of happy users and{" "}
          <span className="text-primary">thousands</span> of professionals
        </h2>
        <p className="text-muted text-lg mb-12">Featured in top media outlets</p>

        {/* Horizontal scrolling container */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {logos.concat(logos).map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-28 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Add custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TrustedBySection;
