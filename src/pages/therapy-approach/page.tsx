// src/pages/therapy-approach/page.tsx
import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import React from 'react';
import yellowTarget from '../../assets/icons/yellow-target.png';

export default function TherapyApproach() {
  const esdmFeatures = [
    {
      icon: 'ri-gamepad-fill',
      color: '#FFC837',
      title: 'Play-Based Learning',
      description: "Learning happens naturally through fun, engaging play activities that capture your child's interest."
    },
    {
      icon: 'ri-eye-fill',
      color: '#33C8FF',
      title: 'Joint Attention',
      description: 'Building shared focus and engagement through interactive activities and social games.'
    },
    {
      icon: 'ri-puzzle-fill',
      color: '#FF4F87',
      title: 'Structured Play',
      description: 'Carefully designed activities that target specific developmental goals while remaining fun.'
    },
    {
      icon: 'ri-parent-fill',
      color: '#4AD36D',
      title: 'Parent Involvement',
      description: 'Empowering parents with strategies to continue learning at home and in daily routines.'
    }
  ];

  const techniques = [
    {
      icon: 'ri-brain-fill',
      color: '#FF8A3D',
      title: 'Naturalistic Intervention',
      description: 'Teaching happens in natural, everyday situations that are meaningful to your child.'
    },
    {
      icon: 'ri-hand-heart-fill',
      color: '#33C8FF',
      title: 'Sensory Engagement',
      description: 'Using sensory-rich activities to promote learning and development.'
    },
    {
      icon: 'ri-user-heart-fill',
      color: '#FF4F87',
      title: 'Responsive Interactions',
      description: "Following your child's lead and responding to their interests and communication attempts."
    },
    {
      icon: 'ri-star-smile-fill',
      color: '#4AD36D',
      title: 'Positive Reinforcement',
      description: 'Celebrating successes and building confidence through encouragement and praise.'
    }
  ];

  const benefits = [
    'Improved social communication skills',
    'Enhanced language development',
    'Better joint attention and engagement',
    'Increased imitation skills',
    'Improved play skills',
    'Better emotional regulation',
    'Enhanced cognitive abilities',
    'Stronger parent-child relationships'
  ];

  const sessionSteps = [
    {
      icon: 'ri-file-list-3-fill',
      color: '#33C8FF',
      title: 'Assessment',
      description: "Comprehensive evaluation of your child's current skills and needs"
    },
    {
      icon: 'ri-target-fill',
      imgSrc: yellowTarget,       
      color: '#FFC837',
      title: 'Goal Setting',
      description: 'Creating personalized, achievable goals based on assessment results'
    },
    {
      icon: 'ri-gamepad-fill',
      color: '#FF4F87',
      title: 'Play Sessions',
      description: 'Engaging therapy sessions disguised as fun play activities'
    },
    {
      icon: 'ri-line-chart-fill',
      color: '#4AD36D',
      title: 'Progress Review',
      description: 'Regular monitoring and adjustment of goals based on progress'
    }
  ];

  const whyWorks = [
    {
      icon: 'ri-brain-fill',
      color: '#FF4F87',
      title: 'Evidence-Based',
      description: 'ESDM is backed by extensive research showing significant improvements in children with autism.'
    },
    {
      icon: 'ri-heart-pulse-fill',
      color: '#FFC837',
      title: 'Early Intervention',
      description: 'Starting therapy early maximizes brain plasticity and developmental outcomes.'
    },
    {
      icon: 'ri-emotion-happy-fill',
      color: '#33C8FF',
      title: 'Child-Centered',
      description: "We follow your child's interests and motivations to make learning enjoyable and effective."
    }
  ];

  // safe mailto generator (no literal newlines)
  function mailtoFor(subjectSuffix = 'ESDM Consultation') {
    const subject = `Request for Free Consultation – Unique Stars (${subjectSuffix})`;
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
    return `mailto:admin@uniquestars.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="Our Therapy Approach | Play-Based & ESDM Autism Therapy in Sydney"
        description="Discover how Unique Stars uses play-based therapy, ESDM, and personalised learning plans to help children with autism build communication, behaviour, social, and motor skills."
        keywords="therapy approach Sydney, ESDM method, play-based autism therapy, developmental therapy, child behaviour therapy Sydney"
        canonical="https://uniquestars.com.au/therapy-approach"
        openGraph={{
          title: 'Our Therapy Approach | Play-Based & ESDM Autism Therapy in Sydney',
          description:
            'Discover how Unique Stars uses play-based therapy, ESDM, and personalised learning plans to help children with autism build communication, behaviour, social, and motor skills.',
          url: 'https://uniquestars.com.au/therapy-approach',
          image: '/og-therapy-approach.jpg'
        }}
        // include structured data for the ESDM method and therapy approach
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: 'Our Therapy Approach',
              description: 'Play-based and ESDM early intervention approach used at Unique Stars.'
            },
            {
              '@type': 'MedicalTherapy',
              name: 'Early Start Denver Model (ESDM)',
              description: 'ESDM supports young children with autism through structured play, communication building and behavioural development.'
            }
          ]
        }}
        faviconHref="/favicon.ico"
      />

      <Navbar />

      {/* Premium Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFE8F0 0%, #FFF7DA 50%, #EAF7FF 100%)',
          minHeight: '60vh'
        }}
      >
        {/* Floating ESDM-themed icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-16 h-16 flex items-center justify-center animate-float-slow opacity-30">
            <i className="ri-star-fill text-5xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.8))' }}></i>
          </div>
          <div className="absolute top-[25%] right-[12%] w-14 h-14 flex items-center justify-center animate-float-medium opacity-25" style={{ animationDelay: '1s' }}>
            <i className="ri-puzzle-fill text-4xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 79, 135, 0.7))' }}></i>
          </div>
          <div className="absolute bottom-[30%] left-[15%] w-12 h-12 flex items-center justify-center animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <i className="ri-hand-heart-fill text-3xl text-[#4AD36D]" style={{ filter: 'drop-shadow(0 0 10px rgba(74, 211, 109, 0.7))' }}></i>
          </div>
          <div className="absolute top-[40%] right-[6%] w-16 h-16 flex items-center justify-center animate-float-medium opacity-30" style={{ animationDelay: '1.5s' }}>
            <i className="ri-heart-fill text-5xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 15px rgba(51, 200, 255, 0.8))' }}></i>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#FF4F87]" style={{ boxShadow: '0 8px 30px rgba(255, 79, 135, 0.4), inset 0 2px 10px rgba(255, 79, 135, 0.2)' }}>
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FF4F87] to-[#FF8A3D] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255, 79, 135, 0.5)' }}>
              <i className="ri-lightbulb-flash-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">Our Method</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Therapy <span className="bg-gradient-to-r from-[#FF4F87] via-[#FF8A3D] to-[#FFC837] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 79, 135, 0.3))' }}>Approach</span>
          </h1>
          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Evidence-based, play-based therapy that helps children with autism reach their full potential through the Early Start Denver Model (ESDM).
          </p>
        </div>
      </section>

      {/* Play-Based Therapy Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 flex items-center justify-center opacity-10">
          <i className="ri-gamepad-fill text-8xl text-[#FFC837]"></i>
        </div>
        <div className="absolute bottom-10 left-10 w-20 h-20 flex items-center justify-center opacity-10">
          <i className="ri-star-fill text-7xl text-[#FF4F87]"></i>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-[50px] overflow-hidden border-8 border-[#FFC837]" style={{ boxShadow: '0 30px 70px rgba(255, 200, 55, 0.4), inset 0 -5px 20px rgba(255, 255, 255, 0.2)' }}>
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20female%20therapist%20playing%20with%20young%20child%20with%20autism%20using%20colorful%20educational%20toys%20and%20building%20blocks%20in%20bright%20modern%20therapy%20room%2C%20child%20smiling%20and%20engaged%20in%20play-based%20learning%20activity%2C%20warm%20natural%20lighting%2C%20joyful%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography%20showing%20authentic%20moment%20of%20therapeutic%20play&width=600&height=500&seq=therapy-play-based-premium&orientation=landscape"
                  alt="Play-Based Therapy"
                  className="w-full h-[500px] object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFC837]/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Star Stickers */}
              <div className="absolute -top-6 -right-6 w-12 h-12 flex items-center justify-center animate-bounce-slow">
                <i className="ri-star-fill text-5xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.9))' }}></i>
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 flex items-center justify-center animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                <i className="ri-star-fill text-5xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 79, 135, 0.9))' }}></i>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-5xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Play-Based <span className="bg-gradient-to-r from-[#FFC837] to-[#FF8A3D] bg-clip-text text-transparent">Therapy</span>
              </h2>
              <p className="text-[#0A2A66] text-lg leading-relaxed mb-6">
                At Unique Stars, we believe that learning should be fun! Our play-based therapy approach uses your child's natural interests and motivations to teach essential skills in an engaging, enjoyable way.
              </p>
              <p className="text-[#0A2A66] text-lg leading-relaxed mb-6">
                Through carefully designed play activities, we target communication, social interaction, cognitive skills, and behavior goals. Your child won't even realize they're learning – they'll just think they're having fun!
              </p>
              <p className="text-[#0A2A66] text-lg leading-relaxed">
                This naturalistic approach is more effective than traditional table-based therapy because it happens in contexts that are meaningful and motivating to your child, leading to better generalization of skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is ESDM Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden">
        {/* Star Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white rounded-full animate-twinkle" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}></div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10 what-esdm-hero">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              What is <span className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,55,0.6))' }}>ESDM?</span>
            </h2>
            <p className="text-white/95 text-xl max-w-3xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              The Early Start Denver Model is a comprehensive, evidence-based early intervention approach for young children with autism, combining developmental and behavioral strategies.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-[50px] p-12 border-4 border-white/30" style={{ boxShadow: '0 30px 70px rgba(0,0,0,0.3), inset 0 2px 20px rgba(255,255,255,0.2)' }}>
            <div className="grid md:grid-cols-2 gap-8 text-white">
              <div>
                <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255,200,55,0.5)' }}>
                    <i className="ri-checkbox-circle-fill text-2xl text-[#0A2A66]"></i>
                  </div>
                  Research-Backed
                </h3>
                <p className="text-white/90 leading-relaxed">
                  ESDM is supported by extensive research showing significant improvements in IQ, language, and social skills in young children with autism.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255,200,55,0.5)' }}>
                    <i className="ri-checkbox-circle-fill text-2xl text-[#0A2A66]"></i>
                  </div>
                  Comprehensive
                </h3>
                <p className="text-white/90 leading-relaxed">
                  ESDM targets all developmental domains: communication, social skills, play, cognition, fine and gross motor skills, and adaptive behavior.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255,200,55,0.5)' }}>
                    <i className="ri-checkbox-circle-fill text-2xl text-[#0A2A66]"></i>
                  </div>
                  Individualized
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Every child receives a personalized treatment plan based on their unique strengths, needs, and family priorities.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255,200,55,0.5)' }}>
                    <i className="ri-checkbox-circle-fill text-2xl text-[#0A2A66]"></i>
                  </div>
                  Family-Centered
                </h3>
                <p className="text-white/90 leading-relaxed">
                  Parents are active partners in therapy, learning strategies to support their child's development throughout daily routines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How ESDM Works */}
      <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              How <span className="bg-gradient-to-r from-[#33C8FF] to-[#0480E8] bg-clip-text text-transparent">ESDM Works</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">Four key components that make ESDM effective</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {esdmFeatures.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-star-fill text-3xl" style={{ color: feature.color, filter: `drop-shadow(0 0 10px ${feature.color})` }}></i>
                </div>

                <div className="bg-white rounded-[40px] p-8 hover:scale-105 transition-all duration-300 border-6 h-full cursor-pointer" style={{ borderColor: feature.color, boxShadow: `0 20px 50px ${feature.color}30, inset 0 -5px 20px ${feature.color}10` }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ background: `linear-gradient(135deg, ${feature.color}20 0%, white 100%)`, border: `4px solid ${feature.color}`, boxShadow: `0 10px 30px ${feature.color}40, inset 0 2px 10px ${feature.color}20` }}>
                    <i className={`${feature.icon} text-5xl`} style={{ color: feature.color }}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0A2A66] mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESDM Techniques */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              ESDM <span className="bg-gradient-to-r from-[#FF8A3D] to-[#FFC837] bg-clip-text text-transparent">Techniques</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">Core strategies we use in every session</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techniques.map((technique, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-[40px] p-8 hover:scale-105 transition-all duration-300 border-6 h-full cursor-pointer" style={{ borderColor: technique.color, boxShadow: `0 20px 50px ${technique.color}30, inset 0 -5px 20px ${technique.color}10` }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-full mb-6 mx-auto" style={{ backgroundColor: technique.color, boxShadow: `0 10px 30px ${technique.color}60, inset 0 2px 10px rgba(255,255,255,0.3)` }}>
                    <i className={`${technique.icon} text-5xl text-white`}></i>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#0A2A66] mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {technique.title}
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center">{technique.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of ESDM */}
      <section className="py-24 bg-gradient-to-br from-[#FFF7DA] via-white to-[#FFE8F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center animate-float-slow" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10 benefits-hero">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Side */}
            <div>
              <h2 className="text-5xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Benefits of <span className="bg-gradient-to-r from-[#4AD36D] to-[#33C8FF] bg-clip-text text-transparent">ESDM</span>
              </h2>
              <p className="text-[#0A2A66] text-lg leading-relaxed mb-8">
                Research shows that children who receive ESDM therapy experience significant improvements across multiple developmental areas:
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white rounded-3xl p-5 border-4 border-[#4AD36D] hover:scale-105 transition-all cursor-pointer" style={{ boxShadow: '0 10px 30px rgba(74, 211, 109, 0.2)' }}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0" style={{ backgroundColor: '#4AD36D', boxShadow: '0 4px 15px rgba(74, 211, 109, 0.6)' }}>
                      <i className="ri-star-fill text-xl text-white"></i>
                    </div>
                    <span className="text-[#0A2A66] text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-[50px] overflow-hidden border-8 border-[#4AD36D]" style={{ boxShadow: '0 30px 70px rgba(74, 211, 109, 0.4), inset 0 -5px 20px rgba(255,255,255,0.2)' }}>
                <img src="https://readdy.ai/api/search-image?query=Happy%20young%20child%20with%20autism%20showing%20progress%20and%20development%20during%20ESDM%20therapy%20session%2C%20smiling%20and%20engaged%20with%20colorful%20learning%20materials%2C%20professional%20therapist%20celebrating%20success%2C%20bright%20modern%20therapy%20room%20with%20natural%20lighting%2C%20warm%20joyful%20atmosphere%2C%20clean%20simple%20background%2C%20high%20quality%20professional%20photography&width=600&height=700&seq=esdm-benefits-premium&orientation=portrait" alt="ESDM Benefits" className="w-full h-[700px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4AD36D]/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stars */}
              <div className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center animate-bounce-slow">
                <i className="ri-star-fill text-5xl text-[#4AD36D]" style={{ filter: 'drop-shadow(0 0 15px rgba(74, 211, 109, 0.9))' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ESDM Session Flow - Premium Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              ESDM <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">Session Flow</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">Our structured approach to every therapy session</p>
          </div>

          <div className="relative">
            {/* Curved Path */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#33C8FF] via-[#FFC837] via-[#FF4F87] to-[#4AD36D] transform -translate-x-1/2 hidden lg:block" style={{ boxShadow: '0 0 20px rgba(255,200,55,0.5)' }}></div>

            <div className="space-y-16">
              {sessionSteps.map((step, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Card */}
                  <div className="flex-1">
                    <div className={`bg-white rounded-[40px] p-10 border-6 hover:scale-105 transition-all duration-300 cursor-pointer ${index % 2 === 0 ? 'lg:ml-auto lg:mr-8' : 'lg:mr-auto lg:ml-8'}`} style={{ borderColor: step.color, boxShadow: `0 20px 50px ${step.color}30, inset 0 -5px 20px ${step.color}10`, maxWidth: '500px' }}>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 flex items-center justify-center rounded-3xl flex-shrink-0" style={{ background: `linear-gradient(135deg, ${step.color}20 0%, white 100%)`, border: `4px solid ${step.color}`, boxShadow: `0 10px 30px ${step.color}40, inset 0 2px 10px ${step.color}20`, color: step.color }}>
                          {step.imgSrc ? (
                            <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color }}>
                              <img src={step.imgSrc} alt={`${step.title} icon`} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                            </div>
                          ) : (
                            <i className={`${step.icon} text-5xl`} style={{ color: step.color }}></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-extrabold text-[#0A2A66] mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>{step.title}</h3>
                          <p className="text-[#0A2A66] leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle with Number */}
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full text-3xl font-extrabold text-white animate-pulse-glow" style={{ backgroundColor: step.color, boxShadow: `0 0 30px ${step.color}, 0 10px 30px ${step.color}60`, fontFamily: 'Nunito, sans-serif' }}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why ESDM Works at Unique Stars */}
      <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden">
        {/* Star Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="absolute w-2 h-2 bg-white rounded-full animate-twinkle" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}></div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Why ESDM Works at <span className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 0 20px rgba(255,200,55,0.6))' }}>Unique Stars</span>
            </h2>
            <p className="text-white/95 text-xl max-w-3xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              Our specialized approach combines ESDM certification with genuine care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {whyWorks.map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-[40px] p-10 hover:scale-105 transition-all duration-300 border-4 border-white/30 h-full cursor-pointer" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 2px 20px rgba(255,255,255,0.2)' }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-full mb-6 mx-auto" style={{ backgroundColor: item.color, boxShadow: `0 10px 30px ${item.color}80, inset 0 2px 10px rgba(255,255,255,0.3)` }}>
                    <i className={`${item.icon} text-5xl text-white`}></i>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>{item.title}</h3>
                  <p className="text-white/90 leading-relaxed text-center text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-extrabold text-[#0A2A66] mb-8" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Ready to <span className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent">Begin?</span>
          </h2>
          <p className="text-[#0A2A66] text-2xl mb-12 max-w-2xl mx-auto">Start your child's ESDM therapy journey with a free consultation</p>
          <a
            href={mailtoFor('ESDM Consultation')}
            className="cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
            style={{ boxShadow: '0 15px 50px rgba(255,200,55,0.6), inset 0 2px 15px rgba(255,255,255,0.5)' }}
          >
            <i className="ri-mail-fill text-4xl"></i>
            <span>Book Free Consultation</span>
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
        @keyframes float-medium { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-15px) scale(1.1); } }
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 30px currentColor, 0 10px 30px currentColor; } 50% { box-shadow: 0 0 50px currentColor, 0 10px 50px currentColor; } }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

        /* Mobile-only CTA adjustments (<= 768px) */
        @media (max-width: 768px) {
          /* 1) Keep "What is ESDM?" on single line on mobile */
          .what-esdm-hero h2 { white-space: nowrap !important; overflow: visible !important; text-overflow: clip !important; font-size: 3rem !important; line-height: 1.02 !important; }
          .what-esdm-hero h2 span { display: inline-block !important; }

          /* 2) Center "Benefits of ESDM" heading on mobile only */
          .benefits-hero h2 { text-align: center !important; font-size: 3rem !important; line-height: 1.05 !important; }

          .what-esdm-hero, .benefits-hero { padding-left: 1rem !important; padding-right: 1rem !important; }

          /* 3) CTA Button adjustments on mobile */
          .cta-button {
            width: calc(100% - 2rem) !important;
            max-width: 520px !important;
            padding: 0.85rem 1rem !important;
            font-size: 1.1rem !important;
            gap: 0.75rem !important;
            justify-content: center !important;
            border: none !important;
            border-width: 0 !important;
            border-radius: 9999px !important;
            box-sizing: border-box !important;
          }
          .cta-button i { font-size: 1.7rem !important; }
        }
      `}</style>
    </div>
  );
}
