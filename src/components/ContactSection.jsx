import React, { useState } from "react";
import "../styles/ContactSection.css";
import { Heart, Wifi, Phone, Mail, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import dotts from "../assets/dotts.png";

const topics = [
  "Network Setup",
  "Hardware Support",
  "Software Licensing",
  "IT Infrastructure",
  "Cybersecurity",
  "Cloud Services",
  "Remote Access",
  "Technical Support",
];

const areaOptions = [
  "Network Setup",
  "Hardware Support",
  "Software Licensing",
  "IT Infrastructure",
  "Cybersecurity",
  "Cloud Services",
  "Remote Access",
  "Technical Support",
];

export default function ContactSection() {
  const [selected, setSelected]   = useState(null);
  const [query, setQuery]         = useState("");
  const [formData, setFormData]   = useState({
    fullName: "", email: "", area: "", subject: "", message: "",
  });

  const handleForm = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <section className="cs-section">

      {/* ── Red banner ── */}
      <div className="cs-banner">
        <div className="cs-banner__text">
          <h1 className="cs-banner__title">Contact Us</h1>
          <p className="cs-banner__sub">
            Network queries, hardware issues, IT support — we're here for it all.
          </p>
        </div>
      </div>

      {/* ── Two-col body: card LEFT, avatars RIGHT ── */}
      <div className="cs-body">

        {/* LEFT — white card overlapping banner */}
        <div className="cs-card-col">
          <div className="cs-card">
          

            {/* ── Info + Form two-col ── */}
            <div className="cs-card__bottom">

              {/* Left — contact info */}
              <div className="cs-info-col">
                <h2 className="cs-info-col__title">Let's Have a Talk</h2>
                <div className="cs-info-col__divider" />

                <div className="cs-info-item">
                  <span className="cs-info-item__icon"><Phone size={15} strokeWidth={2} /></span>
                  <div>
                    <p className="cs-info-item__label">For any service related queries</p>
                    <p className="cs-info-item__value">1800 2020 990</p>
                  </div>
                </div>

                <div className="cs-info-item">
                  <span className="cs-info-item__icon"><MessageSquare size={15} strokeWidth={2} /></span>
                  <div>
                    <p className="cs-info-item__label">Sales Queries</p>
                    <p className="cs-info-item__value">+91 88844 84407</p>
                  </div>
                </div>

                <div className="cs-info-item">
                  <span className="cs-info-item__icon"><Mail size={15} strokeWidth={2} /></span>
                  <div>
                    <p className="cs-info-item__label">Email</p>
                    <a href="mailto:support@isoft.com" className="cs-info-item__value cs-info-item__value--link">
                      support@isoft.com
                    </a>
                  </div>
                </div>

                <div className="cs-info-item">
                  <span className="cs-info-item__icon"><Clock size={15} strokeWidth={2} /></span>
                  <div>
                    <p className="cs-info-item__label">Working hours</p>
                    <p className="cs-info-item__value">Mon–Sat: 9:30 am – 06:30 pm</p>
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="cs-card__col-divider" />

              {/* Right — form */}
              <div className="cs-form-col">
                <h2 className="cs-form-col__title">We'd Love to Hear from You</h2>
                <div className="cs-form-col__divider" />

                <div className="cs-form-grid">
                  <div className="cs-form-field">
                    <label className="cs-form-label">Full Name <span className="cs-form-label__req">*</span></label>
                    <input className="cs-form-input" type="text" name="fullName" placeholder="Your full name" value={formData.fullName} onChange={handleForm} />
                  </div>

                  <div className="cs-form-field">
                    <label className="cs-form-label">Email Address <span className="cs-form-label__req">*</span></label>
                    <input className="cs-form-input" type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleForm} />
                  </div>

                  <div className="cs-form-field">
                    <label className="cs-form-label">Area of Interest <span className="cs-form-label__req">*</span></label>
                    <select className="cs-form-input cs-form-select" name="area" value={formData.area} onChange={handleForm}>
                      <option value="">— Please choose an option —</option>
                      {areaOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div className="cs-form-field">
                    <label className="cs-form-label">Subject</label>
                    <input className="cs-form-input" type="text" name="subject" placeholder="A range of budget for project" value={formData.subject} onChange={handleForm} />
                  </div>

                  <div className="cs-form-field cs-form-field--full">
                    <label className="cs-form-label">Message</label>
                    <textarea className="cs-form-input cs-form-textarea" name="message" placeholder="Write your message here..." value={formData.message} onChange={handleForm} rows={5} />
                  </div>
                </div>

                <button className="cs-form-submit">
                  Send Your Message
                  <ArrowUpRight size={16} strokeWidth={2.5} className="cs-form-submit__icon" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT — avatar zone */}
        <div className="cs-avatar-zone">
          <img src={dotts} alt="" className="cs-avatars__dots" />

          <div className="cs-avatar cs-avatar--a">
            <span className="cs-avatar__bg" style={{ background: "#c0392b" }} />
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=top"
              alt="team" className="cs-avatar__img"
            />
          </div>

          <div className="cs-avatar cs-avatar--b">
            <span className="cs-avatar__bg" style={{ background: "#1aa3c8" }} />
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=260&h=340&fit=crop&crop=top"
              alt="team" className="cs-avatar__img"
            />
          </div>

          <div className="cs-avatar cs-avatar--c">
            <span className="cs-avatar__bg" style={{ background: "#c0392b" }} />
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=260&h=340&fit=crop&crop=top"
              alt="team" className="cs-avatar__img"
            />
          </div>

          <div className="cs-avatar cs-avatar--d">
            <span className="cs-avatar__bg" style={{ background: "#d4a017" }} />
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=260&h=340&fit=crop&crop=top"
              alt="team" className="cs-avatar__img"
            />
          </div>

          <span className="cs-reaction cs-reaction--heart">
            <Heart size={16} strokeWidth={2.5} fill="#e8294c" color="#e8294c" />
          </span>
          <span className="cs-reaction cs-reaction--hands">
            <Wifi size={16} strokeWidth={2.5} color="#f0a500" />
          </span>
        </div>

      </div>

   

    </section>
  );
}