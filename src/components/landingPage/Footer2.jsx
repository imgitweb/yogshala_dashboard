import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const FooterLinkColumn = ({ title, links }) => (
    <div>
        <h3 className="text-lg font-700 text-white mb-4">{title}</h3>
        <ul className="space-y-3">
            {links.map((link, index) => (
                <li key={index}>
                    <a href={link.href} className="text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
                        {link.text}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const SocialIcon = ({ href, children }) => (
     <a href={href} target="_blank" rel="noopener noreferrer" className="text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
        {children}
    </a>
)

const Footer = () => {
    const footerLinks = [
         {
            title: 'About',
            links: [
                { text: 'About Us', href: '/about' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Yogshala Stories', href: '#' },
                { text: 'Careers', href: '#' },
            ],
        },
        {
            title: 'Classes',
            links: [
                { text: 'Online Yoga', href: '#' },
                { text: 'Home Yoga', href: '#' },
                { text: 'Centre Yoga', href: '#' },
                { text: 'Special Workshops', href: '#' },
            ],
        },
        {
            title: 'Trainers',
            links: [
                { text: 'Find a Trainer', href: '/trainers' },
                { text: 'Become a Trainer', href: '/register-trainer' },
                { text: 'Trainer Resources', href: '#' },
            ],
        },
        // {
        //     title: 'Privacy & Security',
        //      links: [
        //     { text: 'Terms and Conditions', href: '#' },
        //     { text: 'Privacy Policy', href: '#' },
        //     { text: 'Security', href: '#' },
        // ],
        // },
       
    ];
    
  

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Top section with links and logo */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4  gap-8">
                    {footerLinks.map((column, index) => (
                        <FooterLinkColumn key={index} title={column.title} links={column.links} />
                    ))}
                    <div className="col-span-2 md:col-span-2 lg:col-span-1 flex lg:justify-end">
                         <img src="images/logo1.svg" alt="Yogshala.ai Logo"
                          className="h-full w-auto

                           " />
                    </div>
                </div> */}

             

             {/* Bottom bar with socials + legal links + copyright */}
<div className="mt-12 pt-8 border-t border-white border-opacity-20">
  <div className="flex flex-col md:flex-row justify-between items-center gap-6">

  
        {/* Copyright */}
    <p className="text-white opacity-80 text-sm">
      &copy; {new Date().getFullYear()} Yogshala.ai. All rights reserved.
    </p>

    {/* Privacy + Terms + Security (Horizontal Links) */}
    <div className="flex space-x-6 text-sm font-500">
      <a href="/terms" className="opacity-80 hover:opacity-100 transition">Terms & Conditions</a>
      <a href="/privacy" className="opacity-80 hover:opacity-100 transition">Privacy Policy</a>
      <a href="/security" className="opacity-80 hover:opacity-100 transition">Security</a>
    </div>



  </div>
</div>

            </div>
            {/* <img src="images/footer-wave.svg" alt="Yogshala.ai Footer Wave" width="100%" /> */}
        </footer>
    );
};

export default Footer;
