// src/api/authApi.js
import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data.data.user;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getActiveTrainers = async () => {
  try {
    const response = await axiosInstance.get("/auth/active-trainers");
    console.log("Active trainers response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch active trainers:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getTrainerById = async (trainerId) => {
  try {
    const response = await axiosInstance.get(`/auth/trainer/${trainerId}`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch trainer by ID:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const sendOtp = async (email) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password/send-otp", { email });
    return response.data.message;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password/reset-password", { email, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const contactUs = async (formData) => {
  try {
    const response = await axiosInstance.post("/contact", formData);
    return response.data.message;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

export const bookFreeSession = async (sessionData) => {
  try {
    const response = await axiosInstance.post("/enquiry/book-free-session", sessionData);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}