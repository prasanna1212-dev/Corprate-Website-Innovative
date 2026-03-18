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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Fast Response",
    desc: "Quick issue resolution with proactive support and real-time monitoring.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Secure Systems",
    desc: "Reliable network, server, and security management services.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="22" height="22">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Scalable Support",
    desc: "End-to-end managed IT support for teams at any scale.",
  },
];

/* ── useInView ── */
function useInView(threshold = 0.12) {
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
    <div
      ref={ref}
      className={`its-card ${inView ? "its-card--in" : ""}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="its-card-top">
        <span className="its-card-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="its-card-arrow">↗</span>
      </div>
      <h3 className="its-card-title">{service}</h3>
      <p className="its-card-desc">
        Reliable, scalable and proactive support tailored for modern business infrastructure.
      </p>
      <div className="its-card-bar" />
    </div>
  );
}

function HighlightCard({ h, delay }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`its-hl-card ${inView ? "its-hl-card--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="its-hl-icon">{h.icon}</div>
      <h3 className="its-hl-title">{h.title}</h3>
      <p className="its-hl-desc">{h.desc}</p>
    </div>
  );
}

export default function ITServices() {
  const [heroRef, heroIn] = useInView(0.05);
  const [gridRef, gridIn] = useInView(0.05);

  return (
    <section className="its-root">

      {/* abstract bg vector */}
      <img
        src={abstractVector}
        alt=""
        className="its-abstract-bg"
        aria-hidden="true"
      />

      {/* ── HERO ── */}
      <div className="its-hero" ref={heroRef}>

        {/* left text */}
        <div className={`its-hero-left ${heroIn ? "its-hero-left--in" : ""}`}>
          <span className="its-badge">Managed IT Solutions</span>

          <h1 className="its-hero-h1">
            Empowering Businesses with
            <em> Robust IT Infrastructure</em>
          </h1>

          <p className="its-hero-p">
            IT infrastructure plays a vital role in every organisation. A robust and
            well-maintained IT infrastructure enhances business performance. We offer
            a comprehensive range of managed IT services including Desktop Management,
            Managed Server Solutions, Network Management, and Security Management.
          </p>

          <p className="its-hero-p its-hero-p--muted">
            With our combined skill set and experience, our support team responds quickly,
            resolves issues proactively, and ensures smooth management of all your IT assets.
          </p>

          <div className="its-hl-grid">
            {highlights.map((h, i) => (
              <HighlightCard key={i} h={h} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* right — original image kept, with floating cards */}
        <div className={`its-hero-right ${heroIn ? "its-hero-right--in" : ""}`}>
          <div className="its-image-wrapper">
            {/* glow orbs */}
            <div className="its-glow its-glow-one" />
            <div className="its-glow its-glow-two" />

            {/* main image — same as original */}
            <img
              src={itServicesImg}
              alt="IT Services"
              className="its-main-image"
            />

            {/* floating stat cards over the image */}
            <div className="its-stat-card its-sc1">
              <span className="its-sc-num">12+</span>
              <span className="its-sc-lbl">Service Types</span>
            </div>
            <div className="its-stat-card its-sc2">
              <span className="its-sc-dot" />
              <span className="its-sc-lbl">24/7 Monitoring</span>
            </div>
            <div className="its-stat-card its-sc3">
              <span className="its-sc-num">500+</span>
              <span className="its-sc-lbl">Assets Managed</span>
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="its-divider">
        <span className="its-divider-line" />
        <span className="its-divider-text">Our Services Portfolio</span>
        <span className="its-divider-line" />
      </div>

      {/* ── SERVICES GRID ── */}
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
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>

    </section>
  );
}