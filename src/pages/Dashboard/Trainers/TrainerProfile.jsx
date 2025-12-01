import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  Banknote,
  Settings,
  Edit2,
  Calendar,
  Trash2,
  PlusCircle,
  PlusCircleIcon,
} from "lucide-react";
import AvailabilityModal from "./AvailabilityModal";
import PersonalInfoTab from "./PersonalInfoTab";
import ProfessionalDetailsTab from "./ProfessionalDetailsTab";
import BankDetailsTab from "./BankDetailsTab";
import TabButton from "./TabButton";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../../../apis/authApi";
import AvailabilityTab from "./AvailabilityTab";
import transformSlotsForBackend from "./transformSlotsForBackend";
import { addAvailabilitySlot, editAvailabilitySlot, deleteAvailabilitySlot } from "../../../apis/trainerApi";
import { setUser } from "../../../redux/slices/authSlice";
import GallaryTab from "./Gallary";
import CentresTab from "./CentresTab";


const TrainerProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [trainerData, setTrainerData] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [slots, setSlots] = useState([]);

  console.log("Trainer Profile - User from Redux:", trainerData);

  useEffect(() => {
    const loadTrainer = async () => {
      try {
        const res = await getCurrentUser();
        setTrainerData(res);
        setSlots(res.availability || []);
      } catch (err) {
        console.error("Error fetching trainer data:", err);
      }
    };

    if (!user) {
      loadTrainer();
    } else {
      setTrainerData(user);
      setSlots(user.availability || []);
    }
  }, [dispatch, user]);


  if (loading || !trainerData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-muted">
        Loading trainer profile...
      </div>
    );
  }

  const openModal = (slot = null) => {
    setEditingSlot(slot);
    setIsModalOpen(true);
  };

  const saveSlot = async (slotData) => {
    try {
      if (slotData._id && slotData.dateId) {
        // Edit existing slot
        await editAvailabilitySlot({
          dateId: slotData.dateId,
          slotId: slotData._id,
          startTime: slotData.startTime,
          endTime: slotData.endTime,
        });
      } else {
        // Add new slot
        await addAvailabilitySlot({
          date: slotData.date,
          startTime: slotData.startTime,
          endTime: slotData.endTime,
        });
      }

      const updatedTrainer = await getCurrentUser();
      setSlots(updatedTrainer.availability);
      dispatch(setUser(updatedTrainer));
      setIsModalOpen(false);
      setEditingSlot(null);
    } catch (err) {
      console.error("Error saving slot:", err);
    }
  };


  const deleteSlot = async (slotId, dateId) => {
    if (!confirm("Are you sure you want to delete this slot?")) return;

    try {
      await deleteAvailabilitySlot({ slotId, dateId });
      const updatedTrainer = await getCurrentUser();
      setSlots(updatedTrainer.availability);
      dispatch(setUser(updatedTrainer));
    } catch (err) {
      console.error("Error deleting slot:", err);
    }
  };



  // --- Tabs ---
  const tabs = [
    { id: "personal", label: "Personal", icon: <User size={16} /> },
    { id: "professional", label: "Professional", icon: <Shield size={16} /> },
    { id: "availability", label: "Availability", icon: <Calendar size={16} /> },
    { id: "bank", label: "Bank", icon: <Banknote size={16} /> },
    { id: "centres", label: "Centres", icon: <PlusCircleIcon size={16} /> },
    { id: "gallary", label: "Upload photos", icon: <Settings size={16} /> },
  ];

  console.log("Trainer Data:", trainerData);
  // --- Render tab content dynamically ---
  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoTab
            data={{
              name: trainerData.fullName || "N/A",
              email: trainerData.email || "N/A",
              phone: trainerData.phone || +910000000000,
              location: trainerData.location?.country || "N/A",
              avatar: trainerData.profilePicture,
              bio: trainerData.bio || "No bio provided",
            }}
          />
        );

      case "professional":
        return (
          <ProfessionalDetailsTab
            data={{
              specializations: trainerData.specializations || [],
              experience: trainerData.experienceYears
                ? `${trainerData.experienceYears} Years`
                : "N/A",
              certifications: trainerData.certifications || [],
              pricing: trainerData.pricing || {},
            }}
          />
        );

      case "availability":
        return (
          <AvailabilityTab
            slots={slots}
            setSlots={setSlots}
            saveSlot={saveSlot}
            deleteSlot={deleteSlot}
            openModal={openModal}
            onClose={() => setIsModalOpen(false)}

          />
        );

      case "bank":
        return (
          <BankDetailsTab
            data={trainerData.bank || { bankName: "N/A", accountNumber: "N/A" }}
          />
        );
        case "gallary":
        return (
          <GallaryTab
            photosVideos={trainerData.photosVideos || { notifications: true, darkMode: false }}
          />
        );
      case "centres":
        return (
          <CentresTab
            centres={trainerData.centres || []}
            trainerId={trainerData._id}
            refreshTrainer={async () => {
              const updated = await getCurrentUser();
              setTrainerData(updated);
              dispatch(setUser(updated));
            }}
          />
        );


      default:

        (
          <GallaryTab
            data={trainerData.photosVideos || { notifications: true, darkMode: false }}
          />
        )
          ;
    }
  };

  // --- JSX ---
  return (
    <div className="bg-offwhite min-h-screen font-sans">
      <div className="pb-7 border-b border-light">
        <h1 className="text-2xl font-700 text-dark mb-1">Trainer Profile</h1>
        <p className="text-muted text-sm">
          Manage your personal and professional details.
        </p>
      </div>

      <div className="w-full bg-light rounded-2xl border border-light shadow-sm hover-lift transition">
        {/* Tabs */}
         <div className="flex gap-2 mb-6 p-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-600 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow hover-lift"
                  : "bg-offwhite text-dark hover:bg-primary-light hover:text-dark hover-lift"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="relative p-6 sm:p-8 animate-fade-in">

          {renderTab()}
        </div>
      </div>

      {/* Modal */}
      <AvailabilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveSlot}
        slot={editingSlot}
      />
    </div>
  );
};

export default TrainerProfile;
