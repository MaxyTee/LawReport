// components/VerificationEmail.jsx
import React from "react";
import dotenv from "dotenv";

dotenv.config();

export const VERIFICATION_EMAIL_TEMPLATE = ({ verificationToken, name }) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - BUKLawReport</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8fafc;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            font-family: 'Playfair Display', serif;
        }
        
        .tagline {
            font-size: 1rem;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .email-content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 1.5rem;
            color: #1a237e;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .message {
            color: #5d6d7e;
            margin-bottom: 30px;
            font-size: 1rem;
            line-height: 1.7;
        }
        
        .verification-box {
            background: #f8f9fa;
            border: 2px dashed #e8eaf6;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 30px 0;
        }
        
        .verification-code {
            font-size: 2.5rem;
            font-weight: 700;
            color: #1a237e;
            letter-spacing: 8px;
            margin: 20px 0;
            font-family: 'Monaco', 'Consolas', monospace;
        }
        
        .verification-button {
            display: inline-block;
            background: #1a237e;
            color: white;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
            margin: 20px 0;
            transition: all 0.3s ease;
        }
        
        .verification-button:hover {
            background: #283593;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
        }
        
        .verification-link {
            word-break: break-all;
            color: #1a237e;
            text-decoration: none;
            font-weight: 500;
        }
        
        .help-text {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-top: 20px;
            line-height: 1.5;
        }
        
        .security-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin: 25px 0;
            color: #856404;
            font-size: 0.9rem;
        }
        
        .steps {
            margin: 25px 0;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .step-number {
            background: #1a237e;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: 600;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-text {
            color: #5d6d7e;
            line-height: 1.5;
        }
        
        .email-footer {
            background: #1e293b;
            color: #cbd5e1;
            padding: 30px;
            text-align: center;
            font-size: 0.9rem;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-links a {
            color: #e8eaf6;
            text-decoration: none;
            margin: 0 10px;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .copyright {
            margin-top: 20px;
            color: #94a3b8;
            font-size: 0.8rem;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-header {
                padding: 30px 20px;
            }
            
            .email-content {
                padding: 30px 20px;
            }
            
            .verification-code {
                font-size: 2rem;
                letter-spacing: 4px;
            }
            
            .verification-button {
                padding: 12px 30px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="logo">BUKLawReport</div>
            <div class="tagline">Legal Excellence & Integrity</div>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <h1 class="greeting">Verify Your Email Address</h1>
            
            <p class="message">
                Hello <strong>${name}</strong>,<br><br>
                Welcome to BUKLawReport! To complete your registration and start accessing 
                our comprehensive legal research platform, please verify your email address.
            </p>
            
            <div class="verification-box">
                <p style="color: #5d6d7e; margin-bottom: 15px;">Your verification code:</p>
                <div class="verification-code" id="verificationCode">
                    ${verificationToken}
                </div>
                <p style="color: #7f8c8d; font-size: 0.9rem;">
                    This code will expire in 24 hours
                </p>
            </div>
            
            
            <div class="security-notice">
                <strong>Security Notice:</strong> This verification link is unique to your account. 
                Do not share it with anyone. BUKLawReport will never ask for your password 
                or verification codes via email.
            </div>
            
            <div class="steps">
                
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-text">Complete your profile setup</div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-text">Start exploring legal cases and creating reports</div>
                </div>
            </div>
            
            <p class="message">
                If you did not create an account with BUKLawReport, please ignore this email 
                or contact our support team if you have concerns.
            </p>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-links">
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Support</a>
            </div>
            <div class="copyright">
                &copy; 2024 BUKLawReport. All rights reserved.<br>
                123 Legal Avenue, Court District, 10001
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

export const WELCOME_EMAIL_TEMPLATE = ({
  name,
  loginLink = "http://localhost:5174/dashboard",
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BUKLawReport - Your Legal Research Platform</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8fafc;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            color: white;
            padding: 50px 30px;
            text-align: center;
            position: relative;
        }
        
        .header-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50%" y="50%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle">⚖️</text></svg>');
        }
        
        .logo {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 10px;
            font-family: 'Playfair Display', serif;
            position: relative;
            z-index: 2;
        }
        
        .tagline {
            font-size: 1.1rem;
            opacity: 0.9;
            font-weight: 400;
            position: relative;
            z-index: 2;
        }
        
        .welcome-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-top: 15px;
            display: inline-block;
            position: relative;
            z-index: 2;
        }
        
        .email-content {
            padding: 50px 30px;
        }
        
        .greeting {
            font-size: 2rem;
            color: #1a237e;
            margin-bottom: 20px;
            font-weight: 300;
            text-align: center;
        }
        
        .welcome-message {
            color: #5d6d7e;
            margin-bottom: 30px;
            font-size: 1.1rem;
            line-height: 1.7;
            text-align: center;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 40px 0;
        }
        
        .feature-card {
            background: #f8f9fa;
            border: 1px solid #e8eaf6;
            border-radius: 10px;
            padding: 25px 20px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            font-size: 2.5rem;
            margin-bottom: 15px;
            display: block;
        }
        
        .feature-title {
            color: #1a237e;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 1rem;
        }
        
        .feature-description {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            border-radius: 12px;
            margin: 40px 0;
        }
        
        .cta-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
            font-weight: 300;
        }
        
        .cta-description {
            opacity: 0.9;
            margin-bottom: 25px;
            font-size: 1rem;
        }
        
        .cta-button {
            display: inline-block;
            background: white;
            color: #1a237e;
            text-decoration: none;
            padding: 15px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        
        .quick-start {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            margin: 40px 0;
        }
        
        .quick-start-title {
            color: #1a237e;
            text-align: center;
            margin-bottom: 25px;
            font-size: 1.3rem;
            font-weight: 600;
        }
        
        .steps {
            display: grid;
            gap: 20px;
        }
        
        .step {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .step-number {
            background: #1a237e;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.9rem;
            flex-shrink: 0;
            margin-top: 2px;
        }
        
        .step-content h4 {
            color: #1e293b;
            margin-bottom: 5px;
            font-size: 1rem;
        }
        
        .step-content p {
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .support-section {
            text-align: center;
            margin: 40px 0 20px;
            padding: 30px;
            background: #e8eaf6;
            border-radius: 10px;
        }
        
        .support-title {
            color: #1a237e;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .support-options {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        
        .support-option {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            color: #5d6d7e;
            font-size: 0.9rem;
        }
        
        .email-footer {
            background: #1e293b;
            color: #cbd5e1;
            padding: 40px 30px;
            text-align: center;
        }
        
        .social-links {
            margin: 25px 0;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #e8eaf6;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .social-link:hover {
            color: white;
        }
        
        .footer-links {
            margin: 20px 0;
        }
        
        .footer-links a {
            color: #94a3b8;
            text-decoration: none;
            margin: 0 12px;
            font-size: 0.9rem;
            transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
            color: white;
        }
        
        .copyright {
            margin-top: 25px;
            color: #64748b;
            font-size: 0.8rem;
            line-height: 1.5;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-header {
                padding: 40px 20px;
            }
            
            .email-content {
                padding: 40px 20px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .greeting {
                font-size: 1.7rem;
            }
            
            .support-options {
                flex-direction: column;
                gap: 20px;
            }
            
            .cta-section {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="header-pattern"></div>
            <div class="logo">BUKLawReport</div>
            <div class="tagline">Legal Excellence & Integrity</div>
            <div class="welcome-badge">Verified Member</div>
        </div>
        
        <!-- Content -->
        <div class="email-content">
            <h1 class="greeting">Welcome to BUKLawReport, ${name}! 🎉</h1>
            
            <p class="welcome-message">
                Your email has been successfully verified, and your professional legal research account is now active. 
                You're now part of a community dedicated to legal excellence and comprehensive case analysis.
            </p>
            
            <!-- Features Grid -->
            <div class="features-grid">
                <div class="feature-card">
                    <span class="feature-icon">🔍</span>
                    <div class="feature-title">Advanced Case Search</div>
                    <div class="feature-description">Access millions of legal cases with intelligent search and filters</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">📊</span>
                    <div class="feature-title">Legal Analytics</div>
                    <div class="feature-description">Track case law developments and legal trends with powerful analytics</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">📝</span>
                    <div class="feature-title">Report Builder</div>
                    <div class="feature-description">Create professional legal reports with our intuitive editor</div>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🔔</span>
                    <div class="feature-title">Smart Alerts</div>
                    <div class="feature-description">Get notified about relevant case updates and legal changes</div>
                </div>
            </div>
            
            <!-- CTA Section -->
            <div class="cta-section">
                <h2 class="cta-title">Start Your Legal Research Journey</h2>
                <p class="cta-description">
                    Access our comprehensive legal database and start building your first case report today
                </p>
                <a href="${loginLink}" class="cta-button">
                    Access Your Dashboard →
                </a>
            </div>
            
            <!-- Quick Start Guide -->
            <div class="quick-start">
                <h3 class="quick-start-title">Get Started in 3 Easy Steps</h3>
                <div class="steps">
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Complete Your Profile</h4>
                            <p>Add your legal specialization and preferences for personalized content</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Explore Case Database</h4>
                            <p>Search for cases by jurisdiction, practice area, or specific legal principles</p>
                        </div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Create Your First Report</h4>
                            <p>Use our professional templates to draft comprehensive legal analysis</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Support Section -->
            <div class="support-section">
                <h3 class="support-title">Need Help Getting Started?</h3>
                <p style="color: #5d6d7e; margin-bottom: 20px;">
                    Our legal support team is here to help you make the most of BUKLawReport
                </p>
                <div class="support-options">
                    <div class="support-option">
                        <strong>📚 Knowledge Base</strong>
                        <span>Detailed guides and tutorials</span>
                    </div>
                    <div class="support-option">
                        <strong>🎥 Video Tutorials</strong>
                        <span>Step-by-step walkthroughs</span>
                    </div>
                    <div class="support-option">
                        <strong>💬 Live Support</strong>
                        <span>Chat with our legal experts</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="email-footer">
            <div class="social-links">
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Legal Community</a>
            </div>
            
            <div class="footer-links">
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Support</a>
                <a href="#">Legal Resources</a>
            </div>
            
            <div class="copyright">
                &copy; 2024 BUKLawReport. All rights reserved.<br>
                Professional Legal Research Platform<br>
                123 Legal Avenue, Court District, 10001<br>
                <small>This email was sent to you as a registered member of BUKLawReport</small>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Add to your existing emailTemplates.js
export const FORGOT_PASSWORD_EMAIL_TEMPLATE = ({ resetURL, email, name }) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - BUKLawReport</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a237e, #283593);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .tagline {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .verification-code {
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin: 30px 0;
        }
        .code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #1a237e;
            font-family: 'Courier New', monospace;
        }
        .reset-button {
            display: inline-block;
            background: #1a237e;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
        }
        .instructions {
            background: #e3f2fd;
            border-left: 4px solid #1a237e;
            padding: 16px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .security-note {
            background: #fff3e0;
            border: 1px solid #ffb74d;
            border-radius: 6px;
            padding: 12px;
            margin: 20px 0;
            font-size: 12px;
        }
        .alternative-link {
            word-break: break-all;
            background: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            font-size: 12px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">BUKLawReport</div>
            <div class="tagline">Legal Insights & Research</div>
        </div>
        
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${name}</p>
            <p>We received a request to reset your password for your BUKLawReport account. You can reset your password using the link below or the verification code provided.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetURL}" class="reset-button">Reset Your Password</a>
            </div>
            
            <div class="alternative-link">
                <strong>Alternative:</strong> If the button doesn't work, copy and paste this link in your browser:<br>
                ${resetURL}
            </div>
            
            <div class="instructions">
                <strong>Instructions:</strong>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Click the "Reset Your Password" button above</li>
                    <li>Create your new password</li>
                    <li>Sign in with your new password</li>
                </ol>
            </div>
            
            <div class="security-note">
                <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. 
                Your account security is important to us. This link will expire in 1 hour for security reasons.
            </div>
            
            <p>Best regards,<br>The BUKLawReport Team</p>
        </div>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} BUKLawReport. All rights reserved.</p>
            <p>This email was sent to ${email}. Please do not reply to this email.</p>
            <p>
                <a href="${
                  process.env.FRONTEND_URL
                }/privacy-policy" style="color: #666; margin-right: 10px;">Privacy Policy</a>
                <a href="${
                  process.env.FRONTEND_URL
                }/terms-of-service" style="color: #666;">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};

// Add to your emailTemplates.js
export const PASSWORD_RESET_SUCCESS_TEMPLATE = ({ name, timestamp, email }) => {
  const formattedTime = new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful - BUKLawReport</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1a237e, #283593);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .tagline {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px;
        }
        .success-icon {
            text-align: center;
            margin: 20px 0;
        }
        .success-icon div {
            width: 80px;
            height: 80px;
            background: #4caf50;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: white;
        }
        .info-box {
            background: #f8f9fa;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #f0f0f0;
        }
        .info-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .info-label {
            font-weight: 500;
            color: #666;
        }
        .info-value {
            font-weight: 600;
            color: #333;
        }
        .security-tips {
            background: #e8f5e8;
            border-left: 4px solid #4caf50;
            padding: 16px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
        }
        .action-button {
            display: inline-block;
            background: #1a237e;
            color: white;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            font-size: 16px;
        }
        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .support-note {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 6px;
            padding: 12px;
            margin: 20px 0;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">BUKLawReport</div>
            <div class="tagline">Legal Insights & Research</div>
        </div>
        
        <div class="content">
            <div class="success-icon">
                <div>✓</div>
            </div>
            
            <h2 style="text-align: center; color: #4caf50; margin-bottom: 8px;">Password Reset Successful</h2>
            <p style="text-align: center; color: #666; margin-bottom: 30px;">Your password has been successfully updated</p>
            
            <p>Hello ${name},</p>
            <p>This email confirms that your BUKLawReport account password was successfully reset. Your account security is important to us, and we want to make sure this change was authorized by you.</p>
            
            <div class="info-box">
                <div class="info-item">
                    <span class="info-label">Account Email:</span>
                    <span class="info-value">${email}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Reset Completed:</span>
                    <span class="info-value">${formattedTime}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span class="info-value" style="color: #4caf50;">Successfully Updated</span>
                </div>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${
                  process.env.FRONTEND_URL
                }/login" class="action-button">
                    Sign In to Your Account
                </a>
            </div>

            <div class="security-tips">
                <strong>🔒 Security Tips:</strong>
                <ul style="margin: 8px 0; padding-left: 20px;">
                    <li>Use a strong, unique password that you don't use elsewhere</li>
                    <li>Enable two-factor authentication if available</li>
                    <li>Avoid using public computers for sensitive activities</li>
                    <li>Regularly update your password</li>
                </ul>
            </div>

            <div class="support-note">
                <strong>Didn't reset your password?</strong><br>
                If you did not authorize this password reset, please contact our support team immediately at 
                <a href="mailto:support@buklawreport.com" style="color: #1a237e;">support@buklawreport.com</a> 
                so we can help secure your account.
            </div>
            
            <p>Thank you for helping us keep your account secure.</p>
            <p>Best regards,<br><strong>The BUKLawReport Security Team</strong></p>
        </div>
        
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} BUKLawReport. All rights reserved.</p>
            <p>This email was sent to ${email} to confirm important security changes to your account.</p>
            <p>
                <a href="${
                  process.env.FRONTEND_URL
                }/privacy-policy" style="color: #666; margin-right: 10px;">Privacy Policy</a>
                <a href="${
                  process.env.FRONTEND_URL
                }/terms-of-service" style="color: #666;">Terms of Service</a>
            </p>
        </div>
    </div>
</body>
</html>
  `;
};
