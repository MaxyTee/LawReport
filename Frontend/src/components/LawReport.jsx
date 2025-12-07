import React from "react";
import "./LawReport.css";

// Image URLs - Replace these with your actual images
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  digitalPrivacy:
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  environment:
    "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  propertyLaw:
    "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  corporateLaw:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
};

const LawReport = () => {
  return (
    <div className="law-report">
      {/* Hero Section with Background Image */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.7), rgba(40, 53, 147, 0.7)), url(${IMAGES.hero})`,
        }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Navigating the Complexities of Law</h1>
          <button className="cta-button">Read Latest Report</button>
        </div>
      </section>

      <div className="main-content-grid">
        {/* Left Column - Latest News & Analysis */}
        <div className="left-column">
          {/* Latest News Section */}
          <section className="news-section">
            <h2 className="section-title">Latest News</h2>
            <div className="news-items">
              <div className="news-item">
                <div className="news-image-container">
                  <img
                    src={IMAGES.digitalPrivacy}
                    alt="Digital Privacy"
                    className="news-image"
                  />
                </div>
                <div className="news-content">
                  <h3 className="news-title">Court Rules on Digital Privacy</h3>
                  <p className="news-date">November 15, 2024</p>
                  <p className="news-description">
                    Landmark decision establishes new precedents for data
                    protection and individual privacy rights in the digital age.
                  </p>
                </div>
              </div>

              <div className="news-item">
                <div className="news-image-container">
                  <img
                    src={IMAGES.environment}
                    alt="Environmental Regulations"
                    className="news-image"
                  />
                </div>
                <div className="news-content">
                  <h3 className="news-title">
                    New Environmental Regulations Passed
                  </h3>
                  <p className="news-date">November 12, 2024</p>
                  <p className="news-description">
                    Comprehensive environmental legislation introduces stricter
                    compliance requirements for corporations and industries.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Analysis Section */}
          <section className="analysis-section">
            <h2 className="section-title">Featured Analysis</h2>
            <div className="analysis-items">
              <div className="analysis-item">
                <div className="analysis-icon">🤖</div>
                <div className="analysis-content">
                  <h4>AI in Law: Opportunities & Challenges</h4>
                  <p>
                    Exploring the impact of artificial intelligence on legal
                    practices, ethical considerations, and the future of legal
                    services.
                  </p>
                </div>
              </div>
              <div className="analysis-item">
                <div className="analysis-icon">🌿</div>
                <div className="analysis-content">
                  <h4>New Environmental Regulations</h4>
                  <p>
                    Comprehensive breakdown of recent environmental legislation
                    and its implications for businesses across sectors.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Case Studies */}
        <div className="right-column">
          <section className="case-studies-section">
            <h2 className="section-title">Case Studies</h2>
            <div className="case-studies">
              <div className="case-study">
                <div className="case-image-container">
                  <img
                    src={IMAGES.propertyLaw}
                    alt="Property Law Case Study"
                    className="case-image"
                  />
                </div>
                <div className="case-content">
                  <h3 className="case-title">
                    Landmark Property Dispute Uncovered
                  </h3>
                  <p className="case-description">
                    In-depth analysis of the recent Supreme Court ruling that
                    redefines property rights in the digital age and its
                    implications for future cases.
                  </p>
                  <div className="case-meta">
                    <span className="case-tag">Property Law</span>
                    <span className="case-read-time">15 min read</span>
                  </div>
                  <button className="case-button">Read Case Study</button>
                </div>
              </div>

              <div className="case-study">
                <div className="case-image-container">
                  <img
                    src={IMAGES.corporateLaw}
                    alt="Corporate Law Case Study"
                    className="case-image"
                  />
                </div>
                <div className="case-content">
                  <h3 className="case-title">Corporate Compliance Framework</h3>
                  <p className="case-description">
                    Examination of new compliance requirements and best
                    practices for multinational corporations operating in
                    regulated industries.
                  </p>
                  <div className="case-meta">
                    <span className="case-tag">Corporate Law</span>
                    <span className="case-read-time">12 min read</span>
                  </div>
                  <button className="case-button">Read Case Study</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LawReport;
