import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getBatchByIdApi } from "../../../apis/adminApi";
import { showError } from "../../../utils/toastService";

const BatchViewAdminPage = () => {
  const { batchId: id} = useParams();
  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBatch = async () => {
    try {
      setLoading(true);
      const res = await getBatchByIdApi(id);
      setBatch(res.data);
    } catch (err) {
      showError(err.message || "Failed to load batch details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [id]);

  if (loading)
    return (
      <div className="p-10 text-center text-lg font-600 text-muted">
        Loading batch details...
      </div>
    );

  if (!batch)
    return (
      <div className="p-10 text-center text-red font-600">
        Batch not found.
      </div>
    );

  return (
    <div className="min-h-screen animate-fade-in">


      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-800 text-dark">{batch.batchName} Details</h1>
        <p className="text-muted">
          Complete batch details and structured overview.
        </p>
      </div>

      {/* Glass Card */}
      <div className="bg-light border border-light rounded-2xl p-8 shadow-lg space-y-10">

        {/* Basic Info */}
        <Section title="Basic Details">
          <Grid>
            <Info label="Studio ID" value={batch.studioId} />
            <Info label="Batch Type" value={batch.batchType} />
            <Info label="Level" value={batch.level} />
            <Info label="Intensity" value={batch.difficulty} />
            <Info label="Mode" value={batch.mode} />
            <Info label="Description" value={batch.description || "—"} />
          </Grid>
        </Section>

        {/* Trainers */}
        <Section title="Assigned Trainers">
          <div className="flex flex-wrap gap-2">
            {batch.assignedTrainers.map((t) => (
              <span key={t} className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-500">
                {t}
              </span>
            ))}
          </div>
        </Section>

        {/* Schedule */}
        <Section title="Schedule">
          <Grid>
            <Info label="Days" value={batch.days.join(", ")} />
            <Info label="Time" value={`${batch.startTime} - ${batch.endTime}`} />
            <Info label="Start Date" value={batch.startDate} />
            <Info label="End Date" value={batch.endDate || "—"} />
          </Grid>

          {/* Extra Slots Table */}
          {batch.extraSlots?.length > 0 && (
            <div className="mt-5 border border-light rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-offwhite text-sm font-600 text-dark">
                  <tr>
                    <th className="p-3">Day</th>
                    <th className="p-3">Start</th>
                    <th className="p-3">End</th>
                  </tr>
                </thead>
                <tbody>
                  {batch.extraSlots.map((slot, i) => (
                    <tr key={i} className="border-t border-light">
                      <td className="p-3">{slot.day}</td>
                      <td className="p-3">{slot.start}</td>
                      <td className="p-3">{slot.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        {/* Pricing */}
        <Section title="Pricing & Capacity">
          <Grid>
            <Info label="Price" value={`₹${batch.price}`} />
            <Info label="Capacity" value={batch.capacity} />
          </Grid>
        </Section>

        {/* Location */}
        <Section title="Location / Meeting">
          <Grid>
            <Info label="Room" value={batch.roomName || "—"} />
            <Info label="Meeting Link" value={batch.meetingLink || "—"} />
          </Grid>
        </Section>

        {/* Tags */}
        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            {batch.tags.length ? (
              batch.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-primary-light/20 text-primary font-500 rounded-lg">
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-muted">No tags added</p>
            )}
          </div>
        </Section>

        {/* Meta */}
        <Section title="Additional Info">
          <Grid>
            <Info label="Status" value={batch.status} />
            <Info label="Visibility" value={batch.visibility} />
            <Info label="Language" value={batch.language} />
            <Info label="Gender Preference" value={batch.genderRefference} />
            <Info label="Age Group" value={batch.ageGroup} />
            <Info label="Cancellation Policy" value={batch.cancellationPolicy || "—"} />
          </Grid>
        </Section>

        {/* Thumbnail */}
        {batch.thumbnail && (
          <Section title="Thumbnail">
            <img
              src={batch.thumbnail}
              alt="thumbnail"
              className="rounded-xl w-72 border border-light shadow-md"
            />
          </Section>
        )}

      </div>
    </div>
  );
};

/* --- Reusable Components --- */

const Section = ({ title, children }) => (
  <section className="space-y-4 animate-slide-in-up">
    <h2 className="text-xl font-700 text-dark">{title}</h2>
    {children}
    <div className="border-b border-light mt-4" />
  </section>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-muted">{label}</p>
    <p className="font-600 text-dark">{value}</p>
  </div>
);

export default BatchViewAdminPage;
