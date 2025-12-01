import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Edit, Eye } from "lucide-react";
import { getMemberByIdApi } from "../../../apis/adminApi";
import { showError } from "../../../utils/toastService";

const MemberViewAdminPage = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const res = await getMemberByIdApi(memberId);
      setMember(res.member || res.data || null);
    } catch (err) {
      showError(err?.message || "Failed to load member");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMember();
  }, [memberId]);


  if (loading) {
    return (
      <div className="p-10 text-center text-lg text-muted animate-pulse">
        Loading member details...
      </div>
    );
  }

  if (!member) {
    return (
      <div className="p-10 text-center text-lg text-red-500">
        Member Not Found
      </div>
    );
  }

  const health = member.health || {};
  const goals = member.goals || {};
  const emergency = member.emergencyContact || {};

  return (
    <div className="bg-offwhite min-h-screen font-sans">

     <div className="mb-8 flex items-center justify-between">
      <div>
          <h1 className="text-3xl font-800 text-dark">{member.fullName} Details</h1>
        <p className="text-muted">
          Complete batch details and structured overview.
        </p>
      </div>

         <button className="btn btn-primary text-end"
            onClick={() => navigate(`/admin/members/edit/${memberId}`)}
         
         >
             <Edit/>  <span className="text-white  ml-2">Edit </span>
               
        </button>
      </div>

      {/* Card */}
      <div className="bg-light p-8 rounded-2xl shadow-lg border border-gray-200 ">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-10">
        <div className="flex items-center gap-6 ">
              {member.profilePicture ? (
            <img
              src={member.profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-2xl object-cover shadow-md border"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center bg-gray-200 rounded-2xl text-3xl font-bold text-gray-500 shadow-inner">
              {member.fullName?.charAt(0)}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-800 text-dark">{member.fullName}</h1>
            <p className="text-muted text-sm">{member.email}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-lg text-sm font-600 ${
                member.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : member.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {member.status}
            </span>
          </div>
        </div>

       

        </div>

        <Section title="Basic Details">
          <Grid>
            <Item label="Full Name" value={member.fullName} />
            <Item label="Email" value={member.email} />
            <Item label="Phone" value={member.phone || "-"} />
            <Item label="Gender" value={member.gender} />
            <Item label="Age" value={member.age} />
            <Item label="Role" value={member.role} />
            <Item label="Occupation" value={member.occupation || "-"} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Health Information">
          <Grid>
            <Item label="Height" value={health.height ? `${health.height} cm` : "-"} />
            <Item label="Weight" value={health.weight ? `${health.weight} kg` : "-"} />
            <Item label="Blood Group" value={health.bloodGroup || "-"} />
            <Item label="Injuries" value={(health.injuries || []).join(", ") || "-"} />
            <Item label="Allergies" value={(health.allergies || []).join(", ") || "-"} />
            <Item label="Medical Conditions" value={(health.medicalConditions || []).join(", ") || "-"} />
          </Grid>
        </Section>

        <Divider />

        <Section title="Fitness Goals">
          <Grid>
            <Item label="Primary Goals" value={(goals.primaryGoals || []).join(", ") || "-"} />
            <Item label="Target Weight" value={goals.targetWeight ? `${goals.targetWeight} kg` : "-"} />
            <Item label="Notes" value={goals.notes || "-"} full />
          </Grid>
        </Section>

        <Divider />

        <Section title="Emergency Contact">
          <Grid>
            <Item label="Name" value={emergency.name || "-"} />
            <Item label="Phone" value={emergency.phone || "-"} />
            <Item label="Relation" value={emergency.relation || "-"} />
          </Grid>
        </Section>

      </div>
    </div>
  );
};

/* -----------------------------------------------------------
   Helper Components
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

export default MemberViewAdminPage;
