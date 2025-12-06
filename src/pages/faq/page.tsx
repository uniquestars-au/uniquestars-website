// src/pages/faq/page.tsx
import { useState } from 'react';
import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // safe mailto generator (no literal newlines)
  function mailtoFor(subjectSuffix = 'ESDM Consultation') {
    const subject = `Request for Free Consultation – Unique Stars (${subjectSuffix})`;
    const bodyLines = [
      'Hi Sanaz,',
      '',
      'I would like to book a free consultation for my child.',
      '',
      'Here are my details:',
      '',
      'Parent Name:  ',
      "Child’s Name:  ",
      "Child’s Age:  ",
      'Location:  ',
      'Preferred Contact Method (Phone/Email):  ',
      "Brief Concerns / What I’m Looking For:",
      '',
      'Please let me know a suitable time for the consultation or if you need any additional information.',
      '',
      'Thank you,',
      '[Parent Name]'
    ];
    const body = bodyLines.join('\n');
    return `mailto:admin@uniquestars.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const faqCategories = [
    {
      category: 'About ESDM Therapy',
      color: '#FFC837',
      questions: [
        {
          question: 'What is ESDM therapy?',
          answer:
            'The Early Start Denver Model (ESDM) is a comprehensive, evidence-based early intervention approach designed for young children with autism. It blends developmental and behavioural strategies within natural, play-based routines to support growth across all areas—including communication, social skills, cognition, and motor development.'
        },
        {
          question: 'What age group is ESDM therapy for?',
          answer:
            'ESDM is designed for children aged 12-48 months (1-4 years old). Early intervention during these critical developmental years maximizes brain plasticity and leads to significantly better outcomes.'
        },
        {
          question: 'How is ESDM different from other therapies?',
          answer:
            "ESDM is unique because it combines developmental and behavioral approaches in a naturalistic, play-based format. Unlike traditional table-based therapy, ESDM happens during fun, engaging activities that follow your child's interests, making learning more effective and enjoyable."
        }
      ]
    },
    {
      category: 'Getting Started',
      color: '#33C8FF',
      questions: [
        {
          question: 'How do I book a consultation?',
          answer:
            'You can book a consultation by emailing us. We’ll schedule a free initial consultation to discuss your child’s needs, answer your questions, and explain how our ESDM therapy can support their development.'
        },
        {
          question: 'What happens during the first session?',
          answer:
            "The first session is a comprehensive assessment where we evaluate your child's current skills across all developmental areas. We'll also discuss your family's priorities and goals. This helps us create a personalized therapy plan tailored to your child's unique needs."
        }
      ]
    },
    {
      category: 'Therapy Sessions',
      color: '#FF4F87',
      questions: [
        {
          question: 'How often should my child attend therapy?',
          answer:
            "While research indicates that intensive early intervention (8-10 hours per week) yields the best outcomes, we recognize that every family's circumstances are unique. Therefore, we are committed to collaborating with you to develop a schedule that effectively balances clinical effectiveness with your family's specific needs and available resources."
        },
        {
          question: 'Can parents observe therapy sessions?',
          answer:
            "Absolutely! Parent involvement is a core component of ESDM. We'll teach you strategies to continue your child's learning throughout daily routines at home."
        }
      ]
    },
    {
      category: 'Progress & Results',
      color: '#4AD36D',
      questions: [
        {
          question: 'How quickly will I see results?',
          answer:
            'Every child progresses at their own pace. Some families notice improvements within the first few weeks, while others may take a few months. We track progress regularly and adjust goals as needed. Consistency and intensity of therapy significantly impact the speed of progress.'
        },
        {
          question: 'How do you measure progress?',
          answer:
            "We use standardized ESDM assessment tools to measure progress across all developmental domains. You'll receive regular progress reports showing your child's achievements and updated goals. We also value your observations of changes in daily life."
        },
        {
          question: "What if my child isn't making progress?",
          answer:
            "If progress plateaus, we'll reassess and adjust the therapy approach. This might include changing strategies, modifying goals, or increasing session intensity. We're committed to finding what works best for your child."
        }
      ]
    },
    {
      category: 'Costs & Insurance',
      color: '#FF8A3D',
      questions: [
        {
          question: 'How much does ESDM therapy cost?',
          answer:
            "Therapy costs vary based on session length and location. Contact us for detailed pricing information. We'll work with you to create a plan that fits your budget while maximizing outcomes"
        },
        {
          question: 'Do you accept NDIS funding?',
          answer:
            'Absolutely! We proudly accept NDIS funding. Our team is here to assist you in understanding how to best utilize your NDIS plan for the services we provide.'
        }
      ]
    }
  ];

  const allQuestions = faqCategories.flatMap((category, catIndex) =>
    category.questions.map((q, qIndex) => ({
      ...q,
      color: category.color,
      category: category.category,
      globalIndex: catIndex * 10 + qIndex
    }))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="ESDM Therapy FAQ | Early Intervention Questions | Unique Stars Sydney"
        description="Find answers to frequently asked questions about ESDM therapy, early intervention, funding, costs, progress timelines, and how to get started."
        keywords="ESDM FAQ, early intervention FAQ, autism therapy questions, child therapy FAQ, NDIS autism support"
        canonical="https://uniquestars.com.au/faq"
        openGraph={{
          title: 'ESDM Therapy FAQ | Early Intervention Questions | Unique Stars Sydney',
          description:
            'Find answers to frequently asked questions about ESDM therapy, early intervention, funding, costs, progress timelines, and how to get started.',
          url: 'https://uniquestars.com.au/faq',
          image: '/og-faq.jpg'
        }}
        faviconHref="/favicon.ico"
      />

      <Navbar />

      {/* Premium Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EAF7FF 0%, #FFF7DA 50%, #FFE8F0 100%)',
          minHeight: '60vh'
        }}
      >
        {/* Floating Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-16 h-16 flex items-center justify-center animate-float-slow opacity-30">
            <i
              className="ri-star-fill text-5xl text-[#FFC837]"
              style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.8))' }}
            ></i>
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
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#4AD36D]"
            style={{
              boxShadow:
                '0 8px 30px rgba(74, 211, 109, 0.4), inset 0 2px 10px rgba(74, 211, 109, 0.2)'
            }}
          >
            <div
              className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-full"
              style={{ boxShadow: '0 4px 15px rgba(74, 211, 109, 0.5)' }}
            >
              <i className="ri-question-answer-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">Common Questions</span>
          </div>

          <h1
            className="faq-hero-heading text-6xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Frequently Asked{' '}
            <span
              className="bg-gradient-to-r from-[#4AD36D] via-[#33C8FF] to-[#0480E8] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(74, 211, 109, 0.3))'
              }}
            >
              Questions
            </span>
          </h1>
          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our ESDM therapy services, getting started, and what to
            expect.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFF7DA] via-white to-[#FFF7DA] relative overflow-hidden">
        {/* Decorative Stars */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 flex items-center justify-center"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
            >
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-3xl"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}20 0%, white 100%)`,
                    border: `4px solid ${category.color}`,
                    boxShadow: `0 10px 30px ${category.color}40, inset 0 2px 10px ${category.color}20`
                  }}
                >
                  <i className="ri-folder-fill text-3xl" style={{ color: category.color }}></i>
                </div>
                <h2
                  className="text-3xl font-extrabold text-[#0A2A66]"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  {category.category}
                </h2>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {category.questions.map((item, qIndex) => {
                  const globalIndex = catIndex * 10 + qIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={qIndex}
                      className="bg-white rounded-[30px] overflow-hidden border-6 border-[#0A2A66] transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      style={{
                        boxShadow: isOpen
                          ? `0 25px 60px ${category.color}40, inset 0 -5px 20px ${category.color}10`
                          : '0 10px 30px rgba(10, 42, 102, 0.15)'
                      }}
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      role="button"
                      aria-expanded={isOpen}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setOpenIndex(isOpen ? null : globalIndex);
                      }}
                    >
                      {/* Question Header */}
                      <div className="flex items-center justify-between p-8 gap-6">
                        <div className="flex items-center gap-5 flex-1">
                          {/* Star Icon */}
                          <div
                            className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
                            style={{
                              backgroundColor: isOpen ? category.color : `${category.color}20`,
                              boxShadow: isOpen ? `0 8px 25px ${category.color}60` : 'none'
                            }}
                          >
                            <i
                              className={`ri-star-${isOpen ? 'fill' : 'line'} text-2xl transition-all duration-300`}
                              style={{ color: isOpen ? 'white' : category.color }}
                            ></i>
                          </div>

                          {/* Question Text */}
                          <h3
                            className="text-xl font-extrabold text-[#0A2A66] flex-1"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                          >
                            {item.question}
                          </h3>
                        </div>

                        {/* Toggle Icon */}
                        <div
                          className="w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-all duration-300"
                          style={{
                            backgroundColor: `${category.color}20`,
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                          }}
                          aria-hidden
                        >
                          <i
                            className="ri-arrow-down-s-line text-3xl"
                            style={{ color: category.color }}
                          ></i>
                        </div>
                      </div>

                      {/* Answer */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: isOpen ? 'none' : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                      >
                        <div className="px-8 pb-8 pt-0">
                          {/* Gradient Divider */}
                          <div
                            className="h-1 w-full rounded-full mb-6"
                            style={{
                              background: `linear-gradient(90deg, transparent 0%, ${category.color} 50%, transparent 100%)`
                            }}
                          ></div>

                          <p className="faq-answer-text text-[#0A2A66] text-lg leading-relaxed pl-[68px]">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
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
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
            ></div>
          ))}
        </div>

        {/* Large Floating Stars */}
        <div className="absolute top-[20%] left-[10%] w-20 h-20 flex items-center justify-center animate-float-slow opacity-20">
          <i
            className="ri-star-fill text-7xl text-[#FFC837]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 200, 55, 0.8))' }}
          ></i>
        </div>
        <div
          className="absolute bottom-[15%] right-[8%] w-24 h-24 flex items-center justify-center animate-float-medium opacity-20"
          style={{ animationDelay: '1s' }}
        >
          <i
            className="ri-star-fill text-8xl text-[#FF4F87]"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255, 79, 135, 0.8))' }}
          ></i>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
          <h2
            className="text-5xl lg:text-7xl font-extrabold text-white mb-8"
            style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            Still Have{' '}
            <span
              className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 200, 55, 0.6))'
              }}
            >
              Questions?
            </span>
          </h2>
          <p
            className="text-white text-2xl mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            We're here to help! Book a free consultation to discuss your child's needs
          </p>
          <a
            href={mailtoFor()}
            className="cta-button faq-cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
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
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }

  @keyframes float-medium {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.5); }
  }
  
  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
  }

  .animate-float-medium {
    animation: float-medium 4s ease-in-out infinite;
  }

  .animate-twinkle {
    animation: twinkle 3s ease-in-out infinite;
  }

  /* Mobile-only CTA adjustments (<= 768px) */
  @media (max-width: 768px) {
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

  /* === FAQ Hero & Answers: <320px — smaller title and answer text === */
  @media (max-width: 319px) {
    .faq-hero-heading {
      font-size: 2.3rem !important;
      line-height: 1.18 !important;
      word-break: break-word !important;
    }
    .faq-hero-heading span {
      font-size: 1em !important;
    }

    .faq-answer-text {
      font-size: 0.9rem !important;
      line-height: 1.5 !important;
    }

    /* Extra-small: shrink FAQ CTA button text & icon a bit more */
    .faq-cta-button {
      font-size: 0.95rem !important;
      padding: 0.8rem 1.4rem !important;
      gap: 0.55rem !important;
    }
    .faq-cta-button i {
      font-size: 1.4rem !important;
    }
    .faq-cta-button span {
      font-size: 0.95rem !important;
    }
  }

  /* === FAQ Hero & Answers: 320px – 420px — slightly larger but compact === */
  @media (min-width: 320px) and (max-width: 420px) {
    .faq-hero-heading {
      font-size: 2.7rem !important;
      line-height: 1.18 !important;
      word-break: break-word !important;
    }
    .faq-hero-heading span {
      font-size: 1em !important;
    }

    .faq-answer-text {
      font-size: 1rem !important;
      line-height: 1.55 !important;
    }
  }

  /* === FAQ CTA: 320px – 375px — smaller label & icon for this button only === */
  @media (min-width: 320px) and (max-width: 375px) {
    .faq-cta-button {
      font-size: 1rem !important;
      padding: 0.85rem 1.6rem !important;
      gap: 0.6rem !important;
    }
    .faq-cta-button i {
      font-size: 1.5rem !important;
    }
    .faq-cta-button span {
      font-size: 1rem !important;
    }
  }
`}</style>
    </div>
  );
}
