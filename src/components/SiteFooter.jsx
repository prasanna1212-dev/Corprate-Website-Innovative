import React from "react";
import "../styles/SiteFooter.css";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

import isoftlogo from "../assets/isoft-logo.png";
import globe from "../assets/globe.png";
const quickLinks  = ["Pricing", "Resources", "About us", "FAQ", "Contact us"];
const socialLinks = ["Facebook", "Instagram", "LinkedIn", "Twitter", "Youtube"];
const legalLinks  = ["Terms of service", "Privacy policy", "Cookie policy"];

export default function SiteFooter() {
  return (
    <>
      {/* ── CTA sits OUTSIDE footer so it overlaps both sections ── */}
      <div className="sf-cta-wrapper">
        <div className="sf-cta">
          <div className="sf-cta__inner">

            {/* Left — text */}
            <div className="sf-cta__content">
              <h2 className="sf-cta__title">
                Experience enterprise-grade<br />IT infrastructure support
              </h2>
              <p className="sf-cta__sub">150+ service solutions per request.</p>
              <a href="#contact" className="sf-cta__btn">Get started</a>
            </div>

            {/* Right — globe */}
            <div className="sf-cta__visual">
              <div className="sf-cta__globe-wrap">
                <img
                  src={globe}
                  alt="world network"
                  className="sf-cta__globe-img"
                />
              
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer body — bg starts here, bleeds behind CTA ── */}
      <footer className="sf-footer">
        <div className="sf-body">
          <div className="sf-body__inner">

            {/* LEFT — brand + address + contact */}
            <div className="sf-brand-col">
              <div className="sf-logo-wrap">
                <img src={isoftlogo} alt="iSoft Tech Solutions" className="sf-logo" />
              </div>

              <address className="sf-address">
                <span className="sf-address__line">
                  <MapPin size={13} className="sf-address__icon" />
                  20619 Torrence Chapel Rd
                </span>
                <span className="sf-address__line sf-address__line--indent">Suite 116 #1040</span>
                <span className="sf-address__line sf-address__line--indent">Coimbatore, TN 641001</span>
                <span className="sf-address__line sf-address__line--indent">India</span>
              </address>

              <div className="sf-contact">
                <div className="sf-contact__group">
                  <span className="sf-contact__label">
                    <Phone size={12} className="sf-contact__icon" /> Phone number
                  </span>
                  <a href="tel:+914222345678" className="sf-contact__value">+91 422 234 5678</a>
                </div>
                <div className="sf-contact__group">
                  <span className="sf-contact__label">
                    <Mail size={12} className="sf-contact__icon" /> Email
                  </span>
                  <a href="mailto:support@isoft.com" className="sf-contact__value">support@isoft.com</a>
                </div>
              </div>
            </div>

            {/* RIGHT — link columns */}
            <div className="sf-links-area">
              <div className="sf-link-col">
                <h4 className="sf-link-col__heading">Quick links</h4>
                <ul className="sf-link-col__list">
                  {quickLinks.map((l) => (
                    <li key={l}><a href="#" className="sf-link-col__item">{l}</a></li>
                  ))}
                </ul>
              </div>

              <div className="sf-link-col">
                <h4 className="sf-link-col__heading">Social</h4>
                <ul className="sf-link-col__list">
                  {socialLinks.map((l) => (
                    <li key={l}>
                      <a href="#" className="sf-link-col__item">
                        {l}
                        <ExternalLink size={11} className="sf-link-col__ext" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sf-link-col">
                <h4 className="sf-link-col__heading">Legal</h4>
                <ul className="sf-link-col__list">
                  {legalLinks.map((l) => (
                    <li key={l}><a href="#" className="sf-link-col__item">{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="sf-bottom">
            <span className="sf-bottom__copy">
              © {new Date().getFullYear()} iSoft Tech Solutions. All rights reserved.
            </span>
            <span className="sf-bottom__tagline">
              Built with precision. Delivered with excellence.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}