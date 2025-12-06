// src/pages/services/page.tsx
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import CommSupportImage from '../../assets/Comm-support-Service.jpeg';

export default function Services() {
  const services = [
    {
      icon: 'ri-heart-pulse-fill',
      color: '#FF4F87',
      gradient: 'from-[#FF4F87] to-[#FF8A3D]',
      title: 'Early Intervention',
      description:
        'Specialized therapy for children aged 12-48 months during the critical early years when intervention is most effective.',
      image:
        'https://readdy.ai/api/search-image?query=Professional%20female%20therapist%20working%20with%20young%20toddler%20child%20with%20autism%20in%20bright%20modern%20therapy%20room%2C%20engaging%20play-based%20early%20intervention%20activity%20with%20colorful%20educational%20toys%2C%20warm%20natural%20window%20lighting%2C%20child%20smiling%20and%20focused%2C%20professional%20yet%20friendly%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20photography%20showing%20authentic%20moment%20of%20learning%20and%20development&width=600&height=400&seq=service-early-intervention-premium&orientation=landscape',
      benefits: [
        'Maximize developmental outcomes',
        'Build foundation skills early',
        'Evidence-based ESDM approach',
        'Family-centered support'
      ]
    },
    {
      icon: 'ri-star-smile-fill',
      color: '#FFC837',
      gradient: 'from-[#FFC837] to-[#FFDD55]',
      title: 'ESDM Therapy',
      description:
        'Early Start Denver Model - a comprehensive, play-based approach proven effective for young children with autism.',
      image:
        'https://readdy.ai/api/search-image?query=Joyful%20young%20child%20with%20autism%20playing%20with%20colorful%20building%20blocks%20during%20ESDM%20therapy%20session%2C%20professional%20therapist%20hands%20visible%20guiding%20play%20activity%2C%20bright%20modern%20therapy%20room%20with%20soft%20natural%20lighting%2C%20warm%20welcoming%20atmosphere%2C%20child%20engaged%20and%20happy%2C%20pastel%20colored%20walls%20with%20simple%20clean%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=service-esdm-therapy-premium&orientation=landscape',
      benefits: [
        'Naturalistic play-based learning',
        'Combines developmental & behavioral strategies',
        'Promotes social communication',
        'Individualized treatment plans'
      ]
    },
    {
      icon: 'ri-chat-smile-3-fill',
      color: '#33C8FF',
      gradient: 'from-[#33C8FF] to-[#0480E8]',
      title: 'Communication Support',
      description:
        'Building language and communication skills through naturalistic strategies and social interaction.',
      image: CommSupportImage,
      benefits: [
        'Develop verbal & non-verbal communication',
        'Build vocabulary naturally',
        'Enhance social interaction skills',
        'Support alternative communication methods'
      ]
    },
    {
      icon: 'ri-emotion-happy-fill',
      color: '#4AD36D',
      gradient: 'from-[#4AD36D] to-[#33C8FF]',
      title: 'Behaviour Support',
      description:
        'Positive behavior strategies to help children thrive in daily routines and manage challenging behaviors.',
      image:
        'https://readdy.ai/api/search-image?query=Professional%20therapist%20helping%20young%20child%20with%20autism%20learn%20emotional%20regulation%20and%20positive%20behavior%2C%20using%20colorful%20emotion%20cards%20and%20visual%20supports%2C%20bright%20modern%20therapy%20room%20with%20natural%20lighting%2C%20child%20calm%20and%20engaged%2C%20warm%20supportive%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=service-behaviour-premium&orientation=landscape',
      benefits: [
        'Positive reinforcement strategies',
        'Reduce challenging behaviors',
        'Build self-regulation skills',
        'Create supportive routines'
      ]
    },
    {
      icon: 'ri-gamepad-fill',
      color: '#FF8A3D',
      gradient: 'from-[#FF8A3D] to-[#FFC837]',
      title: 'Play-Based Learning',
      description:
        'Fun, engaging activities that promote learning through natural play experiences and child-led exploration.',
      image:
        'https://readdy.ai/api/search-image?query=Young%20child%20with%20autism%20engaged%20in%20fun%20play-based%20learning%20activity%20with%20colorful%20toys%20and%20educational%20games%2C%20professional%20therapist%20facilitating%20play%2C%20bright%20modern%20therapy%20room%20with%20natural%20lighting%2C%20child%20laughing%20and%20enjoying%20activity%2C%20warm%20welcoming%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=service-play-based-premium&orientation=landscape',
      benefits: [
        'Learning disguised as fun',
        'Child-led exploration',
        'Natural skill development',
        'Engaging sensory activities'
      ]
    },
    {
      icon: 'ri-run-fill',
      color: '#0480E8',
      gradient: 'from-[#0480E8] to-[#33C8FF]',
      title: 'Motor Skills Development',
      description:
        'Developing fine and gross motor skills through playful movement activities and structured exercises.',
      image:
        'https://readdy.ai/api/search-image?query=Young%20child%20with%20autism%20practicing%20motor%20skills%20development%20with%20colorful%20movement%20activities%20and%20coordination%20exercises%2C%20professional%20therapist%20guiding%20physical%20activity%2C%20bright%20modern%20therapy%20room%20with%20natural%20lighting%2C%20child%20active%20and%20smiling%2C%20warm%20supportive%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography&width=600&height=400&seq=service-motor-skills-premium&orientation=landscape',
      benefits: [
        'Improve coordination & balance',
        'Develop fine motor control',
        'Build strength & endurance',
        'Enhance body awareness'
      ]
    },
    {
      icon: 'ri-parent-fill',
      color: '#FF4F87',
      gradient: 'from-[#FF4F87] to-[#FFC837]',
      title: 'Parent Coaching',
      description:
        "Empowering parents with strategies and techniques to support their child's development at home and in daily routines.",
      image:
        'https://readdy.ai/api/search-image?query=Professional%20therapist%20coaching%20parents%20of%20child%20with%20autism%20in%20bright%20modern%20therapy%20room%2C%20showing%20techniques%20and%20strategies%2C%20parents%20taking%20notes%20and%20engaged%2C%20warm%20supportive%20atmosphere%20with%20colorful%20educational%20materials%20on%20table%2C%20natural%20window%20lighting%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography%20showing%20collaborative%20learning%20moment&width=600&height=400&seq=service-parent-coaching-premium&orientation=landscape',
      benefits: [
        'Learn effective intervention strategies',
        'Build confidence in supporting your child',
        'Implement therapy techniques at home',
        'Strengthen parent-child connection'
      ]
    }
  ];

  const whyMatters = [
    {
      icon: 'ri-time-fill',
      color: '#FF4F87',
      title: 'Early is Better',
      description:
        'Research shows early intervention leads to significantly better outcomes for children with autism.'
    },
    {
      icon: 'ri-heart-fill',
      color: '#FFC837',
      title: 'Individualized Care',
      description:
        "Every child is unique. We create personalized therapy plans tailored to your child's specific needs."
    },
    {
      icon: 'ri-team-fill',
      color: '#33C8FF',
      title: 'Family Partnership',
      description:
        'We empower parents with strategies and support to continue progress at home.'
    }
  ];

  // Build multi-service JSON-LD graph
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://uniquestars.com.au/#organization',
        name: 'Unique Stars',
        url: 'https://uniquestars.com.au',
        logo: 'https://uniquestars.com.au/favicon.ico',
        sameAs: [
          'https://www.instagram.com/uniquestars_earlyintervention?utm_source=qr&igsh=OTIwZXNuMG53YjZn',
          'https://www.linkedin.com/in/sanaz-montazer-8b3352346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
          'https://youtube.com/@uniquestars-n2j?si=eFwnU2vZrzAJzVmd'
        ],
        description:
          'Unique Stars provides early intervention and ESDM therapy for young children with autism in Sydney.'
      },
      // one Service node per service
      ...services.map((s) => ({
        '@type': 'Service',
        name: s.title,
        description: s.description,
        serviceType: s.title,
        provider: { '@id': 'https://uniquestars.com.au/#organization' },
        areaServed: { '@type': 'Place', name: 'Sydney, Australia' }
      }))
    ]
  };

  // helper to produce a safe mailto href (no raw newlines)
  function mailtoFor(serviceTitle: string) {
    const subject = `Request for Free Consultation – Unique Stars (${serviceTitle})`;
    const body = `Hi Sanaz,

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
    return `mailto:admin@uniquestars.com.au?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="Autism Therapy Services in Sydney | Early Intervention & ESDM Therapy"
        description="Explore therapy services including ESDM therapy, early intervention, communication support, behaviour support, play-based learning, and motor skills development for children in Sydney."
        keywords="autism services Sydney, therapy services for autism, early intervention programs, ESDM services Sydney, child development therapy"
        canonical="https://uniquestars.com.au/services"
        openGraph={{
          title: 'Autism Therapy Services in Sydney | Early Intervention & ESDM Therapy',
          description:
            'Explore therapy services including ESDM therapy, early intervention, communication support, behaviour support, play-based learning, and motor skills development for children in Sydney.',
          url: 'https://uniquestars.com.au/services',
          image: '/og-services.jpg'
        }}
        jsonLd={jsonLd}
        faviconHref="/favicon.ico"
      />

      <Navbar />

      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EAF7FF 0%, #FFF7DA 50%, #FFE8F0 100%)',
          minHeight: '60vh'
        }}
      >
        {/* Floating Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[15%] left-[8%] w-16 h-16 flex items-center justify-center animate-float-slow opacity-30"
            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.8))' }}
          >
            <i className="ri-star-fill text-5xl text-[#FFC837]"></i>
          </div>
          <div
            className="absolute top-[25%] right-[12%] w-14 h-14 flex items-center justify-center animate-float-medium opacity-25"
            style={{ animationDelay: '1s' }}
          >
            <i
              className="ri-star-fill text-4xl text-[#FF4F87]"
              style={{ filter: 'drop-shadow(0 0 12px rgba(255, 79, 135, 0.7))' }}
            ></i>
          </div>
          <div
            className="absolute bottom-[30%] left-[15%] w-12 h-12 flex items-center justify-center animate-float-slow opacity-20"
            style={{ animationDelay: '2s' }}
          >
            <i
              className="ri-star-fill text-3xl text-[#4AD36D]"
              style={{ filter: 'drop-shadow(0 0 10px rgba(74, 211, 109, 0.7))' }}
            ></i>
          </div>
          <div
            className="absolute top-[40%] right-[6%] w-16 h-16 flex items-center justify-center animate-float-medium opacity-30"
            style={{ animationDelay: '1.5s' }}
          >
            <i
              className="ri-star-fill text-5xl text-[#33C8FF]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(51, 200, 255, 0.8))' }}
            ></i>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#33C8FF]"
            style={{
              boxShadow:
                '0 8px 30px rgba(51, 200, 255, 0.4), inset 0 2px 10px rgba(51, 200, 255, 0.2)'
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#33C8FF] to-[#0480E8] rounded-full"
              style={{ boxShadow: '0 4px 15px rgba(51, 200, 255, 0.5)' }}
            >
              <i className="ri-service-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">Our Services</span>
          </div>

          <h1
            className="services-hero-heading text-5xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Comprehensive{' '}
            <span
              className="bg-gradient-to-r from-[#33C8FF] via-[#0480E8] to-[#0A2A66] bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(51, 200, 255, 0.3))' }}
            >
              Therapy Services
            </span>
          </h1>
          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Evidence-based early intervention programs designed to help your child reach their full potential
            through play-based learning.
          </p>
        </div>
      </section>


      {/* Premium Services Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center animate-float-slow" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="space-y-20">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="relative rounded-[40px] overflow-hidden border-8 border-[#0A2A66] group-hover:scale-105 transition-all duration-300" style={{ boxShadow: `0 25px 60px ${service.color}40, inset 0 -5px 20px rgba(255,255,255,0.2)` }}>
                      <img src={service.image} alt={service.title} className="w-full h-[400px] object-cover object-center" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A66]/30 via-transparent to-transparent"></div>
                    </div>

                    {/* Floating Star Sticker */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center animate-bounce-slow">
                      <i className="ri-star-fill text-5xl" style={{ color: service.color, filter: `drop-shadow(0 0 15px ${service.color})` }}></i>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6" style={{ background: `linear-gradient(135deg, ${service.color}20 0%, white 100%)`, border: `6px solid ${service.color}`, boxShadow: `0 10px 30px ${service.color}40, inset 0 2px 10px ${service.color}20` }}>
                      <i className={`${service.icon} text-5xl`} style={{ color: service.color }}></i>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {service.title}
                    </h2>

                    <p className="text-[#0A2A66] text-lg leading-relaxed mb-8">{service.description}</p>

                    <div className="space-y-4 mb-8">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: service.color, boxShadow: `0 4px 15px ${service.color}60` }}>
                            <i className="ri-checkbox-circle-fill text-xl text-white"></i>
                          </div>
                          <span className="text-[#0A2A66] text-lg">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={mailtoFor(service.title)}
                      className={`bg-gradient-to-r ${service.gradient} text-white px-10 py-5 rounded-full font-extrabold text-lg hover:scale-105 transition-all inline-flex items-center gap-3 whitespace-nowrap cursor-pointer border-4 border-[#0A2A66]`}
                      style={{ boxShadow: `0 10px 35px ${service.color}60, inset 0 2px 10px rgba(255,255,255,0.3)` }}
                    >
                      <i className="ri-mail-fill text-2xl"></i>
                      Book this Service
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Why <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">This Matters</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">The importance of early intervention therapy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {whyMatters.map((item, index) => (
              <div key={index} className="group relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-star-fill text-3xl" style={{ color: item.color, filter: `drop-shadow(0 0 10px ${item.color})` }}></i>
                </div>

                <div className="bg-white rounded-[40px] p-10 hover:scale-105 transition-all duration-300 border-6 h-full cursor-pointer" style={{ borderColor: item.color, boxShadow: `0 20px 50px ${item.color}30, inset 0 -5px 20px ${item.color}10` }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ background: `linear-gradient(135deg, ${item.color}20 0%, white 100%)`, border: `4px solid ${item.color}`, boxShadow: `0 10px 30px ${item.color}40, inset 0 2px 10px ${item.color}20` }}>
                    <i className={`${item.icon} text-5xl`} style={{ color: item.color }}></i>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0A2A66] mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden premium-cta-section">
        {/* Glowing Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2
            className="premium-cta-heading text-5xl lg:text-7xl font-extrabold text-white mb-8"
            style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            Ready to Get {' '}
            <span
              className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 200, 55, 0.6))' }}
            >
              Started?
            </span>
          </h2>
          <p
            className="text-white text-2xl mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            Book a free consultation to discuss which services are right for your child
          </p>
          <a
            href={mailtoFor()}
            className="cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
            style={{
              boxShadow:
                '0 15px 50px rgba(255, 200, 55, 0.6), inset 0 2px 15px rgba(255, 255, 255, 0.5)'
            }}
            aria-label="Book Free Consultation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-mail-fill text-4xl"></i>
            <span>Book Free Consultation</span>
          </a>
        </div>
      </section>


      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes float-slow { 0%, 100% { transform: translateY(0px);} 50% { transform: translateY(-30px);} }
        @keyframes float-medium { 0%, 100% { transform: translateY(0px);} 50% { transform: translateY(-20px);} }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0px) scale(1);} 50% { transform: translateY(-15px) scale(1.1);} }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1);} 50% { opacity: 1; transform: scale(1.5);} }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

        /* Mobile-only CTA adjustments (<= 768px) */
        @media (max-width: 768px) {
          /* 3) CTA Button adjustments on mobile */
          .cta-button {
            width: calc(100% - 2rem) !important;
            max-width: 520px !important;
            padding: 0.85rem 1rem !important;
            font-size: 1.1rem !important;
            gap: 0.75rem !important;
            justify-content: center !important;

            /* REMOVE BORDER ON MOBILE */
            border: none !important;
            border-width: 0 !important;

            /* maintain the rounded look and shadow */
            border-radius: 9999px !important;
            box-sizing: border-box !important;
          }

          /* slightly smaller icon on mobile */
          .cta-button i {
            font-size: 1.7rem !important;
          }
        }

        /* === Premium CTA: 320px – 375px — slightly larger but still compact === */
        @media (min-width: 320px) and (max-width: 375px) {
          .premium-cta-section .premium-cta-heading {
            font-size: 2.6rem !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .premium-cta-section .premium-cta-heading span {
            font-size: 1em !important;
          }

          .premium-cta-section .cta-button {
            font-size: 1.05rem !important;
            padding: 0.85rem 1.2rem !important;
          }
          .premium-cta-section .cta-button i {
            font-size: 1.6rem !important;
          }
        }

        /* === Services Hero: <320px — smaller heading === */
        @media (max-width: 319px) {
          .services-hero-heading {
            font-size: 2.1rem !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .services-hero-heading span {
            font-size: 1em !important;
          }
        }

        /* === Services Hero: 320px – 420px — slightly larger but still compact === */
        @media (min-width: 320px) and (max-width: 420px) {
          .services-hero-heading {
            font-size: 2.1rem !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .services-hero-heading span {
            font-size: 1em !important;
          }
        }
      `}</style>

    </div>
  );
}
