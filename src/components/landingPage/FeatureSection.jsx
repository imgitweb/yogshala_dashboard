import React from "react";

const FeatureSection = ({
  tagIcon,
  tag,
  title,
  description,
    imageElement, // ✅ Accept full <img> element
  imageAlt,
  logos,
  actions,
  imagePosition = "right",
  customContent,
  gradientDirection = "to-br", // to-br, to-tr, etc.
  gradientColors = { from: "#6366F1", via: "#ffffff", to: "#ffffff" },
}) => {
  const imageOrderClass =
    imagePosition === "right" ? "md:order-last" : "md:order-first";

  // Convert Tailwind-like direction to degrees for CSS linear-gradient
  const directionMap = {
    "to-br": "135deg",
    "to-bl": "225deg",
    "to-tr": "45deg",
    "to-tl": "315deg",
    "to-r": "90deg",
    "to-l": "270deg",
    "to-t": "0deg",
    "to-b": "180deg",
  };

  const gradientStyle = {
    background: `linear-gradient(${directionMap[gradientDirection] || "135deg"}, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`,
  };

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="p-8 md:p-12 rounded-3xl shadow-sm overflow-hidden"
          style={gradientStyle} // ✅ inline gradient
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 items-center">
            {/* Text Content */}
            <div className="flex flex-col items-start text-left">
              {/* Tag */}
              {tag && (
                <div className="inline-flex btn bg-offwhite items-center space-x-2 text-primary bg-primary/10 px-3 py-1.5 rounded-md font-semibold text-sm mb-4">
                  {tagIcon}
                  <span>{tag}</span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4 leading-tight">
                {title}
              </h2>

              {/* Description */}
              {description && (
                <p className="text-muted text-lg mb-8">{description}</p>
              )}

              {/* Custom Content */}
              {customContent && <div className="mb-8">{customContent}</div>}

              {/* Logos */}
              {logos && (
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-x-6 gap-y-4 mb-6">
                  {logos.map((logo, i) => (
                    <img
                      key={i}
                      src={logo.src}
                      alt={logo.alt}
                      className="h-9 w-auto object-contain drop-shadow-2xl"
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              {actions && (
                <div className="flex flex-wrap items-center gap-4">{actions}</div>
              )}
            </div>

            {/* Image */}
             {/* Image */}
            <div className={imageOrderClass}>
              {imageElement && imageElement}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
