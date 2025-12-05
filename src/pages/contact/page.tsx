// src/pages/contact/page.tsx
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import SEO from '../../components/SEO';
import React from 'react';

export default function Contact() {
  const buildMailto = (to: string, subject: string, body: string) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  const defaultMailBody = `Hi Sanaz,

I would like to book a free consultation for my child.

Here are my details:

Parent Name:  
Child’s Name:  
Child’s Age:  
Location:  
Preferred Contact Method (Phone/Email):  
Brief Concerns / What I’m Looking For:

Please let me know a suitable time for the consultation or if you need any additional information.

Thank you,
[Parent Name]`;

  const contactMethods = [
    {
      icon: 'ri-mail-fill',
      color: '#33C8FF',
      gradient: 'from-[#33C8FF] to-[#0480E8]',
      title: 'Email Us',
      info: 'admin@uniquestars.com.au',
      description: 'Send us an email anytime',
      link: buildMailto(
        'admin@uniquestars.com.au',
        'Request for Free Consultation – Unique Stars',
        defaultMailBody
      ),
    },
    {
      icon: 'ri-instagram-fill',
      color: '#4AD36D',
      gradient: 'from-[#4AD36D] to-[#33C8FF]',
      title: 'Instagram',
      info: '@uniquestars_earlyintervention',
      description: 'Follow us on Instagram',
      link: 'https://www.instagram.com/uniquestars_earlyintervention?utm_source=qr&igsh=OTIwZXNuMG53YjZn',
    },
    {
      icon: 'ri-map-pin-fill',
      color: '#FF4F87',
      gradient: 'from-[#FF4F87] to-[#FF8A3D]',
      title: 'Visit Us',
      info: 'Sydney, NSW',
      description: 'In-home & clinic sessions available',
      link: '#map',
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  const serviceAreas = ['Hills Area', 'Western Sydney'];

  // helper to split hours into start / end if possible
  const splitHours = (hours: string) => {
    if (!hours || hours.toLowerCase() === 'closed') return null;
    const parts = hours.split(' - ').map((p) => p.trim());
    if (parts.length === 2) return { start: parts[0], end: parts[1] };
    // fallback: try single dash
    const alt = hours.split('-').map((p) => p.trim());
    if (alt.length === 2) return { start: alt[0], end: alt[1] };
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO ----- */}
      <SEO
        title="Contact Unique Stars | Early Intervention Therapy Sydney"
        description="Book a free consultation for early intervention or ESDM therapy in Sydney. Contact Unique Stars to start your child’s developmental journey."
        keywords="contact autism therapy Sydney, book early intervention Sydney, ESDM consultation, Unique Stars contact"
        canonical="https://uniquestars.com.au/contact"
        openGraph={{
          title: 'Contact Unique Stars | Early Intervention Therapy Sydney',
          description:
            'Book a free consultation for early intervention or ESDM therapy in Sydney. Contact Unique Stars to start your child’s developmental journey.',
          url: 'https://uniquestars.com.au/contact',
          image: '/og-contact.jpg',
        }}
        faviconHref="/favicon.ico"
      />

      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #EAF7FF 0%, #FFF7DA 50%, #FFE8F0 100%)',
          minHeight: '60vh',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-16 h-16 flex items-center justify-center animate-float-slow opacity-30">
            <i
              className="ri-star-fill text-5xl text-[#FFC837]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(255,200,55,0.8))' }}
            ></i>
          </div>
          <div
            className="absolute top-[25%] right-[12%] w-14 h-14 flex items-center justify-center animate-float-medium opacity-25"
            style={{ animationDelay: '1s' }}
          >
            <i
              className="ri-star-fill text-4xl text-[#FF4F87]"
              style={{ filter: 'drop-shadow(0 0 12px rgba(255,79,135,0.7))' }}
            ></i>
          </div>
          <div
            className="absolute bottom-[30%] left-[15%] w-12 h-12 flex items-center justify-center animate-float-slow opacity-20"
            style={{ animationDelay: '2s' }}
          >
            <i
              className="ri-star-fill text-3xl text-[#4AD36D]"
              style={{ filter: 'drop-shadow(0 0 10px rgba(74,211,109,0.7))' }}
            ></i>
          </div>
          <div
            className="absolute top-[40%] right-[6%] w-16 h-16 flex items-center justify-center animate-float-medium opacity-30"
            style={{ animationDelay: '1.5s' }}
          >
            <i
              className="ri-star-fill text-5xl text-[#33C8FF]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(51,200,255,0.8))' }}
            ></i>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#33C8FF]"
            style={{
              boxShadow:
                '0 8px 30px rgba(51,200,255,0.4), inset 0 2px 10px rgba(51,200,255,0.2)',
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#33C8FF] to-[#0480E8] rounded-full"
              style={{ boxShadow: '0 4px 15px rgba(51,200,255,0.5)' }}
            >
              <i className="ri-phone-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">Get In Touch</span>
          </div>

          <h1
            className="text-6xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Contact{' '}
            <span
              className="bg-gradient-to-r from-[#33C8FF] via-[#0480E8] to-[#0A2A66] bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(51,200,255,0.3))' }}
            >
              Us
            </span>
          </h1>

          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Ready to start your child's therapy journey? We're here to answer
            your questions and schedule a free consultation.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="flex contact-card-container justify-center gap-[28px]">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={
                  method.link.startsWith('http') ||
                    method.link.startsWith('mailto:')
                    ? '_blank'
                    : '_self'
                }
                rel={
                  method.link.startsWith('http') ||
                    method.link.startsWith('mailto:')
                    ? 'noopener noreferrer'
                    : undefined
                }
                aria-label={`Contact via ${method.title}`}
                className="group block contact-card-wrapper"
              >
                <div className="contact-card">
                  <div className="contact-card-inner relative">
                    <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <i
                        className="ri-star-fill text-3xl"
                        style={{
                          color: method.color,
                          filter: `drop-shadow(0 0 10px ${method.color})`,
                        }}
                      ></i>
                    </div>

                    <div
                      className={`bg-gradient-to-br ${method.gradient} rounded-[24px] p-8 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] h-full w-full flex flex-col`}
                      style={{
                        boxShadow: `0 20px 50px ${method.color}40, inset 0 -5px 20px rgba(255,255,255,0.3)`,
                      }}
                    >
                      <div
                        className="w-20 h-20 flex items-center justify-center rounded-3xl mb-4 mx-auto"
                        style={{
                          backgroundColor: 'white',
                          boxShadow: `0 10px 30px ${method.color}60, inset 0 2px 10px ${method.color}30`,
                        }}
                      >
                        <i
                          className={`${method.icon} text-5xl`}
                          style={{ color: method.color }}
                        ></i>
                      </div>

                      <h3
                        className="text-2xl font-extrabold text-white mb-2 text-center"
                        style={{
                          fontFamily: 'Nunito, sans-serif',
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                        }}
                      >
                        {method.title}
                      </h3>

                      <p className="method-info text-white/95 text-lg font-bold mb-2 text-center break-words">
                        {method.info}
                      </p>

                      <p className="text-white/90 text-center mt-auto">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICE HOURS & SERVICE AREAS */}
      <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #FFC83720 0%, white 100%)',
                    border: '4px solid #FFC837',
                    boxShadow:
                      '0 10px 30px rgba(255,200,55,0.4), inset 0 2px 10px rgba(255,200,55,0.2)',
                  }}
                >
                  <i className="ri-time-fill text-4xl text-[#FFC837]"></i>
                </div>
                <h2
                  className="text-4xl font-extrabold text-[#0A2A66]"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Office Hours
                </h2>
              </div>

              <div className="space-y-5">
                {officeHours.map((schedule, index) => {
                  const parts = splitHours(schedule.hours);
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-3xl p-6 border-4 border-[#FFC837] hover:scale-105 transition-all cursor-pointer"
                      style={{ boxShadow: '0 10px 30px rgba(255,200,55,0.2)' }}
                    >
                      <div className="flex items-center justify-between hours-row">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full"
                            style={{
                              backgroundColor: '#FFC837',
                              boxShadow: '0 4px 15px rgba(255,200,55,0.6)',
                            }}
                          >
                            <i className="ri-calendar-fill text-2xl text-white"></i>
                          </div>
                          <span className="text-[#0A2A66] text-lg">{schedule.day}</span>
                        </div>

                        {/* Default inline hours for larger screens */}
                        <div className="hours-inline text-[#0A2A66] font-extrabold text-lg">
                          {schedule.hours}
                        </div>

                        {/* Vertical stacked hours for small screens (<= 440px) */}
                        <div className="hours-vertical text-[#0A2A66] font-extrabold text-lg">
                          {parts ? (
                            <>
                              <span className="hours-start">{parts.start} -</span>
                              <span className="hours-end">{parts.end}&nbsp; &nbsp; </span>
                            </>
                          ) : (
                              <span className="hours-start">{schedule.hours}&nbsp;&nbsp;</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-10">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #33C8FF20 0%, white 100%)',
                    border: '4px solid #33C8FF',
                    boxShadow:
                      '0 10px 30px rgba(51,200,255,0.4), inset 0 2px 10px rgba(51,200,255,0.2)',
                  }}
                >
                  <i className="ri-map-pin-2-fill text-4xl text-[#33C8FF]"></i>
                </div>
                <h2
                  className="text-4xl font-extrabold text-[#0A2A66]"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Service Areas
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {serviceAreas.map((area, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-6 border-4 border-[#33C8FF] hover:scale-105 transition-all cursor-pointer"
                    style={{ boxShadow: '0 10px 30px rgba(51,200,255,0.2)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: '#33C8FF',
                          boxShadow: '0 4px 15px rgba(51,200,255,0.6)',
                        }}
                      >
                        <i className="ri-map-pin-fill text-xl text-white"></i>
                      </div>
                      <span className="text-[#0A2A66] text-lg">{area}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 bg-gradient-to-r from-[#33C8FF] to-[#0480E8] rounded-3xl p-6 border-4 border-[#0A2A66]"
                style={{
                  boxShadow:
                    '0 15px 40px rgba(51,200,255,0.4), inset 0 2px 15px rgba(255,255,255,0.3)',
                }}
              >
                <p
                  className="text-white text-center text-lg"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                >
                  <i className="ri-home-heart-fill text-2xl mr-2"></i>
                  In-home therapy available across all Sydney areas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2
              className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Find{' '}
              <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">
                Us
              </span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
              Serving families across Sydney with in-home and clinic-based therapy
            </p>
          </div>

          <div
            className="rounded-[50px] overflow-hidden border-8 border-[#FF4F87] relative"
            style={{
              boxShadow:
                '0 30px 70px rgba(255,79,135,0.4), inset 0 -5px 20px rgba(255,255,255,0.2)',
            }}
          >
            <div className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center z-10 animate-bounce-slow">
              <i
                className="ri-star-fill text-5xl text-[#FFC837]"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(255,200,55,0.9))',
                }}
              ></i>
            </div>

            <div
              className="absolute -bottom-6 -right-6 w-12 h-12 flex items-center justify-center z-10 animate-bounce-slow"
              style={{ animationDelay: '0.5s' }}
            >
              <i
                className="ri-star-fill text-5xl text-[#33C8FF]"
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(51,200,255,0.9))',
                }}
              ></i>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26538.146107013552!2d150.9622974888086!3d-33.75373303929856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a29795cee0c9%3A0x5017d681632ad50!2sBaulkham%20Hills%20NSW%202153%2C%20Australia!5e0!3m2!1sen!2sin!4v1764653937216!5m2!1sen!2sin"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Unique Stars Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 10px rgba(255,255,255,0.8)',
              }}
            ></div>
          ))}
        </div>

        <div className="absolute top-[20%] left-[10%] w-20 h-20 flex items-center justify-center animate-float-slow opacity-20">
          <i
            className="ri-star-fill text-7xl text-[#FFC837]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,55,0.8))' }}
          ></i>
        </div>

        <div
          className="absolute bottom-[15%] right-[8%] w-24 h-24 flex items-center justify-center animate-float-medium opacity-20"
          style={{ animationDelay: '1s' }}
        >
          <i
            className="ri-star-fill text-8xl text-[#4AD36D]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(74,211,109,0.8))' }}
          ></i>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2
            className="text-5xl lg:text-7xl font-extrabold text-white mb-8"
            style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)',
            }}
          >
            Let's Get{' '}
            <span
              className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,200,55,0.6))',
              }}
            >
              Started!
            </span>
          </h2>

          <p
            className="text-white text-2xl mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Book your free consultation today and take the first step toward your
            child's bright future
          </p>

          <a
            href={buildMailto(
              'admin@uniquestars.com.au',
              'Request for Free Consultation – Unique Stars',
              defaultMailBody
            )}
            className="cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
            style={{
              boxShadow:
                '0 15px 50px rgba(255,200,55,0.6), inset 0 2px 15px rgba(255,255,255,0.5)',
            }}
            aria-label="Book free consultation via email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-mail-fill text-4xl"></i>
            <span>Book Free Consultation</span>
          </a>
        </div>
      </section>

      <Footer />

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes float-slow { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-30px);} }
        @keyframes float-medium { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-20px);} }
        @keyframes bounce-slow { 0%,100% { transform: translateY(0) scale(1);} 50% { transform: translateY(-15px) scale(1.1);} }
        @keyframes twinkle { 0%,100% { opacity:.3; transform:scale(1);} 50% { opacity:1; transform:scale(1.5);} }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

        .contact-card-container { gap: 28px; display:flex; flex-wrap:wrap; justify-content:center; }
        .contact-card-wrapper { box-sizing:border-box; flex:0 0 320px; max-width:320px; }
        .contact-card { width:100%; height:320px; display:flex; }
        .contact-card-inner { width:100%; height:100%; display:flex; box-sizing:border-box; }

        .method-info { overflow-wrap:anywhere; word-break:break-word; white-space:normal; }

        /* Office hours responsive: show stacked hours on small narrow screens */
        .hours-inline { display: block; }
        .hours-vertical { display: none; }

        @media (max-width: 440px) {
          /* Layout the hours row so left (day) and right (hours) are spaced */
          .hours-row { gap: 12px; }
          .hours-inline { display: none; }
          .hours-vertical {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 2px;
          min-width: 88px;
          line-height: 1;
        }

        /* ensure both lines don't wrap and have no extra margin/indent */
        .hours-vertical .hours-start,
        .hours-vertical .hours-end {
          display: block;
          white-space: nowrap;
          margin: 0;
          padding: 0;
          text-align: right;
        }
          
          /* Slightly reduce padding for tiny screens to keep cards compact */
          .contact-card-wrapper { flex: 0 0 100%; max-width: 100%; }
          .contact-card { height: auto; }
        }

        @media (max-width: 640px) {
          .contact-card-wrapper { flex:0 0 100%; max-width:100%; }
          .contact-card { height:300px; }
        }

        @media (min-width:768px) and (max-width:1024px) {
          .contact-card-container { gap:28px; flex-wrap:nowrap; }
          .contact-card-wrapper { flex:0 0 calc((100% - 56px) / 3); max-width:calc((100% - 56px) / 3); }
          .contact-card { height:320px; }
        }

        @media (max-width:768px) {
          .cta-button {
            width:calc(100% - 2rem) !important;
            padding:0.85rem 1rem !important;
            font-size:1.1rem !important;
            border-radius:9999px !important;
          }
          .cta-button i { font-size:1.7rem !important; }
        }
      `}</style>
    </div>
  );
}
