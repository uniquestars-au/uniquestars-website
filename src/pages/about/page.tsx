// src/pages/about/page.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import SEO from '../../components/SEO';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import SanazAbout from '../../assets/Sanaz About Section.png';

// inline SVG fallback used when an <img> fails to load
const placeholderSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
     <rect width='100%' height='100%' fill='%23E3E6EB' rx='30'/>
     <g transform='translate(100,112)'>
       <text text-anchor='middle' font-family='Nunito, sans-serif' font-weight='700' font-size='48' fill='%230A2A66'>?</text>
     </g>
   </svg>`
)}`;

function handleImgError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  img.onerror = null; // prevent loop
  img.src = placeholderSvg;
  img.style.objectFit = 'cover';
  img.style.backgroundColor = '#E3E6EB';
}

/* ---------- Helpers ---------- */

function formatNumber(num: number) {
  return num.toLocaleString();
}

function getStartValue(target: number, isPercent: boolean) {
  // sensible heuristics so counters start near the target (not from 0)
  if (isPercent && target > 50) return Math.max(target - 3, 0); // e.g. 95 -> 92 or 98 -> 95
  if (target >= 1000) return Math.max(target - 100, 0); // e.g. 1000 -> 900
  if (target >= 500) return Math.max(target - 50, 0); // e.g. 500 -> 450
  if (target >= 100) return Math.max(target - 10, 0); // e.g. 150 -> 140
  if (target >= 10) return Math.max(target - 3, 0); // e.g. 12 -> 9
  return Math.max(target - 1, 0); // 8 -> 7 etc.
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/* ---------- CountUp component ---------- */

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  play?: boolean;
  /** Optional explicit start value (overrides getStartValue for this counter) */
  start?: number;
};

export function CountUp({
  end,
  suffix = '',
  duration = 1400,
  className = '',
  play = true,
  start,
}: CountUpProps) {
  const isPercent = suffix === '%';
  const initialStart = start !== undefined ? start : getStartValue(end, isPercent);

  const [value, setValue] = useState(initialStart);
  const rafRef = useRef<number | null>(null);
  const playedRef = useRef(false); // ensure runs once if desired

  useEffect(() => {
    const isPercentLocal = suffix === '%';
    const startVal = start !== undefined ? start : getStartValue(end, isPercentLocal);

    // If play is false, reset to start value and do not animate
    if (!play) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setValue(startVal);
      playedRef.current = false;
      return;
    }

    // If already played (and we don't want repeat), short-circuit to final value
    if (playedRef.current) {
      setValue(end);
      return;
    }

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(startVal + (end - startVal) * eased);
      setValue(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setValue(end); // ensure exact final
        playedRef.current = true;
      }
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end, suffix, duration, play, start]);

  return (
    <div className={className}>
      {formatNumber(value)}
      {suffix}
    </div>
  );
}

/* ---------- StatsCard component ---------- */
/**
 * StatsCard component
 * - Handles IntersectionObserver to trigger CountUp when the card is visible
 * - props: stat (object), duration (optional)
 */
