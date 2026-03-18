import React from "react";
import { motion } from "framer-motion";
import {
  Award01Icon,
  Building06Icon,
  CustomerService01Icon,
  Idea01Icon,
  Rocket01Icon,
  Shield01Icon,
  UserGroupIcon,
} from "hugeicons-react";
import "../styles/AboutSection.css";
import logo1 from "../assets/client-logo/1.png";
import logo2 from "../assets/client-logo/3.png";
import logo3 from "../assets/client-logo/7.png";
import logo4 from "../assets/client-logo/22.png";
import logo5 from "../assets/client-logo/33.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const services = [
  {
    title: "IT Hardware Sales & Support",
    text: "Branded desktops, laptops, servers, storage systems, and networking equipment with dependable support.",
    icon: Building06Icon,
  },
  {
    title: "Software Packages",
    text: "Software sales and support tailored to business, institutional, and enterprise requirements.",
    icon: Shield01Icon,
  },
  {
    title: "Networking Solutions",
    text: "Reliable infrastructure planning, deployment, and support for scalable networking environments.",
    icon: Rocket01Icon,
  },
  {
    title: "IT Facility Management",
    text: "End-to-end facility management services that help organizations maintain smooth IT operations.",
    icon: CustomerService01Icon,
  },
];

const highlights = [
  { value: "2008", label: "Founded" },
  { value: "5+", label: "Global Brand Partners" },
  { value: "100+", label: "Projects Completed" },
  { value: "24/7", label: "Commitment Mindset" },
];

const partners = [
  { logo: logo1, name: "Dell" },
  { logo: logo2, name: "HP" },
  { logo: logo3, name: "Cisco" },
  { logo: logo4, name: "Fortinet" },
  { logo: logo5, name: "Microsoft" },
];

function AboutSection() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__glow about-hero__glow--one" />
        <div className="about-hero__glow about-hero__glow--two" />

        <motion.div
          className="about-shell about-hero__inner"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="about-hero__content" variants={itemVariants}>
            <div className="about-badge">About i-Soft Solutions</div>
            <h1 className="about-hero__title">
              One stop IT solutions with trusted brands, modern technology, and
              a customer-first approach.
            </h1>
            <p className="about-hero__text">
              Established in 2008 at Coimbatore, i-Soft Solutions delivers
              complete IT hardware, software, networking, and support services
              for companies, organizations, and institutions with speed,
              reliability, and long-term value.
            </p>

            <div className="about-hero__actions">
              <a href="#what-we-do" className="about-btn about-btn--primary">
                Explore Services
              </a>
              <a href="#our-goal" className="about-btn about-btn--ghost">
                Our Goal
              </a>
            </div>
          </motion.div>

          <motion.div
            className="about-hero__stats"
            variants={containerVariants}
          >
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                className="about-stat-card"
                variants={itemVariants}
              >
                <div className="about-stat-card__value">{item.value}</div>
                <div className="about-stat-card__label">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="about-story">
        <motion.div
          className="about-shell about-story__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="about-story__card about-story__card--large"
            variants={itemVariants}
          >
            <div className="about-section-tag">Who We Are</div>
            <h2 className="about-section-title">
              Technology partnerships, enterprise support, and stronger business
              continuity.
            </h2>
            <p className="about-section-text">
              i-Soft Solutions was established in 2008 as a one stop IT solution
              provider in Coimbatore, India. We specialize in hardware sales and
              service, software package sales, and networking solutions for
              leading companies, organizations, and institutions.
            </p>
            <p className="about-section-text">
              We deal with branded desktops, laptops, servers, storage, and
              networking equipment while ensuring competitive pricing,
              dependable service, and practical solutions that fit modern
              operational demands.
            </p>
          </motion.div>

          <motion.div
            className="about-story__side"
            variants={containerVariants}
          >
            <motion.div className="about-mini-card" variants={itemVariants}>
              <Award01Icon className="about-mini-card__icon" />
              <h3>Authorized Partners</h3>
              <p>
                Official partner for renowned brands like Dell, HP, Cisco,
                Fortinet, and Microsoft.
              </p>
            </motion.div>

            <motion.div className="about-mini-card" variants={itemVariants}>
              <UserGroupIcon className="about-mini-card__icon" />
              <h3>Experienced Team</h3>
              <p>
                Skilled professionals with hands-on experience delivering
                projects for companies, institutions, and organizations.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="about-partners">
        <motion.div
          className="about-shell"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="about-partners__header"
            variants={itemVariants}
          >
            <div className="about-section-tag">Trusted Partnerships</div>
            <h2 className="about-section-title">
              Backed by globally recognized technology brands
            </h2>
            <p className="about-section-text about-partners__text">
              Our direct and long-lasting relationships with global brands help
              us provide better pricing, wider product availability, innovative
              solutions, and access to the latest technologies.
            </p>
          </motion.div>

          <motion.div
            className="about-partners__grid"
            variants={containerVariants}
          >
            {partners.map((brand) => (
              <motion.div
                className="about-brand-card"
                key={brand.name}
                variants={itemVariants}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="about-brand-logo"
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="about-services" id="what-we-do">
        <motion.div
          className="about-shell"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="about-services__header"
            variants={itemVariants}
          >
            <div className="about-section-tag">What We Do</div>
            <h2 className="about-section-title">
              Smart IT services designed for stability, growth, and performance
            </h2>
          </motion.div>

          <motion.div
            className="about-services__grid"
            variants={containerVariants}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  className="about-service-card"
                  key={service.title}
                  variants={itemVariants}
                >
                  <div className="about-service-card__icon-wrap">
                    <Icon className="about-service-card__icon" />
                  </div>
                  <h3 className="about-service-card__title">{service.title}</h3>
                  <p className="about-service-card__text">{service.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <section className="about-goal" id="our-goal">
        <motion.div
          className="about-shell"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={containerVariants}
        >
          <motion.div className="about-goal__card" variants={itemVariants}>
            <div className="about-goal__icon-wrap">
              <Idea01Icon className="about-goal__icon" />
            </div>
            <div className="about-goal__content">
              <div className="about-section-tag">Our Goal</div>
              <h2 className="about-section-title">
                Deliver richer customer experiences through outstanding IT
                solutions
              </h2>
              <p className="about-section-text">
                We believe customer satisfaction and commitment are the key
                drivers of organizational success. Our focus is on delivering
                reliable IT solutions while ensuring the highest level of
                satisfaction, meaningful service experiences, and healthy
                long-term relationships with every customer.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default AboutSection;
