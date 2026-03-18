import React, { useEffect, useRef, useState } from "react";
import "../styles/ITServices.css";
import abstractVector from "../assets/abstract-vector.png";
import itServicesImg from "../assets/itservices.png";

const services = [
  "IT Infrastructure Consulting / Integration / Management",
  "IT Annual Maintenance Contract (AMC) Services",
  "IT Facility Management (FM) Services",
  "Security Services",
  "On-site Services",
  "Maintenance Services",
  "Data Centre Management",
  "Network Management",
  "Server and Backup Management",
  "Database Management",
  "Desktop Management",
  "Application Software & Anti-virus Support",
];

const highlights = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    title: "Fast Response",
    desc: "Quick issue resolution with proactive support and real-time monitoring.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: "Secure Systems",
    desc: "Reliable network, server, and security management services.",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Scalable Support",
    desc: "End-to-end managed IT support for teams at any scale.",
  },
];

const heroStats = [
  { val: "12+",  lbl: "Service Types" },
  { val: "500+", lbl: "Assets Managed" },
  { val: "24/7", lbl: "Support Coverage" },
  { val: "15+",  lbl: "Years Experience" },
];

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold }
    );
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} className={`its-card ${inView ? "its-card--in" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}>
      <div className="its-card-top">
        <span className="its-card-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="its-card-arrow">↗</span>
      </div>
      <h3 className="its-card-title">{service}</h3>
      <p className="its-card-desc">Reliable, scalable and proactive support tailored for modern business infrastructure.</p>
      <div className="its-card-bar" />
    </div>
  );
}

export default function ITServices() {
  const [heroRef, heroIn] = useInView(0.05);
  const [aboutRef, aboutIn] = useInView(0.08);
  const [gridRef, gridIn] = useInView(0.05);

  return (
    <section className="its-root">

      {/* ══ HERO — dark cinematic fullscreen ══ */}
      <div className="its-hero" ref={heroRef}>

        {/* full-bleed background */}
        <div className="its-hero-bg">
          <img src={itServicesImg} alt=""
            className={`its-hero-bg-img ${heroIn ? "its-hero-bg-img--in" : ""}`} />
          <div className="its-hero-bg-overlay" />
          <div className={`its-hero-grid ${heroIn ? "its-hero-grid--in" : ""}`} />
        </div>

        {/* top bar */}
        <div className={`its-topbar ${heroIn ? "its-topbar--in" : ""}`}>
          <div className="its-topbar-brand">
            <span className="its-topbar-dot" />
            <span>i-Soft Solutions</span>
          </div>
          <div className="its-topbar-tags">
            {["IT Services", "AMC", "Facility Mgmt", "Security"].map((b, i) => (
              <span key={b} className="its-topbar-tag"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}>{b}</span>
            ))}
          </div>
        </div>

        {/* centre content */}
        <div className="its-hero-centre">
          <div className={`its-hero-eyebrow ${heroIn ? "its-hero-eyebrow--in" : ""}`}>
            <span className="its-eline" />
            <span>Managed IT Solutions</span>
            <span className="its-eline" />
          </div>

          <h1 className={`its-hero-h1 ${heroIn ? "its-hero-h1--in" : ""}`}>
            <span className="its-hw" style={{ "--d": "0s" }}>Empowering</span>
            <span className="its-hw its-hw-accent" style={{ "--d": "0.12s" }}>Businesses</span>
            <br />
            <span className="its-hw" style={{ "--d": "0.22s" }}>with Robust</span>
            <br />
            <span className="its-hw its-hw-outline" style={{ "--d": "0.34s" }}>IT</span>
            <span className="its-hw" style={{ "--d": "0.44s" }}>Infrastructure.</span>
          </h1>

          <p className={`its-hero-sub ${heroIn ? "its-hero-sub--in" : ""}`}>
            A comprehensive range of managed IT services — Desktop Management, Server Solutions,
            Network Management, Security Management and beyond.
          </p>

          <div className={`its-hero-ctas ${heroIn ? "its-hero-ctas--in" : ""}`}>
            <button className="its-btn-glow">Get a Free Consultation →</button>
            <button className="its-btn-outline-w">Explore Services ↓</button>
          </div>
        </div>

        {/* stat bar */}
        <div className={`its-statbar ${heroIn ? "its-statbar--in" : ""}`}>
          {heroStats.map((s, i) => (
            <div key={i} className="its-hero-stat">
              <span className="its-hs-val">{s.val}</span>
              <span className="its-hs-lbl">{s.lbl}</span>
            </div>
          ))}
          <div className="its-hero-stat its-hs-live">
            <span className="its-live-dot" />
            <span className="its-hs-lbl">All Services Active</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className={`its-scroll-cue ${heroIn ? "its-scroll-cue--in" : ""}`}>
          <div className="its-scroll-mouse"><div className="its-scroll-wheel" /></div>
          <span>Scroll</span>
        </div>
      </div>

      {/* ══ MARQUEE ══ */}
      <div className="its-marquee">
        <div className="its-marquee-track">
          {["IT Infrastructure","AMC Services","Facility Management","Security","Network Mgmt",
            "Data Centre","Server Backup","Desktop Mgmt","Anti-Virus Support",
            "IT Infrastructure","AMC Services","Facility Management","Security","Network Mgmt",
            "Data Centre","Server Backup","Desktop Mgmt","Anti-Virus Support"].map((b, i) => (
            <span className="its-marquee-item" key={i}>
              <span className="its-marquee-dot" />{b}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT — 2-col magazine ══ */}
      <section className="its-about" ref={aboutRef}>
        <img src={abstractVector} alt="" className="its-about-vector" aria-hidden="true" />
        <div className={`its-about-inner ${aboutIn ? "its-about-inner--in" : ""}`}>
          <div className="its-about-left">
            <span className="its-chip">Who We Are</span>
            <h2 className="its-about-h2">
              Your trusted partner for<br />
              <em>end-to-end IT management.</em>
            </h2>
          </div>
          <div className="its-about-right">
            <p className="its-about-p">
              IT infrastructure plays a vital role in every organisation. A robust and
              well-maintained IT infrastructure enhances business performance. We offer
              a comprehensive range of managed IT services including Desktop Management,
              Managed Server Solutions, Network Management, and Security Management.
            </p>
            <p className="its-about-p">
              With our combined skill set and experience, our support team responds quickly,
              resolves issues <strong>proactively</strong>, and ensures smooth management of
              all your IT assets.
            </p>
            <div className="its-about-chips">
              {["AMC","Facility Mgmt","Security","On-site Support","Data Centre","Network Mgmt"].map(c => (
                <span key={c} className="its-about-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HIGHLIGHT STRIP ══ */}
      <section className="its-hl-strip">
        {highlights.map((h, i) => (
          <div key={i} className="its-hl-card">
            <div className="its-hl-num">0{i + 1}</div>
            <div className="its-hl-icon">{h.icon}</div>
            <h3 className="its-hl-title">{h.title}</h3>
            <p className="its-hl-desc">{h.desc}</p>
            <div className="its-hl-bar" />
          </div>
        ))}
      </section>

      {/* ══ DIVIDER ══ */}
      <div className="its-divider">
        <span className="its-divider-line" />
        <span className="its-divider-text">Our Services Portfolio</span>
        <span className="its-divider-line" />
      </div>

      {/* ══ SERVICES GRID ══ */}
      <div className="its-grid-wrap" ref={gridRef}>
        <div className={`its-grid-head ${gridIn ? "its-grid-head--in" : ""}`}>
          <span className="its-mini-tag">What We Offer</span>
          <h2 className="its-grid-h2">Comprehensive IT Services Portfolio</h2>
          <p className="its-grid-sub">
            We provide integrated IT management solutions designed to optimise performance,
            improve reliability, and secure your infrastructure.
          </p>
        </div>
        <div className="its-grid">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>
      </div>

      {/* ══ CTA — full bleed ══ */}
      <section className="its-cta">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80"
          alt="" className="its-cta-bg-img"
        />
        <div className="its-cta-overlay" />
        <div className="its-cta-content">
          <p className="its-cta-eyebrow"><span className="its-eline" />Get in Touch</p>
          <h2 className="its-cta-h2">Need managed IT services<br />for your organisation?</h2>
          <p className="its-cta-sub">
            Tell us your requirements. Our team will respond quickly, resolve issues
            proactively, and manage your IT assets end-to-end.
          </p>
          <div className="its-cta-row">
            <button className="its-btn-glow">Request a Consultation →</button>
            <div className="its-cta-phone">
              <span>📞</span>
              <div>
                <p className="its-phone-lbl">Call Us</p>
                <p className="its-phone-val">+91 98438 65065</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </section>
  );
}