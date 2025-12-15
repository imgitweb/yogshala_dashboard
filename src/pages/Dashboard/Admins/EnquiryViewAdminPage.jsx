import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { getEnquiryByIdApi } from "../../../apis/adminApi";
import { showError } from "../../../utils/toastService";

const EnquiryViewAdminPage = () => {
  const { enquiryId } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const res = await getEnquiryByIdApi(enquiryId);
      setEnquiry(res.data || res.enquiry || null);
    } catch (err) {
      showError(err?.message || "Failed to load enquiry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiry();
  }, [enquiryId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-muted animate-pulse">
        Loading enquiry details...
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        Enquiry Not Found
      </div>
    );
  }

  const sessionTypeLabel = {
    online: "Online",
    home: "Home",
    yogaStudio: "Yoga Studio",
  }[enquiry.sessionType] || enquiry.sessionType;

  return (
    <div className="bg-offwhite min-h-screen font-sans">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-800 text-dark">
            Enquiry Details
          </h1>
          <p className="text-muted">
            Complete free session enquiry overview.
          </p>
        </div>

        {/* <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => navigate(`/admin/enquiries/edit/${enquiryId}`)}
        >
          <Edit />
          <span className="text-white">Edit</span>
        </button> */}
      </div>

      {/* Card */}
      <div className="bg-light p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* Top Info */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-800 text-dark">
              {enquiry.fullName}
            </h1>
            <p className="text-muted text-sm">{enquiry.email}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-600 ${
                enquiry.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : enquiry.status === "contacted"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {enquiry.status || "pending"}
            </span>
          </div>
        </div>

        <Section title="Contact Information">
          <Grid>
            <Item label="Full Name" value={enquiry.fullName} />
            <Item label="Email" value={enquiry.email} />
            <Item label="Phone" value={enquiry.phone} />
          </Grid>
        </Section>
        <Divider />

<Section title="Location Information">
  <Grid>
    <Item
      label="State"
      value={enquiry.state || enquiry.location?.state || "—"}
    />
    <Item
      label="City"
      value={enquiry.city || enquiry.location?.city || "—"}
    />
    <Item
      label="Address"
      value={enquiry.address || enquiry.location?.address || "—"}
      full
    />
  </Grid>
</Section>


        <Divider />

        <Section title="Session Details">
          <Grid>
            <Item label="Session Type" value={sessionTypeLabel} />
            <Item label="Session Date" value={enquiry.sessionDate} />
            <Item label="Session Time" value={enquiry.sessionTime} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Message">
          <Grid>
            <Item
              label="User Message"
              value={enquiry.message || "No message provided"}
              full
            />
          </Grid>
        </Section>

        <Divider />

        <Section title="System Information">
          <Grid>
            <Item
              label="Created At"
              value={new Date(enquiry.createdAt).toLocaleString()}
            />
            <Item
              label="Last Updated"
              value={new Date(enquiry.updatedAt).toLocaleString()}
            />
          </Grid>
        </Section>
      </div>
    </div>
  );
};

/* -----------------------------------------------------------
   Helper Components (Same as Member View)
------------------------------------------------------------*/

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-700 text-dark mb-4 border-l-4 border-primary pl-3">
      {title}
    </h2>
    {children}
  </div>
);

const Divider = () => (
  <div className="w-full border-t border-gray-200 my-8" />
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {children}
  </div>
);

const Item = ({ label, value, full }) => (
  <div className={full ? "md:col-span-2" : ""}>
    <div className="text-sm text-muted mb-1">{label}</div>
    <div className="font-600 text-dark bg-gray-50 p-3 rounded-xl border border-gray-200">
      {value}
    </div>
  </div>
);

export default EnquiryViewAdminPage;
