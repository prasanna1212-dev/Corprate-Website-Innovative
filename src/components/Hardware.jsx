import React, { useEffect, useRef, useState } from "react";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import "../styles/Hardware.css";

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
    const suffix  = target.replace(/[0-9]/g, "");
    if (!numeric) { setVal(target); return; }
    let cur = 0;
    const step = Math.ceil(numeric / 55);
    const id = setInterval(() => {
      cur += step;
      if (cur >= numeric) { setVal(target); clearInterval(id); }
      else setVal(cur + suffix);
    }, 20);
    return () => clearInterval(id);
  }, [run, target]);
  return <>{val}</>;
}

/* ── Data ── */
const categories = [
  {
    id: "01", tag: "Desktops", title: "Branded Desktops",
    accent: "#e8193c", bg: "#fff0f3",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=900&q=85",
    intro: "i-Soft Solutions is a preferred dealer of Dell & HP Branded Desktops — supplying energy-efficient, stable systems with the latest Core i7 and AMD Athlon technology for all IT use cases.",
    bullets: [
      "Branded desktops for small, mid & enterprise businesses",
      "Energy-efficient systems with Core i7 / AMD Athlon processors",
      "Latest Intel & AMD platform desktop range",
      "Customised configurations for institutional requirements",
      "Pre-installed OS, antivirus & productivity software",
      "On-site warranty and AMC support available",
    ],
    brands: ["Dell", "HP", "Lenovo"],
  },
  {
    id: "02", tag: "Laptops", title: "Business Laptops",
    accent: "#111111", bg: "#f4f4f4",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85",
    intro: "We are an authorised dealer of Dell & HP Branded Laptops — offering portable, high-performance computing for businesses, institutions and frequent travellers at affordable prices.",
    bullets: [
      "Mobile desktop replacements with wide screens for demanding tasks",
      "High-level performance for graphic-intense workloads",
      "Compact, portable form factor for travel professionals",
      "Advanced wireless capability and fast SSD storage",
      "Wide selection of Intel & AMD processors",
      "Industrial-grade battery life for extended use",
    ],
    brands: ["Dell", "HP"],
  },
  {
    id: "03", tag: "Servers", title: "Rack & Tower Servers",
    accent: "#e8193c", bg: "#fff0f3",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=85",
    intro: "We are an authorised dealer of Dell & HP Branded Servers for businesses running critical database, network infrastructure, web applications and messaging applications.",
    bullets: [
      "High-density environments for network infra & web applications",
      "SAN, RAID, HVAC applications, database front-end",
      "High Performance Computing Clusters",
      "Redundant architecture with hot-swap drives",
      "Scalable memory and processor upgrade paths",
      "Multiple applications on a single server platform",
    ],
    brands: ["Dell", "HP"],
  },
  {
    id: "04", tag: "Storage", title: "Enterprise Storage",
    accent: "#111111", bg: "#f4f4f4",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=85",
    intro: "We offer advanced file storage and print sharing for IT environments requiring high-storage capacity, extreme flexibility and enterprise-grade redundancy.",
    bullets: [
      "Advanced file storage and print sharing applications",
      "High performance storage array for critical workloads",
      "IT environments with high storage capacity requirements",
      "Storage manageability, flexibility and rapid deployment",
      "SAS disk drives for email, database, web & file serving",
      "Redundant RAID controllers, mirrored cache and IO multi-pathing",
    ],
    brands: ["Dell", "HP"],
  },
  {
    id: "05", tag: "Networking", title: "Network Equipment",
    accent: "#e8193c", bg: "#fff0f3",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900&q=85",
    intro: "i-Soft Solutions is an authorised partner of Cisco and Fortinet — offering network design, infrastructure and security solutions to improve productivity across all organisations.",
    bullets: [
      "Network switches, routers and wireless access points",
      "Cisco-based network infrastructure built for scalability",
      "Fortinet firewall protection with continuous security updates",
      "SD-WAN, MPLS and site-to-site connectivity solutions",
      "Operational continuity and transport flexibility",
      "Centralised monitoring and failover support",
    ],
    brands: ["Cisco", "Fortinet"],
  },
];

