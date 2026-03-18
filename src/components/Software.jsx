import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Software.css";
import abstractNetwork from "../assets/abstract-network.png";
import softwareImg from "../assets/software.png";

const expertiseList = [
  "Microsoft Office Suites",
  "Operating Systems",
  "Office 365",
  "Microsoft SQL Server",
  "Active Directory",
  "Exchange",
  "SharePoint",
  "Dynamics",
  "Lync 2010/13",
  "Virtualization – HyperV",
  "Programming Languages and Compilers",
  "Windows Live Mail",
  "Skype",
  "Anti Virus",
];

const CARDS_PER_VIEW = 5;

const highlights = [
  { title: "Microsoft Expertise", desc: "Specialised knowledge across Microsoft tools, infrastructure and enterprise environments." },
  { title: "Managed Delivery",    desc: "End-to-end software support from deployment and integration to long-term optimisation." },
  { title: "Business Agility",    desc: "Solutions designed to improve workplace efficiency, collaboration and operational performance." },
];

const stats = [
  { val: "14+",  lbl: "Core Expertise Areas" },
  { val: "100%", lbl: "Microsoft Certified" },
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

function Counter({ target, run }) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!run) return;
    const num = parseInt(target.replace(/\D/g, ""));
    const sfx = target.replace(/[0-9]/g, "");
    if (!num) { setVal(target); return; }
    let c = 0; const step = Math.ceil(num / 55);
    const id = setInterval(() => {
      c += step;
      if (c >= num) { setVal(target); clearInterval(id); } else setVal(c + sfx);
    }, 18);
    return () => clearInterval(id);
  }, [run, target]);
  return <>{val}</>;
}

function StatCard({ s, i }) {
  const [ref, inV] = useInView(0.2);
  return (
    <div ref={ref} className={`sw-stat-pill ${inV ? "sw-stat-pill--in" : ""}`}
      style={{ transitionDelay: `${i * 90}ms` }}>
      <span className="sw-sp-n"><Counter target={s.val} run={inV} /></span>
      <span className="sw-sp-l">{s.lbl}</span>
    </div>
  );
}