function StatsCard({ stat, duration = 1400 }: { stat: any; duration?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // once visible we can unobserve to avoid retrigger
            if (io && el) io.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.35, // visible when ~35% in view
      }
    );

    io.observe(el);

    return () => {
      if (io && el) io.unobserve(el);
    };
  }, [ref]);

  // parse numeric part and suffix
  const raw = String(stat.number).trim();
  const match = raw.match(/^([\d,\.]+)(\+|%|$)/);
  const numericStr = match ? match[1].replace(/,/g, '') : raw;
  const suffix = match && match[2] ? match[2] : '';
  const end = Math.round(Number(numericStr));

  // ----- Custom starts for specific stats -----
  const label: string = String(stat.label ?? '');
  const lowerLabel = label.toLowerCase();
  const isPercent = suffix === '%';

  let startOverride: number | undefined = undefined;

  // 1) Years stat: e.g. "Years of Experience" with end=5 → start at 1
  if (lowerLabel.includes('year') && end === 5 && !isPercent) {
    startOverride = 1;
  }

  // 2) Success rate stat: e.g. "Success Rate" 100% → start at 90%
  if (isPercent && end === 100 && lowerLabel.includes('success')) {
    startOverride = 90;
  }

  return (
    <div ref={ref} className="text-center group">
      <div
        className="w-32 h-32 flex items-center justify-center rounded-full mx-auto mb-6 group-hover:scale-110 transition-all duration-300"
        style={{
          background: `linear-gradient(135deg, ${stat.color}20 0%, white 100%)`,
          border: `6px solid ${stat.color}`,
          boxShadow: `0 15px 40px ${stat.color}40, inset 0 2px 15px ${stat.color}20`,
        }}
      >
        <i
          className={`${stat.icon} text-6xl`}
          style={{
            color: stat.color,
            filter: `drop-shadow(0 4px 10px ${stat.color}60)`,
          }}
        ></i>
      </div>

      {/* Animated number */}
      <div
        className="text-5xl font-extrabold mb-3"
        style={{
          background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Nunito, sans-serif',
        }}
      >
        <CountUp
          end={end}
          suffix={suffix}
          duration={duration}
          play={visible}
          start={startOverride}
        />
      </div>

      <div className="text-[#0A2A66] text-lg">{stat.label}</div>
    </div>
  );
}

