import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import '../styles/TestimonialsPage.css';

export default function TestimonialsPage() {
  const navigate = useNavigate();
  return (
    <div className="tsm-page">
      <div className="tsm-page__topbar">
        <button className="tsm-page__back" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>
      <TestimonialsSection />
    </div>
  );
}