import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import { reportStore } from "../store/reportStore";
import "./Dashboard.css";
import {
  ChevronDown,
  LogOut,
  FileText,
  Plus,
  Search,
  BarChart3,
  LayoutTemplate,
  Clock,
  Star,
  Library,
  Zap,
  Download,
  Eye,
  Edit3,
  MoreVertical,
  User,
  Shield,
  Trash,
  Check,
  Home,
  TrendingUp,
  Menu,
  Sun,
  Moon,
  Scale,
  Users,
  Settings,
  HelpCircle,
  Loader,
} from "lucide-react";
import Create from "./Component/Create";
import ReportPreviewModal from "./Component/ReportPreViewModal";
import axios from "axios";
import { formatDate } from "../utils/formatDate";
import { ProfilePage } from "./Component/ProfilePage";
import { SettingsPage } from "./Component/SettingPage";
import { HelpSupportPage } from "./Component/HelpSupportPage";

const ReportCard = ({
  title,
  summary,
  status,
  lastEdited,
  onPreview,
  onEdit,
  onDelete,
  userRole,
  onPublish,
  theme,
  deleting,
  publish,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "published":
        return theme === "dark" ? "#059669" : "#10b981";
      case "draft":
        return theme === "dark" ? "#d97706" : "#f59e0b";
      default:
        return theme === "dark" ? "#4b5563" : "#6b7280";
    }
  };

  return (
    <div className="report-card">
      <div className="card-main">
        <div className="card-header">
          <div
            className="card-badge"
            style={{ backgroundColor: getStatusColor(status) }}
          >
            {status}
          </div>
          <div className="card-actions">
            <button className="icon-btn" onClick={onPreview}>
              <Eye size={16} />
            </button>
            {userRole === "admin" && (
              <button className="icon-btn" onClick={onEdit}>
                <Edit3 size={16} />
              </button>
            )}
            <div className="dropdown-container">
              {userRole === "admin" && (
                <button
                  className="icon-btn"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <MoreVertical size={16} />
                </button>
              )}
              {menuOpen && (
                <div className="dropdown-menu">
                  {userRole === "admin" && status === "draft" && (
                    <button className="dropdown-item" onClick={onPublish}>
                      {publish ? (
                        <Loader size={16} className="loading" />
                      ) : (
                        <Check size={14} />
                      )}
                      Publish
                    </button>
                  )}
                  {userRole === "admin" && (
                    <button className="dropdown-item danger" onClick={onDelete}>
                      {deleting ? (
                        <Loader size={16} className="loading" />
                      ) : (
                        <Trash size={14} />
                      )}
                      Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="card-icon">
            <FileText size={24} />
          </div>
          <h3 className="card-title">{title}</h3>
          <p className="card-summary">{summary}</p>
        </div>

        <div className="card-footer">
          <div className="card-meta">
            <div className="meta-item">
              <Clock size={14} />
              <span>{lastEdited}</span>
            </div>
            <div className="meta-item">
              <Users size={14} />
              <span>Legal Team</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, number, label, trend, color, theme }) => {
  const isPositive = trend?.includes("+");

  return (
    <div className="stat-card">
      <div className="stat-main">
        <div className="stat-content">
          <div className="stat-number">{number}</div>
          <div className="stat-label">{label}</div>
          {trend && (
            <div
              className={`stat-trend ${isPositive ? "positive" : "negative"}`}
            >
              {trend}
            </div>
          )}
        </div>
        <div className="stat-icon" style={{ backgroundColor: color }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

const QuickAction = ({ icon: Icon, label, onClick, color }) => {
  return (
    <button className="quick-action-btn" onClick={onClick}>
      <div className="action-content">
        <div className="action-icon" style={{ backgroundColor: color }}>
          <Icon size={20} />
        </div>
        <span>{label}</span>
      </div>
    </button>
  );
};

const Dashboard = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("overview");
  const [deleting, setDeleting] = useState(false);
  const [publish, setPublish] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchReport, setSearchReport] = useState([]);

  console.log(searchReport);

  const { user, logout } = useAuthStore();
  const {
    getReportByUserId,
    getDraftsByUserId,
    getAllPublishedReports,
    reports = [],
    publishedReports = [],
    deleteDraft,
    publishDraft,
    totalView,
    totalPublishView,
  } = reportStore();

  const handleInputChange = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (user.role === "admin") {
      const search = reports.filter(
        (report) =>
          report.title.toLowerCase().includes(searchName.toLowerCase()) ||
          report.content.toLowerCase().includes(searchName.toLowerCase())
      );
      setSearchReport(search);
    } else {
      const search = publishedReports.filter(
        (report) =>
          report.title.toLowerCase().includes(searchName.toLowerCase()) ||
          report.content.toLowerCase().includes(searchName.toLowerCase())
      );
      setSearchReport(search);
    }
  }, [searchName, reports, publishedReports]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("dashboard-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("dashboard-theme", newTheme);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user.role === "admin") {
        await getReportByUserId(user._id);
        await getDraftsByUserId(user._id);
      } else {
        await getAllPublishedReports(user._id);
      }
    };
    fetchData();
  }, [
    getReportByUserId,
    getDraftsByUserId,
    getAllPublishedReports,
    user._id,
    user.role,
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) setSidebarOpen(false);
  };

  const handleDelete = async (reportId, reportUserId) => {
    setDeleting(true);
    console.log(deleting);
    try {
      await deleteDraft(reportId, reportUserId);
      toast.success("Deleted Successfully!");
      setDeleting(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setDeleting(false);
    }
  };

  const handlePublish = async (reportId, reportUserId) => {
    setPublish(true);
    try {
      await publishDraft(reportId, reportUserId);
      toast.success("Published Successfully!");
      setPublish(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setPublish(false);
    }
  };

  const handlePreview = async (reportId) => {
    console.log(reportId);
    try {
      setPreviewModalOpen(true);
      reportStore.setState({
        totalPublishView: totalPublishView + 1,
        totalView: totalView + 1,
      });
      await axios.get(
        `http://localhost:4000/api/userReport/view-report/${reportId}`
      );

      return;
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getStats = () => {
    const blueColors = {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#3b82f6",
      light: "#60a5fa",
    };

    if (user.role === "admin") {
      return [
        {
          icon: FileText,
          number: reports?.length || "0",
          label: "Total Reports",
          color: blueColors.primary,
        },
        {
          icon: BarChart3,
          number: reports?.filter((r) => r.status === "draft").length || "0",
          label: "Drafts",
          color: blueColors.accent,
        },
        {
          icon: Download,
          number: "156",
          label: "Downloads",
          color: blueColors.secondary,
        },
        {
          icon: Eye,
          number: totalView || totalPublishView || 0,
          label: "Views",
          color: blueColors.light,
        },
      ];
    } else {
      return [
        {
          icon: FileText,
          number: publishedReports?.length || "0",
          label: "Available Reports",
          color: blueColors.primary,
        },
        {
          icon: Download,
          number: "156",
          label: "Your Downloads",
          color: blueColors.secondary,
        },
        {
          icon: Eye,
          number: totalPublishView || 0,
          label: "Total Views",
          color: blueColors.accent,
        },
        {
          icon: Star,
          number: "23",
          label: "Saved Reports",
          color: blueColors.light,
        },
      ];
    }
  };

  const getQuickActions = () => {
    const blueColors = {
      primary: "#2563eb",
      secondary: "#1d4ed8",
      accent: "#3b82f6",
      light: "#60a5fa",
    };

    const baseActions = [
      {
        icon: Library,
        label: "Legal Library",
        onClick: () => console.log("Library"),
        color: blueColors.secondary,
      },
    ];

    if (user.role === "admin") {
      return [
        {
          icon: Plus,
          label: "New Report",
          onClick: () => handleTabChange("create"),
          color: blueColors.accent,
        },
        ...baseActions,
      ];
    } else {
      return baseActions;
    }
  };

  const getNavItems = () => {
    const baseItems = [
      { key: "overview", icon: Home, label: "Overview" },
      { key: "reports", icon: FileText, label: "Reports" },
    ];

    if (user.role === "admin") {
      return [
        ...baseItems,
        { key: "create", icon: Plus, label: "Create" },
        { key: "templates", icon: LayoutTemplate, label: "Templates" },
        { key: "analytics", icon: TrendingUp, label: "Analytics" },
      ];
    } else {
      return baseItems;
    }
  };

  const getDisplayReports = () => {
    if (activeTab === "search" || activeTab === "overview") {
      return user.role === "admin" ? reports || [] : publishedReports || [];
    } else if (activeTab === "reports") {
      return reports || [];
    }
    return [];
  };

  const displayReports = getDisplayReports();
  const stats = getStats();
  const quickActions = getQuickActions();
  const navItems = getNavItems();

  return (
    <div className="dashboard" data-theme={theme}>
      <ReportPreviewModal
        report={selectedReport}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        canEdit={user.role === "admin"}
      />

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="brand">
              <div className="brand-logo">
                <Scale size={28} />
              </div>
              <div className="brand-text">
                <h1>BUKLawReport</h1>
                <span>Legal Intelligence Platform</span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <button className="icon-btn theme-toggle" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="user-menu">
              <button
                className="user-profile"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="user-avatar">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="user-info">
                  <strong>{user?.name || "User"}</strong>
                  <span>
                    {user.role === "admin" ? "Administrator" : "Legal Reader"}
                  </span>
                </div>
                <ChevronDown size={16} />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown">
                  <button
                    onClick={() => handleTabChange("profile")}
                    className="dropdown-item"
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleTabChange("settings")}
                    className="dropdown-item"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => handleTabChange("supportPage")}
                    className="dropdown-item"
                  >
                    <HelpCircle size={16} />
                    <span>Help & Support</span>
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={logout}>
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={`nav-item ${activeTab === item.key ? "active" : ""}`}
                onClick={() => handleTabChange(item.key)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="actions-grid">
                {quickActions.map((action, index) => (
                  <QuickAction key={index} {...action} />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* This is the changing content */}

        {/* Main Content */}
        <main className="main-content2">
          {/* <Outlet /> */}

          {/* Page Header */}
          <div className="page-header">
            <div className="page-title-section">
              <h1>
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "create" && "Create Legal Report"}
                {activeTab === "reports" &&
                  `${user.role === "admin" ? "My reports" : "All reports"}`}
                {activeTab === "templates" && "Report Templates"}
                {activeTab === "analytics" && "Analytics"}
              </h1>
              <p>
                {activeTab === "overview" &&
                  `Welcome back, ${user.name || "User"}! ${
                    user.role === "admin"
                      ? "Manage your legal reports and analytics."
                      : "Browse and search legal documentation."
                  }`}
                {activeTab === "create" &&
                  "Create comprehensive legal reports with our professional tools"}
                {activeTab === "reports" &&
                  "Manage and organize your legal reports"}
                {activeTab === "templates" &&
                  "Choose from professional legal templates"}
                {activeTab === "analytics" &&
                  "Track performance and engagement metrics"}
              </p>
            </div>

            {activeTab === "reports" && user.role === "admin" && (
              <button
                className="primary-btn"
                onClick={() => handleTabChange("create")}
              >
                <Plus size={20} />
                New Report
              </button>
            )}
          </div>

          {/* Content Sections */}
          <div className="content-sections">
            {activeTab === "overview" && (
              <>
                {/* Stats Section */}
                <section className="stats-section">
                  <div className="stats-grid">
                    {stats.map((stat, index) => (
                      <StatCard key={index} {...stat} theme={theme} />
                    ))}
                  </div>
                </section>

                {/* Recent Reports */}
                <section className="reports-section">
                  <div className="section-header">
                    <h2>Recent Reports</h2>
                    <button
                      className="text-btn"
                      onClick={() => handleTabChange("reports")}
                    >
                      View All
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div className="reports-grid">
                    {displayReports.slice(0, 4).map((report, index) => (
                      <ReportCard
                        key={report._id || index}
                        title={report.title}
                        summary={report.summary}
                        status={report.status}
                        lastEdited={formatDate(report.updatedAt)}
                        userRole={user.role}
                        theme={theme}
                        deleting={deleting}
                        publish={publish}
                        onPreview={() => {
                          `${
                            user.role === "admin"
                              ? setPreviewModalOpen(true)
                              : handlePreview(report._id)
                          }`;

                          setSelectedReport(report);
                        }}
                        onEdit={() => {
                          setSelectedReport(report);
                          handleTabChange("create");
                        }}
                        onDelete={() => handleDelete(report._id, report.userId)}
                        onPublish={() =>
                          handlePublish(report._id, report.userId)
                        }
                      />
                    ))}
                  </div>
                </section>

                {/* Quick Actions & Tips */}
                <div className="grid-layout">
                  <section className="actions-section">
                    <h2>Quick Actions</h2>
                    <div className="actions-grid-large">
                      {quickActions.map((action, index) => (
                        <QuickAction key={index} {...action} />
                      ))}
                    </div>
                  </section>

                  <section className="tips-section">
                    <h2>Productivity Tips</h2>
                    <div className="tips-list">
                      <div className="tip-item">
                        <Zap size={20} />
                        <div>
                          <h4>Use Templates</h4>
                          <p>Save time with pre-built legal templates</p>
                        </div>
                      </div>
                      <div className="tip-item">
                        <Star size={20} />
                        <div>
                          <h4>Bookmark Important</h4>
                          <p>Star frequently used reports</p>
                        </div>
                      </div>
                      <div className="tip-item">
                        <Clock size={20} />
                        <div>
                          <h4>Auto-save</h4>
                          <p>Your work is saved automatically</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            )}

            {/* Other Tabs */}
            {activeTab === "reports" && (
              <div>
                <div className="search-container">
                  <Search size={20} />
                  <input
                    type="text"
                    name={searchName}
                    onChange={handleInputChange}
                    placeholder="Search reports, cases, or documents..."
                    className="search-input"
                  />
                </div>
                <div className="reports-grid">
                  {searchName
                    ? searchReport.map((report) => (
                        <ReportCard
                          key={report._id}
                          title={report.title}
                          summary={report.summary}
                          status={report.status}
                          lastEdited={formatDate(report.updatedAt)}
                          userRole={user.role}
                          theme={theme}
                          onPreview={() => {
                            setSelectedReport(report);
                            setPreviewModalOpen(true);
                          }}
                        />
                      ))
                    : publishedReports.slice().map((report, index) => (
                        <ReportCard
                          key={report._id || index}
                          title={report.title}
                          summary={report.summary}
                          status={report.status}
                          lastEdited={formatDate(report.updatedAt)}
                          userRole={user.role}
                          theme={theme}
                          onPreview={() => {
                            setSelectedReport(report);
                            handlePreview(report._id);
                          }}
                          onEdit={() => {
                            setSelectedReport(report);
                            handleTabChange("create");
                          }}
                          onDelete={() =>
                            deleteDraft(report._id, report.userId)
                          }
                          onPublish={() =>
                            publishDraft(report._id, report.userId)
                          }
                        />
                      ))}
                </div>
              </div>
            )}

            {activeTab === "reports" && user.role === "admin" && (
              <section className="reports-section-full">
                <div className="section-header">
                  <h2>All Reports</h2>
                </div>

                <div className="reports-grid-full">
                  {searchName
                    ? searchReport.map((report) => (
                        <ReportCard
                          key={report._id}
                          title={report.title}
                          summary={report.summary}
                          status={report.status}
                          lastEdited={formatDate(report.updatedAt)}
                          userRole={user.role}
                          theme={theme}
                          onPreview={() => {
                            setSelectedReport(report);
                            setPreviewModalOpen(true);
                          }}
                        />
                      ))
                    : displayReports.map((report) => (
                        <ReportCard
                          key={report._id || index}
                          title={report.title}
                          summary={report.summary}
                          status={report.status}
                          lastEdited={formatDate(report.updatedAt)}
                          userRole={user.role}
                          theme={theme}
                          deleting={deleting}
                          publish={publish}
                          onPreview={() => {
                            setSelectedReport(report);
                            setPreviewModalOpen(true);
                          }}
                          onEdit={() => {
                            setSelectedReport(report);
                            handleTabChange("create");
                          }}
                          onDelete={() =>
                            handleDelete(report._id, report.userId)
                          }
                          onPublish={() =>
                            handlePublish(report._id, report.userId)
                          }
                        />
                      ))}
                </div>
              </section>
            )}

            {activeTab === "profile" && <ProfilePage user={user} />}
            {activeTab === "settings" && <SettingsPage />}
            {activeTab === "supportPage" && <HelpSupportPage />}

            {activeTab === "create" && user.role === "admin" && (
              <Create {...selectedReport} />
            )}

            {activeTab === "create" && user.role !== "admin" && (
              <div className="access-denied">
                <Shield size={48} />
                <h2>Access Denied</h2>
                <p>Administrator privileges required to create reports.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