export default function Software() {
  const [startIndex, setStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [heroRef, heroIn] = useInView(0.05);
  const [expertRef, expertIn] = useInView(0.05);

  const visibleCards = useMemo(() => {
    const cards = [];
    for (let i = 0; i < CARDS_PER_VIEW; i++) {
      cards.push(expertiseList[(startIndex + i) % expertiseList.length]);
    }
    return cards;
  }, [startIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setStartIndex(p => (p + 1) % expertiseList.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sw-root">

      {/* ══ HERO — dark cinematic (matches Hardware hero) ══ */}
      <section className="sw-hero" ref={heroRef}>
        {/* full-bleed bg */}
        <div className="sw-hero-bg">
          <img src={softwareImg} alt="" className={`sw-hero-bg-img ${heroIn ? "sw-hero-bg-img--in" : ""}`} />
          <div className="sw-hero-bg-overlay" />
          <div className={`sw-hero-grid-lines ${heroIn ? "sw-hero-grid-lines--in" : ""}`} />
        </div>

        {/* top bar */}
        <div className={`sw-hero-topbar ${heroIn ? "sw-hero-topbar--in" : ""}`}>
          <div className="sw-hero-topbar-brand">
            <span className="sw-hero-topbar-dot" />
            <span>i-Soft Solutions</span>
          </div>
          <div className="sw-hero-topbar-tags">
            {["Microsoft", "Office 365", "SharePoint", "SQL Server"].map((b, i) => (
              <span key={b} className="sw-topbar-tag"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}>{b}</span>
            ))}
          </div>
        </div>

        {/* centre */}
        <div className="sw-hero-centre">
          <div className={`sw-hero-eyebrow ${heroIn ? "sw-hero-eyebrow--in" : ""}`}>
            <span className="sw-eyebrow-line" />
            <span>Microsoft Solutions Partner Support</span>
            <span className="sw-eyebrow-line" />
          </div>

          <h1 className={`sw-hero-h1 ${heroIn ? "sw-hero-h1--in" : ""}`}>
            <span className="sw-h1-word" style={{ "--d": "0s" }}>Smart</span>
            <span className="sw-h1-word sw-h1-accent" style={{ "--d": "0.12s" }}>Software</span>
            <br />
            <span className="sw-h1-word" style={{ "--d": "0.22s" }}>Solutions</span>
            <span className="sw-h1-word sw-h1-outline" style={{ "--d": "0.32s" }}>&amp;</span>
            <br />
            <span className="sw-h1-word" style={{ "--d": "0.42s" }}>Support.</span>
          </h1>

          <p className={`sw-hero-sub ${heroIn ? "sw-hero-sub--in" : ""}`}>
            Authorised Microsoft partner delivering smart software deployment, managed
            infrastructure and enterprise-grade IT ecosystems for dynamic workplaces.
          </p>

          <div className={`sw-hero-ctas ${heroIn ? "sw-hero-ctas--in" : ""}`}>
            <button className="sw-btn-glow">Get a Consultation →</button>
            <button className="sw-btn-outline-w">Explore Solutions ↓</button>
          </div>
        </div>

        {/* bottom stat bar */}
        <div className={`sw-hero-statbar ${heroIn ? "sw-hero-statbar--in" : ""}`}>
          {stats.map((s, i) => (
            <div key={i} className="sw-hero-stat">
              <span className="sw-hs-val">{s.val}</span>
              <span className="sw-hs-lbl">{s.lbl}</span>
            </div>
          ))}
          <div className="sw-hero-stat sw-hero-stat-live">
            <span className="sw-live-dot" />
            <span className="sw-hs-lbl">Certified Partner</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className={`sw-hero-scroll-cue ${heroIn ? "sw-hero-scroll-cue--in" : ""}`}>
          <div className="sw-scroll-mouse"><div className="sw-scroll-wheel" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="sw-marquee">
        <div className="sw-marquee-track">
          {["Office 365","SQL Server","Active Directory","SharePoint","Exchange","HyperV","Dynamics","Anti Virus",
            "Office 365","SQL Server","Active Directory","SharePoint","Exchange","HyperV","Dynamics","Anti Virus"].map((b, i) => (
            <span className="sw-marquee-item" key={i}>
              <span className="sw-marquee-dot" />{b}
            </span>
          ))}
        </div>
      </div>

      {/* ══ ABOUT — 2-col text + image ══ */}
      <section className="sw-about">
        <img src={abstractNetwork} alt="" className="sw-about-bg-vector" aria-hidden="true" />
        <div className="sw-about-inner">
          <div className="sw-about-left">
            <span className="sw-chip">Who We Are</span>
            <h2 className="sw-about-h2">
              Authorised Microsoft<br />partner delivering<br />
              <em>smart IT ecosystems.</em>
            </h2>
          </div>
          <div className="sw-about-right">
            <p className="sw-about-p">
              i-Soft Solutions is an authorised Partner of Microsoft, endowing organisations
              to create a dynamic workplace that delivers greater business agility and improved
              operational efficiency.
            </p>
            <p className="sw-about-p">
              Our team delivers best practices to provide <strong>high-quality, end-to-end design</strong> and
              managed IT solutions. i-Soft Solutions is uniquely suited to help clients support
              their Microsoft infrastructure.
            </p>
            <div className="sw-about-chips">
              {["Office 365","SQL Server","Active Directory","SharePoint","Exchange","HyperV"].map(c => (
                <span key={c} className="sw-about-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ HIGHLIGHT CARDS — horizontal strip ══ */}
      <section className="sw-highlights">
        {highlights.map((h, i) => {
          const [ref, inV] = [useRef(null), useState(false)];
          return (
            <div key={i} className="sw-hl-card">
              <div className="sw-hl-num">0{i + 1}</div>
              <h3 className="sw-hl-title">{h.title}</h3>
              <p className="sw-hl-desc">{h.desc}</p>
              <div className="sw-hl-bar" />
            </div>
          );
        })}
      </section>

      {/* ══ EXPERTISE — rotating carousel ══ */}
      <section className="sw-expert-section" ref={expertRef}>
        <div className={`sw-expert-wrap ${expertIn ? "sw-expert-wrap--in" : ""}`}>

          {/* LEFT */}
          <div className="sw-expert-left">
            <span className="sw-chip">Our Expertise</span>
            <h2 className="sw-expert-h2">
              Enterprise Software<br />&amp; <em>Microsoft Technology</em>
            </h2>
            <p className="sw-expert-desc">
              We help organisations deploy, manage and support modern Microsoft and
              software ecosystems with secure, scalable and performance-driven solutions.
            </p>

            <div className="sw-expert-info">
              <div className="sw-expert-info-glow" />
              <h3 className="sw-expert-info-h3">Technology Capabilities</h3>
              <p className="sw-expert-info-p">
                From workplace productivity tools to infrastructure platforms, we deliver
                software ecosystems that improve agility, collaboration and long-term stability.
              </p>
              <div className="sw-expert-stats">
                <div className="sw-es-box">
                  <span className="sw-es-num">14+</span>
                  <p className="sw-es-lbl">Expertise areas</p>
                </div>
                <div className="sw-es-box">
                  <span className="sw-es-num">5</span>
                  <p className="sw-es-lbl">Cards per slide</p>
                </div>
              </div>
            </div>

            {/* progress bar */}
            <div className="sw-carousel-progress">
              <div className="sw-carousel-progress-fill" />
            </div>
          </div>

          {/* RIGHT — carousel */}
          <div className="sw-carousel-shell">
            <div className={`sw-carousel ${isVisible ? "sw-carousel--show" : "sw-carousel--hide"}`}>
              {visibleCards.map((item, index) => (
                <div className="sw-fc" key={`${item}-${index}`}>
                  <div className="sw-fc-top">
                    <span className="sw-fc-dot" />
                    <span className="sw-fc-pill">Microsoft</span>
                  </div>
                  <h3 className="sw-fc-title">{item}</h3>
                  <p className="sw-fc-desc">
                    Optimised implementation, managed support and scalable enterprise
                    readiness for modern software environments.
                  </p>
                  <div className="sw-fc-bar" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sw-cta">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80"
          alt="CTA"
          className="sw-cta-bg-img"
        />
        <div className="sw-cta-overlay" />
        <div className="sw-cta-content">
          <p className="sw-cta-eyebrow"><span className="sw-eline" />Get in Touch</p>
          <h2 className="sw-cta-h2">Need Microsoft software<br />for your business?</h2>
          <p className="sw-cta-sub">
            Tell us your requirements. We'll source, deploy and support the right
            Microsoft solutions — fully managed, certified, and cost-effective.
          </p>
          <div className="sw-cta-row">
            <button className="sw-btn-glow">Request a Consultation →</button>
            <div className="sw-cta-phone">
              <span>📞</span>
              <div>
                <p className="sw-phone-lbl">Call Us</p>
                <p className="sw-phone-val">+91 98438 65065</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}