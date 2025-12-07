import React from "react";
import {
  X,
  FileText,
  Download,
  Tag,
  Calendar,
  ChevronRight,
} from "lucide-react";

const ReportPreviewModal = ({ report, isOpen, onClose }) => {
  if (!isOpen || !report) return null;

  const handleDownload = () => {
    const content = `
LAW REPORT
==========
Title: ${report.title || "Untitled Report"}
Tags: ${report.tags || "No tags"}
Created: ${report.createdAt || "Not specified"}
Status: ${report.status || "Not specified"}

SUMMARY
-------
${report.summary || "No summary available"}

CONTENT
-------
${report.content || "No content available"}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `law-report-${
      report.title?.toLowerCase().replace(/\s+/g, "-") || "report"
    }.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header - Responsive */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px",
            borderBottom: "1px solid #e5e7eb",
            backgroundColor: "#f8fafc",
          }}
        >
          {/* Top row: Title and Close */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flex: 1,
              }}
            >
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#eff6ff",
                  borderRadius: "6px",
                  flexShrink: 0,
                }}
              >
                <FileText
                  style={{ width: "24px", height: "24px", color: "#3b82f6" }}
                />
              </div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1f2937",
                  margin: 0,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  flex: 1,
                }}
              >
                {report.title || "Untitled Report"}
              </h2>
            </div>

            <button
              onClick={onClose}
              style={{
                padding: "8px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                borderRadius: "6px",
                color: "#6b7280",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Close"
            >
              <X style={{ width: "20px", height: "20px" }} />
            </button>
          </div>

          {/* Second row: Tags and Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {/* Tags */}
            {report.tags && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "14px",
                  flex: 1,
                  minWidth: "min-content",
                }}
              >
                <Tag
                  style={{
                    width: "16px",
                    height: "16px",
                    color: "#6b7280",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: "#3b82f6",
                    backgroundColor: "#eff6ff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "200px",
                  }}
                >
                  {report.tags}
                </span>
              </div>
            )}

            {/* Download button - changes on mobile */}
            <button
              onClick={handleDownload}
              style={{
                padding: "8px 16px",
                border: "none",
                backgroundColor: "#10b981",
                color: "white",
                cursor: "pointer",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              title="Download Report"
            >
              <Download style={{ width: "16px", height: "16px" }} />
              <span
                style={{ display: window.innerWidth < 480 ? "none" : "inline" }}
              >
                Download
              </span>
            </button>
          </div>
        </div>

        {/* Content - Responsive */}
        <div
          style={{
            padding: "16px",
            overflowY: "auto",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Quick Info Bar - Responsive grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "12px",
              padding: "12px",
              backgroundColor: "#f8fafc",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
            }}
          >
            {report.status && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "2px",
                  }}
                >
                  Status
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color:
                      report.status === "published"
                        ? "#10b981"
                        : report.status === "draft"
                        ? "#f59e0b"
                        : "#6b7280",
                    fontWeight: 500,
                  }}
                >
                  {report.status}
                </span>
              </div>
            )}

            {report.createdAt && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "2px",
                  }}
                >
                  Created
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#1f2937",
                    fontWeight: 500,
                  }}
                >
                  {formatDate(report.createdAt)}
                </span>
              </div>
            )}

            {/* Reference number - Only show if there's space */}
            {report.content?.match(/\d+\w+/) && window.innerWidth > 480 && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginBottom: "2px",
                  }}
                >
                  Reference
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#1f2937",
                    fontWeight: 500,
                    fontFamily: "monospace",
                  }}
                >
                  {report.content.match(/\d+\w+/)[0]}
                </span>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {report.summary && (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#f0f9ff",
                borderRadius: "6px",
                borderLeft: "4px solid #0ea5e9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    padding: "4px",
                    backgroundColor: "#bae6fd",
                    borderRadius: "4px",
                  }}
                >
                  <FileText
                    style={{ width: "16px", height: "16px", color: "#0369a1" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#0369a1",
                    margin: 0,
                  }}
                >
                  Summary
                </h3>
              </div>
              <p
                style={{
                  color: "#0c4a6e",
                  lineHeight: 1.6,
                  margin: 0,
                  fontSize: "14px",
                  wordBreak: "break-word",
                }}
              >
                {report.summary}
              </p>
            </div>
          )}

          {/* Content Section */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#374151",
                  margin: 0,
                }}
              >
                Report Content
              </h3>

              {/* Reference number for mobile */}
              {report.content?.match(/\d+\w+/) && window.innerWidth <= 480 && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    backgroundColor: "#f3f4f6",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  Ref: {report.content.match(/\d+\w+/)[0]}
                </span>
              )}
            </div>

            <div
              style={{
                backgroundColor: "#f9fafb",
                borderRadius: "6px",
                padding: "16px",
                border: "1px solid #e5e7eb",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <pre
                style={{
                  color: "#1f2937",
                  lineHeight: 1.6,
                  margin: 0,
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  fontFamily: "inherit",
                }}
              >
                {report.content || "No content available."}
              </pre>
            </div>
          </div>

          {/* Additional Info for Mobile */}
          {window.innerWidth <= 480 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                borderTop: "1px solid #e5e7eb",
                marginTop: "8px",
              }}
            >
              <button
                onClick={handleDownload}
                style={{
                  padding: "12px 24px",
                  border: "none",
                  backgroundColor: "#10b981",
                  color: "white",
                  cursor: "pointer",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Download style={{ width: "20px", height: "20px" }} />
                Download Full Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewModal;
