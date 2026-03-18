import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import "../styles/CasestudiesSection.css";

/* ── Data ── */
const caseStudies = [
  {
    id: "01", tag: "Networking",
    lottie: "https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json",
    title: "Enterprise Network Overhaul", client: "Manufacturing Firm",
    summary: "Redesigned the entire LAN/WAN infrastructure for a 500-seat factory floor, reducing downtime by 74% and cutting operational costs significantly.",
    challenge: "Frequent network outages, outdated switches, and zero redundancy across three production floors were causing costly production halts.",
    solution: "Deployed a fully managed, redundant network architecture using enterprise-grade switches and firewalls with centralised monitoring and failover support.",
    result: ["74% less downtime", "3 floors unified", "Zero outages"],
    industry: "Manufacturing", duration: "8 Weeks",
    color: "#e8193c", bg: "#fff0f3",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: "02", tag: "Cloud & Software",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_qp1q7mct.json",
    title: "Hybrid Cloud Migration", client: "Regional Healthcare Provider",
    summary: "Migrated legacy on-premise servers to a hybrid cloud environment, improving data access speed and ensuring full compliance with healthcare data standards.",
    challenge: "Slow patient record access, ageing hardware nearing end-of-life, and growing compliance requirements were creating serious operational risk.",
    solution: "Phased hybrid cloud migration with encrypted storage, role-based access, and automated backups — with zero patient data loss.",
    result: ["60% faster retrieval", "100% compliant", "40% cost cut"],
    industry: "Healthcare", duration: "12 Weeks",
    color: "#0057ff", bg: "#eef3ff",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    id: "03", tag: "IT Support",
    lottie: "https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json",
    title: "Multi-Campus IT Modernisation", client: "Educational Institution",
    summary: "Provided end-to-end IT support and hardware refresh across 6 campuses, standardising equipment and establishing a responsive helpdesk.",
    challenge: "Inconsistent hardware, no central IT policy, and long resolution times were frustrating staff and impacting student experience.",
    solution: "Deployed standardised workstations, set up a centralised IT helpdesk, and introduced remote monitoring for proactive issue resolution.",
    result: ["6 campuses unified", "65% faster response", "Unified IT policy"],
    industry: "Education", duration: "10 Weeks",
    color: "#00b87a", bg: "#eafaf4",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
];

const heroImages = [
  { src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=85", label: "Network Infrastructure" },
  { src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=85", label: "Cloud Solutions" },
  { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=85", label: "IT Support & Services" },
  { src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=700&q=85", label: "Data Centre Management" },
];

const metrics = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 16, suffix: "+", label: "Years of Expertise" },
  { value: 3,  suffix: "×", label: "Average ROI" },
];

/* ── Hooks ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useCounter(target, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let cur = 0; const step = Math.ceil(target / 55);
    const id = setInterval(() => { cur += step; if (cur >= target) { setVal(target); clearInterval(id); } else setVal(cur); }, 18);
    return () => clearInterval(id);
  }, [run, target]);
  return val;
}

/* ── Lottie ── */
function LottieIcon({ src, size = 48 }) {
  useEffect(() => {
    if (!document.querySelector('script[src*="lottie-player"]')) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      document.head.appendChild(s);
    }
  }, []);
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <lottie-player src={src} background="transparent" speed="1"
        style={{ width: size, height: size }} loop autoplay />
    </div>
  );
}

/* ══════════════════════════════════════════
   STACK CARD COMPONENT
══════════════════════════════════════════ */
function CardRotate({ children, onSendToBack, sensitivity }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [40, -40]);
  const rotateY = useTransform(x, [-100, 100], [-40, 40]);

  function handleDragEnd(_, info) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0); y.set(0);
    }
  }

  return (
    <motion.div className="cs4-card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.55} whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}>
      {children}
    </motion.div>
  );
}

