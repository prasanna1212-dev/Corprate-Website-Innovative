import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight01Icon,
  RouterIcon,
  ComputerIcon,
  ProgrammingFlagIcon,
  Settings01Icon,
} from "hugeicons-react";
import isoftlogo from "../assets/isoft-logo.png";
import welcome from "../assets/welcome.png";
import Lanyard from "./Lanyard.jsx";

// ── Mega-menu service items ────────────────────────────────────────────────
const serviceItems = [
  {
    icon: RouterIcon,
    title: "Networking",
    desc: "Enterprise-grade network design, setup and infrastructure support.",
    badge: null,
    path: "/services/networking",
  },
  {
    icon: ComputerIcon,
    title: "Hardware",
    desc: "Procurement, installation and lifecycle management of IT hardware.",
    badge: "new",
    path: "/services/hardware",
  },
  {
    icon: ProgrammingFlagIcon,
    title: "Software",
    desc: "Custom software solutions, licensing and deployment pipelines.",
    badge: "on sale",
    path: "/services/software",
  },
  {
    icon: Settings01Icon,
    title: "IT Services",
    desc: "End-to-end managed IT support for teams at any scale.",
    badge: "fan fave",
    path: "/services/it-services",
  },
];

// ── Nav items ───────────────────────────────────────────────────────────────
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact Us", path: "/contact" },
];

export default function Header() {
  const navigate = useNavigate();

  const [headerVisible, setHeaderVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showServicesMenu, setShowServicesMenu] = useState(false);

  const lastScrollY = useRef(0);
  const closeMenuTimeout = useRef(null);

  // ── Welcome modal auto-dismiss after 5 s ─────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // ── Header show / hide on scroll ─────────────────────────────────────────
  useEffect(() => {
    const handleHeaderScroll = () => {
      const currentY = window.scrollY;
      const heroBottom = window.innerHeight;
      const inHero = currentY < heroBottom;
      const scrollingUp = currentY < lastScrollY.current;

      if (currentY === 0) setHeaderVisible(false);
      else if (inHero) setHeaderVisible(true);
      else setHeaderVisible(scrollingUp);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleHeaderScroll);
  }, []);

  // ── Scroll progress rail ─────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Mega-menu handlers ───────────────────────────────────────────────────
  const openServicesMenu = () => {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current);
    }
    setShowServicesMenu(true);
  };

  const closeServicesMenu = () => {
    closeMenuTimeout.current = setTimeout(() => {
      setShowServicesMenu(false);
    }, 250);
  };

  useEffect(() => {
    return () => {
      if (closeMenuTimeout.current) {
        clearTimeout(closeMenuTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* ── Scroll progress rail ── */}
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

      {/* ── Main header ── */}
      <header
        className={`site-header${headerVisible ? " site-header--visible" : ""}`}
      >
        <div className="site-header__inner">
          {/* Brand */}
          <div className="brand">
            <img
              src={isoftlogo}
              alt="iSoft Tech Solutions"
              className="brand__logo"
            />
          </div>

          {/* Nav */}
          <nav className="site-nav">
            {/* Home & About */}
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.name} to={item.path} className="site-nav__link">
                {item.name}
              </Link>
            ))}

            {/* Services mega-menu */}
            <div
              className="site-nav__services-wrap"
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenu}
            >
              <div className="site-nav__services-trigger-wrap">
                <Link
                  to="/services"
                  className="site-nav__link"
                  onClick={() => setShowServicesMenu(false)}
                >
                  Services
                </Link>

                <button
                  type="button"
                  className="site-nav__link site-nav__services-trigger"
                  onClick={() => setShowServicesMenu((prev) => !prev)}
                  aria-expanded={showServicesMenu}
                  aria-haspopup="true"
                >
                  ▾
                </button>
              </div>

              <div
                className={`site-nav__mega-menu ${
                  showServicesMenu ? "site-nav__mega-menu--open" : ""
                }`}
              >
                <div className="mega-menu__grid">
                  {serviceItems.map((s) => (
                    <Link
                      key={s.title}
                      to={s.path}
                      className="mega-menu__item"
                      onClick={() => setShowServicesMenu(false)}
                    >
                      <div className="mega-menu__icon">
                        <s.icon className="mega-menu__svc-icon" />
                      </div>

                      <div className="mega-menu__body">
                        <div className="mega-menu__item-head">
                          <span className="mega-menu__title">{s.title}</span>

                          {s.badge && (
                            <span
                              className={`mega-menu__badge mega-menu__badge--${s.badge.replace(
                                " ",
                                "-"
                              )}`}
                            >
                              {s.badge}
                            </span>
                          )}
                        </div>

                        <p className="mega-menu__desc">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <Link
              to="/case-studies"
              className="site-nav__link site-nav__link--btn"
            >
              Case Studies
            </Link>

            {/* Testimonials */}
            <button
              className="site-nav__link site-nav__link--btn"
              onClick={() => navigate("/testimonials")}
            >
              Testimonials
            </button>

            {/* Enquiry */}
            <div className="site-nav__lanyard-wrap">
              <Lanyard
                position={[0, 0, 8]}
                gravity={[0, -20, 0]}
                fov={25}
                transparent={true}
                onPull={() => setShowEnquiry(true)}
              />
              <span className="site-nav__lanyard-label">Enquiry</span>
            </div>

            {/* Contact Us */}
            <Link to="/contact" className="site-nav__link">
              Contact Us
            </Link>
          </nav>

          {/* CTA */}
          <Link to="/contact" className="button button--ghost">
            Let&apos;s Talk
            <ArrowRight01Icon className="button__icon" />
          </Link>
        </div>
      </header>

      {/* ── Enquiry Modal ── */}
      {showEnquiry && (
        <div
          className="enquiry-modal__backdrop"
          onClick={() => setShowEnquiry(false)}
        >
          <button
            className="welcome-modal__close"
            onClick={() => setShowEnquiry(false)}
          >
            ✕
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="enquiry-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="enquiry-modal__head">
              <h3 className="enquiry-modal__title">Let's Work Together</h3>
              <p className="enquiry-modal__sub">
                Pull the card anytime to reach us.
              </p>
            </div>

            <div className="enquiry-modal__body">
              <input className="enquiry-modal__input" placeholder="Your Name" />
              <input
                className="enquiry-modal__input"
                placeholder="Email Address"
              />
              <input className="enquiry-modal__input" placeholder="Company" />
              <textarea
                className="enquiry-modal__input enquiry-modal__textarea"
                placeholder="How can we help?"
                rows={4}
              />
              <button className="button button--primary enquiry-modal__submit">
                Send Enquiry
                <ArrowRight01Icon className="button__icon" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Welcome Modal ── */}
      {showWelcome && (
        <div
          className="welcome-modal__backdrop"
          onClick={() => setShowWelcome(false)}
        >
          <button
            className="welcome-modal__close"
            onClick={() => setShowWelcome(false)}
          >
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
    </>
  );
}
