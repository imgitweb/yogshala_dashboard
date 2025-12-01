import React, { useEffect, useState } from "react";
import InputField from "../../../components/landingPage/TrainerRegister/InputField";
import InputRow from "../../../components/landingPage/TrainerRegister/InputRow";
import { Plus } from "lucide-react";
import SuggestiveSelect from "../../../components/common/SuggestiveSelect";
import useCountryStateCity from "../../../hooks/useCountryStateCity";
import { uploadImageToImageKit } from "../../../utils/imagekitHelper";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../../utils/toastService";
import { addStudioAPi } from "../../../apis/adminApi";

const AddStudioForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pinCode: "",
    description: "",
    website: "",
    contactPhone: "",
    contactEmail: "",
    logo: null,
    images: [],
    facilities: [],
    openingHours: [],
    socialLinks: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: "",
    },
  });

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

  const [errors, setErrors] = useState({});

  const handleInput = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, logo: e.target.files[0] }));
  };

  const handleMultiImage = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Studio name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedCity) newErrors.city = "City is required";

    // if (!formData.description.trim())
    //   newErrors.description = "Description is required";

    if (!formData.contactPhone.trim())
      newErrors.contactPhone = "Contact number is required";

    if (
      formData.contactPhone &&
      !/^[0-9]{10,15}$/.test(formData.contactPhone.trim())
    )
      newErrors.contactPhone = "Enter a valid phone number";

    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required";

    if (
      formData.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail.trim())
    )
      newErrors.contactEmail = "Enter a valid email address";

    if (
      formData.website &&
      !formData.website.trim().toLowerCase().startsWith("http")
    )
      newErrors.website = "Website should start with http or https";

    if (!formData.logo) newErrors.logo = "Studio logo is required";

    if (formData.socialLinks.facebook && !formData.socialLinks.facebook.startsWith("http"))
  newErrors.facebook = "Facebook link must start with http";

if (formData.socialLinks.instagram && !formData.socialLinks.instagram.startsWith("http"))
  newErrors.instagram = "Instagram link must start with http";


    const validHours = (formData.openingHours || []).filter(
      (d) => d.open && d.close
    );

    if (validHours.length === 0)
      newErrors.openingHours =
        "At least 1 day must have opening & closing time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
//   useEffect(() => {
//   if (countries.length > 0 && !selectedCountry) {
//     const india = countries.find(c => c.name === "India");
//     if (india) setSelectedCountry(india.isoCode);
//   }
// }, [countries]);



 const handleSubmit = async () => {
  const isValid = validate();
  if (!isValid) {
  const firstErrorKey = Object.keys(errors)[0];
  document.getElementById(`field-${firstErrorKey}`)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  return;
}

  if (!isValid || loading) return;


  try {
    setLoading(true);

    let logoUrl = "";
    if (formData.logo) {
      logoUrl = await uploadImageToImageKit(formData.logo, "/studio/logo");
    }

    let imagesUrls = [];
    if (formData.images.length > 0) {
      imagesUrls = await Promise.all(
        formData.images.map((file) =>
          uploadImageToImageKit(file, "/studio/gallery")
        )
      );
    }

    const payload = {
      ...formData,
      logo: logoUrl,
      images: imagesUrls,
       // Send FULL NAME to backend
  country: countries.find(c => c.isoCode === selectedCountry)?.name || "",
  state: states.find(s => s.isoCode === selectedState)?.name || "",
      city: selectedCity,
      socialLinks: formData.socialLinks,
    };

    const res = await addStudioAPi(payload);

    // FIXED CHECK
    if (!res || res.status !== 201) {
      showError(res?.data?.message || "Failed to add studio");
      return;
    }

    showSuccess("Studio added successfully");

    const studioId = res.data.studio?._id;
    navigate(`/dashboard/studio/${studioId}`);

  } catch (err) {
    console.error("Studio error:", err);
    showError(err?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl font-800 text-dark mb-2">Add New Studio</h1>
      <p className="text-muted mb-6">
        Fill in the details below to add a new yoga studio.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-md border border-light animate-fade-in">
        <h2 className="text-xl font-700 text-dark mb-6">Add New Studio</h2>

        <div className="flex flex-col gap-8">

          <InputRow>
            <div className="w-full" 
              id="field-name"
            
            >
              <InputField
                label="Studio Name"
                required
                value={formData.name}
                onChange={(e) => handleInput("name", e.target.value)}
                placeholder="Enter studio name"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="w-full"
            
            id="field-contactPhone"
            >
              <InputField
                label="Contact Number"
                required
                value={formData.contactPhone}
                onChange={(e) => handleInput("contactPhone", e.target.value)}
                placeholder="Enter phone number"
              />
              {errors.contactPhone && (
                <p className="text-xs text-red-500">{errors.contactPhone}</p>
              )}
            </div>
          </InputRow>

          <InputRow columns={3}>
            <div
            id="field-country"
            className="w-full">
              <SuggestiveSelect
                required
                label="Country"
                placeholder="Search country..."
                suggestions={countries.map((c) => c.name)}
                value={
                  selectedCountry
                    ? countries.find((c) => c.isoCode === selectedCountry)?.name
                    : ""
                }
                onChange={(countryName) => {
                  const country = countries.find((c) => c.name === countryName);
                  setSelectedCountry(country?.isoCode || "");
                  setSelectedState("");
                  setSelectedCity("");

                  handleInput("country", countryName);
                }}
              />
              {errors.country && (
                <p className="text-xs text-red-500">{errors.country}</p>
              )}
            </div>

            <div 
              id="field-state"
            className="w-full">
              <SuggestiveSelect
                required
                label="State"
                placeholder="Search state..."
                suggestions={states.map((s) => s.name)}
                value={
                  selectedState
                    ? states.find((s) => s.isoCode === selectedState)?.name
                    : ""
                }
                onChange={(stateName) => {
                  const state = states.find((s) => s.name === stateName);

                  setSelectedState(state?.isoCode || "");
                  setSelectedCity("");

                  handleInput("state", stateName);
                }}
              />
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state}</p>
              )}
            </div>

            <div
            id="field-city"
            
            className="w-full">
              <SuggestiveSelect
                required
                label="City"
                placeholder="Search city..."
                suggestions={cities.map((c) => c.name)}
                value={selectedCity || ""}
                onChange={(cityName) => {
                  setSelectedCity(cityName);
                  handleInput("city", cityName);
                }}
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city}</p>
              )}
            </div>
          </InputRow>

          {/* Row 3 */}
          <InputRow columns={2}>
          <div 
          id="field-contactEmail"
          className="w-full">
  <InputField
              required
              label="Contact Email"
              value={formData.contactEmail}
              onChange={(e) => handleInput("contactEmail", e.target.value)}
              placeholder="Enter email"
            />
            {errors.contactEmail && (
              <p className="text-xs text-red-500">{errors.contactEmail}</p>
            )}
          </div>
          
             

       <div
          id="field-pinCode"
       
       className="w-full">
 <InputField
              label="Pin Code"
              value={formData.pinCode}
              onChange={(e) => handleInput("pinCode", e.target.value)}
              placeholder="Enter pincode 460000"
            />
       </div>
           

          </InputRow>

          <InputRow >
          <div
            id="field-address"
          
          className="w-full">
 <InputField
              label="Address"
              required
              value={formData.address}
              onChange={(e) => handleInput("address", e.target.value)}
              placeholder="Enter address"

            />
            {errors.address && (
              <p className="text-xs text-red-500">{errors.address}</p>
            )}
          </div>
           
           

