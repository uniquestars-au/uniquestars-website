import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

// === Local testimonial images (update filenames/paths to match your assets) ===
import MarieImg from '../../assets/testimonial-marie.jpg';
import MichaelImg from '../../assets/testimonial-michael.jpg';
import MadhuImg from '../../assets/testimonial-madhu.jpg';
import EmmaImg from '../../assets/testimonial-emma.jpg';
import JessicaImg from '../../assets/testimonial-jessica.jpg';
import AndrewImg from '../../assets/testimonial-andrew.jpg';

export default function Testimonials() {
  const testimonialsJsonLd = [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Parent Name" },
      "datePublished": "2024-09-10",
      "reviewBody": "Our child made great progress after ESDM sessions at Unique Stars...",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
    }
  ];

  const testimonials = [
    {
      name: 'Marie',
      role: 'Mother of 3-year-old',
      image: MarieImg,
      quote: 'In just four sessions, the progress has been wonderful. My son is making great eye contact and is much more responsive to the educators. He is communicating well and, most importantly, he is now socializing with his peers. We are thrilled with the changes.',
      rating: 5,
      color: '#FF4F87'
    },
    {
      name: 'Michael',
      role: 'Father of 5-year-old',
      image: MichaelImg,
      quote: 'In just three sessions, we have seen incredible changes. My daughter is already showing more independence, like brushing her teeth by herself, and she is spending much less time alone in her room. She is significantly more vocal and, best of all, she actively wants to play with her dad and brother now. The progress has been amazing to watch.',
      rating: 5,
      color: '#FFC837'
    },
    {
      name: 'Madhu',
      role: 'Father of 3-year-old',
      image: MadhuImg,
      quote: 'My son has improved a lot on eye contact, answering questions, listening and understanding as well. He is able to understand and follow instructions better. I am so glad he is learning to play different new games, following the rules of the games as well.Thank you for all your hard work and supporting him in his journey.',
      rating: 5,
      color: '#4AD36D'
    },
    {
      name: 'Emma L.',
      role: 'Mother of 4-year-old',
      image: EmmaImg,
      quote: 'The play-based approach at Unique Stars is brilliant. My son actually looks forward to therapy sessions because they\'re so fun! His social skills and communication have improved dramatically.',
      rating: 5,
      color: '#33C8FF'
    },
    {
      name: 'Jessica R.',
      role: 'Mother of 2-year-old',
      image: JessicaImg,
      quote: 'Finding Unique Stars was the best decision we made. The family-centered approach means we\'re all involved in our daughter\'s progress. She\'s now engaging with us in ways we never thought possible.',
      rating: 5,
      color: '#FF8A3D'
    },
    {
      name: 'Andrew W.',
      role: 'Father of 4-year-old',
      image: AndrewImg,
      quote: 'We are incredibly grateful for Sanaz\'s amazing support. In just a few months, our son has grown, learned, and thrived. She is patient, caring, and genuinely invested in his progress. Sanaz has given us practical strategies and changed the lives of our whole family. Thank you for believing in him! 💛',
      rating: 5,
      color: '#0480E8'
    }
  ];

  const impactStories = [
    {
      title: 'From Non-Verbal to Speaking',
      description: 'A 3-year-old boy who was completely non-verbal began using words within 2 months of ESDM therapy. After 6 months, he was using 3-4 word sentences and engaging in back-and-forth conversations with his family.',
      icon: 'ri-chat-smile-3-fill',
      color: '#FFC837',
      gradient: 'from-[#FFC837] to-[#FFDD55]'
    },
    {
      title: 'Building Social Connections',
      description: 'A 4-year-old girl who avoided eye contact and social interaction now actively seeks out play with peers, makes eye contact naturally, and shows empathy towards others.',
      icon: 'ri-team-fill',
      color: '#33C8FF',
      gradient: 'from-[#33C8FF] to-[#0480E8]'
    },
    {
      title: 'Reducing Challenging Behaviors',
      description: 'A 2-year-old boy with frequent meltdowns learned self-regulation strategies through play-based therapy. His parents now have tools to help him manage emotions in daily situations.',
      icon: 'ri-emotion-happy-fill',
      color: '#4AD36D',
      gradient: 'from-[#4AD36D] to-[#33C8FF]'
    },
    {
      title: 'Developing Independence',
      description: 'A 3-year-old girl who needed constant support now completes daily routines independently, from getting dressed to eating meals, giving her confidence and her family peace of mind.',
      icon: 'ri-star-smile-fill',
      color: '#FF4F87',
      gradient: 'from-[#FF4F87] to-[#FF8A3D]'
    }
  ];

  // encoded subject & body for mailto (no newlines inside the mailto: string)
  const mailtoHrefBase = `mailto:admin@uniquestars.com.au?subject=${encodeURIComponent(
    'Request for Free Consultation – Unique Stars'
  )}&body=${encodeURIComponent(`Hi Sanaz,

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
[Parent Name]`)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="Parent Testimonials | Autism Therapy Sydney | Unique Stars"
        description="Hear from parents whose children have flourished with Unique Stars' early intervention and ESDM therapy programs in Sydney."
        keywords="autism therapy reviews Sydney, parent testimonials, early intervention feedback, ESDM therapy results"
        canonical="https://uniquestars.com.au/testimonials"
        openGraph={{
          title: "Parent Testimonials | Autism Therapy Sydney | Unique Stars",
          description: "Hear from parents whose children have flourished with Unique Stars' early intervention and ESDM therapy programs in Sydney.",
          url: "https://uniquestars.com.au/testimonials",
          image: "/og-testimonials.jpg"
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "name": "Testimonials & Success Stories - Unique Stars",
              "description": "Parent testimonials and success stories from Unique Stars ESDM therapy."
            },
            // embed individual reviews (use your dynamic array)
            ...testimonialsJsonLd
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
        {/* Star Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 flex items-center justify-center animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: 0.2
              }}
            >
              <i
                className="ri-star-fill text-2xl text-[#FFC837]"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 200, 55, 0.6))' }}
              ></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#FF4F87]"
            style={{
              boxShadow:
                '0 8px 30px rgba(255, 79, 135, 0.4), inset 0 2px 10px rgba(255, 79, 135, 0.2)'
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FF4F87] to-[#FF8A3D] rounded-full"
              style={{ boxShadow: '0 4px 15px rgba(255, 79, 135, 0.5)' }}
            >
              <i className="ri-heart-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">Parent Reviews</span>
          </div>

          <h1
            className="parent-hero-heading text-6xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Parent{' '}
            <span
              className="bg-gradient-to-r from-[#FF4F87] via-[#FF8A3D] to-[#FFC837] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(255, 79, 135, 0.3))'
              }}
            >
              Testimonials
            </span>
          </h1>
          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Real stories from families whose children have thrived with our ESDM therapy approach.
          </p>
        </div>
      </section>

      {/* Testimonial Grid */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            >
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group">
                <div
                  className="bg-white rounded-[40px] p-10 hover:scale-105 transition-all duration-300 border-6 h-full cursor-pointer relative overflow-hidden"
                  style={{
                    borderColor: testimonial.color,
                    boxShadow: `0 20px 50px ${testimonial.color}30, inset 0 -5px 20px ${testimonial.color}10`
                  }}
                >
                  {/* Star Pattern Background */}
                  <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center opacity-10">
                    <i
                      className="ri-star-fill text-5xl"
                      style={{ color: testimonial.color }}
                    ></i>
                  </div>

                  {/* Gradient Top Border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-2 rounded-t-[40px]"
                    style={{ backgroundColor: testimonial.color }}
                  ></div>

                  {/* Profile Image with Glowing Circle */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden border-4 relative"
                      style={{
                        borderColor: testimonial.color,
                        boxShadow: `0 8px 25px ${testimonial.color}60, inset 0 2px 10px ${testimonial.color}20`
                      }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        /* ⬇️ Move images 2, 4, 6 (indexes 1,3,5) slightly down so faces are clearer */
                        style={{
                          objectPosition:
                            index === 1 || index === 3 || index === 5
                              ? 'center 15%'
                              : 'center'
                        }}
                      />
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i
                        key={i}
                        className="ri-star-fill text-2xl"
                        style={{ color: testimonial.color }}
                      ></i>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#0A2A66] leading-relaxed mb-6 text-center italic">
                    "{testimonial.quote}"
                  </p>

                  {/* Gradient Divider */}
                  <div
                    className="h-1 w-20 mx-auto rounded-full mb-4"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${testimonial.color} 50%, transparent 100%)`
                    }}
                  ></div>

                  {/* Name & Role */}
                  <div className="text-center">
                    <h3
                      className="text-xl font-extrabold text-[#0A2A66] mb-1"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    >
                      {testimonial.name}
                    </h3>
                    <p className="text-[#0A2A66]/70 font-semibold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Impact Stories */}
      <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Real{' '}
              <span className="bg-gradient-to-r from-[#4AD36D] to-[#33C8FF] bg-clip-text text-transparent">
                Impact Stories
              </span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
              Transformative outcomes from our ESDM therapy programs
            </p>
          </div>

          <div className="space-y-8">
            {impactStories.map((story, index) => (
              <div key={index} className="group">
                <div
                  className={`bg-gradient-to-r ${story.gradient} rounded-[40px] p-12 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] cursor-pointer relative overflow-hidden`}
                  style={{
                    boxShadow: `0 25px 60px ${story.color}40, inset 0 -5px 20px rgba(255,255,255,0.3)`
                  }}
                >
                  {/* Decorative Stars */}
                  <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center opacity-20">
                    <i className="ri-star-fill text-4xl text-white"></i>
                  </div>
                  <div className="absolute bottom-6 left-6 w-8 h-8 flex items-center justify-center opacity-20">
                    <i className="ri-star-fill text-3xl text-white"></i>
                  </div>

                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div
                      className="w-24 h-24 flex items-center justify-center rounded-3xl flex-shrink-0"
                      style={{
                        backgroundColor: 'white',
                        boxShadow: `0 10px 30px ${story.color}60, inset 0 2px 10px ${story.color}30`
                      }}
                    >
                      <i
                        className={`${story.icon} text-6xl`}
                        style={{ color: story.color }}
                      ></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3
                        className="text-3xl font-extrabold text-white mb-4"
                        style={{
                          fontFamily: 'Nunito, sans-serif',
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                      >
                        {story.title}
                      </h3>
                      <p className="text-white/95 text-lg leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden">
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
                boxShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
            ></div>
          ))}
        </div>

        {/* Large Floating Stars */}
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
            className="ri-star-fill text-8xl text-[#FF4F87]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,79,135,0.8))' }}
          ></i>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2
            className="text-5xl lg:text-7xl font-extrabold text-white mb-8"
            style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 4px 30px rgba(0,0,0,0.3)'
            }}
          >
            Start Your{' '}
            <span
              className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255,200,55,0.6))'
              }}
            >
              Success Story
            </span>
          </h2>
          <p
            className="text-white text-2xl mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            Join hundreds of families who have seen incredible progress with our ESDM therapy
          </p>
          <a
            href={mailtoHrefBase}
            className="cta-button testimonials-cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
            style={{
              boxShadow:
                '0 15px 50px rgba(255, 200, 55, 0.6), inset 0 2px 15px rgba(255,255,255,0.5)'
            }}
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
        @keyframes twinkle { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }

        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }

        @media (max-width: 768px) {
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

        @media (max-width: 480px) {
          .space-y-8 .group > div {
            padding: 3.5rem 1.3rem !important;
            border-width: 0 !important;
            border-radius: 40px !important;
            box-shadow: 0 22px 50px rgba(10, 42, 102, 0.08) !important;
          }
          .space-y-8 .group .flex.items-start {
            flex-direction: row !important;
            align-items: flex-start !important;
            gap: 1rem !important;
          }
          .space-y-8 .group .w-24 {
            width: 84px !important;
            height: 84px !important;
            min-width: 84px !important;
            border-radius: 18px !important;
          }
          .space-y-8 .group h3 {
            font-size: 1.8rem !important;
            line-height: 1.3 !important;
            margin: 0 0 1rem 0 !important;
            font-weight: 900 !important;
            color: #ffffff !important;
          }
          .space-y-8 .group p {
            font-size: 1.2rem !important;
            line-height: 1.7 !important;
            color: rgba(255,255,255,0.95) !important;
          }
          .space-y-8 .group > div:hover { transform: none !important; }
        }

        /* === Parent Testimonials: <320px — smaller hero title & impact card typography === */
        @media (max-width: 319px) {
          .parent-hero-heading {
            font-size: 2.3rem !important;
            line-height: 1.18 !important;
            word-break: break-word !important;
          }
          .parent-hero-heading span {
            font-size: 1em !important;
          }

          .space-y-8 .group .w-24 {
            width: 70px !important;
            height: 70px !important;
            min-width: 70px !important;
            border-radius: 16px !important;
          }
          .space-y-8 .group .w-24 i {
            font-size: 2.2rem !important;
          }
          .space-y-8 .group h3 {
            font-size: 1.1rem !important;
            line-height: 1.3 !important;
          }
          .space-y-8 .group p {
            font-size: 0.75rem !important;
            line-height: 1.55 !important;
          }

          /* Smaller CTA text & icon for testimonials CTA button */
          .testimonials-cta-button {
            font-size: 0.95rem !important;
            padding: 0.8rem 1.5rem !important;
            gap: 0.6rem !important;
          }
          .testimonials-cta-button i {
            font-size: 1.4rem !important;
          }
          .testimonials-cta-button span {
            font-size: 0.95rem !important;
          }
        }

        /* === Parent Testimonials: 320px – 420px — slightly larger but still compact === */
        @media (min-width: 320px) and (max-width: 420px) {
          .parent-hero-heading {
            font-size: 2.7rem !important;
            line-height: 1.18 !important;
            word-break: break-word !important;
          }
          .parent-hero-heading span {
            font-size: 1em !important;
          }

          .space-y-8 .group .w-24 {
            width: 78px !important;
            height: 78px !important;
            min-width: 78px !important;
            border-radius: 18px !important;
          }
          .space-y-8 .group .w-24 i {
            font-size: 2.5rem !important;
          }
          .space-y-8 .group h3 {
            font-size: 1.4rem !important;
            line-height: 1.32 !important;
          }
          .space-y-8 .group p {
            font-size: 1.05rem !important;
            line-height: 1.6 !important;
          }
        }

        /* === Testimonials CTA: 320px – 375px — smaller label & icon for this button only === */
        @media (min-width: 320px) and (max-width: 375px) {
          .testimonials-cta-button {
            font-size: 1rem !important;
            padding: 0.85rem 1.7rem !important;
            gap: 0.65rem !important;
          }
          .testimonials-cta-button i {
            font-size: 1.6rem !important;
          }
          .testimonials-cta-button span {
            font-size: 1rem !important;
          }
        }
      `}</style>

    </div>
  );
}
