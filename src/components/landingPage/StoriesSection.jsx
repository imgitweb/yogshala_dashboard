import { ArrowRight } from 'lucide-react';
import React from 'react';

const Card = ({ image, tags, title, description, link, specialBg }) => {
    return (
        <div className={`bg-light rounded-2xl shadow-lg overflow-hidden hover-lift transition-all duration-300 flex flex-col ${specialBg ? 'border-t-4 border-primary' : ''}`}>
            <div>
                 <img src={image} alt={title} className="w-full hover:scale-105 transition-all duration-300 object-cover rounded-lg" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    {tags.map(tag => (
                        <span key={tag} className="text-primary font-600 text-sm">#{tag}</span>
                    ))}
                </div>
                <h3 className="text-xl font-700 text-dark mb-3 flex-grow">{title}</h3>
                <a 
                  href={link} 
                  className="text-muted font-600 hover:text-primary-light transition-colors duration-300 self-start group"
                >
                  <div className="flex items-center flex-wrap">
                    {description.length > 100 ? (
                      <>
                        {description.slice(0, 100)}...
                        <span className="ml-1 text-primary font-semibold group-hover:underline">
                          Read More
                        </span>
                      </>
                    ) : (
                      description
                    )}
                  </div>
                </a>
            </div>
        </div>
    );
};

const StoriesSection = () => {

    const stories = [
        {
            image: "https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/66d9674b2c4f84a207018d5d_image.webp",
            tags: ["online", "home-classes"],
            title: "Transform Your Morning with Online Yoga Sessions",
            description: "Learn how our expert trainers guide beginners and advanced students alike to improve flexibility, mindfulness, and energy through online yoga classes.",
            link: "#",
            specialBg: true
        },
        {
            image: "https://cdn.prod.website-files.com/64abb91e69c1429ab62638be/66c740897f505e81787195ab_barriers%20to%20emr%20uptake.webp",
            tags: ["yogashala", "wellness"],
            title: "In-Person Yoga at Our Centres for All Levels",
            description: "Experience holistic wellness with personalized yoga sessions at our Yogshala centres, designed to fit every skill level and lifestyle.",
            link: "#"
        },
        {
            image: "https://cdn.prod.website-files.com/64d0bd8b475d468c8b1aa632/66fb980b16ae048b2cbde1d3_image-2.webp",
            tags: ["trainer-tips", "success-stories"],
            title: "Home Yoga Success Stories",
            description: "Discover inspiring stories from our users who achieved better health and mindfulness practicing yoga at home with their dedicated trainers.",
            link: "#"
        }
    ];

    return (
        <section className="py-16 bg-offwhite animate-fade-in">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-left mb-12 animate-slide-in-up">
                    <h2 className="text-3xl md:text-4xl font-800 text-dark mb-4">Yogshala <span className="text-primary">Stories</span></h2>
                    <p className="text-lg text-left text-muted max-w-2xl">
                        Explore user experiences, trainer insights, and tips for a healthier, balanced lifestyle.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stories.map((story, index) => (
                        <Card key={index} {...story} />
                    ))}
                </div>

                <div className="text-center">
                   <button key="1" className="btn btn-primary group">
                        Learn More <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                   </button>
                </div>
            </div>
        </section>
    );
};

export default StoriesSection;
