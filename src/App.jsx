import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom'
import CadDesignerLandingPage from './components/CadDesignerLandingPage'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import CasestudiesSection from './components/CaseStudiesSection'
import Header from "./components/Header";
import Footer from "./components/SiteFooter";
import ServicesSection from "./components/ServicesSection";
import Networking from "./components/Networking";
import Hardware from "./components/Hardware";
import Software from "./components/Software";
import ITServices from "./components/ITServices";
import ContactSection from "./components/ContactSection";

 function ScrollToTop() {
    const location = useLocation();
  
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
  
    return null;
  }


  function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<CadDesignerLandingPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/services/networking" element={<Networking />} />
        <Route path="/services/hardware" element={<Hardware />} />
        <Route path="/services/software" element={<Software />} />
        <Route path="/services/it-services" element={<ITServices />} />
        <Route path="/testimonials" element={<TestimonialsSection />} />
        <Route path="/case-studies" element={<CasestudiesSection />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App