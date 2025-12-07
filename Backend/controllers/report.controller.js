import { Reports } from "../modules/user.Report.js";

export const createReports = async (req, res) => {
  const { title, summary, tags, content, userId, status } = req.body;

  try {
    const report = new Reports({
      title,
      summary: summary || "",
      tags: tags,
      content: content || "",
      userId,
      status: status || "draft",
    });

    await report.save();

    res.status(201).json({
      success: true,
      message: "Report Created successfully",
      report,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getReportByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const reports = await Reports.find({ userId }).sort({ updatedAt: -1 });
    return res.status(200).json({ success: true, reports });
  } catch (error) {
    console.log("Error", error);
    return res.status(400).json({ success: false });
  }
};

export const getPublishedByUserId = async (req, res) => {
  try {
    const publishedReports = await Reports.find({
      status: "published",
    }).sort({ updatedAt: -1 });

    return res.status(200).json({ success: true, publishedReports });
  } catch (error) {
    console.log("Error fetching Published reports: ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDraftsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const drafts = await Reports.find({ userId, status: "draft" });

    return res.status(200).json({ success: true, drafts });
  } catch (error) {
    console.log("Error fetching drafts: ", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const saveDraft = async (req, res) => {
  const { title, summary, tags, content, userId } = req.body;

  try {
    if (!userId || !title) {
      return res.status(400).json({
        success: false,
        message: "Title and User Id is required",
      });
    }

    let draft = await Reports.findOne({ title, userId, status: "draft" });
    if (draft) {
      draft.summary = summary;
      draft.tags = tags;
      draft.content = content;
      await draft.save();

      return res.status(200).json({
        success: true,
        message: "Draft updated successfully",
        draft,
      });
    } else {
      draft = new Reports({
        title,
        summary,
        tags,
        content,
        userId,
        status: "draft",
      });
      await draft.save();

      return res
        .status(201)
        .json({ success: true, message: "Draft created successfully", draft });
    }
  } catch (error) {
    console.log("Error saving draft: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateDraft = async (req, res) => {
  const { draftId } = req.params;
  const { title, summary, tags, content, userId } = req.body;

  try {
    if (!draftId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "DraftId and userId are required" });
    }

    const draft = await Reports.findOne({
      _id: draftId,
      userId,
      status: "draft",
    });

    if (!draft) {
      return res
        .status(404)
        .json({ success: false, message: "Draft not found" });
    }

    draft.title = title;
    draft.summary = summary;
    draft.tags = tags;
    draft.content = content;

    await draft.save();

    res
      .status(200)
      .json({ success: true, message: "Draft updated successfully", draft });
  } catch (error) {
    console.log("Error updating draft:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDraft = async (req, res) => {
  const { userId } = req.params;
  const { draftId } = req.query;

  try {
    if (!draftId || !userId) {
      return res.status(400).json({
        success: false,
        message: "draftId and userId are required",
      });
    }

    const draft = await Reports.deleteOne({
      _id: draftId,
      userId,
    });

    if (!draft) {
      return res
        .status(404)
        .json({ success: false, message: "Draft not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Draft deleted successfully" });
  } catch (error) {
    console.log("Error deleting draft: ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const publishDraft = async (req, res) => {
  const { draftId } = req.params;
  const { userId } = req.query;

  try {
    if (!draftId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Draft and userid are required" });
    }

    const draft = await Reports.findOne({
      _id: draftId,
      userId,
      status: "draft",
    });

    if (!draft) {
      return res
        .status(404)
        .json({ success: false, message: "Draft not found" });
    }

    draft.status = "published";

    await draft.save();

    res
      .status(200)
      .json({ success: true, message: "Draft published Successfully", draft });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const increaseView = async (req, res) => {
  const { reportId } = req.params;
  try {
    if (!reportId) {
      return res
        .status(400)
        .json({ success: false, message: "Report Id not found" });
    }

    const report = await Reports.findOne({ _id: reportId });

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "report not found" });
    }

    report.view += 1;

    await report.save();

    res.status(200).json({ success: true, message: "View updated" });
  } catch (error) {}
};
