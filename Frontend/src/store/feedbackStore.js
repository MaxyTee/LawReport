import axios from "axios";
import { create } from "zustand";

// import toast from "react-hot-toast";
const API_URL = `${import.meta.env.VITE_API_URL}/userFeedback`;

axios.defaults.withCredentials = true;

export const useFeedbackStore = create((set, get) => ({
  feedback: [],
  isLoading: false,
  error: null,

  createFeedback: async (payLoad) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/createFeedback`, payLoad);

      set({
        user: response.feedback,
        isLoading: true,
        error: response.message,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Error creating feedback",
        isLoading: false,
      });
      throw error;
    }
  },
}));
