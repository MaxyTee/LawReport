import React, { useCallback } from "react";
import "./About.css";

const heroImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDuPnB7YiHBh2L_Mcs3Y2eQVr5HV3g61izqA2je4qQkra6hYMOWlbp8CkSB2SkZmcm9mo7dBQpU6uwATWLXTY9nHsowd3L3f1NWFJzoS6ms16HS5wbwLd8BG1I2IcqnL0tCWnnYKNFeeJcxa5aJ02soNoVZMAGe7UXSE59WJVNb2_5d30qw6Bnvyzs1JT8lF-dbsoa9iWIbAwQSN4JM_Bc9fBwMqA7bLnmsic1M3PC8TFKkK08XZxI6lgrPWVOrOmzxAMLs2MAYQZG5";
const scalesImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDCqqdpgBGI_vUr5yDVxdmmXnFyuq9EocBiYseKU-t9pGI3A6GyeKbMqrx7aEhi0eKsdkUS7rLReEsjEYBMnzRyv5wivnMjtKFDgjYwfvzqOfdDGpkYi7Ncr1L2svL15FJt-pLK1DN23Go8uWwDYHRAbx5KNR93QmFK4QkjYetkbHbM8uVHPI-FCoAnUge35iYbYB9bNTgz8qag4_AU9w_Sngc2vQe5_5MqFjrUZDmPNsj7DcDTfKjt5IBrVbknJfBz5621CvZkER67";
const person1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_K9_Q6tYT5kU69KzNBOhMQj1K3BLOYEwryhD6Xl2f9XSrHWehgi0xuSXYS2kOz8gKs3Im8bKvW3pwpqhwZtCDbI3EjiStgWyPpRf08ydr0q_FnSmnm4_tYDjjNdc0SUvx2nXem7w8CSQHth6akRdyn7ONsnkh_4CBMO6yiKjZ-5LEt_pkypkBm8MEW0LwLVhBG91fTACl57LamzxaZG2VhAIseVYyXAOgx5ur5pXcH-kF0ImUqhkcGnw-b4GmBP4rYharGlG610BY";
const person2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBcBLxMdobOD9-gK1tiEXtu-9JvVbU0JFFGZ2psa4M3NGnn2d6xrMHyd94gCgUPxIzhAJewpywIOziHCHLK2o8AHUm152Gdo2Hhudw2w13FAvq0Lbhtwm1_J_PtmSowOGUwBfbayUTroJTLxin8KVyBVeQye19GgcLNtnWWAm5jFOsZK58P6S5Ye-MQSWc_bwuZ6P6K9d0UQIClb70YmdfXb9-qQWt-HURA28kRK8iDN5Dt__NuPhEAoI5DS0554nDqZLWtjlZHk1xv";
const person3 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAA-WO0GIVpvIlnV8EZwSVOWon1FtibHimZXBDokEkO1XvwQOexWIVtRi3EyCk_TsOcBdWme5HYxgd0IffoEMdoWjPZoCyjlsak5_8E5jOCb5B8lVsriKDiHLZRc7lcXO0AkaI3vnQD2DnAokHvE36Ol6nRBxIuatBHSJQu73oEkxaAsytXAKMUy-20iZV7ih4H39XkEYcptMEHlJIHHYM_4aSYR8sYvColuWYoaNW4lRZ7hTM_eYwwUhkBbDitW4vL2VZiXZCRUGnu";
const person4 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAlKTcr2SppovWCrhqYDgCuUyqOZpO6pA4HXLgodDLT6myxt851_udkb7q8zndzS4oN_WjoRIu1kGFOO3HviFezZRwFbXy92YsOc3vNEkJFi2e7RZcogwR__18IS4tqqqxUywFbnj2wEbfdpyINHVWbcOzRGNSDDrQUAnjo-U65V2tV91QrUQu6seISkYrFH4wAhueSQwclEy2EFdbHF1E5lxDQtemPZmShQQiCa1wYixmuEXuq2y_oHd3n615Dv8gjypVJtYkxfqMQ";

const NAV_LINKS = ["Analysis", "Cases", "Practice Areas", "Reports"];

const STANDARDS = [
  {
    icon: "verified_user",
    title: "Verification",
    body: "Every report undergoes a dual-counsel review to ensure legal terminology and case citations are used with absolute technical accuracy.",
  },
  {
    icon: "balance",
    title: "Neutrality",
    body: "We maintain a strict firewall between our editorial team and corporate interests, delivering unbiased analysis of legislative shifts.",
  },
  {
    icon: "history_edu",
    title: "Continuity",
    body: "Our analyses bridge contemporary rulings with historical precedents, providing a longitudinal view of evolving jurisprudence.",
  },
];

const EXPERTISE = [
  {
    title: "Corporate & Securities",
    body: "Navigating the intricate landscape of global trade, compliance, and institutional governance.",
  },
  {
    title: "Constitutional Law",
    body: "Deep-dive analysis on the fundamental frameworks that shape our societal and legal landscape.",
  },
  {
    title: "Intellectual Property",
    body: "Protecting the integrity of innovation in an increasingly digital and decentralized world.",
  },
];

const TEAM = [
  { photo: person1, name: "Julian Thorne", role: "EDITOR-IN-CHIEF" },
  { photo: person2, name: "Dr. Elena Vance", role: "CHIEF ANALYST" },
  { photo: person3, name: "Marcus Sterling", role: "GENERAL COUNSEL" },
  { photo: person4, name: "Sarah K. Chen", role: "HEAD OF RESEARCH" },
];

