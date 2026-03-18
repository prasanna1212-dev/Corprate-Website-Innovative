import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight01Icon,
  Award01Icon,
  Briefcase01Icon,
  Building06Icon,
  CustomerService01Icon,
  Settings01Icon,
  Home11Icon,
  Idea01Icon,
  Layout01Icon,
  Mail01Icon,
  Rocket01Icon,
  SafetyPin01Icon,
  SearchAddIcon,
  Shield01Icon,
  UserGroupIcon,
} from "hugeicons-react";
import "../styles/CadDesignerLandingPage.css";
import heroVideo from "../assets/bgvdo.mp4";
import IndustriesSection from "./IndustriesSection";
import workspace from "../assets/workspace1.png";
import dotvector from "../assets/dotts.png";
import ParticlesBg from "./ParticlesBg";
import welcome from "../assets/welcome.png";

const clientLogoModules = import.meta.glob("../assets/client-logo/*.{png,jpg,jpeg,svg,webp,jfif}", {
  eager: true,
});

const clientLogos = Object.values(clientLogoModules).map((mod) => mod.default);

const services = [
  {
    title: "Consulting",
    icon: CustomerService01Icon,
    text: "Transform complex engineering needs into delivery-ready plans with a clear advisory workflow.",
  },
  {
    title: "Resource Augmentation",
    icon: UserGroupIcon,
    text: "Flexible CAD talent support designed to plug into your internal design and documentation team.",
  },
  {
    title: "Research and Development",
    icon: SearchAddIcon,
    text: "Create and validate digital concepts faster with structured prototypes and iterative modeling.",
  },
  {
    title: "Support and Maintenance",
    icon: Shield01Icon,
    text: "Keep drawings, revisions, and deliverables healthy with dependable post-project assistance.",
  },
];

const expertise = [
  { value: "40", suffix: "+", label: "Projects Delivered" },
  { value: "1000", suffix: "+", label: "Design Iterations" },
  { value: "300", suffix: "+", label: "CAD Assets Created" },
  { value: "100", suffix: "+", label: "Enterprise Clients" },
];

const industries = [
  { title: "Engineering", icon: Settings01Icon, tone: "industry-card--rose" },
  { title: "Retail", icon: Briefcase01Icon, tone: "industry-card--violet" },
  { title: "Hospitality", icon: Home11Icon, tone: "industry-card--amber" },
  { title: "Education", icon: Award01Icon, tone: "industry-card--sky" },
  { title: "Healthcare", icon: SafetyPin01Icon, tone: "industry-card--emerald" },
  { title: "Logistics", icon: Rocket01Icon, tone: "industry-card--orange" },
  { title: "Public Sector", icon: Building06Icon, tone: "industry-card--fuchsia" },
  { title: "Real Estate", icon: Layout01Icon, tone: "industry-card--cyan" },
  { title: "Planning", icon: Idea01Icon, tone: "industry-card--lime" },
];

const footerCols = {
  "About Us": ["Our Story", "Leadership", "Contact"],
  Services: ["CAD Design", "Consulting", "Project Support"],
  Solutions: ["BIM Coordination", "3D Modeling", "Drafting Services"],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const heroTitleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function SectionTitle({ eyebrow, title, text, center = false }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={itemVariants}
      className={center ? "section-title section-title--center" : "section-title"}
    >
      <div className="section-title__eyebrow">{eyebrow}</div>
      <h2 className="section-title__heading">{title}</h2>
      {text ? <p className="section-title__text">{text}</p> : null}
    </motion.div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`ui-card ${className}`}>{children}</div>;
}

function CountUpNumber({ end = 0, suffix = "", duration = 2000 }) {
  const [count, setCount] = React.useState(0);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const elementRef = React.useRef(null);
  const frameRef = React.useRef(null);

  React.useEffect(() => {
    const node = elementRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!startAnimation) return;
    const safeEnd = Number(end);
    if (!Number.isFinite(safeEnd) || safeEnd < 0) { setCount(0); return; }
    const startTime = performance.now();
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * safeEnd));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(safeEnd);
      }
    };
    frameRef.current = requestAnimationFrame(updateCounter);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [startAnimation, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
}

