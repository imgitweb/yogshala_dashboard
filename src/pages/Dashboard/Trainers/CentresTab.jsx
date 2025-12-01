import React, { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { addCentre, deleteCentre } from "../../../apis/trainerApi"; 
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import useCountryStateCity from "../../../hooks/useCountryStateCity";

const CentresTab = ({ centres = [], trainerId, refreshTrainer }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    countries,
    states,
    cities,
    selectedCountry,
    setSelectedCountry,
    selectedState,
    setSelectedState,
    selectedCity,
    setSelectedCity,
  } = useCountryStateCity();

  // Sync hook selections with form
  React.useEffect(() => {
    setForm(prev => ({ ...prev, country: selectedCountry }));
  }, [selectedCountry]);

  React.useEffect(() => {
    setForm(prev => ({ ...prev, state: selectedState }));
  }, [selectedState]);

  React.useEffect(() => {
    setForm(prev => ({ ...prev, city: selectedCity }));
  }, [selectedCity]);

  const handleAdd = async () => {
    if (!form.name || !form.address || !form.country || !form.state || !form.city) {
      return alert("Please fill in all required fields.");
    }
    setLoading(true);
    try {
      await addCentre(form);
      await refreshTrainer(); // reload data
      setForm({ name: "", address: "", city: "", state: "", country: "", contact: "" });
      setSelectedCountry('');
      setSelectedState('');
      setSelectedCity('');
    } catch (err) {
      console.error("Error adding centre:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name) => {
    if (!confirm("Are you sure you want to delete this centre?")) return;
    try {
      await deleteCentre(name);
      await refreshTrainer();
    } catch (err) {
      console.error("Error deleting centre:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-dark mb-4">Training Centres</h2>

      {/* Add Form */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <InputRow>
          <InputField
            label="Centre Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <InputField
            label="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </InputRow>

        <InputRow>
          {/* Country */}
          <div className="flex-1 mb-6">
            <label className="block text-sm font-600 text-dark mb-2">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedState('');
                setSelectedCity('');
              }}
              className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="flex-1 mb-6">
            <label className="block text-sm font-600 text-dark mb-2">State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
              }}
              className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {states.map(s => (
                <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
              ))}
            </select>
          </div>
        </InputRow>

        <InputRow>
          {/* City */}
          <div className="flex-1 mb-6">
            <label className="block text-sm font-600 text-dark mb-2">City</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-offwhite border border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {cities.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Contact */}
          <InputField
            label="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </InputRow>

        <button
          className="btn btn-primary mt-4 flex items-center gap-2"
          onClick={handleAdd}
          disabled={loading}
        >
          <PlusCircle size={16} /> {loading ? "Adding..." : "Add Centre"}
        </button>
      </div>

      {/* List */}
      {centres.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {centres.map((centre, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-light">
              <h3 className="font-semibold text-dark">{centre.name}</h3>
              <p className="text-sm text-muted">{centre.address}</p>
              <p className="text-sm text-muted">
                {centre.city}, {centre.state}, {centre.country}
              </p>
              {centre.contact && <p className="text-sm text-muted">📞 {centre.contact}</p>}
              <button
                className="text-red-500 mt-2 flex items-center gap-1 text-sm"
                onClick={() => handleDelete(centre.name)}
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted text-sm">No centres added yet.</p>
      )}
    </div>
  );
};

export default CentresTab;
