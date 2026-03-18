import { useEffect, useRef, useState } from "react";
import "../styles/TestimonialsSection.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Josh Rosen",
    role: "Legal Professional",
    quote: "Cambridge taught me how to read. Before coming to Cambridge I did not know how to read or write. One of my favorite memories was meeting my good friend Robert Bielunas there.",
    meta: [
      "Joined Cambridge in 2005 LS IV, Graduated MS IV in 2010.",
      "Graduated from law school and currently works in a court.",
    ],
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--rose",
  },
  {
    id: 2,
    name: "Athena Hallberg",
    role: "Public Health Researcher",
    quote: "Most recently worked as a research assistant for Dr. Dana Suskind at the TMW Center for Early Learning and Public Health, which aims to reduce inequities in early childhood outcomes.",
    meta: [
      "Joined Cambridge in 2005 LS I, Graduated MS IV in 2013.",
      "Graduated with a master's degree from the University of Chicago's Harris School.",
    ],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--cyan",
  },
  {
    id: 3,
    name: "Claire Stevenson",
    role: "Performance Artist",
    quote: "Claire attended Cambridge in LS II and graduated from the Upper School in 2019. She graduated from Hollins University with a degree in Performance Theater.",
    meta: [
      "Joined Cambridge in 2009, Graduated US in 2019.",
      "Graduated with a degree in performance theater from Hollins University.",
    ],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--indigo",
  },
  {
    id: 4,
    name: "Kate Voynow",
    role: "Graduate Student",
    quote: "Cambridge taught me how to read which changed the trajectory of my life. I feel well prepared to deal with dyslexia in any setting I'm in, whether that be at work or school.",
    meta: [
      "Joined Cambridge in 2005 LS II, Graduated MS IV in 2012.",
      "Pursuing a masters in public health at the University of Pittsburgh.",
    ],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--rose",
  },
  {
    id: 5,
    name: "Mary Barnes",
    role: "Educator",
    quote: "Cambridge taught me how to read and write and just about everything else, since I was there for 11 years. It really was like my second home.",
    meta: [
      "Attended Cambridge for 11 years.",
    ],
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--cyan",
  },
  {
    id: 6,
    name: "Brady Bryson",
    role: "Filmmaker & Actor",
    quote: "Brady started at Cambridge in LSIV essentially as a non-reader. Four years later, he created a petition to start our US, and Brady was our first graduate.",
    meta: [
      "Joined Cambridge in 2005, Graduated US in 2010.",
      "Pursuing an acting career, starring in award winning short films.",
    ],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    variant: "tsm-card--indigo",
  },
];

function clamp01(v) { return Math.max(0, Math.min(1, v)); }

function TestimonialCard({ data }) {
  const { name, role, quote, meta, variant, avatar } = data;
  return (
    <article className={`tsm-card ${variant}`}>

      {/* Top accent bar */}
      <div className="tsm-card__accent-bar" />

      {/* Quote mark */}
      <span className="tsm-quote-mark">❝</span>

      {/* Avatar + name row */}
      <div className="tsm-card__profile">
        <div className="tsm-avatar">
          <img
            src={avatar}
            alt={name}
            className="tsm-avatar__img"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
        <div className="tsm-card__identity">
          <h3 className="tsm-card__name">{name}</h3>
          <span className="tsm-card__role">{role}</span>
        </div>
      </div>

      {/* Quote */}
      <p className="tsm-card__text">"{quote}"</p>

      {/* Meta */}
      <div className="tsm-card__meta">
        {meta.map((m, i) => (
          <div key={i} className="tsm-meta-row">
            <span className="tsm-meta-dot" />
            <span className="tsm-meta-text">{m}</span>
          </div>
        ))}
      </div>

    </article>
  );
}

export default function TestimonialsSection() {
  const wrapperRef   = useRef(null);
  const trackRef     = useRef(null);
  const targetRef    = useRef(0);
  const smoothRef    = useRef(0);
  const [progress, setProgress]         = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const tw = trackRef.current.scrollWidth;
      const vw = window.innerWidth;
      setMaxTranslate(Math.max(0, tw - vw + 80));
      targetRef.current = 0;
      smoothRef.current = 0;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    let raf = 0;
    const computeTarget = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      targetRef.current = range > 0 ? clamp01(-rect.top / range) : 0;
    };
    const tick = () => {
      const next = smoothRef.current + (targetRef.current - smoothRef.current) * 0.1;
      smoothRef.current = next;
      setProgress(p => (Math.abs(next - p) > 0.0005 ? next : p));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", computeTarget, { passive: true });
    window.addEventListener("resize", computeTarget);
    computeTarget();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", computeTarget);
      window.removeEventListener("resize", computeTarget);
    };
  }, []);

  const activeIdx = Math.round(progress * (TESTIMONIALS.length - 1));

  return (
    <div
      ref={wrapperRef}
      className="tsm-wrapper"
      style={{ height: `calc(100vh + ${maxTranslate}px)` }}
    >
      <div className="tsm-sticky">

        <div className="tsm-header">
          <span className="tsm-eyebrow">Testimonials</span>
          <h2 className="tsm-heading">Voices of Our Community</h2>
          <p className="tsm-subtext">Real stories from people whose lives were transformed.</p>
        </div>

        <div className="tsm-viewport">
          <div
            className="tsm-track"
            ref={trackRef}
            style={{ transform: `translateX(-${progress * maxTranslate}px)` }}
          >
            {TESTIMONIALS.map(t => (
              <TestimonialCard key={t.id} data={t} />
            ))}
          </div>
        </div>

        <div className="tsm-dots">
          {TESTIMONIALS.map((t, i) => (
            <span
              key={t.id}
              className={`tsm-dot${i === activeIdx ? " tsm-dot--active" : ""}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}