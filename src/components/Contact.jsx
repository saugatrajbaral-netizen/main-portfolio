import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, ShieldCheck, Paperclip, FileText, Loader2, ExternalLink } from 'lucide-react';
import { getPortfolioData } from '../data/portfolioData';

const RECIPIENT_EMAIL = 'saugatrajbaral@gmail.com';
const SECURE_ENDPOINT = 'https://formsubmit.co/ajax/saugatrajbaral@gmail.com';

export default function Contact({ lang = 'en' }) {
  const portfolio = getPortfolioData(lang);
  const { personal } = portfolio;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection
  });
  const [hasAttachment, setHasAttachment] = useState(true);
  const [attachmentName, setAttachmentName] = useState('saugat-raj-baral-cv.pdf');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentName(e.target.files[0].name);
      setHasAttachment(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: lang === 'np' ? 'कृपया सबै आवश्यक विवरण भर्नुहोस्।' : 'Please fill in all required fields.'
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const payload = {
        _subject: formData.subject || (lang === 'np' ? 'आधिकारिक पत्राचार सन्देश' : 'Official Correspondence via Portfolio'),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recipient: RECIPIENT_EMAIL,
        attachment: hasAttachment ? attachmentName : 'None',
        _template: 'table',
        _captcha: 'false'
      };

      const response = await fetch(SECURE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: lang === 'np' ? '✓ Email sent successfully' : '✓ Email sent successfully'
        });
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
        setTimeout(() => setStatus({ type: '', message: '' }), 7000);
      } else {
        setStatus({
          type: 'error',
          message: lang === 'np' ? '✕ Failed to send email. Please try again.' : '✕ Failed to send email. Please try again.'
        });
      }
    } catch (err) {
      console.error('Email send error:', err);
      setStatus({
        type: 'error',
        message: lang === 'np' ? '✕ Failed to send email. Please try again.' : '✕ Failed to send email. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-editorial-section section-pad">
      <div className="container-wide">
        <div className="section-head-editorial">
          <div className="section-kicker">
            <span className="eyebrow">
              {lang === 'np' ? 'सम्पर्क तथा संवाद' : 'Correspondence'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'np' ? (
              <>सम्पर्क तथा <span className="text-accent">संवाद</span></>
            ) : (
              <>Let's <span className="text-accent">Connect</span></>
            )}
          </h2>
          <p className="section-lead">
            {lang === 'np'
              ? 'व्यावसायिक, अनुसन्धान, नीतिगत तथा सार्वजनिक सेवा सम्बन्धी पत्राचारका लागि।'
              : 'For professional, research, policy and public-service related correspondence.'}
          </p>
        </div>

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
                    X / Twitter
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill-link"
                  >
                    Facebook
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

          {/* Right Column: Direct Official Send Email Form */}
          <div className="contact-form-col">
            <div className="contact-form-card email-direct-form-card">
              <div className="email-card-header-bar">
                <div className="email-card-header-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="form-card-title" style={{ margin: 0 }}>
                    {lang === 'np' ? 'इमेल पठाउनुहोस्' : 'Send Email'}
                  </h3>
                  <p className="form-card-subtitle" style={{ margin: '3px 0 0' }}>
                    {lang === 'np'
                      ? 'सिधै saugatrajbaral@gmail.com मा आधिकारिक इमेल पठाउन तलको फारम प्रयोग गर्नुहोस्।'
                      : 'Direct and secure email correspondence to saugatrajbaral@gmail.com.'}
                  </p>
                </div>
              </div>

              {/* Recipient Box */}
              <div className="email-recipient-box" style={{ margin: '16px 0 14px' }}>
                <div className="recipient-pill">
                  <Mail size={14} />
                  <span><strong>To:</strong> {RECIPIENT_EMAIL}</span>
                </div>
                <span className="recipient-badge">
                  {lang === 'np' ? 'सौगात राज बराल • कर अधिकृत' : 'Saugat Raj Baral • Tax Officer'}
                </span>
              </div>

              {status.message && (
                <div className={`form-feedback-alert ${status.type}`} style={{ marginBottom: '14px' }}>
                  {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="editorial-contact-form" noValidate>
                {/* Spam Honeypot */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="home-contact-name" className="form-label">
                      {lang === 'np' ? 'तपाईंको पूरा नाम *' : 'Your Full Name *'}
                    </label>
                    <input
                      type="text"
                      id="home-contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === 'np' ? 'उदा. डा. राम शर्मा' : 'e.g. Dr. Jane Doe'}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="home-contact-email" className="form-label">
                      {lang === 'np' ? 'इमेल ठेगाना *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      id="home-contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@organization.gov.np"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="home-contact-subject" className="form-label">
                    {lang === 'np' ? 'विषय *' : 'Subject *'}
                  </label>
                  <input
                    type="text"
                    id="home-contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={lang === 'np' ? 'उदा. कर नीति तथा प्राज्ञिक अनुसन्धान' : 'e.g. Fiscal Policy Research Collaboration'}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="home-contact-message" className="form-label">
                    {lang === 'np' ? 'सन्देश वा विवरण *' : 'Message *'}
                  </label>
                  <textarea
                    id="home-contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'np' ? 'तपाईंको सन्देश यहाँ लेख्नुहोस्...' : 'Write your detailed message here...'}
                    className="form-textarea"
                    required
                  />
                </div>

                {/* Attachment Section */}
                <div className="email-attachment-box" style={{ margin: '6px 0 10px' }}>
                  <div className="attachment-header">
                    <span className="attachment-label">
                      <Paperclip size={13} />
                      {lang === 'np' ? 'संलग्न कागजात:' : 'Attached Document:'}
                    </span>
                    <label className="upload-custom-link">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept=".pdf,.doc,.docx,.png,.jpg"
                      />
                      {lang === 'np' ? 'अन्य फाइल थप्नुहोस्' : 'Attach different file'}
                    </label>
                  </div>
                  <div className="attachment-pill">
                    <FileText size={13} className="attachment-file-icon" />
                    <span>{attachmentName}</span>
                    <span className="attachment-auto-tag">{lang === 'np' ? 'स्वत: संलग्न' : 'Auto-attached'}</span>
                  </div>
                </div>

                {/* Server-side Security Note */}
                <div className="email-security-note" style={{ margin: '8px 0 14px' }}>
                  <ShieldCheck size={13} style={{ color: '#059669', flexShrink: 0 }} />
                  <span>
                    {lang === 'np'
                      ? 'सुरक्षित सर्भर-साइड इन्क्रिप्टेड इमेल प्रणाली (TLS/HTTPS) बाट saugatrajbaral@gmail.com मा पठाइनेछ।'
                      : 'Secure server-side encrypted transmission (TLS/HTTPS) directly to saugatrajbaral@gmail.com.'}
                  </span>
                </div>

                <div className="form-actions-bar" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-primary form-submit-btn"
                    style={{ minWidth: '170px' }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="spinning" />
                        <span>{lang === 'np' ? 'इमेल पठाउँदै...' : 'Sending Email...'}</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{lang === 'np' ? 'इमेल पठाउनुहोस्' : 'Send Email'}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                    className="button button-secondary form-email-btn"
                    title={lang === 'np' ? 'इमेल एपबाट खोल्नुहोस्' : 'Open in Mail Client'}
                  >
                    <Mail size={15} />
                    <span>{lang === 'np' ? 'इमेल एप खोल्नुहोस्' : 'Open in Mail App'}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

