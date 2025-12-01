
import React from 'react';

const AboutUsSection = () => {
    return (
        <section className=" h-fit pt-20 bg-offwhite">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="relative bg-simple-gradient rounded-3xl px-8 pt-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-lg ">
                    
                    {/* Text Content Column */}
                   <div className="text-white md:w-1/2 md:pr-8 mb-8 md:mb-0 animate-slide-in-up z-10">
  <h2 className="text-4xl md:text-5xl font-800 mb-4">About Us</h2>
  <p className="text-lg mb-6 font-500">
    Yogshala.ai is your go-to platform for discovering expert yoga trainers, booking classes, and connecting with a community dedicated to holistic well-being.
  </p>
  <blockquote className="border-l-4 border-white pl-4 italic text-lg opacity-90 mb-8">
    "Our mission at Yogshala.ai is to make yoga accessible to everyone—online, at home, or in our centres—empowering individuals to improve health, flexibility, and mindfulness with trusted trainers."
    <footer className="mt-2 text-sm font-400 not-italic">- Founder, Yogshala.ai</footer>
  </blockquote>
  <a 
      href="#" 
      className="btn hover-lift flex items-center justify-center md:justify-start bg-white text-primary hover:bg-gray-100 w-fit rounded-full px-5 py-2 font-600"
  >
      Learn More 
      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
      </svg>
  </a>
</div>

                    
                    {/* Image Column */}
                    <div className="md:w-1/2 md:block hidden relative">
                        <img 
                            src="images/men.png" 
                            alt="Vikalp Sahni, Founder & CEO of Eka Care"
                            className="absolute -bottom-[29vh] right-0 translate-x-6 h-[450px] md:h-[570px] object-contain"
                        />
                    </div>
                     <div className="overflow-hidden md:hidden block w-full h-full">
                        <img 
                            src="images/men.png" 
                            alt="Vikalp Sahni, Founder & CEO of Eka Care"
                            className=" "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;

