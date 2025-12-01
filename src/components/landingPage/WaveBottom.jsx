import React from 'react';

function WaveBottom() {
  return (
    <div className="w-full overflow-hidden relative">
      <img
        src="images/wave-bottom.svg"
        alt="Healthcare AI Animation"
                  className="h-32 -mt-11  sm:h-48  md:-mt-5 lg:h-50 "

        style={{
          // Fade-out effect at the bottom
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          maskRepeat: "no-repeat",
          maskSize: "cover",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
        }}
      />
    </div>
  );
}

export default WaveBottom;
