import axiosInstance from "./axiosInstance";


export const allowMeeting = async (meetingData) => {
  try {
    const response = await axiosInstance.get("/admin/google/auth-url", meetingData);
    console.log("allowMeeting response:", response.data);
    return response.data; 
  } catch (err) {
    console.error("Failed to allow meeting:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getDashboardStats = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard/stats");
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch dashboard stats:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getTrainersList = async () => {
  try {
    const response = await axiosInstance.get("/admin/trainers");
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch trainers list:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const approveTrainer = async (trainerId) => {
  try {
    const response = await axiosInstance.post(`/admin/trainers/${trainerId}/approve`);
    return response.data; 
  } catch (err) {
    console.error("Failed to approve trainer:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const UpdateTrainerStatus = async (trainerId, status) => {
  try {
    const response = await axiosInstance.put(`/trainers/status/${trainerId}`, status);
    return response.data; 
  } catch (err) {
    console.error("Failed to update trainer status:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}
export const getTrainerById = async (trainerId) => {
  try {
    const response = await axiosInstance.get(`/trainers/${trainerId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch trainer details:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}



export const addStudioAPi = async (studioData) => {
  try {
    const response = await axiosInstance.post("/studio", studioData);
    return response; 
  } catch (err) {
    console.error("Failed to add studio:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}
export const getStudiosList = async () => {
  try {
    const response = await axiosInstance.get("/studio/studios");
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch studios list:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getStudioById = async (studioId) => {
  try {
    const response = await axiosInstance.get(`/studio/studio/${studioId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch studio details:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const updateStudioApi = async (studioId, studioData) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}`, studioData);
    return response.data; 
  } catch (err) {
    console.error("Failed to update studio:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}


// ---------- BASIC INFO ----------
export const updateStudioBasicApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/basic`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update basic info:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- PRICING ----------
export const updateStudioPricingApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/pricing`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update pricing:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- FACILITIES ----------
export const updateStudioFacilitiesApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/facilities`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update facilities:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- OPENING HOURS ----------
export const updateStudioOpeningHoursApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/opening-hours`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update opening hours:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- SOCIAL LINKS ----------
export const updateStudioSocialApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/social`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update social links:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- MEDIA (LOGO + PHOTOS) ----------
export const updateStudioMediaApi = async (studioId, data) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/media`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to update media:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- ADD ADMIN ----------
export const addStudioAdminApi = async (studioId, adminId) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/admins/add`, { adminId });
    return response.data;
  } catch (err) {
    console.error("Failed to add admin:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ---------- REMOVE ADMIN ----------
export const removeStudioAdminApi = async (studioId, adminId) => {
  try {
    const response = await axiosInstance.put(`/studio/studio/${studioId}/admins/remove`, { adminId });
    return response.data;
  } catch (err) {
    console.error("Failed to remove admin:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};



export const deleteStudioApi = async (studioId) => {
  try {
    const response = await axiosInstance.delete(`/studio/studio/${studioId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to delete studio:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}


export const createBatchApi = async (data) => {
  try {
    const res = await axiosInstance.post("/batches/create", data);
    console.log("createBatchApi response:", res.data);
    return res.data;
  } catch (err) {
    const backendError =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to create batch";

    console.error("Failed to create batch:", backendError);

    // Throw a clean error object with message only
    throw new Error(backendError);
  }
};

export const getAllBatchesApi = async () => {
  try {
    const res = await axiosInstance.get("/batches");
    console.log("getAllBatchesApi response:", res.data);
    return res.data;
  } catch (err) {
    const backendError =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to fetch batches";

    console.error("Failed to fetch batches:", backendError);

    // Throw a clean error object with message only
    throw new Error(backendError);
  }
};

export const getBatchlistByStudioApi = async (studioId) => {
  try {
    const res = await axiosInstance.get(`/batches/studio/${studioId}`);
    console.log("getBatchlistApi response:", res.data);
    return res.data;
  } catch (err) {
    const backendError =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to fetch batch list";

    console.error("Failed to fetch batch list:", backendError);

    // Throw a clean error object with message only
    throw new Error(backendError);
  }
};

export const deleteBatchApi = async (batchId) => {
  try {
    const res = await axiosInstance.delete(`/batches/${batchId}`);
    console.log("deleteBatchApi response:", res.data);
    return res.data;
  } catch (err) {
    const backendError =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to delete batch";

    console.error("Failed to delete batch:", backendError);

    // Throw a clean error object with message only
    throw new Error(backendError);
  }
}
export const getBatchByIdApi = async (batchId) => {
  try {
    const res = await axiosInstance.get(`/batches/${batchId}`);
    console.log("getBatchByIdApi response:", res.data);
    return res.data;
  } catch (err) {
    const backendError =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Failed to fetch batch details";

    console.error("Failed to fetch batch details:", backendError);

    // Throw a clean error object with message only
    throw new Error(backendError);
  }
} ;


export const createMemberApi = async (memberData) => {
  try {
    const response = await axiosInstance.post("/member/register", memberData);
    return response.data; 
  } catch (err) {
    console.error("Failed to create member:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}
export const getAllMembersApi = async () => {
  try {
    const response = await axiosInstance.get("/member");
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch members list:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const deleteMemberApi = async (memberId) => {
  try {
    const response = await axiosInstance.delete(`/member/${memberId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to delete member:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getMemberByIdApi = async (memberId) => {
  try {
    const response = await axiosInstance.get(`/member/${memberId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch member details:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const updateMemberApi = async (memberId, memberData) => {
  try {
    const response = await axiosInstance.put(`/member/${memberId}`, memberData);
    return response.data; 
  } catch (err) {
    console.error("Failed to update member:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const addMemberToBatchApi = async (data) => {
  try {
    const response = await axiosInstance.post(`/batch-members/add-member`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to add member to batch:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const batchMemberListApi = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();

    const response = await axiosInstance.get(
      `/batch-members/list${query ? `?${query}` : ""}`
    );

    return response.data;
  } catch (err) {
    console.error("Failed to fetch batch members:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const invoiceListApi = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();

    const response = await axiosInstance.get(
      `/invoices/list${query ? `?${query}` : ""}`
    );

    return response.data;
  } catch (err) {
    console.error("Failed to fetch invoices:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};


export const markInvoicePaidApi = async (data) => {
  try {
    const response = await axiosInstance.post(`/invoices/mark-paid-cash`, data);
    return response.data;
  } catch (err) {
    console.error("Failed to mark invoice as paid:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}


export const renewMemberSubscriptionApi = async (batchMemberId) => {
  try {
    const response = await axiosInstance.post(`/batch-members/renew-subscription/${batchMemberId}`);
    return response.data;
  } catch (err) {
    console.error("Failed to renew member subscription:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}




export const getAllEnquiries = async () => {
  try {
    const response = await axiosInstance.get("/enquiry");
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch members list:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getEnquiryByIdApi = async (enquiryId) => {
  try {
    const response = await axiosInstance.get(`/enquiry/${enquiryId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch enquiry details:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}



export const deleteEnquiryApi = async (enquiryId) => {
  try {
    const response = await axiosInstance.delete(`/enquiry/${enquiryId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to delete enquiry:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const addBulkFaqApi = async (faqData) => {
  try {
    const response = await axiosInstance.post("/faqs/bulk-add", faqData);
    return response.data; 
  } catch (err) {
    console.error("Failed to add FAQs:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const getAllFaqsApi = async () => {
  try {
    const response = await axiosInstance.get("/faqs/all" , { cratedAt: -1 });
  
    return response.data; 
  } catch (err) {
    console.error("Failed to fetch FAQs list:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}

export const deleteFaqApi = async (faqId) => {
  try {
    const response = await axiosInstance.delete(`/faqs/delete/${faqId}`);
    return response.data; 
  } catch (err) {
    console.error("Failed to delete FAQ:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
}