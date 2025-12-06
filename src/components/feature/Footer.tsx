import { Link } from 'react-router-dom';
import logo from '../../assets/uniquestars.png';

export default function Footer() {
  return (
    <footer className="bg-[#EAF7FF] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Unique Stars Logo"
                  className="w-14 h-14 object-contain pointer-events-none"
                  loading="lazy"
                  decoding="async"
                  style={{ filter: "drop-shadow(0 0 10px rgba(255,200,55,0.4))" }}
                />
              </div>

              <div
                className="text-2xl font-bold text-[#0A2A66]"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Unique<span className="text-[#FFC837]">Stars</span>
              </div>
            </div>

            <p className="text-[#0A2A66] text-sm leading-relaxed mb-4">
              Empowering young children with autism through play-based early intervention therapy in Sydney.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/uniquestars_earlyintervention?utm_source=qr&igsh=OTIwZXNuMG53YjZn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unique Stars Instagram"
                title="Instagram - @uniquestars_earlyintervention"
                className="
        w-10 h-10 flex items-center justify-center
        bg-white rounded-full text-[#0A2A66]
        transition-all duration-300
        hover:bg-[#33C8FF] hover:text-white hover:shadow-lg
      "
              >
                <i className="ri-instagram-fill text-xl" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sanaz-montazer-8b3352346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sanaz LinkedIn"
                title="LinkedIn - Sanaz Montazer"
                className="
        w-10 h-10 flex items-center justify-center
        bg-white rounded-full text-[#0A2A66]
        transition-all duration-300
        hover:bg-[#33C8FF] hover:text-white hover:shadow-lg
      "
              >
                <i className="ri-linkedin-fill text-xl" />
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@uniquestars-n2j?si=eFwnU2vZrzAJzVmd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unique Stars YouTube"
                title="YouTube - Unique Stars"
                className="
        w-10 h-10 flex items-center justify-center
        bg-white rounded-full text-[#0A2A66]
        transition-all duration-300
        hover:bg-[#33C8FF] hover:text-white hover:shadow-lg
      "
              >
                <i className="ri-youtube-fill text-xl" />
              </a>
            </div>
          </div>


          {/* Quick Links */}
          <div>
            <h3 className="text-[#0A2A66] font-bold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-[#0A2A66] text-sm hover:text-[#33C8FF] transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-[#0A2A66] text-sm hover:text-[#33C8FF] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-[#0A2A66] text-sm hover:text-[#33C8FF] transition-colors">Services</Link></li>
              <li><Link to="/therapy-approach" className="text-[#0A2A66] text-sm hover:text-[#33C8FF] transition-colors">Therapy Approach</Link></li>
              <li><Link to="/testimonials" className="text-[#0A2A66] text-sm hover:text-[#33C8FF] transition-colors">Testimonials</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[#0A2A66] font-bold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Our Services
            </h3>
            <ul className="space-y-2">
              <li className="text-[#0A2A66] text-sm">Early Intervention</li>
              <li className="text-[#0A2A66] text-sm">ESDM Therapy</li>
              <li className="text-[#0A2A66] text-sm">Communication Support</li>
              <li className="text-[#0A2A66] text-sm">Behaviour Support</li>
              <li className="text-[#0A2A66] text-sm">Play-Based Learning</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#0A2A66] font-bold text-lg mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#0A2A66] text-sm">
                <i className="ri-map-pin-fill text-[#FF4F87] mt-0.5" />
                <span>Sydney, NSW, Australia</span>
              </li>
              <li className="flex items-center gap-2 text-[#0A2A66] text-sm">
                <i className="ri-mail-fill text-[#FF8A3D]" />
                <a href="mailto:admin@uniquestars.com.au" className="hover:text-[#33C8FF] transition-colors">
                  admin@uniquestars.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#33C8FF]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#0A2A66] text-sm text-center md:text-left">
            © 2024 Unique Stars. All rights reserved.
            <span className="mx-2">
              <i className="ri-star-fill text-[#FFC837] text-xs" />
            </span>
            Empowering children through play.
          </p>
        </div>
      </div>
    </footer>
  );
}
