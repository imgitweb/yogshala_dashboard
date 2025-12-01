// src/pages/Dashboard/Admins/TrainerDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  Globe,
  Check,
  X,
  User,
  MapPin,
  Star,
} from "lucide-react";

import StatusBadge from "../../../components/common/StatusBadge";
import { getTrainerById, UpdateTrainerStatus } from "../../../apis/adminApi";
import { showError, showSuccess } from "../../../utils/toastService";

const TrainerDetailsPage = () => {
  const { trainerId } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------
         Fetch Trainer Details
  ------------------------------------- */
  const fetchTrainer = async () => {
    try {
      setLoading(true);
      const res = await getTrainerById(trainerId);
      setTrainer(res.data?.trainer);
    } catch (err) {
      showError("Failed to load trainer details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  /* -------------------------------------
         Approve / Reject
  ------------------------------------- */
  const handleApprove = async () => {
    try {
      await UpdateTrainerStatus(trainerId, { status: "Approved" });
      setTrainer((p) => ({ ...p, status: "Approved" }));
      showSuccess("Trainer approved");
    } catch (err) {
      showError("Failed to approve trainer");
    }
  };

  const handleReject = async () => {
    try {
      await UpdateTrainerStatus(trainerId, { status: "Rejected" });
      setTrainer((p) => ({ ...p, status: "Rejected" }));
      showSuccess("Trainer rejected");
    } catch (err) {
      showError("Failed to reject trainer");
    }
  };

  if (loading || !trainer) {
    return <p className="p-10 text-center text-lg">Loading...</p>;
  }

  const placeholderImg =
    "https://via.placeholder.com/150/eeeeee/aaaaaa?text=No+Image";

  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      <h1 className="text-2xl font-800 text-dark mb-1">Trainer Details</h1>
      <p className="text-muted mb-6">View trainer profile & verification data.</p>

      <div className="bg-white rounded-2xl shadow-sm border border-light p-6">

        {/* -------------------------------------
                Basic Info
        ------------------------------------- */}
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-6">

          <div className="flex gap-4">
            <img
              src={trainer.profilePicture || placeholderImg}
              alt={trainer.fullName}
              className="w-24 h-24 rounded-full object-cover border"
            />

            <div className="space-y-1">
              <h2 className="text-xl font-700">
                {trainer.fullName || "—"}
              </h2>

              <p className="flex items-center gap-2 text-dark">
                <Mail size={16} /> {trainer.email || "Not provided"}
              </p>

              <p className="flex items-center gap-2 text-dark">
                <Phone size={16} /> {trainer.phone || "Not provided"}
              </p>

              <StatusBadge
                status={(trainer.status || "pending").toLowerCase()}
                colorMap={{
                  approved: { bg: "bg-green-100", text: "text-green-800" },
                  pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
                  rejected: { bg: "bg-red-100", text: "text-red-800" },
                }}
              />
            </div>
          </div>

          <div className="flex gap-3 h-fit">
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={handleApprove}
            >
              <Check size={18} /> Approve
            </button>

            <button
              className="btn btn-outline flex items-center gap-2 text-red"
              onClick={handleReject}
            >
              <X size={18} /> Reject
            </button>
          </div>
        </div>

        {/* -------------------------------------
                Bio
        ------------------------------------- */}
        <div className="mb-10">
          <h3 className="font-700 text-dark mb-2">Bio</h3>
          <p className="text-dark bg-offwhite border border-light rounded-xl p-4">
            {trainer.bio || "No bio provided"}
          </p>
        </div>

        {/* -------------------------------------
                Ratings
        ------------------------------------- */}
        <div className="mb-10 flex items-center gap-2">
          <Star size={18} className="text-primary" />
          <span className="font-700">
            {(trainer.averageRating || 0).toFixed(1)} / 5
          </span>
          <span className="text-muted text-sm">
            ({trainer.totalReviews || 0} reviews)
          </span>
        </div>

        {/* -------------------------------------
                Experience, Languages, Specializations
        ------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div>
            <h3 className="font-700 text-dark mb-2">Experience</h3>
            <p className="bg-offwhite p-3 rounded-lg border">
              {trainer.experienceYears || 0} years
            </p>
          </div>

          <div>
            <h3 className="font-700 text-dark mb-2">Languages</h3>
            <p className="bg-offwhite p-3 rounded-lg border">
              {trainer.languages?.length
                ? trainer.languages.join(", ")
                : "No languages added"}
            </p>
          </div>

          <div>
            <h3 className="font-700 text-dark mb-2">Specializations</h3>
            <p className="bg-offwhite p-3 rounded-lg border">
              {trainer.specializations?.length
                ? trainer.specializations.join(", ")
                : "No specializations added"}
            </p>
          </div>
        </div>

        {/* -------------------------------------
                Location
        ------------------------------------- */}
        <div className="mb-10">
          <h3 className="font-700 text-dark flex items-center gap-2 mb-2">
            <MapPin size={18} /> Location
          </h3>
          <p className="bg-offwhite p-3 rounded-lg border">
            {trainer.location?.city || "—"},{" "}
            {trainer.location?.state || "—"},{" "}
            {trainer.location?.country || "—"}
          </p>
        </div>

        {/* -------------------------------------
                Social Links
        ------------------------------------- */}
        <div className="mb-10">
          <h3 className="font-700 text-dark mb-2">Social Profiles</h3>

          {trainer.socialLinks?.length ? (
            trainer.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <strong>{link.platform || "Platform"}:</strong>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline break-all"
                >
                  {link.url}
                </a>
              </div>
            ))
          ) : (
            <p className="text-muted">No social links available</p>
          )}
        </div>

        {/* -------------------------------------
                Certifications
        ------------------------------------- */}
        <div className="mb-10">
          <h3 className="font-700 text-dark mb-2">Certifications</h3>

          {trainer.certifications?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trainer.certifications.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-32 rounded-lg object-cover border"
                  alt="certification"
                />
              ))}
            </div>
          ) : (
            <p className="text-muted">No certifications uploaded</p>
          )}
        </div>

        {/* -------------------------------------
                Gallery
        ------------------------------------- */}
        <div className="mb-10">
          <h3 className="font-700 text-dark mb-2">Gallery</h3>

          {trainer.photosVideos?.photos?.length ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trainer.photosVideos.photos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-32 rounded-lg object-cover border"
                  alt="gallery"
                />
              ))}
            </div>
          ) : (
            <p className="text-muted">No photos uploaded</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default TrainerDetailsPage;
