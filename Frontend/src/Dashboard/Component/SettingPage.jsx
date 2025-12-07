import React, { useState } from "react";
import {
  Save,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Moon,
  Sun,
  Trash2,
  Download,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordPayload, setPasswordPayload] = useState({
    newPassword: "",
    currentPassword: "",
  });

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordPayload((prev) => ({ ...prev, [name]: value }));
  };

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    reports: true,
    updates: false,
  });
  const [theme, setTheme] = useState("light");
  const { settingPassword, user } = useAuthStore();

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handlePassword = async () => {
    try {
      await settingPassword(user._id, passwordPayload.newPassword);
      setPasswordPayload({
        currentPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings-page">
      {/* Account Settings */}
      <div className="content-section">
        <div className="section-header">
          <div>
            <h3>
              <Shield size={20} /> Account Security
            </h3>
            <p className="section-description">
              Manage your password and security settings
            </p>
          </div>
        </div>

        <div className="settings-form">
          <div className="form-group">
            <label>
              <Lock size={16} /> Current Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordPayload.currentPassword}
                onChange={(e) => handleChangePassword(e)}
                className="form-input"
                placeholder="Enter current password"
              />
              <button
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>
                <Lock size={16} /> New Password
              </label>
              <input
                type="password"
                value={passwordPayload.newPassword}
                name="newPassword"
                onChange={(e) => handleChangePassword(e)}
                className="form-input"
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>
                <Lock size={16} /> Confirm Password
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button onClick={handlePassword} className="btn btn-primary">
            <Save size={16} />
            Update Password
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="content-section">
        <div className="section-header">
          <div>
            <h3>
              <Bell size={20} /> Notification Preferences
            </h3>
            <p className="section-description">
              Choose how you want to be notified
            </p>
          </div>
        </div>

        <div className="settings-list">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Email Notifications</h4>
              <p>Receive updates via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleNotificationToggle("email")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Push Notifications</h4>
              <p>Get push notifications on your device</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => handleNotificationToggle("push")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>Report Updates</h4>
              <p>Notify when reports are published</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.reports}
                onChange={() => handleNotificationToggle("reports")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <h4>System Updates</h4>
              <p>Get notified about system updates</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.updates}
                onChange={() => handleNotificationToggle("updates")}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="content-section">
        <div className="section-header">
          <div>
            <h3>
              <Globe size={20} /> Appearance
            </h3>
            <p className="section-description">
              Customize your dashboard appearance
            </p>
          </div>
        </div>

        <div className="theme-selector">
          <button
            className={`theme-option ${theme === "light" ? "active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <Sun size={24} />
            <span>Light</span>
          </button>
          <button
            className={`theme-option ${theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <Moon size={24} />
            <span>Dark</span>
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="content-section danger-zone">
        <div className="section-header">
          <div>
            <h3>
              <Trash2 size={20} /> Danger Zone
            </h3>
            <p className="section-description">Irreversible actions</p>
          </div>
        </div>

        <div className="danger-actions">
          <div className="danger-item">
            <div>
              <h4>Export Data</h4>
              <p>Download all your data in JSON format</p>
            </div>
            <button className="btn btn-secondary">
              <Download size={16} />
              Export
            </button>
          </div>

          <div className="danger-item">
            <div>
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all data</p>
            </div>
            <button className="btn btn-danger">
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
