import React, { useState } from "react";
import "./Login.css";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();
  const { login, signup, SignupError, LoginError, isLoading } = useAuthStore();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = `${formData.firstName} ${formData.lastName}`;

    if (!isLogin) {
      try {
        await signup(formData.email, formData.password, name);
        navigate("/verify-email");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }

    console.log("Login successful! Welcome to BUKLawReport");
    // Then you'd normally redirect to dashboard

    // navigate("/dashboard");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className="login-page">
      {/* Background Image */}
      <div
        className="login-background"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(40, 53, 147, 0.8)), url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)`,
        }}
      >
        <div className="login-container">
          {/* Login Card */}
          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <div className="login-logo">
                <h2>BUKLawReport</h2>
                <span className="login-tagline">Legal Insights</span>
              </div>
              <h1 className="login-title">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="login-subtitle">
                {isLogin
                  ? "Sign in to access your legal research dashboard"
                  : "Join our community of legal professionals"}
              </p>
            </div>

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="name-fields">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
              )}
              {/* {error && <p>{error}</p>} */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              )}
              {LoginError && <p className="error">{LoginError}</p>}
              {SignupError && <p className="error">{SignupError}</p>}

              {isLogin && (
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#forgot-password" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLogin
                  ? `${isLoading ? <Loader size={24} /> : "Sign In"}`
                  : `${isLoading ? <Loader size={24} /> : "Create Account"}`}
              </button>
            </form>

            {/* Switch Mode */}
            <div className="switch-mode">
              <p>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  className="switch-button"
                  onClick={toggleMode}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
