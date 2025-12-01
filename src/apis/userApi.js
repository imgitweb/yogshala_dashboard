import axiosInstance from "./axiosInstance";

const getActiveTrainers = async () => {
  try {
    const response = await axiosInstance.get("/students/active-trainers");
    console.log("Active trainers response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch active trainers:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
const updateStudentProfile = async (studentId, data) => {
  try {
    const response = await axiosInstance.put(`/students/student/${studentId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to update student profile:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const dashboardStats = async (studentId) => {
  try {
    const response = await axiosInstance.get(`/students/dashboard-stats`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const getMyBookings = async () => {
  try {
    const response = await axiosInstance.get(`/students/my-bookings`);
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch my bookings:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const InitializeBooking = async (bookingData) => {
  try {
    const response = await axiosInstance.post(`/payment/initiate`, bookingData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to initialize booking:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

const verifyBooking = async (paymentData) => {
  try {
    const response = await axiosInstance.post(`/payment/verify`, paymentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to verify booking:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export { getActiveTrainers, updateStudentProfile, dashboardStats , getMyBookings , InitializeBooking , verifyBooking};