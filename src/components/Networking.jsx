import React, { useEffect, useRef, useState } from "react";
import CircularGallery from "./CircularGallery";
import "../styles/Networking.css";

/* ── useInView ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Counter({ target, run }) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!run) return;
    const numeric = parseInt(target.replace(/\D/g, ""));
    const suffix = target.replace(/[0-9]/g, "");
    if (!numeric) { setVal(target); return; }
    let cur = 0; const step = Math.ceil(numeric / 55);
    const id = setInterval(() => {
      cur += step;
      if (cur >= numeric) { setVal(target); clearInterval(id); } else setVal(cur + suffix);
    }, 20);
    return () => clearInterval(id);
  }, [run, target]);
  return <>{val}</>;
}

/* ── Data ── */
const stats = [
  { value: "200+", label: "Networks Deployed" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7",  label: "Support Coverage" },
  { value: "15+",   label: "Years Experience" },
];

/* CircularGallery items — one per service */
const galleryItems = [
  { image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", text: "LAN / WAN" },
  { image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80", text: "Firewall & Security" },
  { image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", text: "Infrastructure" },
  { image: "https://images.unsplash.com/photo-1516044734145-07ca8eef8731?w=800&q=80", text: "Wireless Solutions" },
  { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", text: "Monitoring" },
  { image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=800&q=80", text: "IP Telephony" },
];

/* Full service detail cards shown below gallery */
const services = [
  {
    num: "01", title: "LAN / WAN Solutions",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/><rect x="9" y="16" width="6" height="6" rx="1"/><path d="M5 8v4h14V8M12 12v4"/></svg>,
    bullets: ["IT network consultation, design, planning, installation & configuration","End-to-end support for LAN, WAN, WLAN and security devices","Switch and router configuration","WAN / LAN / MAN / WLAN configuration"],
  },
  {
    num: "02", title: "Security & Firewall",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    bullets: ["Firewall configuration & management","VPN configuration and tunnelling","Internet security solutions","Virus / SPAM protection","Control of internet usage","Management of network & security products"],
  },
  {
    num: "03", title: "Infrastructure & Storage",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><rect x="2" y="6" width="20" height="5" rx="1"/><rect x="2" y="13" width="20" height="5" rx="1"/><circle cx="18" cy="8.5" r="1" fill="currentColor"/><circle cx="18" cy="15.5" r="1" fill="currentColor"/></svg>,
    bullets: ["Storage support, deployment, implementation and migration","Data centre solutions","Improving and optimising of existing networks","Creating fully redundant networking networks","Information security"],
  },
  {
    num: "04", title: "Wireless Solutions",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>,
    bullets: ["Wireless network design and deployment","High-density Wi-Fi for offices, campuses & warehouses","Seamless roaming across multi-floor facilities","Wireless security configuration"],
  },
  {
    num: "05", title: "Monitoring & Performance",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    bullets: ["Performance monitoring and tuning","24/7 centralised network monitoring","Bandwidth analysis and uptime alerts","Proactive issue resolution","Capacity planning"],
  },
  {
    num: "06", title: "Communication & IP",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="26" height="26"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,
    bullets: ["IP telephony solutions","Video conferencing setup & support","VOIP solutions","Data protection services","Site-to-site connectivity (MPLS, SD-WAN)"],
  },
];

const brands = ["Cisco", "Fortinet", "HP", "Dell", "Ubiquiti", "Juniper"];

const process = [
  { step: "01", title: "Discovery & Assessment", desc: "We audit your existing infrastructure, understand traffic demands, and identify bottlenecks." },
  { step: "02", title: "Design & Planning",       desc: "Custom network architecture designed for your scale, budget, and future growth." },
  { step: "03", title: "Deployment",              desc: "Certified engineers deploy hardware, configure devices, and test every connection." },
  { step: "04", title: "Monitoring & Support",    desc: "Ongoing visibility, alerts, and expert support to keep your network at peak performance." },
];

/* ── Sub-components ── */
function StatItem({ stat, delay }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className={`nw-stat ${inView ? "nw-stat--in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className="nw-stat-val"><Counter target={stat.value} run={inView} /></span>
      <span className="nw-stat-lbl">{stat.label}</span>
    </div>
  );
}

function ServiceCard({ svc, delay }) {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} className={`nw-svc-card ${inView ? "nw-svc-card--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="nw-svc-card-top">
        <div className="nw-svc-icon">{svc.icon}</div>
        <span className="nw-svc-num">{svc.num}</span>
      </div>
      <h3 className="nw-svc-title">{svc.title}</h3>
      <ul className="nw-svc-list">
        {svc.bullets.map((b, i) => (
          <li key={i}><span className="nw-check-dot" />{b}</li>
        ))}
      </ul>
    </div>
  );
}

/* ── Main ── */
export default function Networking() {
  const [heroRef, heroIn] = useInView(0.05);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="nw-root">

      {/* ══ HERO ══ */}
      <section className="nw-hero" ref={heroRef}>
        <div className={`nw-hero-left ${heroIn ? "nw-hero-left--in" : ""}`}>
          <div className="nw-hero-tag">Our Services</div>
          <h1 className="nw-hero-h1">Complete<br />Networking<br /><em>Solutions.</em></h1>
          <p className="nw-hero-sub">
            i-Soft Solutions provides end-to-end networking — LAN, WAN, WLAN,
            security, storage, IP telephony and full IT infrastructure support
            for organisations of every scale.
          </p>
          <div className="nw-hero-actions">
            <button className="nw-btn-solid">Get Free Assessment <span>→</span></button>
            <button className="nw-btn-outline">View Case Studies</button>
          </div>
          <div className="nw-scroll-hint"><div className="nw-scroll-line" /><span>Scroll</span></div>
        </div>
        <div className={`nw-hero-right ${heroIn ? "nw-hero-right--in" : ""}`}>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1000&q=85" alt="Network" className="nw-hero-img" />
          <div className="nw-hero-img-shade" />
          <div className="nw-hero-badge nw-hb1">
            <span className="nw-hb-pulse nw-hb-pulse--green" />
            <div><p className="nw-hb-lbl">Network Status</p><p className="nw-hb-val">All Systems Online</p></div>
          </div>
          <div className="nw-hero-badge nw-hb2">
            <span className="nw-hb-pulse nw-hb-pulse--red" />
            <div><p className="nw-hb-lbl">Uptime</p><p className="nw-hb-val">99.9%</p></div>
          </div>
          <div className="nw-hero-badge nw-hb3">
            <span className="nw-hb-pulse nw-hb-pulse--amber" />
            <div><p className="nw-hb-lbl">Active Sites</p><p className="nw-hb-val">200+</p></div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      {/* <section className="nw-stats">
        {stats.map((s, i) => <StatItem key={i} stat={s} delay={i * 100} />)}
      </section> */}

      {/* ══ INTRO ══ */}
      <section className="nw-intro">
        <div className="nw-intro-label">
          <span className="nw-tag-pill">Why i-Soft</span>
          <div className="nw-intro-rule" />
        </div>
        <div className="nw-intro-cols">
          <h2 className="nw-intro-h2">We deploy, integrate &<br /><em>manage your entire</em><br />IT network.</h2>
          <div className="nw-intro-right">
            <p className="nw-intro-body">
              Today, networking solutions are highly mandatory for the success and growth of any organisation.
              i-Soft Solutions provides complete networking solutions — including LAN and WAN services — to
              help deploy, integrate, and manage your complex IT infrastructure.
            </p>
            <p className="nw-intro-body">
              We provide <strong>end-to-end networking solutions</strong> across consultation, design,
              installation, configuration, monitoring, and long-term support tailored to businesses,
              institutions, and organisations of every scale.
            </p>
            <div className="nw-intro-chips">
              {["LAN / WAN", "Firewall", "VPN", "VOIP", "Wi-Fi", "Data Centre", "MPLS"].map(c => (
                <span className="nw-intro-chip" key={c}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ GALLERY — CircularGallery WebGL ══ */}
      <section className="nw-gallery-section">
        <div className="nw-gallery-header">
          <span className="nw-tag-pill">Explore Services</span>
          <h2 className="nw-gallery-h2">Drag to explore our<br /><em>networking capabilities</em></h2>
          <p className="nw-gallery-sub">Scroll or drag the gallery below — each card represents a core service area</p>
        </div>
        <div className="nw-gallery-wrap">
          <CircularGallery
            items={galleryItems}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      </section>

      {/* ══ SERVICE CARDS GRID ══ */}
      <section className="nw-services">
        <div className="nw-services-head">
          <span className="nw-tag-pill">What We Offer</span>
          <h2 className="nw-services-h2">Complete Networking Services</h2>
          <p className="nw-services-sub">Everything your organisation needs — designed, deployed, and supported by certified engineers.</p>
        </div>
        <div className="nw-svc-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.num} svc={s} delay={(i % 3) * 90} />
          ))}
        </div>
      </section>

      {/* ══ BRANDS ══ */}
      <section className="nw-brands">
        <p className="nw-brands-lbl">Certified Partners & Trusted Brands</p>
        <div className="nw-brands-track">
          {brands.map((b, i) => <div className="nw-brand-pill" key={i}>{b}</div>)}
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="nw-process">
        <div className="nw-process-left">
          <span className="nw-tag-pill">How We Work</span>
          <h2 className="nw-process-h2">Our Proven<br /><em>4-Step Process</em></h2>
          <div className="nw-process-tabs">
            {process.map((p, i) => (
              <button key={i}
                className={`nw-process-tab ${activeStep === i ? "nw-process-tab--active" : ""}`}
                onClick={() => setActiveStep(i)}>
                <span className="nw-tab-num">{p.step}</span>
                <span className="nw-tab-title">{p.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="nw-process-right">
          <div className="nw-process-panel" key={activeStep}>
            <div className="nw-process-panel-num">{process[activeStep].step}</div>
            <h3 className="nw-process-panel-title">{process[activeStep].title}</h3>
            <p className="nw-process-panel-desc">{process[activeStep].desc}</p>
          </div>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80"
            alt="Process" className="nw-process-img" />
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="nw-cta">
        <div className="nw-cta-glow" />
        <div className="nw-cta-inner">
          <div className="nw-cta-left">
            <span className="nw-tag-pill nw-tag-pill--light">Let's Work Together</span>
            <h2 className="nw-cta-h2">Ready to build your<br /><em>network backbone?</em></h2>
          </div>
          <div className="nw-cta-right">
            <p className="nw-cta-body">
              Talk to our certified network engineers and get a custom infrastructure
              proposal within 48 hours. No commitment required.
            </p>
            <div className="nw-cta-actions">
              <button className="nw-btn-solid nw-btn-solid--white">Request Free Assessment <span>→</span></button>
              <div className="nw-cta-contact">
                <span className="nw-cta-contact-icon">📞</span>
                <div>
                  <p className="nw-cta-contact-lbl">Call Us</p>
                  <p className="nw-cta-contact-val">+91 98438 65065</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}