<div
            id="field-description"

className="w-full">
 <InputField
              label="Description"
              value={formData.description}
              onChange={(e) => handleInput("description", e.target.value)}
              placeholder="Enter description"
            />
</div>
           
          </InputRow>

          <div 
            id="field-facilities"
          >
            <label className="text-sm font-600 text-dark mb-2 block">
              Facilities
            </label>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Parking",
                "WiFi",
                "Locker Room",
                "Changing Area",
                "Showers",
                "Equipment Provided",
              ].map((f, i) => (
                <label
                  key={i}
                  className="flex items-center gap-2 p-3 border border-light rounded-lg bg-offwhite cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.facilities.includes(f)}
                    onChange={(e) => {
                      const copy = [...formData.facilities];
                      if (e.target.checked) copy.push(f);
                      else copy.splice(copy.indexOf(f), 1);
                      handleInput("facilities", copy);
                    }}
                  />
                  <span className="text-dark">{f}</span>
                </label>
              ))}
            </div>
          </div>

<div className="mt-6"
            id="field-openingHours"

>
  <label className="text-sm font-600 text-dark mb-2 block">
    Opening Hours <span className="text-red-500">*</span>
  </label>
  {errors.openingHours && (
    <p className="text-xs text-red-500 mb-2">{errors.openingHours}</p>
  )}

  <div className="hidden md:block">
    {/* DESKTOP TABLE */}
    <table className="w-full border border-light rounded-lg overflow-hidden">
      <thead className="bg-offwhite border-b border-light">
        <tr>
          <th className="p-3 text-left w-1/3">Day</th>
          <th className="p-3 text-left w-1/3">Open</th>
          <th className="p-3 text-left w-1/3">Close</th>
        </tr>
      </thead>

      <tbody>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <tr key={day} className="border-b border-light last:border-0">
            <td className="p-3 text-dark">{day}</td>

            <td className="p-3">
              <input
                type="time"
                className="w-full border border-light p-2 rounded-lg bg-offwhite"
                onChange={(e) => {
                  const updated = [...(formData.openingHours || [])];
                  const i = updated.findIndex((d) => d.day === day);

                  if (i === -1)
                    updated.push({ day, open: e.target.value, close: "" });
                  else updated[i].open = e.target.value;

                  handleInput("openingHours", updated);
                }}
              />
            </td>

            <td className="p-3">
              <input
                type="time"
                className="w-full border border-light p-2 rounded-lg bg-offwhite"
                onChange={(e) => {
                  const updated = [...(formData.openingHours || [])];
                  const i = updated.findIndex((d) => d.day === day);

                  if (i === -1)
                    updated.push({ day, open: "", close: e.target.value });
                  else updated[i].close = e.target.value;

                  handleInput("openingHours", updated);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* MOBILE VERSION */}
  <div className="md:hidden flex flex-col gap-4">
    {[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((day) => (
      <div
        key={day}
        className="p-4 bg-offwhite border border-light rounded-lg"
      >

        <p className="text-dark font-600 mb-2">{day}</p>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-muted">Open</label>
            <input
              type="time"
              className="w-full border border-light p-2 rounded-lg bg-white"
              onChange={(e) => {
                const updated = [...(formData.openingHours || [])];
                const i = updated.findIndex((d) => d.day === day);

                if (i === -1)
                  updated.push({ day, open: e.target.value, close: "" });
                else updated[i].open = e.target.value;

                handleInput("openingHours", updated);
              }}
            />
          </div>

          <div>
            <label className="text-xs text-muted">Close</label>
            <input
              type="time"
              className="w-full border border-light p-2 rounded-lg bg-white"
              onChange={(e) => {
                const updated = [...(formData.openingHours || [])];
                const i = updated.findIndex((d) => d.day === day);

                if (i === -1)
                  updated.push({ day, open: "", close: e.target.value });
                else updated[i].close = e.target.value;

                handleInput("openingHours", updated);
              }}
            />
          </div>
        </div>
        {
          errors.openingHours && (<p className="text-xs text-red-500 mt-2">{errors.openingHours}</p>
        )
        }
      </div>
    ))}
  </div>
</div>


          {/* Website */}
          <InputRow>

            <InputField
              label="Website"
              value={formData.website}
              onChange={(e) => handleInput("website", e.target.value)}
              placeholder="Enter website"
            />
            {errors.website && (
              <p className="text-xs text-red-500">{errors.website}</p>
            )}
          </InputRow>

          {/* Logo */}
          <div 
            id="field-logo"
          
          >
            <label className="text-sm font-600 text-dark mb-2 block">
              Studio Logo <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-light rounded-lg bg-offwhite"
            />

            {formData.logo && (
              <img
                src={URL.createObjectURL(formData.logo)}
                className="w-24 h-24 rounded mt-3 object-cover border border-light"
              />
            )}
            {errors.logo && (
              <p className="text-xs text-red-500 mt-2">{errors.logo}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-600 text-dark mb-2 block">
              Studio Images (Multiple)
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiImage}
              className="w-full px-4 py-2 border border-light rounded-lg bg-offwhite"
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {formData.images.map((img, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(img)}
                  className="w-20 h-20 rounded border object-cover"
                />
              ))}
            </div>
          </div>
          {/* SOCIAL LINKS */}
<InputRow columns={2}>
<div
            id="field-facebook"

className="w-full">
<InputField
    label="Facebook"
    value={formData.socialLinks.facebook}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, facebook: e.target.value }
      }))
    }
    placeholder="Facebook link"
  />
  {
    errors.facebook && (<p className="text-xs text-red-500">{errors.facebook}</p>
    )
  }