function TeamCard({ photo, name, role }) {
  return (
    <div className="ls-team-card">
      <div className="ls-team-photo-wrap">
        <div
          className="ls-team-photo"
          style={{ backgroundImage: `url('${photo}')` }}
        />
      </div>
      <div>
        <h4 className="ls-team-name">{name}</h4>
        <p className="ls-team-role">{role}</p>
      </div>
    </div>
  );
}

export default function About() {
  //   const handleSubscribe = useCallback(() => {
  //     console.log("Subscribe clicked");
  //   }, []);

  return (
    <div className="ls-root">
      {/* Top Nav */}

      <main>
        {/* Hero */}
        <section className="ls-hero">
          <div className="ls-hero-bg-wrap">
            <div
              className="ls-hero-bg"
              style={{ backgroundImage: `url('${heroImg}')` }}
            />
            <div
              className="hero-overlay"
              style={{ position: "absolute", inset: 0 }}
            />
          </div>
          <div className="ls-hero-content">
            <p className="ls-eyebrow">ESTABLISHED 1924</p>
            <h1 className="ls-hero-title">Defining the Modern Legal Record</h1>
            <p className="ls-hero-sub">
              Lex Scripta provides institutional reporting and rigorous analysis
              for the global legal community, bridging the gap between
              historical precedent and future practice.
            </p>
          </div>
        </section>

        {/* Mission & History */}
        <section className="ls-section container-max">
          <div className="ls-mission-grid">
            <div className="ls-mission-left">
              <h2 className="ls-label">EDITORIAL MISSION</h2>
              <p className="ls-mission-headline">
                Precision in reporting. Rigor in analysis. Clarity in law.
              </p>
            </div>
            <div className="ls-mission-right">
              <p className="ls-body-lg">
                For over a century, Lex Scripta has served as the definitive
                source for legal insights and institutional reporting. We
                believe that the law is not just a set of rules, but a living
                dialogue that requires meticulous documentation and critical
                examination.
              </p>
              <div className="ls-stats-grid">
                <div className="ls-stat">
                  <span className="ls-stat-number">100+</span>
                  <span className="ls-stat-label">YEARS OF RECORD</span>
                </div>
                <div className="ls-stat">
                  <span className="ls-stat-number">40k</span>
                  <span className="ls-stat-label">PRECEDENT ANALYSES</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="ls-section ls-section-alt">
          <div className="container-max">
            <div className="ls-standards-heading">
              <h2>Editorial Standards</h2>
              <p>
                Our commitment to truth is upheld by a rigorous three-tier
                verification process and a strict adherence to non-partisan
                reporting.
              </p>
            </div>
            <div className="ls-standards-grid">
              {STANDARDS.map((s) => (
                <div className="ls-standard-card" key={s.title}>
                  <div className="ls-standard-icon">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Expertise */}
        <section className="ls-section container-max">
          <div className="ls-expertise-grid">
            <div className="ls-expertise-text">
              <h2 className="ls-expertise-eyebrow">OUR EXPERTISE</h2>
              <h3 className="ls-expertise-title">Deciphering Complexity.</h3>
              <div className="ls-expertise-list">
                {EXPERTISE.map((e) => (
                  <div
                    className="ls-expertise-item editorial-rule"
                    key={e.title}
                  >
                    <h4>{e.title}</h4>
                    <p>{e.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="ls-expertise-image-wrap">
              <div className="ls-expertise-image-inner">
                <div
                  className="ls-expertise-image"
                  style={{ backgroundImage: `url('${scalesImg}')` }}
                />
                <div className="ls-quote-card">
                  <p>&ldquo;Lex est dictamen rationis.&rdquo;</p>
                  <p className="ls-quote-attribution">
                    — The law is the dictate of reason.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="ls-section ls-section-alt">
          <div className="container-max">
            <div className="ls-leadership-header">
              <div className="ls-leadership-header-text">
                <h2>Leadership</h2>
                <p>
                  Led by an board of former jurists, veteran legal analysts, and
                  investigative journalists.
                </p>
              </div>
              <button className="ls-outline-btn">
                View All Editorial Board
              </button>
            </div>
            <div className="ls-team-grid">
              {TEAM.map((member) => (
                <TeamCard key={member.name} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ls-section ls-cta-section container-max">
          <div className="ls-cta-box">
            <h2>Join the Institutional Record.</h2>
            <p>
              Support high-stakes legal journalism. Gain full access to our
              historical archives and daily intelligence reports.
            </p>
            <div className="ls-cta-buttons">
              <button className="ls-btn-white">Explore Subscriptions</button>
              <button className="ls-btn-outline-white">
                Corporate Inquiries
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="ls-footer">
        <div className="ls-footer-grid container-max">
          <div className="ls-footer-brand">
            <div className="ls-footer-logo">Lex Scripta</div>
            <p className="ls-footer-copy">
              © 2024 Lex Scripta. All rights reserved. Institutional Legal
              Reporting.
            </p>
          </div>
          <div className="ls-footer-links">
            <div className="ls-footer-col">
              <span className="ls-footer-col-title">RESOURCES</span>
              <a href="#">Editorial Policy</a>
              <a href="#">Archive</a>
            </div>
            <div className="ls-footer-col">
              <span className="ls-footer-col-title">LEGAL</span>
              <a href="#">Terms of Service</a>
              <a href="#">Privacy</a>
            </div>
            <div className="ls-footer-col">
              <span className="ls-footer-col-title">CONTACT</span>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
