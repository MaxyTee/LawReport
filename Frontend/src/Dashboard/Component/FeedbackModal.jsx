import { useState } from "react";
import { useFeedbackStore } from "../../store/feedbackStore";
import toast from "react-hot-toast";

const FeedbackModal = ({ report, isOpen, onClose }) => {
  console.log("report", report);
  const [feedback, setFeedback] = useState("");
  const { isLoading, error, createFeedback } = useFeedbackStore();
  if (!isOpen) return null;

  const handleSubmit = async () => {
    onClose();
    console.log(feedback);
    try {
      const payload = { feedback, reportId: report._id };
      await createFeedback(payload);
    } catch (error) {
      console.log(error);
      toast.error("Feedback failed. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Report Feedback</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <h3>{report?.title}</h3>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here..."
            rows={6}
          />

          <button className="submit-btn" onClick={handleSubmit}>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
