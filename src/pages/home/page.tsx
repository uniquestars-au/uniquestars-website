// src/pages/home/page.tsx
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useState, useMemo, useEffect, useRef } from 'react';
import SanazAbout from '../../assets/Sanaz About Section.png';
import WhiteTarget from "../../assets/icons/white-target.png";
import TestimonialMarieImg from '../../assets/testimonial-marie.jpg';
import TestimonialMichaelImg from '../../assets/testimonial-michael.jpg';
import TestimonialMadhuImg from '../../assets/testimonial-madhu.jpg';

/**
 * Helpers + CountUp component
 */
function formatNumber(num: number) {
  return num.toLocaleString();
}

function getStartValue(target: number, isPercent: boolean) {
  if (isPercent && target > 50) return Math.max(target - 3, 0);
  if (target >= 1000) return Math.max(target - 100, 0);
  if (target >= 500) return Math.max(target - 50, 0);
  if (target >= 100) return Math.max(target - 10, 0);
  if (target >= 10) return Math.max(target - 3, 0);
  return Math.max(target - 1, 0);
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * CountUp
 * end: number
 * suffix: '+' | '%' | ''
 * duration: ms
 * play: boolean (when true animation runs)
 */
function CountUp({
  end,
  suffix = '',
  duration = 1400,
  className = '',
  play = true,
  start,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  play?: boolean;
  /** optional explicit start value for this counter */
  start?: number;
}) {
  const isPercent = suffix === '%';
  const initialStart = start !== undefined ? start : getStartValue(end, isPercent);

  const [value, setValue] = useState<number>(initialStart);
  const rafRef = useRef<number | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const isPercentLocal = suffix === '%';
    const startValue = start !== undefined ? start : getStartValue(end, isPercentLocal);

    if (!play) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setValue(startValue);
      playedRef.current = false;
      return;
    }

    if (playedRef.current) {
      setValue(end);
      return;
    }

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(startValue + (end - startValue) * eased);
      setValue(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end);
        playedRef.current = true;
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, suffix, duration, play, start]);

  return (
    <div aria-live="polite" className={className}>
      {formatNumber(value)}
      {suffix}
    </div>
  );
}


/**
 * StatsInline - small wrapper to animate when visible
 * props: children (will render CountUp)
 */
function StatsInline({
  end,
  suffix = '',
  duration = 1400,
  className = '',
  start,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  start?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.35 }
    );

    io.observe(el);
    return () => {
      try {
        if (io && el) io.unobserve(el);
      } catch { }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <CountUp
        end={end}
        suffix={suffix}
        duration={duration}
        play={visible}
        start={start}
      />
    </div>
  );
}


/**
 * safe mailto generator (no literal newlines)
 */
