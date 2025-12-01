import React, { useState, useEffect } from 'react';
import { Edit, Save, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/authSlice';
import { getCurrentUser } from '../../../apis/authApi';
import { updateProfessionalInfo } from '../../../apis/trainerApi';

const InputField = ({ label, value, name, onChange }) => (
  <div>
    <label className="text-xs font-500 text-muted">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl border border-light shadow-sm focus:ring-1 focus:ring-primary focus:outline-none text-dark bg-white"
    />
  </div>
);

const ProfessionalDetailsTab = ({ data }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [professionalInfo, setProfessionalInfo] = useState({
    specializations: [],
    experience: '',
    certifications: [],
    pricing: { online: '', home: '', centre: '' },
  });

  useEffect(() => {
    if (data) {
      setProfessionalInfo({
        specializations: data.specializations || [],
        experience: data.experience || '',
        certifications: data.certifications || [],
        pricing: data.pricing || { online: '', home: '', centre: '' },
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('pricing.')) {
      const key = name.split('.')[1];
      setProfessionalInfo((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [key]: value },
      }));
    } else {
      setProfessionalInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      await updateProfessionalInfo(professionalInfo);
      const updatedTrainer = await getCurrentUser();
      dispatch(setUser(updatedTrainer));
      setProfessionalInfo({
        specializations: updatedTrainer.specializations || [],
        experience: updatedTrainer.experience || '',
        certifications: updatedTrainer.certifications || [],
        pricing: updatedTrainer.pricing || { online: '', home: '', centre: '' },
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update professional info:', err);
      alert('Failed to update professional info');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Specializations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-700 text-2xl text-dark">Professional Details</h2>
           {isEditing ? (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-outline flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary flex items-center gap-2"
          >
            <Save size={16} /> Save
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
          
        {isEditing ? (
          <InputField
            label="Specializations (comma separated)"
            value={professionalInfo.specializations.join(', ')}
            name="specializations"
            onChange={(e) =>
              setProfessionalInfo((prev) => ({
                ...prev,
                specializations: e.target.value.split(',').map((s) => s.trim()),
              }))
            }
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {professionalInfo.specializations.map((spec) => (
              <span
                key={spec}
                className="bg-primary text-white text-xs font-500 px-3 py-1 rounded-full"
              >
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-600 text-lg text-dark mb-3">Experience (Years)</h3>
        {isEditing ? (
          <InputField
            label="Experience"
            name="experience"
            value={professionalInfo.experience}
            onChange={handleChange}
          />
        ) : (
          <p className="text-muted">{professionalInfo.experience}</p>
        )}
      </div>

      {/* Certifications */}
      {professionalInfo.certifications.length > 0 && (
        <div>
          <h3 className="font-600 text-lg text-dark mb-3">Certifications</h3>
          <div className="flex flex-wrap gap-4">
            {professionalInfo.certifications.map((url, index) => (
              <div key={index} className="w-32 h-40">
                <img
                  src={url}
                  alt={`Certification ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md border border-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div>
        <h3 className="font-600 text-lg text-dark mb-4">Session Pricing (per session)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['online', 'home', 'centre'].map((type) => (
            <div key={type} className="bg-offwhite p-4 rounded-lg text-center">
              <p className="text-sm font-500 text-primary capitalize">{type}</p>
              {isEditing ? (
                <input
                  type="number"
                  name={`pricing.${type}`}
                  value={professionalInfo.pricing[type]}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 rounded-xl border border-light shadow-sm focus:ring-1 focus:ring-primary focus:outline-none text-dark bg-white"
                />
              ) : (
                <p className="text-xl font-700 text-dark mt-1">₹{professionalInfo.pricing[type]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default ProfessionalDetailsTab;