export default function CadDesignerLandingPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const lastScrollY = useRef(0);
  const heroRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(true);
 
  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // ── Header hide / show logic ──────────────────────────────────────────────
  useEffect(() => {
    const handleHeaderScroll = () => {
      const currentY = window.scrollY;
      const heroBottom = heroRef.current
        ? heroRef.current.getBoundingClientRect().bottom + currentY
        : window.innerHeight;

      const inHero      = currentY < heroBottom;
      const scrollingUp = currentY < lastScrollY.current;

      if (currentY === 0) {
        setHeaderVisible(false);
      } else if (inHero) {
        setHeaderVisible(true);
      } else {
        setHeaderVisible(scrollingUp);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleHeaderScroll);
  }, []);

  // ── Scroll progress rail ──────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="cad-page">
      <ParticlesBg count={10} />
      {/* Scroll progress rail */}
      <div className="cad-page__social-rail">
        <div className="cad-page__social-rail-inner">
          <span className="cad-page__social-progress-track">
            <span
              className="cad-page__social-progress-fill"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </span>
          <span className="cad-page__social-label">Cursor Movement</span>
        </div>
      </div>

      {/* Header — hidden by default, shown via JS class */}
      {/* <header className={`site-header${headerVisible ? " site-header--visible" : ""}`}>
        <div className="site-header__inner">
          <div className="brand">
            <img src={isoftlogo} alt="iSoft Tech Solutions" className="brand__logo" />
          </div>

          <nav className="site-nav">
            {navItems.map((item) =>
              item === "About" ? (
                <Link key={item} to="/about" className="site-nav__link">
                  {item}
                </Link>
              ) : (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="site-nav__link"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <a href="#contact-us" className="button button--ghost">
            Let&apos;s Talk
            <ArrowRight01Icon className="button__icon" />
          </a>
        </div>
      </header> */}

      <main>

        {/* ── Hero ── */}
        <section className="hero-section" ref={heroRef}>
          <div className="hero-section__bg-video-wrap">
            <video className="hero-section__bg-video" autoPlay muted loop playsInline>
              <source src={heroVideo} type="video/mp4" />
            </video>
            <div className="hero-section__bg-overlay" />
          </div>

          <div className="hero-section__inner hero-section__inner--center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="hero-copy hero-copy--center"
            >
              <motion.div variants={itemVariants} className="hero-copy__badge">
                Beyond IT, Limitless Possibilities
              </motion.div>

              <motion.h1 variants={heroTitleVariants} className="hero-copy__title">
                Engineering ideas into polished digital experiences.
              </motion.h1>

              <motion.p variants={itemVariants} className="hero-copy__text">
                We build refined CAD and design support workflows for ambitious
                teams that need precision, speed, and a sleek presentation.
              </motion.p>

              <motion.div variants={itemVariants} className="hero-copy__actions">
                <a href="#services" className="button button--primary">
                  Explore Services
                  <ArrowRight01Icon className="button__icon" />
                </a>
                <a href="#about-us" className="hero-copy__link">
                  Learn more
                  <ArrowRight01Icon className="button__icon" style={{ width: 14 }} />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="section shell">
          <SectionTitle
            center
            eyebrow="Our Services"
            title="Elegant delivery across every stage of the design pipeline"
            text="Precision-engineered design support that adapts to your team's unique requirements with seamless integration."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="services-grid-home"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} variants={itemVariants}>
                  <Card className="service-card">
                    <div className="service-card__icon-wrap">
                      <Icon className="service-card__icon" />
                    </div>
                    <h3 className="service-card__title">{service.title}</h3>
                    <p className="service-card__text">{service.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── Testimonials ── */}
        <section className="client-marquee-section">
          <div className="client-marquee-section__inner">
            <div className="client-marquee-section__label">Trusted by leading brands</div>

            <div className="client-marquee">
              <div className="client-marquee__track">
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                  <div className="client-marquee__item" key={index}>
                    <img
                      src={logo}
                      alt={`Client logo ${index + 1}`}
                      className="client-marquee__logo"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about-us" className="section shell about-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-section__visual-wrap"
          >
            <motion.img
              src={workspace}
              alt="Workspace"
              className="about-section__image"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <img src={dotvector} alt="" className="about-section__vector" />
          </motion.div>

          <div className="about-section__content">
            <SectionTitle
              eyebrow="Who We Are"
              title="We merge visual polish with highly structured engineering support"
              text="Our team specializes in creating high-fidelity CAD assets and design documentation that empowers engineering teams to focus on innovation while we handle the precision work."
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="about-section__action"
            >
              <a href="#industry" className="button button--primary">
                Expertise &amp; Results
                <ArrowRight01Icon className="button__icon" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Industry ── */}
        <section id="industry" className="section shell industry-section">
          <div className="industry-overview">
            <SectionTitle
              eyebrow="Impact"
              title="Global expertise across multiple specialized domains"
              text="From complex logistics to delicate healthcare infrastructure, our design systems are built for real-world impact."
            />

            <div className="industry-stats-wrap">
              <img src={dotvector} alt="" className="industry-stats__dots" />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="industry-stats"
              >
                {expertise.map((item) => (
                  <motion.div key={item.label} variants={itemVariants} className="industry-stat">
                    <div className="industry-stat__value">
                      <CountUpNumber end={item.value} suffix={item.suffix} duration={2000} />
                    </div>
                    <div className="industry-stat__label">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <IndustriesSection items={industries} />
        </section>

        {/* ── Contact ── */}
        <section id="contact-us" className="section shell">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="contact-banner"
          >
            <h3 className="contact-banner__title">
              Ready to elevate your engineering delivery?
            </h3>
            <a
              href="mailto:hello@globalcaddesigner.com"
              className="button button--primary"
              style={{ padding: "16px 40px", fontSize: "16px" }}
            >
              Get in Touch
              <ArrowRight01Icon className="button__icon" />
            </a>
          </motion.div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div>
            <div className="brand">
              <div className="brand__title">Global Cad Designer</div>
            </div>
            <p className="site-footer__text">
              Premium design support for global engineering teams. Precision modeling
              and drafting delivered with visual excellence.
            </p>
            <div className="site-footer__meta">
              <span className="site-footer__meta-item">
                <Mail01Icon className="site-footer__meta-icon" />{" "}
                hello@globalcaddesigner.com
              </span>
            </div>
          </div>

          {Object.entries(footerCols).map(([title, items]) => (
            <div key={title}>
              <div className="site-footer__heading">{title}</div>
              <div className="site-footer__links">
                {items.map((item) => (
                  <a key={item} href="#" className="site-footer__link">{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
      {showWelcome && (
      <div className="welcome-modal__backdrop" onClick={() => setShowWelcome(false)}>
      
        {/* ── Close button — now on backdrop top-right ── */}
        <button className="welcome-modal__close" onClick={() => setShowWelcome(false)}>
          ✕
        </button>
      
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="welcome-modal"
          onClick={(e) => e.stopPropagation()}
        >
        
          <div className="welcome-modal__img-wrap">
            <img src={welcome} alt="Welcome" className="welcome-modal__img" />
          </div>
          <div className="welcome-modal__timer">
            <div className="welcome-modal__timer-bar" />
          </div>
        </motion.div>
      
      </div>
      )}
    </div>
  );
}