import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, Building, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Contact() {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    matter: 'General Fiscal Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        organization: '',
        email: '',
        matter: 'General Fiscal Inquiry',
        message: ''
      });
      setTimeout(() => setSubmitted(false), 7000);
    }, 900);
  };

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container-wide">
        <div className="contact-panel">
          <div>
            <div className="section-kicker">
              <span className="eyebrow">Official Communication</span>
            </div>
            <h2 className="contact-title">
              Official Inquiries & <span>Liaison</span>
            </h2>
            <p className="contact-copy">
              For administrative correspondence, taxpayer advisory sessions, policy research queries, or institutional coordination under the Government of Nepal.
            </p>

            <div className="contact-links" style={{ marginTop: '36px' }}>
              <a href={`mailto:${personal.email}`} className="contact-link">
                <Mail size={20} />
                <div>
                  <small>Official Government Email</small>
                  <span>{personal.email}</span>
                </div>
              </a>

              <a href={`mailto:${personal.secondaryEmail}`} className="contact-link">
                <Mail size={20} />
                <div>
                  <small>Correspondence Email</small>
                  <span>{personal.secondaryEmail}</span>
                </div>
              </a>

              <div className="contact-link">
                <MapPin size={20} />
                <div>
                  <small>Official Posting Jurisdiction</small>
                  <span>Inland Revenue Office, {personal.location}</span>
                </div>
              </div>

              <div className="contact-link">
                <Building size={20} />
                <div>
                  <small>Department</small>
                  <span>Inland Revenue Department · Ministry of Finance</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="contact-form-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Shield size={18} color="var(--gov-blue)" />
                <h3 style={{ font: '700 16px var(--app-font-serif)', color: 'var(--navy)', margin: 0 }}>
                  Submit Official Inquiry
                </h3>
              </div>

              {submitted && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#047857',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle2 size={18} />
                  <span>Your message has been received. Official response will follow.</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group-gov">
                  <label htmlFor="name">Full Name / Organization</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name or official entity"
                    className="form-input-gov"
                  />
                </div>

                <div className="form-group-gov">
                  <label htmlFor="email">Official Email Address</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@organization.gov.np or email@domain.com"
                    className="form-input-gov"
                  />
                </div>

                <div className="form-group-gov">
                  <label htmlFor="matter">Nature of Communication</label>
                  <select
                    id="matter"
                    name="matter"
                    value={formData.matter}
                    onChange={handleChange}
                    className="form-input-gov"
                  >
                    <option value="General Fiscal Inquiry">General Fiscal Inquiry</option>
                    <option value="Tax Law Clarification">Tax Law & Statutory Interpretation</option>
                    <option value="Taxpayer Service Feedback">Taxpayer Service & Compliance</option>
                    <option value="Academic & Policy Research">Academic & Policy Research</option>
                  </select>
                </div>

                <div className="form-group-gov">
                  <label htmlFor="message">Official Statement / Inquiry Details</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please specify the nature of your inquiry in detail..."
                    className="form-textarea-gov"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary"
                  style={{ width: '100%', marginTop: '6px' }}
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Transmit Communication</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
