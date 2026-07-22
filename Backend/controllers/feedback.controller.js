import { Feedback } from "../modules/feedback.modules.js";

export const createFeedback = async (req, res) => {
  try {
    const { reportId, feedback } = req.body;
    if (!reportId || !feedback) {
      return res.status(400).json({
        success: false,
        message: "Report ID and Feedback are required.",
      });
    }

    const newFeedback = await Feedback.create({
      reportId,
      userId: req.userId,
      feedback,
    });

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Create Feedback Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export const getReportFeedback = async (req, res) => {
  try {
    const { reportId } = req.params;

    const feedback = await Feedback.find({ reportId })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, feedback });
  } catch (error) {
    console.error("Get Feedback Error:", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal sever error." });
  }
};
