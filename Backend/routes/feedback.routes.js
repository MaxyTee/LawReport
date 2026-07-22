import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createFeedback,
  getReportFeedback,
} from "../controllers/feedback.controller.js";
const router = express.Router();

router.post("/createFeedback", verifyToken, createFeedback);
router.post("/getFeedback:reportId", verifyToken, getReportFeedback);

export default router;
