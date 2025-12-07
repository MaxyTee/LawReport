import express from "express";
import {
  createReports,
  getReportByUserId,
  getDraftsByUserId,
  saveDraft,
  updateDraft,
  deleteDraft,
  publishDraft,
  getPublishedByUserId,
  increaseView,
} from "../controllers/report.controller.js";

const router = express.Router();

router.post("/create-reports", createReports);
router.get("/user-report/:userId", getReportByUserId);
router.get("/published", getPublishedByUserId);
router.get("/user-draft/:userId", getDraftsByUserId);
router.post("/user-draft/save", saveDraft);
router.put("/user-draft/:draftId", updateDraft);
router.delete("/user-draft/:userId", deleteDraft);
router.post("/user-draft/:draftId", publishDraft);
router.get("/view-report/:reportId", increaseView);

export default router;
