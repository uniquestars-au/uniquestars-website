import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/uniquestars.png';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Therapy Approach', path: '/therapy-approach' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            {/* Stable container so navbar height doesn't jump */}
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="Unique Stars Logo"
                className="w-12 h-12 object-contain pointer-events-none"
                loading="lazy"
                decoding="async"
                style={{ filter: 'drop-shadow(0 0 10px rgba(255,200,55,0.4))' }}
              />
            </div>

            <div>
              <div
                className="text-2xl font-bold text-[#0A2A66]"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Unique<span className="text-[#FFC837]">Stars</span>
              </div>
              <div className="text-xs text-[#A9B1C0]">Early Start Denver Model</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${isActive(link.path)
                    ? 'text-[#0480E8]'
                    : 'text-[#0A2A66] hover:text-[#33C8FF]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0A2A66] cursor-pointer"
          >
            <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#E3E6EB] pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 text-sm font-medium transition-colors ${isActive(link.path)
                    ? 'text-[#0480E8]'
                    : 'text-[#0A2A66] hover:text-[#33C8FF]'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
