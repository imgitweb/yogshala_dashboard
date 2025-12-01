import axiosInstance from "./axiosInstance";

export const addAvailabilitySlot = async (slotData) => {
  try {
    const response = await axiosInstance.post("/trainers/availability", slotData);
    return response.data.data; // availability array
  } catch (error) {
    console.error("Failed to add availability slot:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const editAvailabilitySlot = async ({ dateId, slotId, startTime, endTime }) => {
  try {
    const response = await axiosInstance.put(`/trainers/availability/${dateId}/${slotId}`, {
      startTime,
      endTime,
    });
    return response.data.data; 
  } catch (error) {
    console.error("Failed to edit availability slot:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteAvailabilitySlot = async ({ slotId, dateId }) => {
  try {
    const response = await axiosInstance.delete(
      `/trainers/availability/${slotId}?dateId=${dateId}`
    );
    return response.data.data; // updated availability array
  } catch (error) {
    console.error("Failed to delete availability slot:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
export const updateBankDetails = async (bankData) => {
  try {
    const response = await axiosInstance.put("/trainers/bank", bankData);
    return response.data.data;
  } catch (error) {
    console.error("Failed to update bank details:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
}

export const updatePersonalInfo = async (data) => {
  try {
    const response = await axiosInstance.put("/trainers/personal", data);
    return response.data.data;
  } catch (err) {
    console.error("Failed to update personal info:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const updateProfessionalInfo = async (data) => {
  try {
    const response = await axiosInstance.put("/trainers/professional", data);
    return response.data.data;
  } catch (err) {
    console.error("Failed to update professional info:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const deleteCentre = async (trainerId, centreName) => {
  try {
    const response = await axiosInstance.delete(`/trainers/${trainerId}/centres`, {
      data: { name: centreName },
    });
    return response.data.data; 
  } catch (err) {
    console.error("Failed to delete centre:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const addCentre = async (centreData) => {
  try {
    const response = await axiosInstance.post(`/trainers/centre`, centreData);
    return response.data.data;
  } catch (err) {
    console.error("Failed to add centre:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const getBookings = async () => {
  try {
    const response = await axiosInstance.get("/trainers/bookings");
    return response.data.data; 
  } catch (err) {
    console.error("Failed to get bookings:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get("/trainers/dashboard");
    return response.data.data; 
  } catch (err) {
    console.error("Failed to get dashboard data:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const notifyUserforMeeting = async (email, videoLink, bookingId) => {
  try {
    const response = await axiosInstance.post("/trainers/notify", {
      email,
      videoLink,
      bookingId,
    });
    return response.data.data; 
  } catch (err) {
    console.error("Failed to notify user for meeting:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};


export const updateGallery = async ( photosVideos) => {
  try {
    const response = await axiosInstance.post(`/trainers/upload-gallary-data`, photosVideos,
       { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data; 
  } catch (err) {
    console.error("Failed to update gallery:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};