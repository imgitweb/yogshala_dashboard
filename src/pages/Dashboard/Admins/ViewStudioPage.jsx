import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import { getStudioById } from "../../../apis/adminApi";
import { showError } from "../../../utils/toastService";

const ViewStudioPage = () => {
  const { studioId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await getStudioById(studioId);
        console.log("Studio API Response:", res);

        setStudio(res.studio || res); 
      } catch (err) {
        showError(err?.message || "Failed to load studio");
      } finally {
        setLoading(false);
      }
    };

    fetchStudio();
  }, [studioId]);

  if (loading)
    return (
      <div className="flex justify-center py-20 text-muted animate-fade-in">
        Loading studio details...
      </div>
    );

  if (!studio)
    return (
      <div className="text-center py-20 text-red-500 font-600">
        Studio not found
      </div>
    );

  return (
   <div className="bg-offwhite min-h-screen font-sans">
      <div className="flex items-center justify-between">
     <div>
           <h1 className="text-2xl font-800 text-dark mb-2">
        {studio.name} Details, 
      </h1>
      <p className="text-muted mb-6">List of all yoga studios in the system.</p>
     </div>
        <button
          onClick={() => navigate(`/admin/studio/edit/${studio._id}`)}
          className="btn btn-primary btn-sm mb-6 flex items-center gap-2"
        >
          <Edit size={14} />
          Edit Studio
        </button>
      </div>

       <div className="bg-light p-8 rounded-2xl shadow-md border border-light animate-fade-in">

        {/* LOGO CARD */}
        <div className="bg-white shadow-md rounded-2xl p-8 border border-light  mb-10 animate-fade-in text-center">
          <img
            src={studio.logo}
            className="w-32 h-32 mx-auto rounded-xl object-cover border shadow-md"
            alt="Studio Logo"
          />

          <h2 className="text-xl font-700 text-dark mt-4">{studio.name}</h2>

          <p
            className={`px-4 py-1 rounded-full inline-block text-sm mt-2 font-600 ${
              studio.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {studio.status?.toUpperCase()}
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="space-y-10 animate-fade-in">

          {/* BASIC INFO */}
          <Section title="Basic Information">
            <Grid>
              <Detail label="Studio Name" value={studio.name} />
              <Detail label="Contact Phone" value={studio.contactPhone} />
              <Detail label="Contact Email" value={studio.contactEmail} />
              <Detail label="Website" value={studio.website} isLink />

              <Detail label="Country" value={studio.country} />
              <Detail label="State" value={studio.state} />
              <Detail label="City" value={studio.city} />
              <Detail label="Pin Code" value={studio.pinCode} />
              <Detail label="Address" value={studio.address} full />
              <Detail label="Description" value={studio.description} full />
            </Grid>
          </Section>

          {/* PRICING */}
          <Section title="Pricing">
            <Grid>
              <Detail label="Online Session" value={studio.pricing?.online} />
              <Detail label="Home Session" value={studio.pricing?.home} />
              <Detail label="Centre Session" value={studio.pricing?.centre} />
              <Detail label="Currency" value={studio.pricing?.currency} />
            </Grid>
          </Section>

          {/* FACILITIES */}
          <Section title="Facilities">
            {studio.facilities?.length ? (
              <div className="flex flex-wrap gap-2">
                {studio.facilities.map((f, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-offwhite border border-light rounded-lg text-dark"
                  >
                    {f}
                  </span>
                ))}
              </div>
            ) : (
              <NoData text="No facilities found." />
            )}
          </Section>

          {/* OPENING HOURS */}
          <Section title="Opening Hours">
            {studio.openingHours?.length ? (
              <table className="w-full border border-light rounded-xl overflow-hidden">
                <thead className="bg-offwhite">
                  <tr>
                    <th className="p-3 text-left">Day</th>
                    <th className="p-3 text-left">Open</th>
                    <th className="p-3 text-left">Close</th>
                  </tr>
                </thead>
                <tbody>
                  {studio.openingHours.map((d) => (
                    <tr key={d._id} className="border-t border-light">
                      <td className="p-3">{d.day}</td>
                      <td className="p-3">{d.open}</td>
                      <td className="p-3">{d.close}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData text="No opening hours set." />
            )}
          </Section>

          {/* SOCIAL LINKS */}
          <Section title="Social Links">
            <Grid>
              <Detail label="Facebook" value={studio.socialLinks.facebook} isLink />
              <Detail label="Instagram" value={studio.socialLinks.instagram} isLink />
              <Detail label="Twitter" value={studio.socialLinks.twitter} isLink />
              <Detail label="YouTube" value={studio.socialLinks.youtube} isLink />
              <Detail label="LinkedIn" value={studio.socialLinks.linkedin} isLink full />
            </Grid>
          </Section>

          {/* GALLERY */}
          <Section title="Gallery">
            {studio.photos?.length ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {studio.photos.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-full h-36 object-cover rounded-xl border shadow-sm hover-scale"
                  />
                ))}
              </div>
            ) : (
              <NoData text="No images uploaded." />
            )}
          </Section>

          {/* ADMINS */}
          <Section title="Admins">
            {studio.admins?.length ? (
              studio.admins.map((admin) => (
                <div
                  key={admin._id}
                  className="p-4 bg-offwhite border border-light rounded-xl"
                >
                  <p className="font-700">{admin.fullName}</p>
                  <p className="text-muted text-sm">{admin.email}</p>
                </div>
              ))
            ) : (
              <NoData text="No admins assigned." />
            )}
          </Section>

          {/* MEMBERS */}
          <StatsCard title="Members" value={studio.members?.length || 0} />

          {/* TRAINERS */}
          <StatsCard title="Trainers" value={studio.trainers?.length || 0} />
        </div>
      </div>
    </div>
  );
};


const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-700 text-dark mb-3">{title}</h3>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Detail = ({ label, value, full, isLink }) => (
  <div className={`${full ? "md:col-span-2" : ""}`}>
    <p className="text-muted text-sm">{label}</p>
    {isLink && value ? (
      <a href={value} target="_blank" className="text-primary font-600">
        {value}
      </a>
    ) : (
      <p className="text-dark font-600">{value || "--"}</p>
    )}
  </div>
);

const StatsCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-light text-center">
    <p className="text-muted text-sm">{title}</p>
    <h2 className="text-3xl font-800 text-dark mt-1">{value}</h2>
  </div>
);

const NoData = ({ text }) => (
  <p className="text-muted italic">{text}</p>
);

export default ViewStudioPage;
