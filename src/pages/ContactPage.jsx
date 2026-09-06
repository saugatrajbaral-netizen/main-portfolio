import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

export default function ContactPage({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: lang === 'np' ? 'कृपया सबै आवश्यक विवरण भर्नुहोस्।' : 'Please fill in all required fields.'
      });
      return;
    }

    setSubmitting(true);
    // Simulate immediate feedback
    setTimeout(() => {
      setSubmitting(false);
      setStatus({
        type: 'success',
        message: lang === 'np'
          ? 'तपाईंको सन्देश सफलतापूर्वक पठाइयो। धन्यवाद!'
          : 'Thank you. Your message has been dispatched successfully.'
      });
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 6000);
    }, 800);
  };

  return (
    <div className="page-chapter-view contact-chapter-page">
      <PageHeader
        chapter={lang === 'np' ? 'सम्पर्क' : 'Contact'}
        kicker={lang === 'np' ? 'अन्तिम खण्ड' : 'Correspondence & Inquiries'}
        title={lang === 'np' ? 'सम्पर्क तथा नीतिगत संवाद' : 'Connect & Correspondence'}
        subtitle={lang === 'np'
          ? 'व्यावसायिक, अनुसन्धान, नीतिगत तथा सार्वजनिक सेवा सम्बन्धी पत्राचारका लागि सम्पर्क विवरण र संवाद फारम।'
          : 'Official channels for institutional inquiries, academic research collaboration, and fiscal policy correspondence.'}
        lang={lang}
      />

      <div className="container-wide chapter-content-body">
        <div className="contact-editorial-grid">
          {/* Left Column: Official Contact Channels */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <h3 className="contact-card-title">
                {lang === 'np' ? 'आधिकारिक सम्पर्क विवरण' : 'Official Channels'}
              </h3>
              <p className="contact-card-intro">
                {lang === 'np'
                  ? 'कर कानुन परिपालना, नीतिगत विमर्श, प्राज्ञिक अनुसन्धान तथा सार्वजनिक सेवा सम्बन्धी संवादका लागि।'
                  : 'Reach out for inquiries regarding tax administration, fiscal policy discussions, and public financial research.'}
              </p>

              <div className="contact-items-list">
                {/* Email */}
                <a href={`mailto:${personal.email}`} className="contact-item-row">
                  <div className="contact-item-icon">
                    <Mail size={16} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{lang === 'np' ? 'इमेल ठेगाना' : 'Email Address'}</span>
                    <span className="contact-item-val">{personal.email}</span>
                  </div>
                </a>

                {/* Official Phone */}
                <a href={`tel:${personal.officialPhone.replace(/\s+/g, '')}`} className="contact-item-row">
                  <div className="contact-item-icon">
                    <Phone size={16} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{lang === 'np' ? 'आधिकारिक फोन' : 'Official Line'}</span>
                    <span className="contact-item-val">{personal.officialPhone}</span>
                  </div>
                </a>

                {/* Personal Phone */}
                <a href={`tel:${personal.personalPhone.replace(/\s+/g, '')}`} className="contact-item-row">
                  <div className="contact-item-icon">
                    <Phone size={16} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{lang === 'np' ? 'व्यक्तिगत फोन' : 'Direct Line'}</span>
                    <span className="contact-item-val">{personal.personalPhone}</span>
                  </div>
                </a>

                {/* Posting Office & Jurisdiction */}
                <div className="contact-item-row">
                  <div className="contact-item-icon">
                    <MapPin size={16} />
                  </div>
                  <div className="contact-item-text">
                    <span className="contact-item-label">{lang === 'np' ? 'पदस्थापना कार्यालय' : 'Posting Office'}</span>
                    <span className="contact-item-val">{personal.aside.office}</span>
                    <span className="contact-item-sub">{personal.aside.jurisdiction}</span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="contact-socials-bar">
                <span className="socials-label">{lang === 'np' ? 'सामाजिक सञ्जाल:' : 'Profiles:'}</span>
                <div className="socials-links">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-link"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-link"
                  >
                    Twitter / X
                  </a>
                  <a
                    href="https://scholar.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-link"
                  >
                    Google Scholar
                  </a>
                </div>
              </div>

              <div className="contact-card-footer-note">
                <ShieldCheck size={14} className="note-shield-icon" />
                <span>
                  {lang === 'np'
                    ? 'सार्वजनिक सेवा आचारसंहिता तथा गोपनियता मापदण्ड बमोजिम सुरक्षित पत्राचार।'
                    : 'Institutional correspondence adhered to civil service standards of discretion and security.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Editorial Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">
                {lang === 'np' ? 'सन्देश पठाउनुहोस्' : 'Send a Message'}
              </h3>
              <p className="form-card-subtitle">
                {lang === 'np'
                  ? 'कुनै जिज्ञासा, नीतिगत विचार वा सहकार्यका लागि तलको फारम प्रयोग गर्नुहोस्।'
                  : 'Fill in the details below to initiate direct communication or share research insights.'}
              </p>

              {status.message && (
                <div className={`form-feedback-alert ${status.type}`}>
                  {status.type === 'success' && <CheckCircle2 size={16} />}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="editorial-contact-form">
                {/* Spam Protection Field (Hidden) */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                  style={{ display: 'none' }}
                />

                <div className="form-row-dual">
                  <div className="form-field-group">
                    <label htmlFor="contact-name" className="form-label">
                      {lang === 'np' ? 'तपाईंको पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'np' ? 'जस्तै: राम शर्मा' : 'e.g., Dr. Jane Doe'}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="contact-email" className="form-label">
                      {lang === 'np' ? 'इमेल ठेगाना *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@organization.gov.np"
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-subject" className="form-label">
                    {lang === 'np' ? 'विषय' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={lang === 'np' ? 'जस्तै: कर नीति सम्बन्धी छलफल' : 'e.g., Fiscal Policy Research Collaboration'}
                    className="form-input"
                  />
                </div>

                <div className="form-field-group">
                  <label htmlFor="contact-message" className="form-label">
                    {lang === 'np' ? 'सन्देश वा विवरण *' : 'Message *'}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'np' ? 'तपाईंको सन्देश यहाँ लेख्नुहोस्...' : 'Write your detailed message here...'}
                    required
                    className="form-textarea"
                  />
                </div>

                <div className="form-actions-bar">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary form-submit-btn"
                  >
                    <Send size={15} />
                    <span>
                      {submitting
                        ? (lang === 'np' ? 'पठाउँदै...' : 'Sending...')
                        : (lang === 'np' ? 'सन्देश पठाउनुहोस्' : 'Dispatch Message')}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
