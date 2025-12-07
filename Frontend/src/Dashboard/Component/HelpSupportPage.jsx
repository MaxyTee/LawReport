// Help & Support Page Component
import React, { useState } from "react";
import {
  User,
  Mail,
  HelpCircle,
  MessageSquare,
  Book,
  FileText,
  Send,
  ExternalLink,
} from "lucide-react";

export const HelpSupportPage = () => {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [message, setMessage] = useState("");

  const categories = [
    { id: "getting-started", label: "Getting Started", icon: Book },
    { id: "features", label: "Features", icon: FileText },
    { id: "account", label: "Account", icon: User },
    { id: "troubleshooting", label: "Troubleshooting", icon: HelpCircle },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "How do I create my first report?",
        answer:
          'Click on the "New Report" button in the dashboard, fill in the required information, and click "Publish" when ready.',
      },
      {
        question: "What file formats are supported?",
        answer: "We support PDF, DOCX, and TXT formats for document uploads.",
      },
    ],
    features: [
      {
        question: "How do I search for reports?",
        answer:
          "Use the search bar at the top of the dashboard to search by title, keywords, or content.",
      },
      {
        question: "Can I collaborate with team members?",
        answer:
          "Yes, you can invite team members and assign different roles and permissions.",
      },
    ],
    account: [
      {
        question: "How do I change my password?",
        answer:
          "Go to Settings > Account Security and follow the password reset process.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          'Navigate to your Profile page and click the "Edit Profile" button.',
      },
    ],
    troubleshooting: [
      {
        question: "I forgot my password",
        answer:
          'Click on "Forgot Password" on the login page and follow the email instructions.',
      },
      {
        question: "Reports are not loading",
        answer:
          "Try refreshing the page or clearing your browser cache. Contact support if the issue persists.",
      },
    ],
  };

  const handleSubmit = () => {
    console.log("Message sent:", message);
    setMessage("");
    alert("Thank you for contacting us! We will respond within 24 hours.");
  };

  return (
    <div className="help-support-page">
      {/* Quick Help Cards */}
      <div className="quick-help-grid">
        <div className="help-card">
          <div className="help-card-icon">
            <Book size={24} />
          </div>
          <h3>Documentation</h3>
          <p>Browse our comprehensive guides and tutorials</p>
          <button className="btn-link">
            Read Docs <ExternalLink size={14} />
          </button>
        </div>

        <div className="help-card">
          <div className="help-card-icon">
            <MessageSquare size={24} />
          </div>
          <h3>Live Chat</h3>
          <p>Chat with our support team in real-time</p>
          <button className="btn-link">
            Start Chat <ExternalLink size={14} />
          </button>
        </div>

        <div className="help-card">
          <div className="help-card-icon">
            <Mail size={24} />
          </div>
          <h3>Email Support</h3>
          <p>Send us an email and we'll respond soon</p>
          <button className="btn-link">
            Send Email <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="content-section">
        <h3>Frequently Asked Questions</h3>

        <div className="faq-container">
          <div className="faq-categories">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`faq-category-btn ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <cat.icon size={18} />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="faq-content">
            {faqs[activeCategory]?.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="content-section">
        <h3>Still Need Help?</h3>
        <p className="section-description">
          Send us a message and our team will get back to you
        </p>

        <div className="contact-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="form-input"
              placeholder="How can we help?"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-textarea"
              rows={6}
              placeholder="Describe your issue or question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            <Send size={16} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