const timeline = [
  { year: "2008", event: "Founded in Coimbatore as an IT reseller" },
  { year: "2010", event: "Became authorised Dell & HP partner" },
  { year: "2014", event: "Expanded into Cisco networking solutions" },
  { year: "2018", event: "Added Fortinet security product line" },
  { year: "2024", event: "500+ hardware deployments completed" },
];

const stats = [
  { value: "500+", label: "Units Deployed" },
  { value: "10+",  label: "Brand Partners" },
  { value: "15+",  label: "Years Experience" },
  { value: "24/7", label: "Support Coverage" },
];

/* ── Sub-components ── */
function TimelineItem({ item, delay }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`hw-tl-item ${inView ? "hw-tl-item--in" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="hw-tl-year">{item.year}</div>
      <div className="hw-tl-dot" />
      <div className="hw-tl-event">{item.event}</div>
    </div>
  );
}

/* ── Main ── */
export default function Hardware() {
  const [heroRef, heroIn] = useInView(0.05);

  return (
    <div className="hw-root">

      {/* ══ HERO — dark cinematic fullscreen ══ */}
      <section className="hw-hero" ref={heroRef}>

        {/* full-bleed background image with dark overlay */}
        <div className="hw-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=90"
            alt="bg"
            className={`hw-hero-bg-img ${heroIn ? "hw-hero-bg-img--in" : ""}`}
          />
          <div className="hw-hero-bg-overlay" />
          {/* animated grid lines */}
          <div className={`hw-hero-grid-lines ${heroIn ? "hw-hero-grid-lines--in" : ""}`} />
        </div>

        {/* top nav bar */}
        <div className={`hw-hero-topbar ${heroIn ? "hw-hero-topbar--in" : ""}`}>
          <div className="hw-hero-topbar-brand">
            <span className="hw-hero-topbar-dot" />
            <span>i-Soft Solutions</span>
          </div>
          <div className="hw-hero-topbar-tags">
            {["Dell", "HP", "Cisco", "Fortinet"].map((b, i) => (
              <span key={b} className="hw-topbar-tag"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* centre content */}
        <div className="hw-hero-centre">
          <div className={`hw-hero-eyebrow ${heroIn ? "hw-hero-eyebrow--in" : ""}`}>
            <span className="hw-eyebrow-line" />
            <span>Authorised Hardware Partner</span>
            <span className="hw-eyebrow-line" />
          </div>

          <h1 className={`hw-hero-h1 ${heroIn ? "hw-hero-h1--in" : ""}`}>
            <span className="hw-h1-word" style={{ "--d": "0s" }}>Enterprise</span>
            <span className="hw-h1-word hw-h1-accent" style={{ "--d": "0.12s" }}>IT</span>
            <br />
            <span className="hw-h1-word" style={{ "--d": "0.22s" }}>Hardware</span>
            <span className="hw-h1-word hw-h1-outline" style={{ "--d": "0.32s" }}>&amp;</span>
            <br />
            <span className="hw-h1-word" style={{ "--d": "0.42s" }}>Support.</span>
          </h1>

          <p className={`hw-hero-sub ${heroIn ? "hw-hero-sub--in" : ""}`}>
            Authorised dealer of Dell, HP, Cisco &amp; Fortinet — desktops, laptops,
            servers, storage and networking for businesses of every scale.
          </p>

          <div className={`hw-hero-ctas ${heroIn ? "hw-hero-ctas--in" : ""}`}>
            <button className="hw-btn-glow">Request a Quote →</button>
            <button className="hw-btn-outline-w">Browse Products ↓</button>
          </div>
        </div>

        {/* bottom stat bar */}
        <div className={`hw-hero-statbar ${heroIn ? "hw-hero-statbar--in" : ""}`}>
          {stats.map((s, i) => (
            <div key={i} className="hw-hero-stat"
              style={{ animationDelay: `${1.1 + i * 0.1}s` }}>
              <span className="hw-hs-val">{s.value}</span>
              <span className="hw-hs-lbl">{s.label}</span>
            </div>
          ))}
          <div className="hw-hero-stat hw-hero-stat-live">
            <span className="hw-live-dot" />
            <span className="hw-hs-lbl">All Items In Stock</span>
          </div>
        </div>

        {/* scroll cue */}
        <div className={`hw-hero-scroll-cue ${heroIn ? "hw-hero-scroll-cue--in" : ""}`}>
          <div className="hw-scroll-mouse">
            <div className="hw-scroll-wheel" />
          </div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="hw-marquee-strip">
        <div className="hw-marquee-track">
          {["Dell", "HP", "Cisco", "Fortinet", "Lenovo", "Seagate",
            "Dell", "HP", "Cisco", "Fortinet", "Lenovo", "Seagate"].map((b, i) => (
            <span className="hw-marquee-item" key={i}>
              <span className="hw-marquee-dot" />{b}
            </span>
          ))}
        </div>
      </div>

      {/* ══ SCROLL STACK ══ */}
      <section className="hw-stack-section">
        <div className="hw-stack-intro">
          <p className="hw-overline hw-overline--light">Deep Dive</p>
          <h2 className="hw-stack-h2">
            Scroll through<br /><em>every category</em>
          </h2>
          <p className="hw-stack-sub">
            Scroll inside the panel — cards will stack as you explore
          </p>
        </div>

        <div className="hw-stack-wrap">
          <ScrollStack
            itemDistance={110}
            itemScale={0.025}
            itemStackDistance={20}
            stackPosition="12%"
            scaleEndPosition="6%"
            baseScale={0.9}
            rotationAmount={0}
            blurAmount={0}
          >
            {categories.map((cat) => (
              <ScrollStackItem key={cat.id}>
                <div
                  className="hw-scard"
                  style={{ "--accent": cat.accent, "--accent-bg": cat.bg }}
                >
                  <div className="hw-scard-id">{cat.id}</div>

                  <div className="hw-scard-img-col">
                    <img src={cat.image} alt={cat.title} />
                    <div className="hw-scard-img-gradient" />
                    <div className="hw-scard-img-footer">
                      <span
                        className="hw-scard-tag"
                        style={{ background: cat.accent }}
                      >
                        {cat.tag}
                      </span>
                      <div className="hw-scard-brand-row">
                        {cat.brands.map(b => <span key={b}>{b}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="hw-scard-body-col">
                    <h3 className="hw-scard-title">{cat.title}</h3>
                    <p className="hw-scard-intro">{cat.intro}</p>
                    <ul className="hw-scard-list">
                      {cat.bullets.map((b, i) => (
                        <li key={i}>
                          <span style={{ color: cat.accent }}>→</span> {b}
                        </li>
                      ))}
                    </ul>
                    <button
                      className="hw-scard-btn"
                      style={{ background: cat.accent }}
                    >
                      Get a Quote →
                    </button>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="hw-timeline-section">
        <div className="hw-timeline-left">
          <p className="hw-overline">Our Journey</p>
          <h2 className="hw-timeline-h2">
            Trusted by<br /><em>organisations</em><br />since 2008.
          </h2>
          <p className="hw-timeline-sub">
            Over 15 years as a preferred hardware partner — from a single-city reseller
            to a multi-brand authorised dealer serving hundreds of clients across South India.
          </p>
        </div>
        <div className="hw-timeline-right">
          <div className="hw-tl-track">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="hw-cta">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1400&q=80"
          alt="CTA"
          className="hw-cta-bg-img"
        />
        <div className="hw-cta-overlay" />
        <div className="hw-cta-content">
          <p className="hw-overline hw-overline--light">Get in Touch</p>
          <h2 className="hw-cta-h2">Need hardware<br />for your business?</h2>
          <p className="hw-cta-sub">
            Tell us your requirements. We'll source the right products at the best price,
            backed by full warranty and in-house support.
          </p>
          <div className="hw-cta-row">
            <button className="hw-btn-fill hw-btn-fill--white">
              Request a Quote →
            </button>
            <div className="hw-cta-phone">
              <span className="hw-cta-phone-icon">📞</span>
              <div>
                <p className="hw-cta-phone-lbl">Call Us Directly</p>
                <p className="hw-cta-phone-val">+91 98438 65065</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}