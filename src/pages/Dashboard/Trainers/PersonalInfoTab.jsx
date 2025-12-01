import React, { useState, useEffect } from 'react';
import { Camera, Edit, Save, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/authSlice';
import { getCurrentUser } from '../../../apis/authApi';
import { updatePersonalInfo } from '../../../apis/trainerApi';
import { uploadImageToImageKit } from '../../../utils/imagekitHelper';

const InfoField = ({ label, value, editable, onChange, name }) => (
  <div>
    <label className="text-xs font-500 text-muted">{label}</label>
    {editable ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-xl border border-light shadow-sm focus:ring-1 focus:ring-primary focus:outline-none text-dark bg-white"
      />
    ) : (
      <p className="text-dark font-600">{value}</p>
    )}
  </div>
);

const PersonalInfoTab = ({ data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    bio: '',
    location: { city: '', state: '', country: '' },
    avatar: '',
  });

  useEffect(() => {
    if (data) {
      setPersonalInfo({
        fullName: data.name || '',
        phone: data.phone || '',
        bio: data.bio || '',
        location: {
          city: data.location?.city || '',
          state: data.location?.state || '',
          country: data.location?.country || '',
        },
        avatar: data.avatar || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setPersonalInfo((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else {
      setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToImageKit(file);
      // ✅ Instantly update image preview
      setPersonalInfo((prev) => ({ ...prev, avatar: url }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updatePersonalInfo({
        fullName: personalInfo.fullName,
        phone: personalInfo.phone,
        bio: personalInfo.bio,
        location: personalInfo.location,
        avatar: personalInfo.avatar, // ✅ send updated avatar URL
      });

      const updatedTrainer = await getCurrentUser();
      dispatch(setUser(updatedTrainer));

      setPersonalInfo({
        fullName: updatedTrainer.fullName || '',
        phone: updatedTrainer.phone || '',
        bio: updatedTrainer.bio || '',
        location: updatedTrainer.location || {
          city: '',
          state: '',
          country: '',
        },
        avatar: updatedTrainer.avatar || '',
      });

      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update personal info:', err);
      alert('Failed to update personal info');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-light">
        <div className="relative h-24 w-24">
          <img
            src={personalInfo.avatar || '/default-avatar.png'}
            alt={personalInfo.fullName}
            className="w-24 h-24 rounded-full border-4 border-light shadow-md hover-scale object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-light transition cursor-pointer">
              <Camera size={14} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        <div className="text-center sm:text-left w-full">
          {isEditing ? (
            <input
              type="text"
              name="fullName"
              value={personalInfo.fullName}
              onChange={handleChange}
              className="text-2xl font-700 text-dark w-full p-3 rounded-xl border border-light shadow-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-700 text-dark">{personalInfo.fullName}</h2>
          )}
          <p className="text-muted">
            {personalInfo.location.city || data.location?.city || ''}
          </p>
        </div>

        <div className="flex justify-end">
          {isEditing ? (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-outline flex items-center gap-2"
                disabled={uploading}
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary flex items-center gap-2"
                disabled={uploading}
              >
                <Save size={16} /> {uploading ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary flex items-center gap-2"
              >
                <Edit size={16} /> Edit
              </button>
            </div>
          )}
        </div>
      </div>

      {/* About */}
      <div>
        <h3 className="font-600 text-lg text-dark mb-2">About Me</h3>
        {isEditing ? (
          <textarea
            name="bio"
            value={personalInfo.bio}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-light shadow-sm focus:ring-1 focus:ring-primary focus:outline-none text-dark bg-white"
          />
        ) : (
          <p className="text-muted text-sm leading-relaxed">{personalInfo.bio}</p>
        )}
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="font-600 text-lg text-dark mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoField label="Email Address" value={data.email} />
          <InfoField
            label="Phone Number"
            value={personalInfo.phone}
            editable={isEditing}
            onChange={handleChange}
            name="phone"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
