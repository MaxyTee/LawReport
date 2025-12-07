import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Edit3,
  Save,
  X,
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
  Upload,
  Camera,
  HelpCircle,
  MessageSquare,
  Book,
  FileText,
  Send,
  ExternalLink,
} from "lucide-react";

// Profile Page Component
export const ProfilePage = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    organization: user?.organization || "",
    bio: user?.bio || "",
    role: user?.role || "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* Profile Header Card */}
      <div className="content-section">
        <div className="profile-header">
          <div className="profile-banner"></div>
          <div className="profile-info-section">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-large">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <button className="avatar-edit-btn">
                <Camera size={16} />
              </button>
            </div>
            <div className="profile-info-text">
              <h2>{user?.name || "User Name"}</h2>
              <p className="profile-role">
                {user?.role === "admin" ? "Administrator" : "Legal Reader"}
              </p>
              <div className="profile-stats">
                <div className="stat-item">
                  <strong>24</strong>
                  <span>Reports</span>
                </div>
                <div className="stat-item">
                  <strong>156</strong>
                  <span>Views</span>
                </div>
                <div className="stat-item">
                  <strong>89</strong>
                  <span>Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="content-section profile-details-card">
        <div className="section-header">
          <h3>Profile Information</h3>
          {!isEditing ? (
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="btn-group">
              <button className="btn btn-primary" onClick={handleSave}>
                <Save size={16} />
                Save Changes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-form">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <User size={16} /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>
                <Mail size={16} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>
                <Building size={16} /> Organization
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                disabled={!isEditing}
                className="form-input"
                placeholder="Enter organization"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <FileText size={16} /> Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-textarea"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Account Activity */}
      <div className="content-section">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">
              <FileText size={16} />
            </div>
            <div className="activity-content">
              <p>
                <strong>Published a new report</strong>
              </p>
              <span>2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Download size={16} />
            </div>
            <div className="activity-content">
              <p>
                <strong>Downloaded "Legal Framework Report"</strong>
              </p>
              <span>5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">
              <Edit3 size={16} />
            </div>
            <div className="activity-content">
              <p>
                <strong>Updated profile information</strong>
              </p>
              <span>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
