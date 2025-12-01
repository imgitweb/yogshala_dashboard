import React from "react";

const platforms = [
  "Instagram",
  "LinkedIn",
  "Facebook",
  "YouTube",
  "Twitter",
  "Website",
];

const SocialLinksInput = ({ label = "Social Links", values = [], onChange,
   required = false,
 
  

}) => {
  // Add new empty link
  const addSocialLink = () => {
    onChange([...values, { platform: "", url: "" }]);
  };

  // Update platform or URL
  const handleSocialChange = (index, field, value) => {
    const updated = [...values];
    updated[index][field] = value;
    onChange(updated);
  };

  // Remove link
  const removeSocialLink = (index) => {
    const updated = values.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-sm font-600 text-dark mb-2">
        {label}
         {required && <span className="text-red-600"> *</span>}

      </label>
      
      {values.map((item, index) => (
        <div key={index} className="flex gap-3 mb-3">

          {/* Platform Select */}
          <select
            className="w-40 px-4 py-3 bg-offwhite border border-light rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary"
            value={item.platform}
            onChange={(e) =>
              handleSocialChange(index, "platform", e.target.value)
            }
          >
            <option value="">Select</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* URL Field */}
          <input
            type="url"
            placeholder={
              item.platform
                ? `https://${item.platform.toLowerCase()}.com/yourpage`
                : "Enter URL"
            }
            className="flex-1 px-4 py-3 bg-offwhite border border-light rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-primary"
            value={item.url}
            onChange={(e) =>
              handleSocialChange(index, "url", e.target.value)
            }
          />

          {/* Remove Button */}
          {values.length > 1 && (
            <button
              type="button"
              className="text-red-600 text-xl font-bold"
              onClick={() => removeSocialLink(index)}
            >
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        type="button"
        className="btn btn-primary"
        onClick={addSocialLink}
      >
        + Add Social Link
      </button>
    </div>
  );
};

export default SocialLinksInput;
