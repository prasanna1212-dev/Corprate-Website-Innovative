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

function Software() {
  const [startIndex, setStartIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const [heroRef, heroIn] = useInView(0.05);
  const [expertiseRef, expertiseIn] = useInView(0.05);

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
        setStartIndex((prev) => (prev + 1) % expertiseList.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sw-root">

      {/* abstract bg */}
      <img src={abstractNetwork} alt="" className="sw-abstract-bg" aria-hidden="true" />

      {/* ── HERO ── */}
      <div className="sw-hero" ref={heroRef}>

        {/* LEFT */}
        <div className={`sw-hero-left ${heroIn ? "sw-hero-left--in" : ""}`}>
          <span className="sw-badge">Microsoft Solutions Partner Support</span>

          <h1 className="sw-hero-h1">
            Smart Software
            <em> Solutions for a Dynamic Workplace</em>
          </h1>

          <p className="sw-hero-p">
            i-Soft Solutions is an authorised Partner of Microsoft, endowing organisations
            to create a dynamic workplace that delivers greater business agility and
            improved operational efficiency.
          </p>

          <p className="sw-hero-p sw-hero-p--muted">
            Our team delivers best practices to provide high-quality, end-to-end design
            and managed IT solutions. i-Soft Solutions is uniquely suited to help clients
            support their Microsoft infrastructure.
          </p>

          <div className="sw-hl-grid">
            {[
              { title: "Microsoft Expertise", desc: "Specialised knowledge across Microsoft tools, infrastructure and enterprise environments." },
              { title: "Managed Delivery",    desc: "End-to-end software support from deployment and integration to long-term optimisation." },
              { title: "Business Agility",    desc: "Solutions designed to improve workplace efficiency, collaboration and operational performance." },
            ].map((h, i) => (
              <div key={i} className="sw-hl-card"
                style={{ transitionDelay: `${heroIn ? i * 100 : 0}ms` }}
                data-in={heroIn ? "true" : undefined}>
                <h3 className="sw-hl-title">{h.title}</h3>
                <p className="sw-hl-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className={`sw-hero-right ${heroIn ? "sw-hero-right--in" : ""}`}>
          <div className="sw-image-shell">
            <div className="sw-orbit sw-orbit-1" />
            <div className="sw-orbit sw-orbit-2" />
            <div className="sw-glow sw-glow-red" />
            <div className="sw-glow sw-glow-dark" />
            <img src={softwareImg} alt="Software Solutions" className="sw-main-image" />
          </div>
        </div>
      </div>

      {/* ── EXPERTISE ── */}
      <div className="sw-expertise-outer" ref={expertiseRef}>
        <div className={`sw-expertise-wrap ${expertiseIn ? "sw-expertise-wrap--in" : ""}`}>

          {/* LEFT side panel */}
          <div className="sw-expertise-side">
            <span className="sw-mini-tag">Our Expertise</span>
            <h2 className="sw-expertise-h2">
              Enterprise Software &amp;<br />
              <em>Microsoft Technology</em>
            </h2>
            <p className="sw-expertise-desc">
              We help organisations deploy, manage and support modern Microsoft and
              software ecosystems with secure, scalable and performance-driven solutions.
            </p>

            <div className="sw-side-panel">
              <div className="sw-side-panel-glow" />
              <h3 className="sw-side-panel-h3">Technology Capabilities</h3>
              <p className="sw-side-panel-p">
                From workplace productivity tools to infrastructure platforms, we deliver
                software ecosystems that improve agility, collaboration, administration
                and long-term operational stability.
              </p>
              <div className="sw-expertise-stats">
                <div className="sw-stat-box">
                  <span className="sw-stat-num">14+</span>
                  <p className="sw-stat-lbl">Core expertise areas</p>
                </div>
                <div className="sw-stat-box">
                  <span className="sw-stat-num">5</span>
                  <p className="sw-stat-lbl">Live cards per slide</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT rotating carousel */}
          <div className="sw-carousel-shell">
            <div className={`sw-carousel ${isVisible ? "sw-carousel--show" : "sw-carousel--hide"}`}>
              {visibleCards.map((item, index) => (
                <div className="sw-feature-card" key={`${item}-${index}`}>
                  <div className="sw-fc-top">
                    <span className="sw-fc-dot" />
                    <span className="sw-fc-pill">Microsoft</span>
                  </div>
                  <div className="sw-fc-body">
                    <h3 className="sw-fc-title">{item}</h3>
                    <p className="sw-fc-desc">
                      Optimised implementation, managed support and scalable enterprise
                      readiness for modern software environments.
                    </p>
                  </div>
                  <div className="sw-fc-shine" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Software;