</div>
  
<div
            id="field-instagram"


className="w-full">
  <InputField
    label="Instagram"
    value={formData.socialLinks.instagram}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, instagram: e.target.value }
      }))
    }
    placeholder="Instagram link"
  />
  {
    errors.instagram && (<p className="text-xs text-red-500">{errors.instagram}</p>
  )
  }
  </div>

</InputRow>

<InputRow columns={2}>
  <InputField
    label="Twitter"
    value={formData.socialLinks.twitter}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, twitter: e.target.value }
      }))
    }
    placeholder="Twitter link"
  />

  <InputField
    label="YouTube"
    value={formData.socialLinks.youtube}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, youtube: e.target.value }
      }))
    }
    placeholder="YouTube link"
  />
</InputRow>

<InputRow columns={1}>
  <InputField
    label="LinkedIn"
    value={formData.socialLinks.linkedin}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
      }))
    }
    placeholder="LinkedIn link"
  />
  {
    errors.linkedin && (<p className="text-xs text-red-500">{errors.linkedin}</p>
    )
  }
</InputRow>
{/* DEBUG PANEL */}
{/* <div className="p-4 mt-10 bg-gray-900 text-green-300 text-xs rounded-lg">
  <h3 className="text-yellow-400 font-bold mb-2">🔍 DEBUG PANEL</h3>
  <pre>{JSON.stringify({
    selectedCountry,
    selectedState,
    selectedCity,
    formCountryFrontEnd: formData.country,
    formStateFrontEnd: formData.state,
    finalCountryBeingSent: countries.find(c => c.isoCode === selectedCountry)?.name,
    finalStateBeingSent: states.find(s => s.isoCode === selectedState)?.name,

    openingHours: formData.openingHours,
    socialLinks: formData.socialLinks,
    errors
  }, null, 2)}</pre>
</div> */}



          {/* Submit */}
          <div className="w-full flex justify-end">
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="btn btn-primary hover-lift flex items-center gap-2 disabled:opacity-50"
            >
              <Plus size={18} />
              {loading ? "Adding..." : "Add Studio"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudioForm;
