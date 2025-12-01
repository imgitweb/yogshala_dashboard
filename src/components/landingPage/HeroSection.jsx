import React from "react";
import { Users, Dumbbell, Home, MapPin } from "lucide-react";

const HeroSection = () => {
  const serviceItems = [
    { icon: <Users size={20} />, label: "Trainers" },
    { icon: <Home size={20} />, label: "Home Yoga" },
    { icon: <MapPin size={20} />, label: "Centers" },
    { icon: <Dumbbell size={20} />, label: "Online Classes" },
  ];

  return (
    <section className="bg-primary text-white relative   overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* ✅ Responsive Bigger Image */}
        <img
          src="images/svgviewer-output.svg"
          alt="Yoga Illustration"
          className="mx-auto mb-8 h-28 sm:h-48  lg:h-50 "
        />

        <h1 className="text-3xl md:text-5xl font-800 mb-4 animate-fade-in">
          Yoga. Anytime. Anywhere.
        </h1>

        <p className="text-sm md:text-xl text-gray-200 max-w-3xl mx-auto mb-12 animate-slide-in-up">
          Discover certified yoga trainers with Yogshala.ai — book personalized online,
          home, or center sessions designed to help you stay healthy, balanced,
          and focused.
        </p>

        <div className="flex justify-center md:gap-6 ">
          {serviceItems.map((item, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center space-y-1 w-22 h-22 md:w-24 md:h-24 flex-shrink-0"
            >
              <div className="p-2 rounded-full border-2 border-white bg-[#CEC9F1] text-primary 
                      transition-all duration-500 ease-in-out
                      hover:bg-transparent hover:text-white hover:scale-110">
                {item.icon}
              </div>
              <span className="font-600 text-xs md:text-sm text-white">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
