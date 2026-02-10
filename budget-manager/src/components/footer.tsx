import { Twitter, Linkedin, MessageCircle, Instagram, Youtube } from 'lucide-react';
import Logo from '../images/logo.png'

const Footer = () => {
  return (
    <footer className="relative bg-black text-white px-12 py-20">
      <div className="max-w-7xl mx-auto">
    
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
        
          <div className="lg:col-span-5">
          
            <div className="flex items-center gap-3 mb-8">
                <img src={Logo} alt="" className='w-50'/>
            </div>

            <p className="text-[18px] leading-relaxed max-w-md text-white">
              Start managing your money smarter and achieve your financial goals with ease.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[18px] font-semibold mb-6">Quick Links</h3>
            <nav className="space-y-4">
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Benefits
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Testimonials
              </a>
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-[18px] font-semibold mb-6">Support & Resources</h3>
            <nav className="space-y-4">
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                FAQs
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-[16px] text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </a>
            </nav>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
       
          <p className="text-[14px] text-gray-400">
            Copyright © 2025 eluxspace. All rights reserved.
          </p>

      
          <div className="flex items-center gap-2">
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          <p className="text-[14px] text-gray-400">
            Smarter Money, Better Future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;