export default function About() {
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
      '[Parent Name]',
    ];
    const body = bodyLines.join('\n');
    return `mailto:admin@uniquestars.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const values = [
    {
      icon: 'ri-heart-fill',
      color: '#FF4F87',
      gradient: 'from-[#FF4F87] to-[#FF8A3D]',
      title: 'Compassion',
      description: 'Every child deserves warmth, understanding, and individualized care in their developmental journey.',
    },
    {
      icon: 'ri-star-fill',
      color: '#FFC837',
      gradient: 'from-[#FFC837] to-[#FFDD55]',
      title: 'Excellence',
      description: 'We maintain the highest standards through ESDM certification and evidence-based practices.',
    },
    {
      icon: 'ri-team-fill',
      color: '#33C8FF',
      gradient: 'from-[#33C8FF] to-[#0480E8]',
      title: 'Partnership',
      description: 'We work hand-in-hand with families, empowering parents as active participants in therapy.',
    },
  ];

  const approaches = [
    {
      icon: 'ri-gamepad-fill',
      color: '#4AD36D',
      title: 'Play-Based Learning',
      description: 'Therapy disguised as fun! We use natural play to teach essential skills in an engaging way.',
    },
    {
      icon: 'ri-star-smile-fill',
      color: '#FFC837',
      title: 'ESDM Certified',
      description: 'Specialized Early Start Denver Model approach proven effective for young children with autism.',
    },
    {
      icon: 'ri-user-heart-fill',
      color: '#FF4F87',
      title: 'Personalized Plans',
      description: 'Every child is unique. We create customized therapy plans tailored to individual needs and goals.',
    },
  ];

  const impactStats = [
    { number: '500+', label: 'Families Supported', icon: 'ri-parent-fill', color: '#FF4F87' },
    { number: '5+', label: 'Years Experience', icon: 'ri-time-fill', color: '#FFC837' },
    { number: '100%', label: 'Success Rate', icon: 'ri-line-chart-fill', color: '#4AD36D' },
    { number: '1000+', label: 'Therapy Hours', icon: 'ri-heart-pulse-fill', color: '#33C8FF' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ----- SEO: page-specific meta ----- */}
      <SEO
        title="About Unique Stars | Early Intervention Therapy in Sydney"
        description="Learn about Unique Stars and Sanaz, an ESDM-certified therapist helping young children with autism through early intervention, play-based learning, and compassionate care in Sydney."
        keywords="about Unique Stars, ESDM therapist Sydney, early intervention specialist, autism care Sydney, Sanaz therapist"
        canonical="https://uniquestars.com.au/about"
      />

      <Navbar />

      {/* Premium Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EAF7FF 0%, #FFF7DA 50%, #E0F7FF 100%)',
          minHeight: '60vh',
        }}
      >
        {/* Floating Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-16 h-16 flex items-center justify-center animate-float-slow opacity-30">
            <i className="ri-star-fill text-5xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.8))' }}></i>
          </div>
          <div className="absolute top-[30%] right-[15%] w-14 h-14 flex items-center justify-center animate-float-medium opacity-25" style={{ animationDelay: '1s' }}>
            <i className="ri-star-fill text-4xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 12px rgba(255, 79, 135, 0.7))' }}></i>
          </div>
          <div className="absolute bottom-[25%] left-[20%] w-12 h-12 flex items-center justify-center animate-float-slow opacity-20" style={{ animationDelay: '2s' }}>
            <i className="ri-star-fill text-3xl text-[#4AD36D]" style={{ filter: 'drop-shadow(0 0 10px rgba(74, 211, 109, 0.7))' }}></i>
          </div>
          <div className="absolute top-[45%] right-[8%] w-16 h-16 flex items-center justify-center animate-float-medium opacity-30" style={{ animationDelay: '1.5s' }}>
            <i className="ri-star-fill text-5xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 15px rgba(51, 200, 255, 0.8))' }}></i>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-24 relative z-10 text-center">
          <div
            className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-full mb-8 border-4 border-[#FFC837]"
            style={{
              boxShadow: '0 8px 30px rgba(255, 200, 55, 0.4), inset 0 2px 10px rgba(255, 200, 55, 0.2)',
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#FFC837] to-[#FFDD55] rounded-full" style={{ boxShadow: '0 4px 15px rgba(255, 200, 55, 0.5)' }}>
              <i className="ri-information-fill text-2xl text-white"></i>
            </div>
            <span className="text-[#0A2A66] font-bold text-base">About Us</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-extrabold text-[#0A2A66] mb-6 leading-tight" style={{ fontFamily: 'Nunito, sans-serif' }}>
            About <span className="bg-gradient-to-r from-[#FFC837] via-[#FFDD55] to-[#FF8A3D] bg-clip-text text-transparent" style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 200, 55, 0.3))' }}>Unique Stars</span>
          </h1>
          <p className="text-xl text-[#0A2A66] max-w-3xl mx-auto leading-relaxed">
            Empowering young children with autism to reach their full potential through compassionate, evidence-based early intervention therapy.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-24 h-24 flex items-center justify-center opacity-10">
          <i className="ri-star-fill text-8xl text-[#FFC837]"></i>
        </div>
        <div className="absolute bottom-10 left-10 w-20 h-20 flex items-center justify-center opacity-10">
          <i className="ri-star-fill text-7xl text-[#33C8FF]"></i>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[50px] p-16 border-8 border-[#0A2A66] relative" style={{ boxShadow: '0 30px 70px rgba(10, 42, 102, 0.2), inset 0 -5px 20px rgba(255, 200, 55, 0.1)' }}>
            {/* Starburst Decorations */}
            <div className="absolute -top-6 -left-6 w-12 h-12 flex items-center justify-center" style={{ animation: 'floatVertical 3s ease-in-out infinite' }}>
              <i className="ri-star-fill text-5xl text-[#FFC837]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 200, 55, 0.9))' }}></i>
            </div>

            <div className="absolute -bottom-6 -right-6 w-12 h-12 flex items-center justify-center" style={{ animation: 'floatVertical 3s ease-in-out infinite', animationDelay: '1.5s' }}>
              <i className="ri-star-fill text-5xl text-[#FF4F87]" style={{ filter: 'drop-shadow(0 0 15px rgba(255, 79, 135, 0.9))' }}></i>
            </div>

            <h2 className="text-5xl font-extrabold text-[#0A2A66] mb-8 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Our <span className="bg-gradient-to-r from-[#33C8FF] to-[#0480E8] bg-clip-text text-transparent">Story</span>
            </h2>
            <div className="space-y-6 text-[#0A2A66] text-lg leading-relaxed max-w-4xl mx-auto">
              <p>
                Unique Stars was founded with a simple but powerful belief: every child with autism has unique strengths and unlimited potential waiting to shine. Our journey began when Sanaz, our founder and lead therapist, witnessed firsthand the transformative power of early intervention therapy.
              </p>
              <p>
                After years of specialized training and certification in the Early Start Denver Model (ESDM), Sanaz established Unique Stars to provide Sydney families with access to world-class, evidence-based therapy delivered with warmth, compassion, and genuine care.
              </p>
              <p>
                Today, we're proud to have supported over 500 families across Sydney, helping young children develop essential communication, social, and behavioral skills through play-based learning. Every success story reminds us why we do what we do – because every child deserves the chance to reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
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
              Mission, Vision & <span className="bg-gradient-to-r from-[#FF4F87] to-[#FF8A3D] bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-star-fill text-3xl text-[#33C8FF]" style={{ filter: 'drop-shadow(0 0 10px #33C8FF)' }}></i>
              </div>

              <div className="bg-gradient-to-br from-[#33C8FF] to-[#0480E8] rounded-[40px] p-12 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] h-full cursor-pointer" style={{ boxShadow: '0 20px 50px rgba(51, 200, 255, 0.4), inset 0 -5px 20px rgba(255, 255, 255, 0.3)' }}>
                <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ backgroundColor: 'white', boxShadow: '0 10px 30px rgba(51, 200, 255, 0.6), inset 0 2px 10px rgba(51, 200, 255, 0.3)' }}>
                  <i className="ri-compass-3-fill text-5xl text-[#33C8FF]"></i>
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-6 text-center" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                  Our Mission
                </h3>
                <p className="text-white/95 leading-relaxed text-center text-lg">
                  To empower young children with autism to reach their full potential through compassionate, evidence-based early intervention therapy. We provide families with the tools, support, and expertise needed to help their children thrive in all areas of development.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-star-fill text-3xl text-[#4AD36D]" style={{ filter: 'drop-shadow(0 0 10px #4AD36D)' }}></i>
              </div>

              <div className="bg-gradient-to-br from-[#4AD36D] to-[#33C8FF] rounded-[40px] p-12 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] h-full cursor-pointer" style={{ boxShadow: '0 20px 50px rgba(74, 211, 109, 0.4), inset 0 -5px 20px rgba(255, 255, 255, 0.3)' }}>
                <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ backgroundColor: 'white', boxShadow: '0 10px 30px rgba(74, 211, 109, 0.6), inset 0 2px 10px rgba(74, 211, 109, 0.3)' }}>
                  <i className="ri-eye-fill text-5xl text-[#4AD36D]"></i>
                </div>
                <h3 className="text-3xl font-extrabold text-white mb-6 text-center" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                  Our Vision
                </h3>
                <p className="text-white/95 leading-relaxed text-center text-lg">
                  A world where every child with autism has access to high-quality early intervention therapy, and where families feel supported, empowered, and hopeful about their child's future. We envision a community where every unique star shines bright.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-star-fill text-3xl" style={{ color: value.color, filter: `drop-shadow(0 0 10px ${value.color})` }}></i>
                </div>

                <div className={`bg-gradient-to-br ${value.gradient} rounded-[40px] p-10 hover:scale-105 transition-all duration-300 border-6 border-[#0A2A66] h-full cursor-pointer`} style={{ boxShadow: `0 20px 50px ${value.color}40, inset 0 -5px 20px rgba(255, 255, 255, 0.3)` }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ backgroundColor: 'white', boxShadow: `0 10px 30px ${value.color}60, inset 0 2px 10px ${value.color}30` }}>
                    <i className={`${value.icon} text-5xl`} style={{ color: value.color }}></i>
                  </div>
                  <h3 className="text-3xl font-extrabold text-white mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif', textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
                    {value.title}
                  </h3>
                  <p className="text-white/95 leading-relaxed text-center text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
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
                <div className="inline-flex items-center gap-3 bg-white/20 px-3 py-2 md:px-5 md:py-3 rounded-full mb-8 w-fit backdrop-blur-sm" style={{ boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)' }}>
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
                  ESDM Certified Therapist & Founder
                        </p>
      
                <p className="text-white/95 text-base md:text-lg leading-relaxed mb-6">
                  With over 5 years of dedicated experience in early intervention therapy, Sanaz has transformed the lives of hundreds of children and families across Sydney. Her passion for helping children with autism reach their full potential led her to pursue specialized certification in the Early Start Denver Model (ESDM).
                </p>

                <p className="text-white/95 text-base md:text-lg leading-relaxed mb-10">
                  Sanaz's warm, family-centered approach combines evidence-based practices with genuine compassion, creating a safe and nurturing environment where children thrive. She believes that every child has unique strengths waiting to shine, and her mission is to help unlock that potential through play-based learning.
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

                      </div>
                    </div>
                  </div>
                </div>
              </section>


      {/* Our Approach */}
      <section className="py-24 bg-gradient-to-br from-[#FFF7DA] via-white to-[#EAF7FF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute w-16 h-16 flex items-center justify-center animate-float-slow" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>
              <i className="ri-star-fill text-6xl text-[#FFC837]"></i>
            </div>
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Our <span className="bg-gradient-to-r from-[#4AD36D] to-[#33C8FF] bg-clip-text text-transparent">Approach</span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
              How we help children thrive through evidence-based therapy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {approaches.map((approach, index) => (
              <div key={index} className="group relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-star-fill text-3xl" style={{ color: approach.color, filter: `drop-shadow(0 0 10px ${approach.color})` }}></i>
                </div>

                <div className="bg-white rounded-[40px] p-10 hover:scale-105 transition-all duration-300 border-6 h-full cursor-pointer" style={{ borderColor: approach.color, boxShadow: `0 20px 50px ${approach.color}30, inset 0 -5px 20px ${approach.color}10` }}>
                  <div className="w-20 h-20 flex items-center justify-center rounded-3xl mb-6 mx-auto" style={{ background: `linear-gradient(135deg, ${approach.color}20 0%, white 100%)`, border: `4px solid ${approach.color}`, boxShadow: `0 10px 30px ${approach.color}40, inset 0 2px 10px ${approach.color}20` }}>
                    <i className={`${approach.icon} text-5xl`} style={{ color: approach.color }}></i>
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#0A2A66] mb-4 text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    {approach.title}
                  </h3>
                  <p className="text-[#0A2A66] leading-relaxed text-center text-lg">
                    {approach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-5xl lg:text-6xl font-extrabold text-[#0A2A66] mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Our{' '}
              <span className="bg-gradient-to-r from-[#FF8A3D] to-[#FFC837] bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            <p className="text-[#0A2A66] text-xl max-w-2xl mx-auto">
              Making a real difference in children's lives every day
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <StatsCard key={index} stat={stat} duration={1400} />
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
            Ready to Start Your{' '}
            <span
              className="bg-gradient-to-r from-[#FFC837] to-[#FFDD55] bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 200, 55, 0.6))' }}
            >
              Journey?
            </span>
          </h2>
          <p
            className="text-white text-2xl mb-12 max-w-2xl mx-auto"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}
          >
            Let's work together to help your child shine bright
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
          animation: float-medium 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }

        /* Vertical floating animation for starburst decorations */
        @keyframes floatVertical {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }


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
          }
          .sanaz-content .founder-pill i {
            font-size: 1.1rem !important;
          }
          .sanaz-content .founder-pill span {
            font-size: 0.8rem !important;
            white-space: nowrap !important;
          }

          /* Heading & subheading */
          .sanaz-content h3 {
            font-size: 2rem !important;
            margin-bottom: 0.6rem !important;
          }
          .sanaz-content .text-2xl {
            font-size: 1.25rem !important;
            margin-bottom: 0.9rem !important;
          }

          /* Paragraph text */
          .sanaz-content p {
            font-size: 0.95rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0.9rem !important;
          }

          /* Highlights: 1 column (4 cards stacked), left aligned */
          .sanaz-content .sanaz-highlights {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
            margin-bottom: 1.2rem !important;
          }

          .sanaz-content .sanaz-highlights > div {
            display: flex !important;
            align-items: center !important;          /* icon vertically centered with text */
            justify-content: flex-start !important;  /* left align content */
            text-align: left !important;
          }

          /* Green circle with check — icon centered */
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

          /* Text: slightly smaller, wraps, no overflow */
          .sanaz-content .sanaz-highlights span {
            font-size: 0.85rem !important;
            display: block !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: anywhere !important;
          }

          /* CTA button: Learn More About Sanaz */
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

          /* Safety: prevent overflow of any child */
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

        /* === Sanaz section small mobiles (370px – 440px): 2x2 grid, left aligned, smaller circles === */
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
          }
          .sanaz-content .founder-pill i {
            font-size: 1.15rem !important;
          }
          .sanaz-content .founder-pill span {
            font-size: 0.85rem !important;
            white-space: nowrap !important;
          }

          /* Heading & subheading */
          .sanaz-content h3 {
            font-size: 2.1rem !important;
            margin-bottom: 0.7rem !important;
          }
          .sanaz-content .text-2xl {
            font-size: 1.3rem !important;
            margin-bottom: 1rem !important;
          }

          /* Paragraph text */
          .sanaz-content p {
            font-size: 0.98rem !important;
            line-height: 1.55 !important;
            margin-bottom: 1rem !important;
          }

          /* Highlights: 2 columns (2 per row), left aligned */
          .sanaz-content .sanaz-highlights {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            column-gap: 0.8rem !important;
            row-gap: 0.8rem !important;
            margin-bottom: 1.3rem !important;
          }

          .sanaz-content .sanaz-highlights > div {
            display: flex !important;
            align-items: center !important;          /* icon vertically centered */
            justify-content: flex-start !important;  /* left align content in each card */
            text-align: left !important;
          }

          /* Smaller green circle, icon centered */
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

          /* Smaller text, wrapping inside card */
          .sanaz-content .sanaz-highlights span {
            font-size: 0.8rem !important;
            display: block !important;
            white-space: normal !important;
            word-break: break-word !important;
            overflow-wrap: anywhere !important;
          }

          /* CTA button: Learn More About Sanaz */
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

          /* Safety: prevent overflow */
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
            transform: translateY(7px) !important;  /* slight downward shift */
            display: inline-block !important;
          }
        }

        /* === Premium CTA: <320px — smaller title & button === */
        @media (max-width: 319px) {
          .premium-cta-section .premium-cta-heading {
            font-size: 2.3rem !important;
            line-height: 1.2 !important;
            word-break: break-word !important;
          }
          .premium-cta-section .premium-cta-heading span {
            font-size: 1em !important;
          }

          .premium-cta-section .cta-button {
            font-size: 0.95rem !important;
            padding: 0.75rem 1.5rem !important;
          }
          .premium-cta-section .cta-button i {
            font-size: 1.4rem !important;
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
            padding: 0.85rem 1.9rem !important;
          }
          .premium-cta-section .cta-button i {
            font-size: 1.6rem !important;
          }
        }
      `}</style>

    </div>
  );
}
