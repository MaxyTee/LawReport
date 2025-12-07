import axios from "axios";
import { create } from "zustand";

const REPORT_URL = `${import.meta.env.VITE_API_URL}/userReport`;

export const reportStore = create((set, get) => ({
  reports: [],
  drafts: [],
  totalView: 0,
  totalPublishView: 0,
  publishedReports: [],
  isLoading: false,
  error: null,

  getReportByUserId: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${REPORT_URL}/user-report/${userId}`,
        userId
      );

      if (!response.data.success) {
        set({
          isLoading: false,
          error: response.data.message,
        });
      }

      set({ reports: response.data.reports, isLoading: false });
      const { reports } = get();
      const totalView = reports
        .map((report) => report.view)
        .reduce((acc, view) => acc + view);
      set({ totalView: totalView });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting user report by id",
        isLoading: false,
      });
      throw error;
    }
  },

  getAllPublishedReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${REPORT_URL}/published`);

      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
      }

      set({
        publishedReports: response.data.publishedReports,
        isLoading: false,
      });

      const { publishedReports } = get();
      console.log(publishedReports);

      const totalPublishView = publishedReports
        .map((report) => report.view)
        .reduce((acc, view) => acc + view);

      console.log(totalPublishView);

      set({ totalPublishView: totalPublishView });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting draft ",
        isLoading: false,
      });
      throw error;
    }
  },
  getDraftsByUserId: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${REPORT_URL}/user-draft/${userId}`);

      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
      }

      set({ drafts: response.data.drafts, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting draft ",
        isLoading: false,
      });
      throw error;
    }
  },

  updateDraft: async (payload) => {
    const { draftId, ...payloads } = payload;
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(
        `${REPORT_URL}/user-draft/${draftId}`,
        payloads
      );

      if (!response.data.success) {
        set({
          isLoading: false,
          error: response.data.message,
        });
      }
      set({ isLoading: false });
      const { getReportByUserId } = get();
      getReportByUserId(payload.userId);
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error updating draft",
        isLoading: false,
      });
    }
  },

  deleteDraft: async (draftId, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `${REPORT_URL}/user-draft/${userId}?draftId=${draftId}`
      );

      if (!response.data.success) {
        set({
          isLoading: false,
          error: response.data.message,
        });
      }

      set({ isLoading: false });

      const { getReportByUserId } = get();
      getReportByUserId(userId);
    } catch (error) {
      set({
        error: error.response.data.message || "Error deleting draft",
        isLoading: false,
      });
      throw error;
    }
  },

  publishDraft: async (draftId, userId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${REPORT_URL}/user-draft/${draftId}?userId=${userId}`
      );

      if (!response.data.success) {
        set({
          isLoading: false,
          error: response.data.message,
        });
      }

      set({ isLoading: false });
      const { getReportByUserId } = get();
      getReportByUserId(userId);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error publishing draft",
        isLoading: false,
      });
      throw error;
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  createReport: async (payLoad) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${REPORT_URL}/create-reports`,
        payLoad
      );
      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
        return;
      }

      set({ isLoading: false });

      const { getReportByUserId } = get();
      getReportByUserId(payLoad.userId);
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting report",
        isLoading: false,
      });
      throw error;
    }
  },
}));
