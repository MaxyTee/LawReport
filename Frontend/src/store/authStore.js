import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  SignupError: "",
  LoginError: "",
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({
        SignupError: error?.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      console.log(error);
      console.log(error?.response?.data?.message);
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isoading: true, SignupError: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        password,
        email,
      });
      set({
        user: response.data.user,
        LoginError: null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
      set({
        LoginError: error?.response?.data?.message || "Error logining in",
        isLoading: false,
      });
      return {
        errorMsg: error?.response?.data?.message,
      };
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.log("Error: ", error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  sendResetPasswordLink: async (email) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/forget-password`, {
        email,
      });

      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
      }

      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Error sending reset email link",
      });
    }
  },

  sendFrogetPassword: async (password, token) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });

      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
      }

      set({ isLoading: false, error: null });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Sending forget password",
        isLoading: false,
      });
    }
  },
  settingPassword: async (userId, newPassword) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(
        `${API_URL}/setting-password/${userId}`,
        {
          newPassword,
        }
      );

      if (!response.data.success) {
        set({ isLoading: false, error: response.data.message });
      }

      set({ isLoading: false, error: null });
      toast.success(response.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error Sending forget password",
        isLoading: false,
      });
    }
  },
}));