function HeroStack() {
  const [stack, setStack] = useState(
    heroImages.map((img, i) => ({ id: i, img }))
  );
  const [isPaused, setIsPaused] = useState(false);

  const sendToBack = (id) => {
    setStack(prev => {
      const next = [...prev];
      const idx = next.findIndex(c => c.id === id);
      const [card] = next.splice(idx, 1);
      next.unshift(card);
      return next;
    });
  };

  // Autoplay every 3s
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setStack(prev => {
        const next = [...prev];
        const [card] = next.splice(next.length - 1, 1);
        next.unshift(card);
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <div className="cs4-stack-outer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      <div className="cs4-stack-container">
        {stack.map((card, index) => (
          <CardRotate key={card.id} onSendToBack={() => sendToBack(card.id)} sensitivity={180}>
            <motion.div
              className="cs4-stack-card"
              onClick={() => sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 5,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: "88% 88%",
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
            >
              <img src={card.img.src} alt={card.img.label} className="cs4-stack-img" />
              <div className="cs4-stack-overlay" />
              <span className="cs4-stack-label">{card.img.label}</span>
              <span className="cs4-stack-card-num">0{card.id + 1}</span>
            </motion.div>
          </CardRotate>
        ))}
      </div>

      {/* hint text */}
      <p className="cs4-stack-hint">Drag or click to cycle ↗</p>

      {/* progress dots */}
      <div className="cs4-stack-dots">
        {heroImages.map((_, i) => {
          const topId = stack[stack.length - 1].id;
          return <span key={i} className={`cs4-dot ${topId === i ? "active" : ""}`}
            onClick={() => sendToBack(stack[stack.length - 1].id)} />;
        })}
      </div>
    </div>
  );
}

/* ── Metric ── */
function MetricCard({ m, delay }) {
  const [ref, inView] = useInView(0.2);
  const val = useCounter(m.value, inView);
  return (
    <div ref={ref} className={`cs4-metric ${inView ? "cs4-metric--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <span className="cs4-metric-num">{val}{m.suffix}</span>
      <span className="cs4-metric-lbl">{m.label}</span>
    </div>
  );
}

/* ── Case Card ── */
function CaseCard({ s, index, active, onToggle }) {
  const [ref, inView] = useInView(0.06);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => { setHeight(active && bodyRef.current ? bodyRef.current.scrollHeight : 0); }, [active]);

  return (
    <article ref={ref}
      className={`cs4-card ${active ? "cs4-card--open" : ""} ${inView ? "cs4-card--in" : ""}`}
      style={{ "--accent": s.color, "--accent-bg": s.bg, transitionDelay: `${index * 80}ms` }}>

      <div className="cs4-card-box">
        <div className="cs4-card-num" style={{ color: s.color }}>{s.id}</div>

        {/* TOP */}
        <div className="cs4-card-top" onClick={() => onToggle(index)}>
          <div className="cs4-card-top-left">
            <div className="cs4-card-icon-row">
              <div className="cs4-card-icon"><LottieIcon src={s.lottie} size={48} /></div>
              <div>
                <span className="cs4-tag" style={{ color: s.color, background: s.bg }}>{s.tag}</span>
                <h3 className="cs4-card-title">{s.title}</h3>
                <p className="cs4-card-client">— {s.client}</p>
              </div>
            </div>
            <p className="cs4-card-summary">{s.summary}</p>
            <div className="cs4-card-meta">
              <span className="cs4-meta-chip"><span className="cs4-chip-dot" style={{ background: s.color }} />{s.industry}</span>
              <span className="cs4-meta-chip"><span className="cs4-chip-dot" style={{ background: s.color }} />{s.duration}</span>
            </div>
          </div>

          <div className="cs4-card-img-wrap">
            <img src={s.image} alt={s.title} className="cs4-card-img" />
            <div className="cs4-card-img-tint" style={{ background: `linear-gradient(135deg,${s.color}44,transparent)` }} />
          </div>

          <button className="cs4-expand-btn" aria-label="toggle"
            style={{ "--accent": s.color }}
            onClick={e => { e.stopPropagation(); onToggle(index); }}>
            <span className="cs4-expand-icon" />
          </button>
        </div>

        {/* BODY */}
        <div className="cs4-body-wrap" style={{ maxHeight: height }}>
          <div className="cs4-body" ref={bodyRef}>
            <div className="cs4-body-divider" style={{ background: s.color }} />
            <div className="cs4-body-grid">
              <div className="cs4-body-col">
                <p className="cs4-body-label" style={{ color: s.color }}>The Challenge</p>
                <p className="cs4-body-text">{s.challenge}</p>
              </div>
              <div className="cs4-body-col">
                <p className="cs4-body-label" style={{ color: s.color }}>Our Solution</p>
                <p className="cs4-body-text">{s.solution}</p>
              </div>
            </div>
            <p className="cs4-body-label" style={{ color: s.color }}>Key Results</p>
            <div className="cs4-pills">
              {s.result.map((r, i) => (
                <span className="cs4-pill" key={i}
                  style={{ "--accent": s.color, "--accent-bg": s.bg, animationDelay: `${i * 100}ms` }}>
                  ✓ {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="cs4-card-bar" style={{ background: `linear-gradient(90deg,${s.color},${s.color}66)` }} />
      </div>
    </article>
  );
}

/* ── Main ── */
export default function CasestudiesSection() {
  const [active, setActive] = useState(null);
  const [heroRef, heroIn] = useInView(0.1);

  return (
    <div className="cs4-root">

      {/* HERO */}
      <section className="cs4-hero" ref={heroRef}>
        {/* LEFT */}
        <div className={`cs4-hero-content ${heroIn ? "cs4-hero-content--in" : ""}`}>
          <p className="cs4-eyebrow"><span className="cs4-eyebrow-line" />Featured Work</p>
          <h1 className="cs4-hero-h1">Where IT Strategy<br /><em>Meets Real Results.</em></h1>
          <p className="cs4-hero-sub">
            Deep-dive case studies from manufacturing, healthcare, and education —
            showing exactly how smart IT decisions create measurable impact.
          </p>
          <div className="cs4-hero-chips">
            {["Networking", "Cloud", "IT Support", "Infrastructure"].map(c => (
              <span className="cs4-hero-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — Stack */}
        <div className={`cs4-hero-right ${heroIn ? "cs4-hero-right--in" : ""}`}>
          <HeroStack />
        </div>

        <div className="cs4-hero-scroll">
          <span>Scroll to explore</span>
          <div className="cs4-scroll-dot" />
        </div>
      </section>

      {/* METRICS */}
      <section className="cs4-metrics-strip">
        <div className="cs4-metrics-inner">
          {metrics.map((m, i) => <MetricCard key={i} m={m} delay={i * 110} />)}
        </div>
      </section>

      {/* SECTION HEADER */}
      <div className="cs4-section-label">
        <div>
          <p className="cs4-eyebrow"><span className="cs4-eyebrow-line" />Industry Case Studies</p>
          <h2 className="cs4-section-title">Projects that made a difference</h2>
        </div>
        <p className="cs4-section-sub">Click any card to expand the full story</p>
      </div>

      {/* CARDS */}
      <section className="cs4-cards-section">
        {caseStudies.map((s, i) => (
          <CaseCard key={s.id} s={s} index={i}
            active={active === i}
            onToggle={idx => setActive(active === idx ? null : idx)} />
        ))}
      </section>

      {/* CTA */}
      <section className="cs4-cta">
        <div className="cs4-cta-glow" />
        <div className="cs4-cta-glow2" />
        <div className="cs4-cta-content">
          <p className="cs4-eyebrow" style={{ color: "#ff6b8a" }}>
            <span className="cs4-eyebrow-line" style={{ background: "#ff6b8a" }} />Let's Work Together
          </p>
          <h2 className="cs4-cta-h2">Ready to write<br /><em>your success story?</em></h2>
          <p className="cs4-cta-sub">Tell us your challenge. We'll bring the strategy, the tools, and the team.</p>
          <button className="cs4-cta-btn">
            Start a Conversation <span className="cs4-btn-arrow">→</span>
          </button>
        </div>
      </section>

    </div>
  );
}