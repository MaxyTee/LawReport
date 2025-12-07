import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailVerificationPage.css";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, verifyEmail } = useAuthStore();

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findIndex((digit) => digit === "");
      const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    } else {
      // Handle single digit input
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if current input is filled
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const verificationCode = code.join("");

    try {
      await verifyEmail(verificationCode);
      navigate("/dashboard");
      toast.success("Email verified successfully");
    } catch {
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    try {
      const email = localStorage.getItem("buklaw_verification_email");

      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend verification code");
      }

      setCountdown(60);
    } catch (error) {
      console.log(error);
    }
  };

  const clearOtp = () => {
    setCode(["", "", "", "", "", ""]);

    inputRefs.current[0]?.focus();
  };

  // Auto-submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "") && !isLoading) {
      handleSubmit();
    }
  }, [code]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="email-verification-page">
      {/* BUKLawReport Background */}
      <div
        className="verification-background"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.9), rgba(40, 53, 147, 0.9)), url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)`,
        }}
      >
        <div className="verification-container">
          {/* BUKLawReport Card */}
          <div className="verification-card">
            {/* Header */}
            <div className="verification-header">
              <div className="verification-logo">
                <h2>BUKLawReport</h2>
                <span className="verification-tagline">Legal Insights</span>
              </div>
              <h1 className="verification-title">Verify Your Email</h1>
              <p className="verification-subtitle">
                Enter the 6-digit verification code sent to your email address
                to access your legal research dashboard
              </p>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="verification-form">
              <div className="otp-section">
                <label className="otp-label">6-Digit Verification Code</label>
                <div className="otp-container">
                  <div className="otp-inputs">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="6"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="otp-input"
                        autoComplete="one-time-code"
                        disabled={isLoading}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={clearOtp}
                    className="clear-otp-btn"
                    disabled={isLoading}
                  >
                    Clear Code
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="verify-button"
                disabled={isLoading || code.some((digit) => digit === "")}
              >
                {isLoading ? (
                  <>
                    <div className="button-spinner"></div>
                    Verifying...
                  </>
                ) : (
                  "Verify Email & Continue"
                )}
              </button>
            </form>

            <div className="verification-help">
              <div className="help-section">
                <h4>Need help with verification?</h4>
                <ul>
                  <li>Check your spam folder if you don't see the email</li>
                  <li>
                    Ensure you entered the correct email address during
                    registration
                  </li>
                  <li>The verification code expires in 10 minutes</li>
                  <li>Contact legal support if you continue having issues</li>
                </ul>
              </div>

              <div className="resend-section">
                <p>Didn't receive the code?</p>
                <button
                  type="button"
                  className="resend-button"
                  onClick={handleResendCode}
                  disabled={isLoading || countdown > 0}
                >
                  {countdown > 0
                    ? `Resend available in ${countdown}s`
                    : "Resend Verification Code"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
