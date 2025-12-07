// components/SearchReports.js
import React, { useState, useMemo } from "react";
import { Search, Filter, Download, Eye } from "lucide-react";

const SearchReports = ({ reports, onPreview, userRole }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredReports = useMemo(() => {
    let filtered = reports.filter(
      (report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter);
    }

    // Sort reports
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else if (sortBy === "oldest") {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [reports, searchTerm, statusFilter, sortBy]);

  return (
    <div className="search-reports">
      <div className="search-header">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search reports by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="search-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            {userRole === "admin" && <option value="draft">Draft</option>}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <h3>Found {filteredReports.length} reports</h3>
        </div>

        <div className="results-grid">
          {filteredReports.map((report) => (
            <div key={report._id} className="search-result-card">
              <div className="result-content">
                <h4>{report.title}</h4>
                <p className="result-summary">{report.summary}</p>
                <div className="result-tags">
                  {report.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="result-meta">
                  <span className={`status status-${report.status}`}>
                    {report.status}
                  </span>
                  <span className="date">
                    Updated: {new Date(report.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="result-actions">
                <button className="icon-btn" onClick={() => onPreview(report)}>
                  <Eye size={16} />
                </button>
                <button className="icon-btn">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="no-results">
            <Search size={48} />
            <h3>No reports found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchReports;
