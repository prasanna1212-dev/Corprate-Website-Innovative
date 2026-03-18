import { useEffect, useRef, useState } from "react";
import {
  Wrench, HeartPulse, Zap,
  Radio, GraduationCap, Truck,
  Hotel, Factory, Landmark,
} from "lucide-react";
import "../styles/IndustriesSection.css";

/* ── Column config ── */
const COLS = [
  {
    key: "one",
    startY: 150,
    cards: [
      { Icon: Wrench,        title: "Engineering",         desc: "We have pioneered Engineering solutions for Design, Consulting, and Construction companies in the region.",  cls: "wic-card--lavender" },
      { Icon: HeartPulse,    title: "Health Care",          desc: "Large to small hospitals, multi-discipline clinics and pharmacies rely on us for their IT Solutions.",        cls: "wic-card--blue" },
      { Icon: Zap,           title: "Utilities",            desc: "We fulfill the needs of utilities such as Electricity, Water, Gas, and Transport that run the nation.",       cls: "wic-card--peach" },
    ],
  },
  {
    key: "two",
    startY: -100,
    cards: [
      { Icon: Radio,         title: "Telecom",              desc: "We focus on Telecom companies in the Voice, Data, and Internet services sector across the region.",           cls: "wic-card--teal" },
      { Icon: GraduationCap, title: "Education",            desc: "Universities, Institutes, Training Centers and Schools depend on our expertise for IT Infrastructure.",       cls: "wic-card--yellow" },
      { Icon: Truck,         title: "Shipping & Logistics", desc: "We cover shipping companies, Freight Forwarders, Couriers, and Warehousing Providers.",                       cls: "wic-card--gray" },
    ],
  },
  {
    key: "three",
    startY: -50,
    cards: [
      { Icon: Hotel,         title: "Hospitality",          desc: "We offer a complete suite of hospitality solutions customized for the region's unique requirements.",         cls: "wic-card--pink" },
      { Icon: Factory,       title: "Manufacturing",        desc: "We meet the needs of discrete and continuous manufacturing plants including fabrication units.",               cls: "wic-card--green" },
      { Icon: Landmark,      title: "Public",               desc: "We serve government bodies at federal, emirate and municipal levels with precision and expertise.",            cls: "wic-card--blue" },
    ],
  },
];

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

export default function IndustriesSection() {
  const wrapperRef = useRef(null);
  const targetRef  = useRef(0);
  const smoothRef  = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const computeTarget = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect          = el.getBoundingClientRect();
      const wrapperHeight = el.offsetHeight;
      const vh            = window.innerHeight;
      const range         = wrapperHeight - vh;
      const scrolled      = -rect.top;
      targetRef.current   = range > 0 ? clamp01(scrolled / range) : 1;
    };

    const tick = () => {
      const next = smoothRef.current + (targetRef.current - smoothRef.current) * 0.14;
      smoothRef.current = next;
      setProgress(prev => (Math.abs(next - prev) > 0.001 ? next : prev));
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

  const colStyle = (startY) => ({
    transform: `translateY(${startY * (1 - progress)}px)`,
    opacity: 1,
  });

  return (
    <div className="wic-scroll-wrapper" ref={wrapperRef}>
      <div className="wic-sticky-pin">
        <section className="wic-section">

          <div className="wic-header">
            <span className="wic-eyebrow">Industries We Serve</span>
            <h2 className="wic-heading">Solutions Tailored for Every Sector</h2>
           
          </div>

          <div className="wic-grid-clip">
            <div className="wic-grid">
              {COLS.map(({ key, startY, cards }) => (
                <div
                  key={key}
                  className={`wic-col wic-col--${key}`}
                  style={colStyle(startY)}
                >
                  {cards.map(({ Icon, title, desc, cls }) => (
                    <div key={title} className={`wic-card ${cls}`}>
                      <div className="wic-icon">
                        <Icon className="wic-icon__svg" strokeWidth={1.5} />
                      </div>
                      <h3 className="wic-card__title">{title}</h3>
                      <p className="wic-card__desc">{desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}