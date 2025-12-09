import React, { useState } from "react";
import { Plus, Eye, Loader, DraftingCompass } from "lucide-react";
import { reportStore } from "../../store/reportStore";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const Create = (reportToEdit) => {
  const { createReport, updateDraft } = reportStore();
  const { user } = useAuthStore();
  const [createLoading, setCreateLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [report, setReport] = useState({
    title: reportToEdit.title || "",
    summary: reportToEdit.summary || "",
    tags: reportToEdit.tags || "",
    content: reportToEdit.content || "",
    status: "draft",
    userId: user._id,
  });

  // console.log(title, summary, tags, content);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    try {
      await createReport({ ...report });
      toast.success("Created Successfully");
      setCreateLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setCreateLoading(false);
    }

    // Reset form

    setReport({
      title: "",
      summary: "",
      tags: "",
      content: "",
      status: "draft",
      userId: user._id,
    });
  };

  const handleSaveDraft = async () => {
    setDraftLoading(true);
    if (
      reportToEdit.title ||
      reportToEdit.summary ||
      reportToEdit.tags ||
      reportToEdit.content ||
      reportToEdit._id
    ) {
      const editPayload = {
        ...report,
        draftId: reportToEdit._id,
      };
      await updateDraft(editPayload);
      setDraftLoading(false);
      toast.success("Draft Updated Successfully");

      setReport({
        title: "",
        summary: "",
        tags: "",
        content: "",
        status: "draft",
        userId: user._id,
      });
      return;
    }

    try {
      await createReport({ ...report, status: "draft" });
      setDraftLoading(false);
      toast.success("Draft Created Successfully");
    } catch (error) {
      console.log(error);
      setDraftLoading(false);
      toast.error("Something went wrong");
    }
    setReport({
      title: "",
      summary: "",
      tags: "",
      content: "",
      status: "draft",
      userId: user._id,
    });
  };

  const handlePreview = () => {
    console.log("Clicked");
  };
  return (
    <div className="create-tab">
      <div className="content-section">
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Report Title</label>
              <input
                type="text"
                name="title"
                value={report.title}
                onChange={handleInputChange}
                placeholder="Enter report title"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Short Summary</label>
              <textarea
                name="summary"
                value={report.summary}
                onChange={handleInputChange}
                placeholder="Brief overview of your report"
                rows="3"
                className="form-textarea"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={report.tags}
              onChange={handleInputChange}
              placeholder="comma-separated tags (contract-law, property-rights)"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Report Content</label>
            <div className="editor-container">
              <div className="editor-header">
                <span>Legal Report Editor</span>
                <div className="editor-actions">
                  <button type="button" className="text-btn">
                    Formatting Help
                  </button>
                </div>
              </div>
              <textarea
                name="content"
                value={report.content}
                onChange={handleInputChange}
                placeholder="Start typing your report here... Supports Markdown formatting, links, images, and code blocks."
                className="content-editor"
                rows="15"
              />
              <div className="editor-footer">
                Supports: Markdown • Links • Images • Code Blocks • Legal
                Citations
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {createLoading ? (
                <Loader size={16} className="loading" />
              ) : (
                <Plus size={18} />
              )}
              Create Report
            </button>
            <button
              type="button"
              onClick={handlePreview}
              className="btn btn-secondary"
            >
              <Eye size={18} />
              Preview
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="btn btn-outline"
            >
              {draftLoading ? (
                <Loader size={16} className="loading" />
              ) : (
                <DraftingCompass size={18} />
              )}
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
