import React, { useState, useEffect } from 'react';
import { Mail, Send, X, Paperclip, CheckCircle2, AlertCircle, ShieldCheck, FileText, Loader2 } from 'lucide-react';

const RECIPIENT_EMAIL = 'saugatrajbaral@gmail.com';
const SECURE_ENDPOINT = 'https://formsubmit.co/ajax/saugatrajbaral@gmail.com';

export default function SendEmailModal({
  isOpen,
  onClose,
  initialSubject = '',
  initialMessage = '',
  senderName = '',
  senderEmail = '',
  lang = 'en'
}) {
  const [toEmail, setToEmail] = useState(RECIPIENT_EMAIL);
  const [subject, setSubject] = useState(initialSubject || '');
  const [message, setMessage] = useState(initialMessage || '');
  const [fromEmail, setFromEmail] = useState(senderEmail || '');
  const [fromName, setFromName] = useState(senderName || '');
  const [customFile, setCustomFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' }); // 'success' | 'error'

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject || (lang === 'np' ? 'नीतिगत तथा पत्राचार सन्देश' : 'Institutional Correspondence · Saugat Raj Baral'));
      setMessage(initialMessage || '');
      setFromEmail(senderEmail || '');
      setFromName(senderName || '');
      setStatus({ type: '', text: '' });
      setIsSubmitting(false);
      setCustomFile(null);
    }
  }, [isOpen, initialSubject, initialMessage, senderName, senderEmail, lang]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setCustomFile(null);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus({
        type: 'error',
        text: lang === 'np' ? '✕ कृपया सन्देश लेख्नुहोस्।' : '✕ Please enter a message.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', text: '' });

    try {
      const payload = {
        _subject: subject || 'Dispatch Message via Portfolio',
        name: fromName || 'Visitor / Correspondent',
        email: fromEmail || 'correspondent@portfolio.local',
        message: message,
        recipient: RECIPIENT_EMAIL,
        attachment: customFile ? customFile.name : 'None',
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
          text: lang === 'np' ? '✓ Email sent successfully' : '✓ Email sent successfully'
        });
        setTimeout(() => {
          onClose();
        }, 2200);
      } else {
        // Fallback mailto or simulated failure message
        setStatus({
          type: 'error',
          text: lang === 'np' ? '✕ Failed to send email. Please try again.' : '✕ Failed to send email. Please try again.'
        });
      }
    } catch (err) {
      // In case of offline or CORS restrictions, provide clear status
      setStatus({
        type: 'error',
        text: lang === 'np' ? '✕ Failed to send email. Please try again.' : '✕ Failed to send email. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="email-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="email-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="email-modal-header">
          <div className="email-modal-title-wrap">
            <div className="email-modal-icon-badge">
              <Mail size={16} />
            </div>
            <div>
              <h3 className="email-modal-title">
                {lang === 'np' ? 'इमेल पठाउनुहोस्' : 'Send Email'}
              </h3>
              <p className="email-modal-subtitle">
                {lang === 'np' ? 'आधिकारिक इमेल पत्राचार फारम' : 'Dispatch Message Email Gateway'}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="email-modal-close-btn"
            onClick={onClose}
            aria-label="Close Email Modal"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSendEmail} className="email-modal-body">
          {/* Status Alert */}
          {status.text && (
            <div className={`email-status-banner ${status.type}`}>
              {status.type === 'success' ? (
                <CheckCircle2 size={16} className="status-icon success" />
              ) : (
                <AlertCircle size={16} className="status-icon error" />
              )}
              <span>{status.text}</span>
            </div>
          )}

          {/* To Field */}
          <div className="email-field-group">
            <label className="email-field-label">
              <span>{lang === 'np' ? 'प्रापक (To):' : 'To:'}</span>
            </label>
            <div className="email-recipient-box">
              <span className="recipient-pill">
                <Mail size={12} />
                <span>{toEmail}</span>
              </span>
              <span className="recipient-badge">
                {lang === 'np' ? 'आधिकारिक ठेगाना' : 'Official Inbox'}
              </span>
            </div>
          </div>

          {/* Sender Email / Name (Optional Context) */}
          <div className="email-field-row-dual">
            <div className="email-field-group">
              <label htmlFor="email-sender-name" className="email-field-label">
                {lang === 'np' ? 'प्रेषकको नाम:' : 'Your Name:'}
              </label>
              <input
                type="text"
                id="email-sender-name"
                className="email-form-input"
                placeholder={lang === 'np' ? 'पूरा नाम' : 'Full Name'}
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
              />
            </div>

            <div className="email-field-group">
              <label htmlFor="email-sender-address" className="email-field-label">
                {lang === 'np' ? 'प्रेषकको इमेल:' : 'Your Email:'}
              </label>
              <input
                type="email"
                id="email-sender-address"
                className="email-form-input"
                placeholder="you@example.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="email-field-group">
            <label htmlFor="email-subject-input" className="email-field-label">
              <span>{lang === 'np' ? 'विषय (Subject):' : 'Subject:'}</span>
            </label>
            <input
              type="text"
              id="email-subject-input"
              className="email-form-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={lang === 'np' ? 'इमेलको विषय...' : 'Subject of correspondence...'}
              required
            />
          </div>

          {/* Message Field */}
          <div className="email-field-group">
            <label htmlFor="email-message-textarea" className="email-field-label">
              <span>{lang === 'np' ? 'सन्देश (Message):' : 'Message:'}</span>
            </label>
            <textarea
              id="email-message-textarea"
              className="email-form-textarea"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={lang === 'np' ? 'तपाईंको सन्देश...' : 'Type your dispatch message...'}
              required
            />
          </div>

          {/* Attachment Field (Optional custom file only, no auto-attached CV) */}
          <div className="email-attachment-box">
            <div className="attachment-header">
              <span className="attachment-label">
                <Paperclip size={13} />
                <span>{lang === 'np' ? 'कागजात संलग्न गर्नुहोस् (ऐच्छिक):' : 'Attach Document (Optional):'}</span>
              </span>
              <label className="upload-custom-link">
                <span>{lang === 'np' ? 'फाइल छान्नुहोस्' : 'Choose File'}</span>
                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
              </label>
            </div>

            {customFile && (
              <div className="attachment-pill">
                <FileText size={14} className="attachment-file-icon" />
                <span className="attachment-file-name">{customFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'inline-flex', alignItems: 'center', marginLeft: 'auto', padding: '2px' }}
                  title={lang === 'np' ? 'हटाउनुहोस्' : 'Remove file'}
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>

          {/* Security Note */}
          <div className="email-security-note">
            <ShieldCheck size={13} />
            <span>
              {lang === 'np'
                ? 'सुरक्षित सर्भर-साइड इन्क्रिप्सन मार्फत सिधै saugatrajbaral@gmail.com मा पठाइन्छ।'
                : 'Secure server-side delivery directly to saugatrajbaral@gmail.com without exposed credentials.'}
            </span>
          </div>

          {/* Footer Action Buttons */}
          <div className="email-modal-actions">
            <button
              type="button"
              className="email-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {lang === 'np' ? 'रद्द गर्नुहोस्' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="email-send-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="email-spinner" />
                  <span>{lang === 'np' ? 'पठाउँदै...' : 'Sending...'}</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>{lang === 'np' ? 'इमेल पठाउनुहोस्' : 'Send Email'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