function mailtoFor(subjectSuffix = 'ESDM Consultation', to = 'admin@uniquestars.com.au') {
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
    '[Parent Name]',
  ];
  const body = bodyLines.join('\n');
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Marie',
      location: 'Castle Hill, Sydney',
      text: 'In just four sessions, the progress has been wonderful. My son is making great eye contact and is much more responsive to the educators. He is communicating well and, most importantly, he is now socializing with his peers. We are thrilled with the changes!',
      rating: 5,
      image: TestimonialMarieImg,
    },
    {
      name: 'Michael',
      location: 'Parramatta, Sydney',
      text: 'In just three sessions, we have seen incredible changes. My daughter is already showing more independence, like brushing her teeth by herself, and she is spending much less time alone in her room. She is significantly more vocal and, best of all, she actively wants to play with her dad and brother now. The progress has been amazing to watch!',
      rating: 5,
      image: TestimonialMichaelImg,
    },
    {
      name: 'Madhu',
      location: 'Chatswood, Sydney',
      text: 'My son has improved a lot on eye contact, answering questions, listening and understanding as well. He is able to understand and follow instructions better. I am so glad he is learning to play different new games, following the rules of the games as well.Thank you for all your hard work and supporting him in his journey!',
      rating: 5,
      image: TestimonialMadhuImg,
    },
  ];

  // 🔁 Auto-rotate testimonials every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) =>
        (prev + 1) % testimonials.length
      );
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);


  // ⬅️ ➡️ Keyboard navigation for testimonials
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentTestimonial((prev) =>
          prev === 0 ? testimonials.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [testimonials.length]);


  // --- image fallback placeholder (SVG) ---
  const placeholderSvg = useMemo(() => {
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
        <rect width='100%' height='100%' fill='%23E3E6EB' rx='30' />
        <g transform='translate(100,112)'>
          <text text-anchor='middle' font-family='Nunito, sans-serif' font-weight='700' font-size='48' fill='%230A2A66'>?</text>
        </g>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = placeholderSvg;
    target.style.objectFit = 'cover';
    target.style.backgroundColor = '#E3E6EB';
  };

  // --- data arrays ---
  const services = [
    { icon: 'ri-heart-pulse-fill', color: '#FF4F87', gradient: 'from-[#FF4F87] to-[#FF8A3D]', title: 'Early Intervention', description: 'Evidence-based therapy for children aged 12-48 months to maximize developmental outcomes.' },
    { icon: 'ri-star-smile-fill', color: '#FFC837', gradient: 'from-[#FFC837] to-[#FFDD55]', title: 'ESDM Therapy', description: 'Specialized Early Start Denver Model approach combining play and learning.' },
    { icon: 'ri-chat-smile-3-fill', color: '#33C8FF', gradient: 'from-[#33C8FF] to-[#0480E8]', title: 'Communication Support', description: 'Building language skills through naturalistic play and social interaction strategies.' },
    { icon: 'ri-emotion-happy-fill', color: '#4AD36D', gradient: 'from-[#4AD36D] to-[#33C8FF]', title: 'Behaviour Support', description: 'Positive behaviour strategies to help children thrive in daily routines and activities.' },
    { icon: 'ri-gamepad-fill', color: '#FF8A3D', gradient: 'from-[#FF8A3D] to-[#FFC837]', title: 'Play-Based Learning', description: 'Fun, engaging activities that promote learning through natural play experiences.' },
    { icon: 'ri-run-fill', color: '#0480E8', gradient: 'from-[#0480E8] to-[#33C8FF]', title: 'Motor Skills', description: 'Developing fine and gross motor skills through playful movement activities.' }
  ];

  const trustReasons = [
    { icon: 'ri-shield-check-fill', color: '#4AD36D', title: 'Certified Expertise', description: 'ESDM certified therapist with years of specialized training' },
    { icon: 'ri-parent-fill', color: '#FF4F87', title: 'Family-Centered', description: 'We involve parents every step of the way in therapy' },
    { icon: 'ri-heart-fill', color: '#FFC837', title: 'Compassionate Care', description: 'Warm, nurturing environment where children feel safe' },
    { icon: 'ri-line-chart-fill', color: '#33C8FF', title: 'Proven Results', description: 'Evidence-based approaches with measurable progress' }
  ];

  const therapySteps = [
    { title: 'Initial Consultation', description: 'Meet with Sanaz to discuss your child\'s needs', icon: 'ri-chat-heart-fill', color: '#FF4F87' },
    { title: 'Assessment', description: 'Comprehensive evaluation of developmental skills', icon: 'ri-file-list-3-fill', color: '#FFC837' },
    { title: 'Goal Setting', description: 'Create personalized therapy goals together', icon: 'custom-target', color: '#33C8FF'},
    { title: 'Therapy Sessions', description: 'Engaging play-based intervention begins', icon: 'ri-gamepad-fill', color: '#4AD36D' },
    { title: 'Progress Review', description: 'Regular updates and plan adjustments', icon: 'ri-line-chart-fill', color: '#FF8A3D' }
  ];

  const faqs = [
    { question: 'What age group do you work with?', answer: 'We work with children from 12 months to 8 years, with a strong focus on the early years, as this period is the most critical and responsive for learning, development, and the effectiveness of the ESDM approach. Early intervention during this golden window helps children build foundational communication, social, and play skills that support long-term progress.' },
    { question: 'What is the Early Start Denver Model (ESDM)?', answer: 'ESDM is a research-based early intervention approach for young children with autism. It combines play-based activities with developmental and behavioral strategies to promote learning in natural settings.' },
    { question: 'How long are therapy sessions?', answer: 'Sessions typically run for 1-2 hours, depending on your child\'s needs and attention span. We create a flexible schedule that works best for your family.' },
    { question: 'Do you provide in-home therapy?', answer: 'Yes! We offer both in-home and clinic-based sessions across Sydney to provide the most comfortable and effective environment for your child.' },
    { question: 'How do I get started?', answer: 'Simply reach out via WhatsApp or phone for a free initial consultation. We\'ll discuss your child\'s needs and create a personalized therapy plan together.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="Early Intervention & ESDM Therapy for Children | Unique Stars Sydney"
        description="Unique Stars provides early intervention and ESDM therapy for young children with autism in Sydney. Play-based, evidence-based sessions designed to support communication, behaviour, social skills, and emotional development."
        keywords="early intervention Sydney, ESDM therapy Sydney, autism therapy Sydney, child autism support, early childhood intervention, play-based autism therapy, Unique Stars"
        canonical="https://uniquestars.com.au/"
        openGraph={{
          title: "Early Intervention & ESDM Therapy for Children | Unique Stars Sydney",
          description: "Unique Stars provides early intervention and ESDM therapy for young children with autism in Sydney. Play-based, evidence-based sessions designed to support communication, behaviour, social skills, and emotional development.",
          url: "https://uniquestars.com.au/",
          image: "/og-home.jpg"
        }}
        faviconHref="/favicon.ico"
      />

      <Navbar />

      <main>
        {/* Premium Hero Section */}
        <section
          className="hero-section relative overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center"
          style={{
            background:
              'linear-gradient(135deg, #EAF7FF 0%, #FFF7DA 50%, #E0F7FF 100%)',
          }}
        >
          {/* Animated Floating Stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[15%] left-[8%] w-20 h-20 flex items-center justify-center animate-float-slow opacity-40 star-hero">
              <i
                className="ri-star-fill text-6xl text-[#FFC837]"
                style={{
                  filter:
                    'drop-shadow(0 0 20px rgba(255, 200, 55, 0.8))',
                }}
              ></i>
            </div>
            <div
              className="absolute top-[25%] right-[12%] w-16 h-16 flex items-center justify-center animate-float-medium opacity-35 star-hero"
              style={{ animationDelay: '1s' }}
            >
              <i
                className="ri-star-fill text-5xl text-[#FF4F87]"
                style={{
                  filter:
                    'drop-shadow(0 0 15px rgba(255, 79, 135, 0.7))',
                }}
              ></i>
            </div>
            <div
              className="absolute bottom-[30%] left-[15%] w-14 h-14 flex items-center justify-center animate-float-slow opacity-30 star-hero"
              style={{ animationDelay: '2s' }}
            >
              <i
                className="ri-star-fill text-4xl text-[#4AD36D]"
                style={{
                  filter:
                    'drop-shadow(0 0 12px rgba(74, 211, 109, 0.7))',
                }}
              ></i>
            </div>
            <div
              className="absolute top-[40%] right-[6%] w-18 h-18 flex items-center justify-center animate-float-medium opacity-35 star-hero"
              style={{ animationDelay: '1.5s' }}
            >
              <i
                className="ri-star-fill text-5xl text-[#33C8FF]"
                style={{
                  filter:
                    'drop-shadow(0 0 18px rgba(51, 200, 255, 0.8))',
                }}
              ></i>
            </div>
            <div
              className="absolute bottom-[20%] right-[20%] w-12 h-12 flex items-center justify-center animate-float-slow opacity-25 star-hero"
              style={{ animationDelay: '0.5s' }}
            >
              <i
                className="ri-star-fill text-3xl text-[#FF8A3D]"
                style={{
                  filter:
                    'drop-shadow(0 0 10px rgba(255, 138, 61, 0.7))',
                }}
              ></i>
            </div>
          </div>

          {/* Spotlight Glow Effects */}
          <div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, #FFC837 0%, transparent 70%)',
            }}
          ></div>
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, #33C8FF 0%, transparent 70%)',
            }}
          ></div>

          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left Content */}
              <div className="sanaz-content">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-3 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-full mb-8 sm:mb-10 border-4 border-[#FFC837] max-w-full"
                  style={{
                    boxShadow:
                      '0 8px 30px rgba(255, 200, 55, 0.4), inset 0 2px 10px rgba(255, 200, 55, 0.2)',
                  }}
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full flex-shrink-0"
                    style={{
                      boxShadow:
                        '0 4px 15px rgba(255, 200, 55, 0.5)',
                    }}
                  >
                    <i className="ri-star-fill text-xl sm:text-2xl text-white"></i>
                  </div>
                  <span className="text-[#0A2A66] font-bold text-xs xs:text-sm sm:text-base leading-snug max-w-[210px] sm:max-w-none">
                    ESDM Certified • Sydney Based
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="hero-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0A2A66] mb-6 sm:mb-8 leading-tight"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  Every Child Deserves to
                  <span
                    className="block mt-2 sm:mt-3 bg-gradient-to-r from-[#FFC837] via-[#FFDD55] to-[#FF8A3D] bg-clip-text text-transparent"
                    style={{
                      textShadow:
                        '0 0 40px rgba(255, 200, 55, 0.4)',
                      filter:
                        'drop-shadow(0 4px 8px rgba(255, 200, 55, 0.3))',
                    }}
                  >
                    Shine Bright ✨
                  </span>
                </h1>

                {/* Description */}
                <p
                  className="text-sm sm:text-lg lg:text-xl text-[#0A2A66] mb-8 sm:mb-10 leading-relaxed max-w-xl"
                  style={{
                    textShadow:
                      '0 1px 2px rgba(10, 42, 102, 0.1)',
                  }}
                >
                  Specialized early intervention therapy for young
                  children with autism. Using play-based ESDM
                  approach to unlock your child&apos;s full potential
                  in a warm, supportive environment.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-10">
                  <a
                    href={mailtoFor(
                      'Home - Free Consultation',
                      'admin@uniquestars.com.au',
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button cta-button-primary bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-5 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:scale-105 transition-all inline-flex items-center gap-2 sm:gap-3 cursor-pointer border-4 border-[#0A2A66] w-full sm:w-auto justify-center"
                    style={{
                      boxShadow:
                        '0 10px 35px rgba(255, 200, 55, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.5)',
                      filter:
                        'drop-shadow(0 0 20px rgba(255, 200, 55, 0.6))',
                    }}
                    aria-label="Book free consultation"
                  >
                    <i className="cta-primary-icon ri-mail-fill text-base sm:text-lg md:text-xl lg:text-2xl"></i>
                    <span className="cta-primary-text">
                      Book Free Consultation
                    </span>
                  </a>

                  <Link
                    to="/services"
                    className="cta-button bg-[#0A2A66] text-white px-5 sm:px-8 lg:px-10 py-3.5 sm:py-4 lg:py-5 rounded-full font-bold text-sm sm:text-base lg:text-lg hover:scale-105 transition-all inline-flex items-center gap-2 sm:gap-3 cursor-pointer border-4 border-[#33C8FF] w-full sm:w-auto justify-center"
                    style={{
                      boxShadow:
                        '0 10px 35px rgba(10, 42, 102, 0.4), inset 0 2px 10px rgba(51, 200, 255, 0.3)',
                    }}
                    aria-label="Explore services"
                  >
                    <span>Explore Services</span>
                    <i className="ri-arrow-right-line text-lg sm:text-xl"></i>
                  </Link>
                </div>
              </div>

              {/* Right Premium Card */}
              <div className="hero-image-wrapper relative mt-6 lg:mt-0 flex justify-center">
                <div
                  className="hero-image-card rounded-[46px] sm:rounded-[50px] overflow-hidden border-8 border-[#0A2A66] bg-white w-full"
                  style={{
                    boxShadow:
                      '0 25px 60px rgba(10, 42, 102, 0.3), inset 0 -5px 20px rgba(51, 200, 255, 0.2)',
                    transform:
                      'perspective(1000px) rotateY(-3deg)',
                  }}
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=Joyful%20young%20child%20with%20autism%20playing%20with%20colorful%20building%20blocks%20and%20educational%20toys%20during%20therapy%20session%2C%20bright%20modern%20therapy%20room%20with%20soft%20natural%20window%20lighting%2C%20warm%20welcoming%20atmosphere%2C%20child%20smiling%20with%20genuine%20happiness%20and%20engagement%2C%20professional%20therapist%20hands%20visible%20guiding%20play%20activity%2C%20pastel%20colored%20walls%20with%20simple%20clean%20background%2C%20high%20quality%20professional%20photography%20showing%20authentic%20moment%20of%20learning%20and%20development&width=600&height=700&seq=hero-home-premium-1&orientation=portrait"
                    alt="Child in therapy"
                    loading="lazy"
                    decoding="async"
                    crossOrigin="anonymous"
                    onError={handleImgError}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      backgroundColor: '#F6F8FA',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A66]/30 via-transparent to-transparent"></div>
                </div>

                {/* Floating Star Stickers */}
                <div className="absolute -top-6 sm:-top-8 -right-4 sm:-right-8 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center animate-bounce-slow star-sticker">
                  <i
                    className="ri-star-fill text-4xl sm:text-6xl text-[#FFC837]"
                    style={{
                      filter:
                        'drop-shadow(0 0 20px rgba(255, 200, 55, 0.9))',
                    }}
                  ></i>
                </div>
                <div
                  className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center animate-bounce-slow star-sticker"
                  style={{ animationDelay: '0.5s' }}
                >
                  <i
                    className="ri-star-fill text-3xl sm:text-5xl text-[#FF4F87]"
                    style={{
                      filter:
                        'drop-shadow(0 0 18px rgba(255, 79, 135, 0.9))',
                    }}
                  ></i>
                </div>

                {/* Premium Stat Cards */}
                <div
                  className="premium-stat-left bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-4 border-[#33C8FF]"
                  style={{
                    boxShadow:
                      '0 15px 40px rgba(51, 200, 255, 0.4), inset 0 2px 8px rgba(51, 200, 255, 0.2)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#0A2A66] to-[#0480E8] bg-clip-text text-transparent">
                      <StatsInline
                        end={5}
                        suffix="+"
                        duration={1200}
                        start={1}            
                        className="inline-block"
                      />

                    </div>
                    <div className="text-[10px] sm:text-sm text-[#A9B1C0] font-bold">
                      Years Experience
                    </div>
                  </div>
                </div>

                <div
                  className="premium-stat-right bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-4 border-[#FFC837]"
                  style={{
                    boxShadow:
                      '0 15px 40px rgba(255, 200, 55, 0.4), inset 0 2px 8px rgba(255, 200, 55, 0.2)',
                  }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full flex-shrink-0"
                      style={{
                        boxShadow:
                          '0 6px 20px rgba(255, 200, 55, 0.5)',
                      }}
                    >
                      <i className="ri-emotion-happy-fill text-2xl sm:text-3xl text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#0A2A66] to-[#0480E8] bg-clip-text text-transparent">
                        <StatsInline
                          end={100}
                          suffix="%"
                          duration={1400}
                          start={95}          
                          className="inline-block"
                        />

                      </div>
                      <div className="text-[10px] sm:text-xs text-[#A9B1C0] font-bold">
                        Success Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Premium Brand Badges */}
        <section className="py-12 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-32 h-32 flex items-center justify-center">
              <i className="ri-star-fill text-9xl text-[#FFC837]"></i>
            </div>
            <div className="absolute bottom-0 right-1/4 w-32 h-32 flex items-center justify-center">
              <i className="ri-star-fill text-9xl text-[#33C8FF]"></i>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="flex flex-wrap justify-center gap-8">

              {/* Badge 1 */}
              <div
                className="bg-gradient-to-br from-[#4AD36D]/20 to-white px-8 py-5 rounded-full border-4 border-[#4AD36D] inline-flex items-center gap-3"
                style={{
                  width: "300px",
                  boxShadow:
                    "0 8px 25px rgba(74, 211, 109, 0.3), inset 0 2px 8px rgba(74, 211, 109, 0.1)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#4AD36D] rounded-full"
                  style={{ boxShadow: "0 4px 15px rgba(74, 211, 109, 0.5)" }}
                >
                  <i className="ri-shield-check-fill text-2xl text-white"></i>
                </div>
                <span className="text-[#0A2A66] font-bold text-lg">ESDM Certified</span>
                <i className="ri-star-fill text-xl text-[#FFC837]"></i>
              </div>

              {/* Badge 2 */}
              <div
                className="bg-gradient-to-br from-[#FF4F87]/20 to-white px-8 py-5 rounded-full border-4 border-[#FF4F87] inline-flex items-center gap-3"
                style={{
                  width: "300px",
                  boxShadow:
                    "0 8px 25px rgba(255, 79, 135, 0.3), inset 0 2px 8px rgba(255, 79, 135, 0.1)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#FF4F87] rounded-full"
                  style={{ boxShadow: "0 4px 15px rgba(255, 79, 135, 0.5)" }}
                >
                  <i className="ri-heart-fill text-2xl text-white"></i>
                </div>
                <span className="text-[#0A2A66] font-bold text-lg">Family-Centered</span>
                <i className="ri-star-fill text-xl text-[#FFC837]"></i>
              </div>

              {/* Badge 3 */}
              <div
                className="bg-gradient-to-br from-[#FFC837]/20 to-white px-8 py-5 rounded-full border-4 border-[#FFC837] inline-flex items-center gap-3"
                style={{
                  width: "300px",
                  boxShadow:
                    "0 8px 25px rgba(255, 200, 55, 0.3), inset 0 2px 8px rgba(255, 200, 55, 0.1)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center bg-[#FFC837] rounded-full"
                  style={{ boxShadow: "0 4px 15px rgba(255, 200, 55, 0.5)" }}
                >
                  <i className="ri-star-fill text-2xl text-white"></i>
                </div>
                <span className="text-[#0A2A66] font-bold text-lg">500+ Families</span>
                <i className="ri-star-fill text-xl text-[#FFC837]"></i>
              </div>

            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-[#FFF7DA] via-white to-[#FFF7DA] relative overflow-hidden">
          <div className="absolute top-10 right-10 w-24 h-24 flex items-center justify-center opacity-10">
            <i className="ri-star-fill text-9xl text-[#FFC837]"></i>
          </div>
          <div className="absolute bottom-10 left-10 w-20 h-20 flex items-center justify-center opacity-10">
            <i className="ri-star-fill text-7xl text-[#33C8FF]"></i>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              {/* NOTE: md:text-center = center on md and up; text-left = left on small screens */}
              <h2
                className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6 relative inline-block md:text-center text-left"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Where Every Child's Potential
                <span className="block mt-2 bg-gradient-to-r from-[#FFC837] via-[#FFDD55] to-[#FF8A3D] bg-clip-text text-transparent">Shines</span>

                {/* underline: give it a helper class so we can change width/position on mobile */}
                <div
                  className="absolute -bottom-3 left-0 right-0 h-2 intro-underline"
                  style={{
                    boxShadow: '0 4px 20px rgba(255, 200, 55, 0.6)',
                    borderRadius: '999px',
                    background: 'linear-gradient(to right, #FFC837, #FFDD55, #FF8A3D)'
                  }}
                ></div>
              </h2>
              <p className="text-[#0A2A66] text-xl leading-relaxed max-w-3xl mx-auto mt-8">
                Unique Stars provides specialized early intervention therapy for young children with autism in Sydney. We create personalized, play-based programs that help children develop essential skills while having fun.
              </p>
            </div>
          </div>
        </section>

        {/* Three Premium Highlighted Blocks */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 flex items-center justify-center animate-float-slow">
              <i className="ri-star-fill text-9xl text-[#FF4F87]"></i>
            </div>
            <div className="absolute bottom-20 right-20 w-28 h-28 flex items-center justify-center animate-float-medium">
              <i className="ri-star-fill text-8xl text-[#33C8FF]"></i>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* What We Do */}
              <div className="relative group">
                {/* Animated vertical star (top-left) */}
                <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center animate-float-vertical star-behind" style={{ animationDuration: '3.2s' }}>
                  <i className="ri-star-fill text-3xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 10px rgba(51, 200, 255, 0.8))' }}></i>
                </div>
                {/* Animated vertical star (bottom-right) */}
                <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center animate-float-vertical-slow star-behind" style={{ animationDuration: '4s' }}>
                  <i className="ri-star-fill text-2xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 8px rgba(51, 200, 255, 0.8))' }}></i>
                </div>

                <div className="bg-gradient-to-br from-[#EAF7FF] via-white to-[#EAF7FF] rounded-[40px] p-10 border-8 border-[#33C8FF] h-full hover:scale-105 transition-all duration-300" style={{
                  boxShadow: '0 20px 50px rgba(51, 200, 255, 0.3), inset 0 -5px 20px rgba(51, 200, 255, 0.1)'
                }}>
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#33C8FF] to-[#0480E8] rounded-3xl mb-8 mx-auto" style={{
                    boxShadow: '0 10px 30px rgba(51, 200, 255, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="ri-heart-pulse-fill text-5xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0A2A66] mb-5 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    What We Do
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center text-lg">
                    We specialize in early intervention therapy using play-based ESDM approach to help young children with autism reach their developmental milestones.
                  </p>
                </div>
              </div>

              {/* Our Approach */}
              <div className="relative group">
                <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center animate-float-vertical star-behind" style={{ animationDuration: '3.6s' }}>
                  <i className="ri-star-fill text-3xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 200, 55, 0.8))' }}></i>
                </div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center animate-float-vertical-slow star-behind" style={{ animationDuration: '4.5s' }}>
                  <i className="ri-star-fill text-2xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 200, 55, 0.8))' }}></i>
                </div>

                <div className="bg-gradient-to-br from-[#FFF7DA] via-white to-[#FFF7DA] rounded-[40px] p-10 border-8 border-[#FFC837] h-full hover:scale-105 transition-all duration-300" style={{
                  boxShadow: '0 20px 50px rgba(255, 200, 55, 0.3), inset 0 -5px 20px rgba(255, 200, 55, 0.1)'
                }}>
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-3xl mb-8 mx-auto" style={{
                    boxShadow: '0 10px 30px rgba(255, 200, 55, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="ri-gamepad-fill text-5xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0A2A66] mb-5 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Our Approach
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center text-lg">
                    Our warm, family-centered approach empowers both children and parents with the tools they need to thrive together in a supportive environment.
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="relative group">
                <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center animate-float-vertical star-behind" style={{ animationDuration: '3s' }}>
                  <i className="ri-star-fill text-3xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 79, 135, 0.8))' }}></i>
                </div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 flex items-center justify-center animate-float-vertical-slow star-behind" style={{ animationDuration: '4.2s' }}>
                  <i className="ri-star-fill text-2xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 79, 135, 0.8))' }}></i>
                </div>

                <div className="bg-gradient-to-br from-[#FFE8F0] via-white to-[#FFE8F0] rounded-[40px] p-10 border-8 border-[#FF4F87] h-full hover:scale-105 transition-all duration-300" style={{
                  boxShadow: '0 20px 50px rgba(255, 79, 135, 0.3), inset 0 -5px 20px rgba(255, 79, 135, 0.1)'
                }}>
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#FF4F87] to-[#FF8A3D] rounded-3xl mb-8 mx-auto" style={{
                    boxShadow: '0 10px 30px rgba(255, 79, 135, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.3)'
                  }}>
                    <i className="ri-shield-star-fill text-5xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#0A2A66] mb-5 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Why Choose Us
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center text-lg">
                    ESDM certified expertise, proven results, and a compassionate approach that makes therapy feel like play for your child.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ————— Meet Sanaz - Premium Profile ————— */}
        <section className="py-24 bg-gradient-to-br from-[#EAF7FF] to-white relative overflow-hidden sanaz-section">
          <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
            <i className="ri-star-fill text-9xl text-[#FFC837]"></i>
          </div>
          <div className="absolute bottom-10 right-10 w-28 h-28 opacity-10">
            <i className="ri-star-fill text-8xl text-[#FF4F87]"></i>
          </div>

          <div className="max-w-[1280px] mx-auto px-5 relative z-10">
            <div
              className="bg-gradient-to-r from-[#0A2A66] via-[#0480E8] to-[#0A2A66] rounded-[60px] overflow-hidden relative sanaz-container"
              style={{
                boxShadow: '0 30px 70px rgba(10, 42, 102, 0.4)'
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent"></div>

              <div className="grid lg:grid-cols-5 gap-0">
                {/* Image Column */}
                <div className="lg:col-span-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A2A66]/50 z-10"></div>
                  <img
                    src={SanazAbout}
                    alt="Sanaz - Therapist"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    crossOrigin="anonymous"
                    onError={handleImgError}
                  />
                </div>

                {/* Content Column */}
                <div className="lg:col-span-3 p-16 flex flex-col justify-center relative sanaz-content">
                  <div
                    className="inline-flex items-center gap-3 bg-white/20 px-5 py-3 rounded-full mb-8 w-fit backdrop-blur-sm founder-pill"
                    style={{
                      boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <i className="ri-user-heart-fill text-2xl text-[#FFC837]"></i>
                    <span className="text-white font-bold text-base">Meet Our Founder</span>
                  </div>

                  <h3
                    className="text-5xl font-extrabold text-white mb-4"
                    style={{
                      fontFamily: 'Nunito, sans-serif',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    Sanaz
                  </h3>
                  <p
                    className="text-[#FFC837] font-extrabold text-2xl mb-8"
                    style={{
                      textShadow: '0 2px 10px rgba(255, 200, 55, 0.5)'
                    }}
                  >
                    ESDM Certified Therapist
                  </p>

                  <p className="text-white/95 text-lg leading-relaxed mb-10">
                    With a Master's in Special and Inclusive Education from the University of Sydney, a Master's in Linguistics, and an ESDM certification, Sanaz has over 5 years of experience helping children with autism have fun while they learn and grow in both India and Australia.
                  </p>

                  <div className="grid grid-cols-2 gap-5 mb-10 sanaz-highlights">
                    <div
                      className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)' }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-full flex-shrink-0"
                        style={{ boxShadow: '0 4px 15px rgba(74, 211, 109, 0.5)' }}
                      >
                        <i className="ri-checkbox-circle-fill text-2xl text-white check-icon-fix"></i>
                      </div>
                      <span className="text-white font-bold">Master's Degree</span>
                    </div>

                    <div
                      className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)' }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-full flex-shrink-0"
                        style={{ boxShadow: '0 4px 15px rgba(74, 211, 109, 0.5)' }}
                      >
                        <i className="ri-checkbox-circle-fill text-2xl text-white check-icon-fix"></i>
                      </div>
                      <span className="text-white font-bold">ESDM Certified</span>
                    </div>

                    <div
                      className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)' }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-full flex-shrink-0"
                        style={{ boxShadow: '0 4px 15px rgba(74, 211, 109, 0.5)' }}
                      >
                        <i className="ri-checkbox-circle-fill text-2xl text-white check-icon-fix"></i>
                      </div>
                      <span className="text-white font-bold">5+ Years Experience</span>
                    </div>

                    <div
                      className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm"
                      style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)' }}
                    >
                      <div
                        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-full flex-shrink-0"
                        style={{ boxShadow: '0 4px 15px rgba(74, 211, 109, 0.5)' }}
                      >
                        <i className="ri-checkbox-circle-fill text-2xl text-white check-icon-fix"></i>
                      </div>
                      <span className="text-white font-bold">500+ Families</span>
                    </div>
                  </div>

                  <Link
                    to="/about"
                    className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-10 py-5 rounded-full font-extrabold text-lg hover:scale-105 transition-all inline-flex items-center gap-3 cursor-pointer w-fit border-4 border-white founder-cta"
                    style={{
                      boxShadow: '0 10px 35px rgba(255, 200, 55, 0.6), inset 0 2px 10px rgba(255, 255, 255, 0.5)'
                    }}
                    aria-label="Learn more about Sanaz"
                  >
                    Learn More About Sanaz
                    <i className="ri-arrow-right-line text-xl"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Premium Services Grid */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-10 w-32 h-32 flex items-center justify-center animate-float-slow">
              <i className="ri-star-fill text-9xl text-[#FFC837]"></i>
            </div>
            <div className="absolute bottom-1/4 right-10 w-28 h-28 flex items-center justify-center animate-float-medium">
              <i className="ri-star-fill text-8xl text-[#33C8FF]"></i>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EAF7FF] to-[#FFF7DA] px-6 py-3 rounded-full mb-6 border-2 border-[#33C8FF]"
                style={{
                  boxShadow: '0 6px 20px rgba(51, 200, 255, 0.2)'
                }}
              >
                <i className="ri-service-fill text-xl text-[#0480E8]"></i>
                <span className="text-[#0480E8] font-bold text-sm uppercase tracking-wide">Our Services</span>
              </div>
              <h2
                className="services-heading text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Comprehensive{' '}
                <span className="bg-gradient-to-r from-[#33C8FF] to-[#0480E8] bg-clip-text text-transparent">
                  Therapy Services
                </span>
              </h2>
              <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
                Tailored programs designed to support your child's unique developmental journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <div key={index} className="group relative">
                  {/* Corner Stars (kept hover reveal behavior) */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ zIndex: 1 }}
                  >
                    <i
                      className="ri-star-fill text-2xl"
                      style={{ color: service.color, filter: `drop-shadow(0 0 8px ${service.color})` }}
                    ></i>
                  </div>

                  <div
                    className={`bg-gradient-to-br ${service.gradient} rounded-[35px] p-8 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] h-full cursor-pointer`}
                    style={{
                      boxShadow: `0 20px 50px ${service.color}40, inset 0 -5px 20px rgba(255, 255, 255, 0.3)`
                    }}
                  >
                    <div
                      className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto"
                      style={{
                        backgroundColor: 'white',
                        boxShadow: `0 10px 30px ${service.color}60, inset 0 2px 10px ${service.color}30`
                      }}
                    >
                      <i className={`${service.icon} text-5xl`} style={{ color: service.color }}></i>
                    </div>
                    <h3
                      className="text-2xl font-extrabold text-white mb-4 text-center"
                      style={{
                        fontFamily: 'Nunito, sans-serif',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-white/95 leading-relaxed text-center mb-6">{service.description}</p>
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 text-white font-bold group-hover:gap-4 transition-all">
                        <span>View Service</span>
                        <i className="ri-star-fill text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                to="/services"
                className="services-cta bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-12 py-6 rounded-full font-extrabold text-xl hover:scale-105 transition-all inline-flex items-center gap-3 whitespace-nowrap cursor-pointer border-4 border-[#0A2A66]"
                style={{
                  boxShadow: '0 15px 45px rgba(255, 200, 55, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.5)'
                }}
                aria-label="Explore all services"
              >
                Explore All Services
                <i className="ri-arrow-right-line text-2xl"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium Why Parents Trust Us */}
        <section className="py-24 bg-gradient-to-br from-[#EAF7FF] via-white to-[#FFF7DA] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            {[...Array(8)].map((_, i) => (
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

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2
                className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Why Parents{' '}
                <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">
                  Trust Us
                </span>
              </h2>
              <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
                We're committed to providing the highest quality care for your child
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {trustReasons.map((reason, index) => (
                <div key={index} className="text-center group">
                  <div
                    className="w-28 h-28 flex items-center justify-center rounded-full mx-auto mb-8 group-hover:scale-110 transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${reason.color}20 0%, white 100%)`,
                      border: `6px solid ${reason.color}`,
                      boxShadow: `0 15px 40px ${reason.color}40, inset 0 2px 15px ${reason.color}20`
                    }}
                  >
                    <i
                      className={`${reason.icon} text-5xl`}
                      style={{
                        color: reason.color,
                        filter: `drop-shadow(0 4px 10px ${reason.color}60)`
                      }}
                    ></i>
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-[#0A2A66] mb-4"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    {reason.title}
                  </h3>
                  <p className="text-[#0A2A66] text-lg leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Therapy Process Timeline */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 flex items-center justify-center">
              <i className="ri-star-fill text-9xl text-[#FFC837]"></i>
            </div>
            <div className="absolute bottom-20 right-20 w-28 h-28 flex items-center justify-center">
              <i className="ri-star-fill text-8xl text-[#33C8FF]"></i>
            </div>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFF7DA] to-[#EAF7FF] px-6 py-3 rounded-full mb-6 border-2 border-[#FFC837]"
                style={{
                  boxShadow: '0 6px 20px rgba(255, 200, 55, 0.2)',
                }}
              >
                <i className="ri-route-fill text-xl text-[#FF8A3D]"></i>
                <span className="text-[#FF8A3D] font-bold text-sm uppercase tracking-wide">
                  Our Process
                </span>
              </div>
              <h2
                className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Your{' '}
                <span className="bg-gradient-to-r from-[#33C8FF] to-[#0480E8] bg-clip-text text-transparent">
                  Therapy Journey
                </span>
              </h2>
              <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
                A simple, supportive process designed around your family's needs
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto therapy-timeline">
              {/* Curved Path Background - desktop behavior unchanged */}
              <div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full center-line bg-gradient-to-b from-[#FF4F87] via-[#FFC837] via-[#33C8FF] via-[#4AD36D] to-[#FF8A3D] rounded-full"
                style={{
                  boxShadow: '0 0 30px rgba(255, 200, 55, 0.5)',
                }}
              ></div>

              {therapySteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-8 mb-16 last:mb-0 items-center therapy-step"
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="flex-1 text-right">
                        <div
                          className="bg-white rounded-[30px] p-8 border-4 inline-block"
                          style={{
                            borderColor: step.color,
                            boxShadow: `0 15px 40px ${step.color}30, inset 0 2px 10px ${step.color}20`,
                          }}
                        >
                          <h3
                            className="text-2xl font-extrabold text-[#0A2A66] mb-3"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                          >
                            {step.title}
                          </h3>
                          <p className="text-[#0A2A66] text-lg">{step.description}</p>
                        </div>
                      </div>

                      <div className="relative z-10 flex-shrink-0 step-icon">
                        <div
                          className="w-24 h-24 flex items-center justify-center rounded-full font-extrabold text-2xl text-white animate-pulse-glow"
                          style={{
                            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                            boxShadow: `0 10px 35px ${step.color}60, inset 0 2px 15px rgba(255, 255, 255, 0.4)`,
                            border: '4px solid white',
                          }}
                        >
                          {step.icon === 'custom-target' ? (
                            <img
                              src={WhiteTarget}
                              alt="Goal Icon"
                              className="therapy-goal-icon"
                            />
                          ) : (
                            <i className={`${step.icon} text-4xl`} />
                          )}
                        </div>
                      </div>

                      <div className="flex-1"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1"></div>

                      <div className="relative z-10 flex-shrink-0 step-icon">
                        <div
                          className="w-24 h-24 flex items-center justify-center rounded-full font-extrabold text-2xl text-white animate-pulse-glow"
                          style={{
                            background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}CC 100%)`,
                            boxShadow: `0 10px 35px ${step.color}60, inset 0 2px 15px rgba(255, 255, 255, 0.4)`,
                            border: '4px solid white',
                          }}
                        >
                          {step.icon === 'custom-target' ? (
                            <img
                              src={WhiteTarget}
                              alt="Goal Icon"
                              className="therapy-goal-icon"
                            />
                          ) : (
                            <i className={`${step.icon} text-4xl`}></i>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 text-left">
                        <div
                          className="bg-white rounded-[30px] p-8 border-4 inline-block step-card"
                          style={{
                            borderColor: step.color,
                            boxShadow: `0 15px 40px ${step.color}30, inset 0 2px 10px ${step.color}20`,
                          }}
                        >
                          <h3
                            className="text-2xl font-extrabold text-[#0A2A66] mb-3"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                          >
                            {step.title}
                          </h3>
                          <p className="text-[#0A2A66] text-lg">{step.description}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Testimonials */}
        <section className="py-24 bg-gradient-to-br from-[#EAF7FF] to-[#FFF7DA] relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 flex items-center justify-center opacity-10 animate-float-slow"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              >
                <i className="ri-star-fill text-3xl text-[#FFC837]"></i>
              </div>
            ))}
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2
                className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                What{' '}
                <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">
                  Parents Say
                </span>
              </h2>
              <p className="text-[#0A2A66] text-xl">
                Real stories from families we&apos;ve had the privilege to support
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto" id="testimonial-wrapper">
              {/* Slider viewport */}
              <div className="overflow-hidden">
                {/* Sliding row */}
                <div
                  className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                  style={{
                    transform: `translateX(-${currentTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 px-1 sm:px-2"
                    >
                      {/* Whole CARD moves as a slide */}
                      <div
                        className="bg-white rounded-[50px] p-8 sm:p-10 md:p-12 border-8 border-[#0A2A66] relative"
                        style={{
                          boxShadow:
                            '0 30px 70px rgba(10, 42, 102, 0.3), inset 0 -5px 20px rgba(51, 200, 255, 0.1)',
                        }}
                      >
                        <div
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-2 bg-gradient-to-r from-[#FFC837] via-[#FF4F87] to-[#33C8FF] rounded-full"
                          style={{
                            boxShadow: '0 4px 20px rgba(255, 200, 55, 0.6)',
                          }}
                        ></div>

                        {/* Profile Image with Glow */}
                        <div className="flex justify-center mb-8">
                          <div className="relative">
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{
                                background:
                                  'linear-gradient(135deg, #FFC837, #FF4F87, #33C8FF)',
                                filter: 'blur(20px)',
                                opacity: 0.6,
                              }}
                            ></div>
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="relative w-24 h-24 rounded-full object-cover border-6 border-white"
                              style={{
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                backgroundColor: '#E3E6EB',
                                // move only the 2nd review image down a bit
                                objectPosition: index === 1 ? 'center 10%' : 'center',
                              }}
                              loading="lazy"
                              decoding="async"
                              crossOrigin="anonymous"
                              onError={handleImgError}
                            />
                          </div>
                        </div>

                        <div className="flex justify-center mb-8">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i
                              key={i}
                              className="ri-star-fill text-4xl text-[#FFC837]"
                              style={{
                                filter:
                                  'drop-shadow(0 2px 8px rgba(255, 200, 55, 0.6))',
                              }}
                            ></i>
                          ))}
                        </div>

                        <p className="text-[#0A2A66] text-2xl leading-relaxed mb-10 text-center italic font-medium">
                          &quot;{testimonial.text}&quot;
                        </p>

                        <div className="text-center">
                          <div
                            className="font-extrabold text-[#0A2A66] text-2xl mb-2"
                            style={{ fontFamily: 'Nunito, sans-serif' }}
                          >
                            {testimonial.name}
                          </div>
                          <div className="text-[#A9B1C0] text-lg font-semibold">
                            {testimonial.location}
                          </div>
                        </div>

                        <div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-2 bg-gradient-to-r from-[#33C8FF] via-[#4AD36D] to-[#FF8A3D] rounded-full"
                          style={{
                            boxShadow:
                              '0 4px 20px rgba(51, 200, 255, 0.6)',
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots – unchanged, still using currentTestimonial */}
              <div className="flex justify-center gap-4 mt-12">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`rounded-full transition-all cursor-pointer ${currentTestimonial === index
                        ? 'w-12 h-4 bg-gradient-to-r from-[#FFC837] to-[#FF8A3D]'
                        : 'w-4 h-4 bg-[#E3E6EB]'
                      }`}
                    style={
                      currentTestimonial === index
                        ? {
                          boxShadow:
                            '0 4px 15px rgba(255, 200, 55, 0.6)',
                        }
                        : {}
                    }
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>


            <div className="text-center mt-12">
              <Link
                to="/testimonials"
                className="text-[#0480E8] font-extrabold text-lg hover:text-[#0A2A66] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                Read More Success Stories
                <i className="ri-arrow-right-line text-xl"></i>
              </Link>
            </div>
          </div>
        </section>


        {/* Premium FAQ */}
        <section className="py-24 bg-gradient-to-br from-[#FFF7DA] via-white to-[#FFF7DA] relative overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 flex items-center justify-center opacity-10">
            <i className="ri-star-fill text-8xl text-[#FFC837]"></i>
          </div>
          <div className="absolute bottom-10 right-10 w-20 h-20 flex items-center justify-center opacity-10">
            <i className="ri-star-fill text-7xl text-[#FF8A3D]"></i>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                <span className="bg-gradient-to-r from-[#FF8A3D] to-[#FFC837] bg-clip-text text-transparent">Frequently Asked</span> Questions
              </h2>
              <p className="text-[#0A2A66] text-xl">
                Quick answers to common questions about our therapy services
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.slice(0, 5).map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-[30px] border-6 border-[#0A2A66] overflow-hidden hover:scale-102 transition-all"
                  style={{
                    boxShadow: '0 15px 40px rgba(10, 42, 102, 0.15), inset 0 2px 10px rgba(255, 200, 55, 0.1)'
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full px-10 py-8 flex justify-between items-center text-left hover:bg-[#FFF7DA]/30 transition-colors cursor-pointer"
                    aria-expanded={activeFaq === index}
                    aria-controls={`faq-panel-${index}`}
                  >
                    <span className="font-extrabold text-[#0A2A66] text-xl pr-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {faq.question}
                    </span>
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-all ${activeFaq === index ? 'bg-gradient-to-br from-[#FFC837] to-[#FF8A3D]' : 'bg-[#E3E6EB]'}`} style={activeFaq === index ? {
                      boxShadow: '0 6px 20px rgba(255, 200, 55, 0.5)'
                    } : {}}>
                      <i className={`ri-star-fill text-2xl ${activeFaq === index ? 'text-white' : 'text-[#A9B1C0]'}`}></i>
                    </div>
                  </button>
                  {activeFaq === index && (
                    <div id={`faq-panel-${index}`} className="px-10 pb-8 bg-gradient-to-b from-[#FFF7DA]/20 to-transparent">
                      <p className="text-[#0A2A66] leading-relaxed text-lg">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/faq"
                className="text-[#0480E8] font-extrabold text-lg hover:text-[#0A2A66] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                View All FAQs
                <i className="ri-arrow-right-line text-xl"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#0A2A66] via-[#0480E8] to-[#0A2A66] relative overflow-hidden">
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

          <div className="absolute top-20 left-20 w-24 h-24 flex items-center justify-center animate-float-slow opacity-20">
            <i className="ri-star-fill text-8xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 200, 55, 0.9))' }}></i>
          </div>
          <div className="absolute bottom-20 right-20 w-20 h-20 flex items-center justify-center animate-float-medium opacity-20">
            <i className="ri-star-fill text-7xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 25px rgba(51, 200, 255, 0.9))' }}></i>
          </div>

          <div className="max-w-[1280px] mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl lg:text-7xl font-extrabold text-white mb-8" style={{
              fontFamily: 'Nunito, sans-serif',
              textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}>
              Ready to Help Your Child <span className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent" style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 200, 55, 0.6))'
              }}>Shine?</span>
            </h2>
            <p className="text-white text-2xl mb-12 max-w-2xl mx-auto" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
              Take the first step towards unlocking your child's potential. Book a free consultation today.
            </p>
            <a
              href={mailtoFor('Homepage CTA')}
              className="cta-button bg-gradient-to-r from-[#FFC837] to-[#FFDD55] text-[#0A2A66] px-14 py-7 rounded-full font-extrabold text-2xl hover:scale-110 transition-all inline-flex items-center gap-4 whitespace-nowrap cursor-pointer border-6 border-white mx-auto"
              style={{
                boxShadow:
                  "0 15px 50px rgba(255, 200, 55, 0.6), inset 0 2px 15px rgba(255, 255, 255, 0.5)",
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
      </main>

      <Footer />

      <style>{`
  /* ------------------------------
     Fonts, keyframes, base helpers
     ------------------------------ */
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  /* Animations */
  @keyframes float-slow { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-30px); } }
  @keyframes float-medium { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
  @keyframes bounce-slow { 0%,100% { transform: translateY(0px) scale(1);} 50% { transform: translateY(-15px) scale(1.1);} }
  @keyframes pulse-glow { 0%,100% { transform: scale(1); opacity: 1;} 50% { transform: scale(1.05); opacity: 0.9;} }
  @keyframes twinkle { 0%,100% { opacity: 0.3; transform: scale(1);} 50% { opacity: 1; transform: scale(1.5);} }
  @keyframes float-vertical { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-18px);} }
  @keyframes float-vertical-slow { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-26px);} }

  .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
  .animate-float-medium { animation: float-medium 3s ease-in-out infinite; }
  .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
  .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
  .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
  .animate-float-vertical { animation: float-vertical 3.2s ease-in-out infinite; }
  .animate-float-vertical-slow { animation: float-vertical-slow 4s ease-in-out infinite; }

  /* Ensure decorative stars/hero items sit behind content */
  .star-hero, .star-sticker, .star-behind { z-index: 0; }
  section > .max-w-[1280px] { position: relative; z-index: 10; }

  /* Image fallback – only content images, not navbar logo */
main img { 
  background-color: #E3E6EB;
}

  /* Generic box-sizing helper */
  .sanaz-content, .sanaz-content * { box-sizing: border-box; }

  /* CTA helpers */
  .cta-cta { max-width: 100%; box-sizing: border-box; }
  .cta-button { box-sizing: border-box; }

  /* Step/ icon utilities */
  .step-icon { display: flex; justify-content: center; align-items: center; }
  .icon-bubble {
    width: 72px;
    height: 72px;
    border-radius: 9999px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border: 4px solid #ffc837;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  .therapy-goal-icon { width: 40px; height: 40px; object-fit: contain; }

  /* Base hero image / stat cards */
  .hero-image-wrapper {
    position: relative;
  }
  .hero-image-card {
    position: relative;
    max-width: 320px;
  }
  .premium-stat-left,
  .premium-stat-right {
    position: absolute;
  }
  .premium-stat-left {
    top: -16px;
    left: -12px;
  }
  .premium-stat-right {
    bottom: -18px;
    right: -12px;
  }

  /* ------------------------------------------------
     Responsive rules
     ------------------------------------------------ */

  /* === 320 - 370px: primary CTA fine-tune (HERO) === */
  @media (max-width: 370px) {
    .cta-button-primary {
      font-size: 0.7rem !important;
      padding: 0.75rem 1.3rem !important;
      width: 100% !important;
      max-width: none !important;
      margin-left: 0 !important;
      margin-right: auto !important;
    }
    .cta-primary-text {
      white-space: nowrap !important;
    }
    .cta-primary-icon {
      font-size: 0.85rem !important;
    }
  }

  /* === Broad tablet/phone breakpoint === */
  @media (max-width: 1024px) {
    .premium-stat-left,
    .premium-stat-right {
      transform: none !important;
    }
  }

  /* === Tablet + large phones (up to 768px) === */
  @media (max-width: 768px) {
    /* Hero heading responsiveness */
    .hero-heading {
      font-size: 42px !important;
      line-height: 1.05 !important;
      white-space: normal !important;
      word-break: break-word !important;
      display: block;
      max-width: 100%;
    }
    .hero-heading > span {
      font-size: 1.0em !important;
      display: block;
      margin-top: .5rem !important;
    }

    .star-hero, .star-sticker, .star-behind {
      z-index: 0 !important;
      opacity: 0.9;
    }

    /* SANAZ container mobile reductions (shared) */
    .sanaz-container { }
    .grid.lg\\:grid-cols-5 { grid-template-columns: 1fr !important; }
    .lg\\:col-span-2, .lg\\:col-span-3 { width: 100% !important; }
    .lg\\:col-span-3 { padding: 1rem !important; }
    .rounded-[60px] { border-radius: 1rem !important; }
    .sanaz-container .p-16 { padding: 1rem !important; }
    .sanaz-container { padding-right: 0rem !important; padding-bottom: 24px !important; }
    .sanaz-container .lg\\:col-span-3 { padding-right: 1.5rem !important; padding-left: 1.5rem !important; }
    .sanaz-container .lg\\:col-span-2 { padding-right: 0 !important; }
    .sanaz-container a { margin-right: 0 !important; margin-left: 0 !important; }

    /* CTA sizing utility applied for mobile up to 768 */
    .cta-cta {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      font-size: 1rem !important;
    }

    /* Therapy timeline: stacked single-column layout */
    .therapy-timeline {
      max-width: 360px !important;
      margin-left: auto !important;
      margin-right: auto !important;
      padding-left: 0.5rem !important;
      padding-right: 0.5rem !important;
    }
    .therapy-timeline .center-line {
      left: 28px !important;
      transform: none !important;
      width: 8px !important;
      height: 91% !important;
      border-radius: 10px !important;
      box-shadow: 0 0 18px rgba(255, 200, 55, 0.2) !important;
    }
    .therapy-timeline .therapy-step {
      display: block !important;
      position: relative !important;
      padding-left: 96px !important;
      margin-bottom: 22px !important;
    }
    .therapy-timeline .step-icon {
      position: absolute !important;
      left: -8px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      z-index: 30 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    .therapy-timeline .step-icon > div {
      width: 64px !important;
      height: 64px !important;
      min-width: 64px !important;
      min-height: 64px !important;
      border-radius: 9999px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 8px 24px rgba(10,10,30,0.12) !important;
      border: 3px solid #fff !important;
      background-clip: padding-box !important;
    }
    .therapy-timeline .step-icon i,
    .therapy-timeline .step-icon svg {
      font-size: 22px !important;
      width: 22px !important;
      height: 22px !important;
      display: block !important;
      line-height: 1 !important;
    }
    .therapy-timeline .bg-white.rounded-[30px],
    .therapy-timeline .step-card {
      display: block !important;
      margin: 0 0 12px 16px !important;
      width: calc(100% - 120px) !important;
      padding: 14px 14px !important;
      border-radius: 16px !important;
      border-width: 3px !important;
      box-shadow: 0 10px 30px rgba(10,10,30,0.06) !important;
      text-align: right !important;
      direction: ltr !important;
    }
    .therapy-timeline .bg-white.rounded-[30px] h3,
    .therapy-timeline .step-card h3 {
      font-size: 16px !important;
      margin-bottom: 6px !important;
      text-align: right !important;
    }
    .therapy-timeline .bg-white.rounded-[30px] p,
    .therapy-timeline .step-card p {
      font-size: 13px !important;
      margin: 0 !important;
      line-height: 1.35 !important;
      text-align: right !important;
    }
    .therapy-timeline .flex-1 { width: 100% !important; text-align: right !important; padding: 0 !important; }
    .therapy-timeline .therapy-step:last-child { margin-bottom: 26px !important; }

    .p-12 { padding: 1rem !important; }

    /* CTA button tweaks for <=768px */
    .cta-button {
      width: calc(100% - 2rem) !important;
      max-width: 520px !important;
      padding: 0.85rem 1rem !important;
      font-size: 1.05rem !important;
      gap: 0.75rem !important;
      justify-content: center !important;
      box-sizing: border-box !important;
    }
    .cta-button i { font-size: 1.4rem !important; }
  }

  /* === 375 - 480px: slightly larger hero image === */
  @media (min-width: 375px) and (max-width: 480px) {
    .hero-image-card {
      max-width: 360px !important;
    }
    .premium-stat-left {
      top: -18px;
      left: -10px;
    }
    .premium-stat-right {
      bottom: -20px;
      right: -10px;
    }
  }

  /* === Small tablets / large phones (481 - 639) === */
  @media (min-width: 481px) and (max-width: 640px) {
    .hero-image-card {
      max-width: 420px !important;
    }
    .premium-stat-left {
      top: -22px;
      left: -10px;
    }
    .premium-stat-right {
      bottom: -26px;
      right: -10px;
    }
  }

  /* === Small tablets / large phones (640 - 768) === */
  @media (min-width: 640px) and (max-width: 768px) {
    .hero-image-card {
      max-width: 520px !important;
    }
    .premium-stat-left {
      top: -22px;
      left: -18px;
    }
    .premium-stat-right {
      bottom: -26px;
      right: -18px;
    }
  }

  /* === Tablet 768 - 1024px: increase image and adjust stats === */
  @media (min-width: 768px) and (max-width: 1024px) {
    .hero-image-card {
      max-width: 700px !important;
    }
    .premium-stat-left {
      top: -14px;
      left: -10px;
    }
    .premium-stat-right {
      bottom: -28px;
      right: -18px;
    }
  }

  /* === Desktop 1025 - 1280px === */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .hero-section {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }
    .hero-image-card {
      max-width: 580px !important;
    }
    .premium-stat-left {
      top: -26px;
      left: -22px;
    }
    .premium-stat-right {
      bottom: -30px;
      right: -18px;
    }
  }

  /* === Large desktop 1281px+ === */
  @media (min-width: 1281px) {
    .hero-section {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
    .hero-image-card {
      max-width: 640px !important;
    }
    .premium-stat-left {
      top: -30px;
      left: -26px;
    }
    .premium-stat-right {
      bottom: -34px;
      right: -18px;
    }
  }

  /* === Mobile narrow (<= 480px) general (hero) === */
  @media (max-width: 480px) {
    .hero-heading {
      font-size: 38px !important;
      line-height: 1.06 !important;
      white-space: normal !important;
      word-break: break-word !important;
      display: block;
      max-width: 100%;
    }
    .hero-heading > span {
      font-size: 1.0em !important;
      display: block;
      margin-top: .5rem !important;
    }

    .premium-stat-left,
    .premium-stat-right {
      padding: 0.9rem !important;
      border-radius: 14px !important;
    }
  }

  /* === Sanaz section very small screens (<= 369px): 4 stacked, left aligned === */
  @media (max-width: 370px) {
    .sanaz-section {
      padding-top: 2.5rem !important;
      padding-bottom: 2.5rem !important;
    }

    .sanaz-container {
      border-radius: 1.5rem !important;
    }

    .sanaz-content {
      padding-right: 1rem !important;
      padding-left: 1rem !important;
      padding-top: 1.25rem !important;
      padding-bottom: 1.5rem !important;
      overflow-x: hidden !important;
    }

    /* "Meet our founder" pill */
.sanaz-content .founder-pill {
  padding: 0.5rem 0.9rem !important;
  gap: 0.5rem !important;
  margin-bottom: 0.9rem !important;

  display: inline-flex !important;
  align-items: center !important;   /* vertical center icon + text */
}

/* icon */
.sanaz-content .founder-pill i {
  font-size: 1.1rem !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  transform: translateY(8px) !important;      
}

/* text */
.sanaz-content .founder-pill span {
  font-size: 0.8rem !important;
  white-space: nowrap !important;
}

    .sanaz-content h3 {
      font-size: 2rem !important;
      margin-bottom: 0.6rem !important;
    }
    .sanaz-content .text-2xl {
      font-size: 1.25rem !important;
      margin-bottom: 0.9rem !important;
    }

    .sanaz-content p {
      font-size: 0.95rem !important;
      line-height: 1.5 !important;
      margin-bottom: 0.9rem !important;
    }

    .sanaz-content .sanaz-highlights {
      grid-template-columns: 1fr !important;
      gap: 0.75rem !important;
      margin-bottom: 1.2rem !important;
    }

    .sanaz-content .sanaz-highlights > div {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      text-align: left !important;
    }

    .sanaz-content .sanaz-highlights .w-12.h-12 {
      width: 2.5rem !important;
      height: 2.5rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
    }

    .sanaz-content .sanaz-highlights i {
      font-size: 1.1rem !important;
    }

    .sanaz-content .sanaz-highlights span {
      font-size: 0.85rem !important;
      display: block !important;
      white-space: normal !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }

    .sanaz-content .founder-cta {
      white-space: normal !important;
      padding-left: 0.9rem !important;
      padding-right: 0.9rem !important;
      padding-top: 0.8rem !important;
      padding-bottom: 0.8rem !important;
      font-size: 0.95rem !important;
      border-width: 3.5px !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      display: flex !important;
      justify-content: center !important;
      text-align: center !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
    .sanaz-content .founder-cta i {
      margin-left: 0.4rem !important;
      margin-top: 0.05rem !important;
      font-size: 1.1rem !important;
    }

    .sanaz-content p,
    .sanaz-content .feature-card,
    .sanaz-content .feature-card span {
      max-width: 100% !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }

    .sanaz-content .inline-flex.w-fit {
      max-width: 100% !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  /* === Sanaz section small mobiles (370px – 440px): 2x2 grid === */
  @media (min-width: 370px) and (max-width: 440px) {
    .sanaz-section {
      padding-top: 2.75rem !important;
      padding-bottom: 2.75rem !important;
    }

    .sanaz-container {
      border-radius: 1.7rem !important;
    }

    .sanaz-content {
      padding-right: 1.25rem !important;
      padding-left: 1.25rem !important;
      padding-top: 1.4rem !important;
      padding-bottom: 1.6rem !important;
      overflow-x: hidden !important;
    }

    /* "Meet our founder" pill */
.sanaz-content .founder-pill {
  padding: 0.6rem 1rem !important;
  gap: 0.55rem !important;
  margin-bottom: 1rem !important;

  display: inline-flex !important;
  align-items: center !important;   /* vertical center icon + text */
}

/* icon */
.sanaz-content .founder-pill i {
  font-size: 1.15rem !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  /* transform: none !important; */  
  transform: translateY(8px) !important;
     
}

/* text */
.sanaz-content .founder-pill span {
  font-size: 0.85rem !important;
  white-space: nowrap !important;
}

    .sanaz-content h3 {
      font-size: 2.1rem !important;
      margin-bottom: 0.7rem !important;
    }
    .sanaz-content .text-2xl {
      font-size: 1.3rem !important;
      margin-bottom: 1rem !important;
    }

    .sanaz-content p {
      font-size: 0.98rem !important;
      line-height: 1.55 !important;
      margin-bottom: 1rem !important;
    }

    .sanaz-content .sanaz-highlights {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      column-gap: 0.8rem !important;
      row-gap: 0.8rem !important;
      margin-bottom: 1.3rem !important;
    }

    .sanaz-content .sanaz-highlights > div {
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      text-align: left !important;
    }

    .sanaz-content .sanaz-highlights .w-12.h-12 {
      width: 2.2rem !important;
      height: 2.2rem !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      flex-shrink: 0 !important;
    }

    .sanaz-content .sanaz-highlights i {
      font-size: 1rem !important;
    }

    .sanaz-content .sanaz-highlights span {
      font-size: 0.5rem !important;
      display: block !important;
      white-space: normal !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }

    .sanaz-content .founder-cta {
      white-space: normal !important;
      padding-left: 1rem !important;
      padding-right: 1rem !important;
      padding-top: 0.85rem !important;
      padding-bottom: 0.85rem !important;
      font-size: 1rem !important;
      border-width: 3.5px !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
      display: flex !important;
      justify-content: center !important;
      text-align: center !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
    .sanaz-content .founder-cta i {
      margin-left: 0.45rem !important;
      margin-top: 0.06rem !important;
      font-size: 1.15rem !important;
    }

    .sanaz-content p,
    .sanaz-content .feature-card,
    .sanaz-content .feature-card span {
      max-width: 100% !important;
      word-break: break-word !important;
      overflow-wrap: anywhere !important;
    }

    .sanaz-content .inline-flex.w-fit {
      max-width: 100% !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 440px) {
    .sanaz-highlights .check-icon-fix {
      transform: translateY(7px) !important;
      display: inline-block !important;
    }
  }

  /* === Services section: heading & CTA for very small screens (<320px) === */
  @media (max-width: 319px) {
    .services-heading {
      font-size: 2rem !important;
      line-height: 1.18 !important;
      word-break: break-word !important;
    }
    .services-heading span {
      font-size: 1em !important;
    }

    .services-cta {
      font-size: 0.9rem !important;
      padding: 0.8rem 1.8rem !important;
      gap: 0.5rem !important;
    }
    .services-cta i {
      font-size: 1.1rem !important;
    }
  }

  /* === Services section: heading & CTA for 320px – 420px === */
  @media (min-width: 320px) and (max-width: 420px) {
    .services-heading {
      font-size: 2.3rem !important;
      line-height: 1.2 !important;
      word-break: break-word !important;
    }
    .services-heading span {
      font-size: 1em !important;
    }

    .services-cta {
      font-size: 1rem !important;
      padding: 0.9rem 2.2rem !important;
      gap: 0.6rem !important;
    }
    .services-cta i {
      font-size: 1.3rem !important;
    }
  }

  /* === Therapy timeline extra-small tuning: cards & alignment (<320px) === */
  @media (max-width: 319px) {
    /* Move vertical line further left */
    .therapy-timeline .center-line {
      left: 22px !important;
    }

    /* Pull timeline content a bit left & reduce step gap */
    .therapy-timeline .therapy-step {
      padding-left: 78px !important;
      margin-bottom: 18px !important;
    }

    /* Move icons a touch more left so they sit on the line nicely */
    .therapy-timeline .step-icon {
      left: -14px !important;
    }

    /* Reduce padding on cards */
    .therapy-timeline .bg-white.rounded-[30px],
    .therapy-timeline .step-card {
      padding: 10px 10px !important;
      margin: 0 0 10px 12px !important;
      width: calc(100% - 110px) !important;
    }

    /* Smaller heading text inside cards */
    .therapy-timeline .bg-white.rounded-[30px] h3,
    .therapy-timeline .step-card h3 {
      font-size: 14px !important;
      margin-bottom: 5px !important;
    }

    /* Smaller paragraph text */
    .therapy-timeline .bg-white.rounded-[30px] p,
    .therapy-timeline .step-card p {
      font-size: 12px !important;
      line-height: 1.3 !important;
    }
  }

  /* === Therapy timeline small mobiles: 320px – 400px === */
  @media (min-width: 320px) and (max-width: 400px) {
    .therapy-timeline {
      max-width: 380px !important;
    }

    /* Move vertical line slightly left */
    .therapy-timeline .center-line {
      left: 24px !important;
    }

    /* Reduce left padding and step gap slightly */
    .therapy-timeline .therapy-step {
      padding-left: 84px !important;
      margin-bottom: 20px !important;
    }

    /* Nudge icons left to align visually with line */
    .therapy-timeline .step-icon {
      left: -12px !important;
    }

    .therapy-timeline .bg-white.rounded-[30px],
    .therapy-timeline .step-card {
      padding: 12px 12px !important;
      margin: 0 0 12px 14px !important;
      width: calc(100% - 115px) !important;
    }

    .therapy-timeline .bg-white.rounded-[30px] h3,
    .therapy-timeline .step-card h3 {
      font-size: 15px !important;
      margin-bottom: 6px !important;
    }

    .therapy-timeline .bg-white.rounded-[30px] p,
    .therapy-timeline .step-card p {
      font-size: 12.5px !important;
      line-height: 1.35 !important;
    }
  }


`}</style>


    </div>
  );
}
